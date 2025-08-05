import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import taskData from '../data/DataToDoList.json';

const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            const userTasks = taskData.tasks.filter((task) => task.userId === user.userId);
            setTasks(userTasks);
        } else {
            setTasks([]);
        }
    }, [user]);

    const addTask = (title, description) => {
        if (!user) return;

        const newTask = {
            taskId: Date.now(),
            userId: user.userId,
            title,
            description,
            status: 'pending',
            history: [`Task added at ${new Date().toLocaleTimeString()}`],
            createdAt: new Date().toISOString(),
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        // Update the in-memory data
        taskData.tasks = [...taskData.tasks, newTask];
    };

    const moveTask = (taskId, newStatus) => {
        const taskIndex = tasks.findIndex(t => t.taskId === taskId);
        if (taskIndex === -1) return;

        const updatedTasks = [...tasks];
        const task = updatedTasks[taskIndex];
        const oldStatus = task.status;

        task.status = newStatus;
        task.history.push(`Moved from ${oldStatus} to ${newStatus} at ${new Date().toLocaleTimeString()}`);

        setTasks(updatedTasks);
        // Update the in-memory data
        const allTasksIndex = taskData.tasks.findIndex(t => t.taskId === taskId);
        if (allTasksIndex !== -1) {
            taskData.tasks[allTasksIndex] = task;
        }
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(t => t.taskId !== taskId);
        setTasks(updatedTasks);
        // Update the in-memory data
        taskData.tasks = taskData.tasks.filter(t => t.taskId !== taskId);
    };

    const editTask = (taskId, title, description) => {
        const taskIndex = tasks.findIndex(t => t.taskId === taskId);
        if (taskIndex === -1) return;

        const updatedTasks = [...tasks];
        const task = updatedTasks[taskIndex];

        task.title = title;
        task.description = description;
        task.history.push(`Task edited at ${new Date().toLocaleTimeString()}`);

        setTasks(updatedTasks);
        // Update the in-memory data
        const allTasksIndex = taskData.tasks.findIndex(t => t.taskId === taskId);
        if (allTasksIndex !== -1) {
            taskData.tasks[allTasksIndex] = task;
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, moveTask, deleteTask, editTask }}>
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