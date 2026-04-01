import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle2, User, Lock, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        // Delay for premium feel
        setTimeout(async () => {
            const success = await register(username, password);
            if (success) {
                navigate('/dashboard');
            } else {
                setError('Username already exists. Please try another.');
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
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Create Account</h1>
                        <p className="text-slate-500 font-medium">Join us and start being productive today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2"
                            >
                                <ShieldCheck size={14} />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field pl-12 bg-white"
                                    placeholder="choose a username"
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

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    <span>Create Account</span>
                                    <UserPlus size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-center text-sm font-medium text-slate-500">
                          Already have an account?{' '}
                          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors">
                              Log in here
                          </Link>
                      </p>
                    </div>
                </div>
                
                <p className="text-center mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-50">
                  Join 10,000+ productive users
                </p>
            </motion.div>
        </div>
    );
}