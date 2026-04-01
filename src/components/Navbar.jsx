import React from 'react';
import { Search, Bell, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar({ searchTerm, setSearchTerm }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 glass fixed top-0 right-0 left-72 px-8 flex items-center justify-between border-b bg-white/50 z-10">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-indigo-500 transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

        <div className="flex items-center gap-4">
          <div className="text-right flex flex-col justify-center">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user?.username}</p>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Active User</p>
          </div>
          
          <div className="relative h-11 w-11 rounded-xl bg-indigo-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group cursor-pointer hover:shadow-lg transition-all border-2 border-white dark:border-slate-800">
            <User size={22} />
            
            {/* Dropdown Menu Mockup */}
            <div className="absolute top-full right-0 mt-2 w-48 glass bg-white p-2 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border transform translate-y-2 group-hover:translate-y-0">
               <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                 <Settings size={16} />
                 <span>Settings</span>
               </button>
               <div className="h-px bg-slate-100 my-1"></div>
               <button 
                 onClick={logout}
                 className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
               >
                 <LogOut size={16} />
                 <span>Logout</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
