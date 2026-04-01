import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
    const baseStyles = 'px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 text-sm';

    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none',
        secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
        outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400/50 dark:hover:bg-indigo-500/10',
        danger: 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
} 