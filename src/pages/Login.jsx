import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        // Artificial delay for premium feel
        setTimeout(async () => {
            const success = await login(username, password);
            if (success) {
                navigate('/dashboard');
            } else {
                setError('Invalid username or password. Please try again.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-slate-950">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200 dark:shadow-none">
                        <CheckCircle2 size={32} />
                    </div>
                </div>

                <div className="glass-card bg-white/80 dark:bg-slate-900/80 p-10 relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
                    
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-500 font-medium">Log in to manage your productivity.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2"
                            >
                                <Lock size={14} />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Username</label>
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field pl-12 bg-white"
                                    placeholder="yourname"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-12 bg-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-4 mt-4 disabled:opacity-70 group"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Log In to Account</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 px-2 flex items-center gap-4">
                      <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or</p>
                      <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                    </div>

                    <p className="mt-8 text-center text-sm font-medium text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors">
                            Register now
                        </Link>
                    </p>
                </div>
                
                <p className="text-center mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-50">
                  © 2024 TaskFlow Productivity Suite
                </p>
            </motion.div>
        </div>
    );
}

const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);