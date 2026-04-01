import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { TaskForm } from '../components/TaskForm';
import { Column } from '../components/Column';
import { 
  ClipboardList, 
  CheckCircle2, 
  Archive, 
  AlertCircle,
  Calendar,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { tasks } = useTasks();
    
    const [activeFilter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('dark_mode');
        return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('dark_mode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    // Task Counts for Sidebar
    const taskCounts = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        return {
            all: tasks.filter(t => t.status !== 'archived').length,
            today: tasks.filter(t => t.dueDate === today && t.status !== 'archived').length,
            upcoming: tasks.filter(t => t.dueDate > today && t.status !== 'archived').length,
            high: tasks.filter(t => t.priority === 'High' && t.status !== 'archived').length,
            pending: tasks.filter(t => t.status === 'pending').length,
            done: tasks.filter(t => t.status === 'done').length,
            archived: tasks.filter(t => t.status === 'archived').length,
        };
    }, [tasks]);

    // Filtering logic
    const filteredTasks = useMemo(() => {
        let result = tasks;

        // Search filter
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(t => 
                t.title.toLowerCase().includes(lowerSearch) || 
                t.description.toLowerCase().includes(lowerSearch)
            );
        }

        // Sidebar filter
        const today = new Date().toISOString().split('T')[0];
        switch (activeFilter) {
            case 'today':
                return result.filter(t => t.dueDate === today && t.status !== 'archived');
            case 'upcoming':
                return result.filter(t => t.dueDate > today && t.status !== 'archived');
            case 'high':
                return result.filter(t => t.priority === 'High' && t.status !== 'archived');
            case 'done':
                return result.filter(t => t.status === 'done');
            case 'archived':
                return result.filter(t => t.status === 'archived');
            case 'all':
            default:
                return result.filter(t => t.status !== 'archived');
        }
    }, [tasks, activeFilter, searchTerm]);

    if (!user) return null;

    const getFilterTitle = () => {
        switch (activeFilter) {
            case 'today': return 'Due Today';
            case 'upcoming': return 'Upcoming Tasks';
            case 'high': return 'High Priority';
            case 'done': return 'Completed Tasks';
            case 'archived': return 'Archived Tasks';
            default: return 'All Tasks';
        }
    };

    const getFilterIcon = () => {
        switch (activeFilter) {
            case 'today': return Calendar;
            case 'upcoming': return Clock;
            case 'high': return AlertCircle;
            case 'done': return CheckCircle2;
            case 'archived': return Archive;
            default: return LayoutDashboard;
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex">
            <Sidebar 
                activeFilter={activeFilter} 
                setFilter={setFilter} 
                taskCounts={taskCounts}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />
            
            <main className="flex-1 ml-72 pt-24 pb-12 px-12">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                
                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Welcome Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-2"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            What's on your mind, {user.username}? 👋
                        </h2>
                        <p className="text-slate-500 font-medium">Ready to tackle your tasks for today?</p>
                    </motion.div>

                    {/* Task Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard label="Completed" value={taskCounts.done} total={taskCounts.all} color="from-indigo-500 to-indigo-600" />
                        <StatCard label="Pending" value={taskCounts.pending} total={taskCounts.all} color="from-purple-500 to-purple-600" />
                        <StatCard label="Important" value={taskCounts.high} color="from-red-500 to-pink-600" />
                        <StatCard label="Archived" value={taskCounts.archived} color="from-slate-400 to-slate-500" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
                        {/* Main Task List */}
                        <section className="space-y-8">
                           <Column 
                                title={getFilterTitle()} 
                                tasks={filteredTasks} 
                                icon={getFilterIcon()}
                                colorClass="bg-indigo-100 text-indigo-600"
                           />
                        </section>

                        {/* Sidebar Column: Form & Recent? */}
                        <aside className="space-y-12 h-screen-sticky">
                            <section>
                                <div className="flex items-center gap-3 mb-6 px-2">
                                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-slate-800">
                                        <ClipboardList size={18} />
                                    </div>
                                    <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-widest">New Task</h2>
                                </div>
                                <TaskForm />
                            </section>

                            <section className="glass-card bg-indigo-600 text-white border-none p-8">
                                <h3 className="text-xl font-bold mb-3 tracking-tight">Level Up! 🚀</h3>
                                <p className="text-sm opacity-80 leading-relaxed mb-6">
                                    Completing tasks consistently boosts your productivity and mental health. Keep going!
                                </p>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-white"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(taskCounts.done / (taskCounts.all || 1)) * 100}%` }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                                <p className="text-[10px] uppercase font-bold mt-3 opacity-60 tracking-wider">
                                    Daily Goal Progression
                                </p>
                            </section>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}

const StatCard = ({ label, value, total, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`glass-card bg-gradient-to-br ${color} border-none p-6 shadow-xl relative overflow-hidden`}
    >
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-white">{value}</h3>
            {total !== undefined && <span className="text-sm font-medium text-white/50 mb-1">/ {total}</span>}
        </div>
    </motion.div>
);