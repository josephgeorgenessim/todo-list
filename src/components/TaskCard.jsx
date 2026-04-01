import React, { useState } from 'react';
import { 
  Calendar, 
  MoreVertical, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Edit2,
  ChevronRight,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../contexts/TaskContext';

const PriorityBadge = ({ priority }) => {
  const colors = {
    High: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-100 dark:border-red-500/20',
    Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
    Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'
  };

  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${colors[priority]}`}>
      {priority}
    </span>
  );
};

export function TaskCard({ task }) {
  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Edit states
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    updateTask(task.taskId, { title, description, priority });
    setIsEditing(false);
    setShowMenu(false);
  };

  const toggleStatus = () => {
    const nextStatus = task.status === 'pending' ? 'done' : 'pending';
    updateTask(task.taskId, { status: nextStatus });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="glass-card group relative overflow-hidden bg-white/60 dark:bg-slate-900/60"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          <PriorityBadge priority={task.priority} />
          {task.status === 'done' && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-wider">
              Completed
            </span>
          )}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <MoreVertical size={18} />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 glass bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow-2xl border z-30"
              >
                <button 
                  onClick={() => { setIsEditing(true); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Edit2 size={14} />
                  Edit Task
                </button>
                <button 
                  onClick={() => { setShowHistory(!showHistory); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <History size={14} />
                  View History
                </button>
                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                <button 
                  onClick={() => deleteTask(task.taskId)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete Task
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field text-sm font-bold"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field text-xs min-h-[80px]"
          />
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="input-field text-xs bg-white"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 btn-primary py-2 text-xs">Save</button>
            <button onClick={() => setIsEditing(false)} className="flex-1 btn-secondary py-2 text-xs">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3 className={`text-lg font-bold mb-2 ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
            {task.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">
            {task.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar size={14} />
              <span className="text-xs font-medium">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
              </span>
            </div>
            
            <button 
              onClick={toggleStatus}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                task.status === 'done' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {task.status === 'done' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
              {task.status === 'done' ? 'Completed' : 'Complete'}
            </button>
          </div>
        </>
      )}

      {/* History Slide-down */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50 dark:bg-slate-900/40 rounded-xl mt-4"
          >
            <div className="p-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <History size={12} />
                Activity History
              </p>
              {task.history.map((entry, idx) => (
                <div key={idx} className="flex gap-3 items-start border-l-2 border-slate-200 dark:border-slate-800 ml-1 pl-3 pb-2 last:pb-0">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {entry}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
