import { createContext, useContext, useState } from 'react';
import userData from '../data/DataUser.json';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (username, password) => {
        try {
            const users = userData.users;
            const foundUser = users.find(
                (u) => u.username === username && u.password === password
            );

            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const register = async (username, password) => {
        try {
            const users = userData.users;

            if (users.some((u) => u.username === username)) {
                return false;
            }

            const newUser = {
                userId: users.length + 1,
                username,
                password,
            };

            users.push(newUser);
            // In a real app, you would write this to the file
            // For now, we'll just update the in-memory data
            userData.users = users;

            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 