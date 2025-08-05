import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import { Column } from '../components/Column';
import { TaskForm } from '../components/TaskForm';
import { Button } from '../components/Button';

export function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { tasks } = useTasks();

    if (!user) {
        navigate('/login');
        return null;
    }

    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const doneTasks = tasks.filter(task => task.status === 'done');
    const archivedTasks = tasks.filter(task => task.status === 'archived');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Welcome, {user.username}!
                    </h1>
                    <Button variant="outline" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <TaskForm />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Column
                        title="Pending Tasks"
                        status="pending"
                        tasks={pendingTasks}
                    />
                    <Column
                        title="Completed Tasks"
                        status="done"
                        tasks={doneTasks}
                    />
                    <Column
                        title="Archived Tasks"
                        status="archived"
                        tasks={archivedTasks}
                    />
                </div>
            </main>
        </div>
    );
} 