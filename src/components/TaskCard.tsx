import { useState } from 'react';
import { Task } from '../types';
import { Button } from './ui/button';
import { useTasks } from '../contexts/TaskContext';

interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
    const { moveTask, deleteTask, editTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSave = () => {
        editTask(task.taskId, title, description);
        setIsEditing(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
            {isEditing ? (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-2">
                        <Button onClick={handleSave}>Save</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {task.description}
                    </p>
                    <div className="mt-4 flex gap-2">
                        {task.status === 'pending' && (
                            <Button onClick={() => moveTask(task.taskId, 'done')}>
                                Mark Done
                            </Button>
                        )}
                        {task.status === 'done' && (
                            <Button onClick={() => moveTask(task.taskId, 'archived')}>
                                Archive
                            </Button>
                        )}
                        {task.status !== 'archived' && (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                        )}
                        <Button
                            variant="destructive"
                            onClick={() => deleteTask(task.taskId)}
                        >
                            Delete
                        </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        <h4 className="font-medium">History:</h4>
                        <ul className="list-disc list-inside">
                            {task.history.map((entry, index) => (
                                <li key={index}>{entry}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
} 