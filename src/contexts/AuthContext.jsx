import { createContext, useContext, useState, useEffect } from 'react';
import initialUserData from '../data/DataUser.json';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('todo_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [allUsers, setAllUsers] = useState(() => {
        const savedUsers = localStorage.getItem('todo_all_users');
        if (savedUsers) return JSON.parse(savedUsers);
        // Fallback to initial data
        return initialUserData.users;
    });

    useEffect(() => {
        localStorage.setItem('todo_all_users', JSON.stringify(allUsers));
    }, [allUsers]);

    const login = async (username, password) => {
        const foundUser = allUsers.find(
            (u) => u.username === username && u.password === password
        );

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('todo_user', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const register = async (username, password) => {
        if (allUsers.some((u) => u.username === username)) {
            return false;
        }

        const newUser = {
            userId: Date.now(), // Unique ID
            username,
            password,
        };

        const updatedUsers = [...allUsers, newUser];
        setAllUsers(updatedUsers);
        setUser(newUser);
        localStorage.setItem('todo_user', JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('todo_user');
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