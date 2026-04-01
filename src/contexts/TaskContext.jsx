import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import initialTaskData from '../data/DataToDoList.json';

const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
    const { user } = useAuth();
    const [allTasks, setAllTasks] = useState(() => {
        const savedTasks = localStorage.getItem('todo_all_tasks');
        if (savedTasks) return JSON.parse(savedTasks);
        return initialTaskData.tasks;
    });

    // Save all tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todo_all_tasks', JSON.stringify(allTasks));
    }, [allTasks]);

    // Compute tasks for the current user
    const tasks = user 
        ? allTasks.filter((task) => task.userId === user.userId)
        : [];

    const addTask = (taskData) => {
        if (!user) return;

        const newTask = {
            taskId: Date.now(),
            userId: user.userId,
            title: taskData.title,
            description: taskData.description,
            status: taskData.status || 'pending',
            priority: taskData.priority || 'Medium',
            dueDate: taskData.dueDate || null,
            category: taskData.category || 'General',
            history: [`Task created at ${new Date().toLocaleString()}`],
            createdAt: new Date().toISOString(),
        };

        setAllTasks((prev) => [...prev, newTask]);
    };

    const updateTask = (taskId, updates) => {
        setAllTasks((prev) => prev.map((task) => {
            if (task.taskId === taskId) {
                const historyEntry = updates.status 
                    ? `Status updated to ${updates.status} at ${new Date().toLocaleString()}`
                    : `Task updated at ${new Date().toLocaleString()}`;
                
                return {
                    ...task,
                    ...updates,
                    history: [...task.history, historyEntry]
                };
            }
            return task;
        }));
    };

    const deleteTask = (taskId) => {
        setAllTasks((prev) => prev.filter((task) => task.taskId !== taskId));
    };

    // Keep compatibility with old methods if needed, but modernizing is better
    const moveTask = (taskId, newStatus) => updateTask(taskId, { status: newStatus });
    const editTask = (taskId, title, description) => updateTask(taskId, { title, description });

    return (
        <TaskContext.Provider value={{ 
            tasks, 
            addTask, 
            updateTask, 
            deleteTask, 
            moveTask, 
            editTask 
        }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}