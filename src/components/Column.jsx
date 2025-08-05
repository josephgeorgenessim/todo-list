import React from 'react';
import { useTasks } from '../contexts/TaskContext';

export function Column({ title, status, tasks }) {
    const { moveTask, deleteTask } = useTasks();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const taskId = parseInt(e.dataTransfer.getData('taskId'));
        if (taskId) {
            moveTask(taskId, status);
        }
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    return (
        <div
            className="flex-1 bg-white rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.taskId}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm cursor-move"
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.taskId)}
                    >
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                            {status === 'pending' && (
                                <button
                                    onClick={() => moveTask(task.taskId, 'done')}
                                    className="text-sm text-primary hover:underline"
                                >
                                    Mark as Done
                                </button>
                            )}
                            {status === 'done' && (
                                <button
                                    onClick={() => moveTask(task.taskId, 'archived')}
                                    className="text-sm text-primary hover:underline"
                                >
                                    Archive
                                </button>
                            )}
                            <button
                                onClick={() => deleteTask(task.taskId)}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 