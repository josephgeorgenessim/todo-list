import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Archive, 
  AlertCircle,
  PlusCircle,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const NavItem = ({ icon: Icon, label, active, onClick, count }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </div>
    {count !== undefined && (
      <span className={`text-xs px-2 py-1 rounded-full ${
        active ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'
      }`}>
        {count}
      </span>
    )}
  </button>
);

export function Sidebar({ activeFilter, setFilter, taskCounts, isDarkMode, toggleDarkMode }) {
  const { logout } = useAuth();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 glass border-r bg-white/50 flex flex-col p-6 z-20">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
          <CheckCircle2 size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">TaskFlow</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem 
          icon={LayoutDashboard} 
          label="All Tasks" 
          active={activeFilter === 'all'} 
          onClick={() => setFilter('all')}
          count={taskCounts.all}
        />
        <NavItem 
          icon={Calendar} 
          label="Today" 
          active={activeFilter === 'today'} 
          onClick={() => setFilter('today')}
          count={taskCounts.today}
        />
        <NavItem 
          icon={Clock} 
          label="Upcoming" 
          active={activeFilter === 'upcoming'} 
          onClick={() => setFilter('upcoming')}
          count={taskCounts.upcoming}
        />
        <NavItem 
          icon={AlertCircle} 
          label="Important" 
          active={activeFilter === 'high'} 
          onClick={() => setFilter('high')}
          count={taskCounts.high}
        />
        <div className="pt-4 pb-2 border-t border-slate-100 dark:border-slate-800 mt-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Status</p>
        </div>
        <NavItem 
          icon={CheckCircle2} 
          label="Completed" 
          active={activeFilter === 'done'} 
          onClick={() => setFilter('done')}
          count={taskCounts.done}
        />
        <NavItem 
          icon={Archive} 
          label="Archived" 
          active={activeFilter === 'archived'} 
          onClick={() => setFilter('archived')}
          count={taskCounts.archived}
        />
      </nav>

      <div className="mt-auto space-y-4">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-xl shadow-indigo-200 dark:shadow-none">
          <p className="text-sm font-medium opacity-90 mb-1">Stay Productive!</p>
          <p className="text-xs opacity-75 mb-3">You have {taskCounts.pending} pending tasks.</p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all">
            View Analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
