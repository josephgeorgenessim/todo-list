import React from 'react';
import { TaskCard } from './TaskCard';
import { motion, AnimatePresence } from 'framer-motion';

export function Column({ title, tasks, icon: Icon, colorClass }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClass || 'bg-indigo-100 text-indigo-600'} dark:bg-slate-800`}>
            {Icon && <Icon size={18} />}
          </div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-widest">{title}</h2>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4 min-h-[100px]">
        <AnimatePresence mode="popLayout">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.taskId} task={task} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-center"
            >
              <p className="text-sm text-slate-400 font-medium italic">No tasks found here.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}