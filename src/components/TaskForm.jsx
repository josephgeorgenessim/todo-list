import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  Calendar as CalendarIcon, 
  Flag, 
  Tag, 
  ChevronRight,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../contexts/TaskContext';

export function TaskForm() {
  const { addTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      priority,
      status: 'pending',
      dueDate: dueDate || new Date().toISOString().split('T')[0]
    });

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setIsOpen(false);
  };

  return (
    <div className="mb-12">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            layoutId="task-form"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 glass rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 flex items-center justify-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center group-hover:rotate-90 transition-transform duration-300 shadow-lg shadow-indigo-200">
              <Plus size={20} />
            </div>
            Create New Task
            <span className="text-xs text-indigo-300 font-medium ml-4 border border-indigo-100 px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Press Alt + N
            </span>
          </motion.button>
        ) : (
          <motion.div
            layoutId="task-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card bg-white p-8 relative overflow-hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Task Title</p>
                <input
                  autoFocus
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full text-2xl font-bold bg-transparent border-none focus:outline-none placeholder:text-slate-200 dark:placeholder:text-slate-700 text-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Description (Optional)</p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add some details about this task..."
                  rows={2}
                  className="w-full text-sm bg-transparent border-none focus:outline-none text-slate-500 dark:text-slate-400 placeholder:text-slate-200 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <Flag size={14} className="text-indigo-500" />
                    Priority
                  </label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          priority === p 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100' 
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700 hover:border-indigo-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <CalendarIcon size={14} className="text-indigo-500" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-medium border border-slate-100 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-600 dark:text-slate-300"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1 flex items-end">
                  <button
                    type="submit"
                    disabled={!title.trim()}
                    className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed group h-[42px]"
                  >
                    <span>Create Task</span>
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}