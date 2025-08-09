import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                    
                }
            } catch (err) {
                console.error('Failed to load user from storage', err);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        const storedUsers = await AsyncStorage.getItem('users');
        let users = storedUsers ? JSON.parse(storedUsers) : [];
        const foundUser = users.find((u) => u.email === email && u.password === password);

        if (foundUser) {
            setUser(foundUser);
            await AsyncStorage.setItem('user', JSON.stringify(foundUser));
        } else {
            alert('Incorrect credentials.');
        }
    };

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isStrongPassword = (password) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
    // Explanation: at least 6 characters, one letter, one number

    const signup = async (name, email, password) => {
        if (!name.trim()) {
            alert('Name cannot be empty');
            return;
        }

        if (!email.trim()) {
            alert('Email cannot be empty');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!isStrongPassword(password)) {
            alert('Password must be at least 6 characters and include a letter and a number');
            return;
        }

        const storedUsers = await AsyncStorage.getItem('users');
        let users = storedUsers ? JSON.parse(storedUsers) : [];
        const findInStoredUsers = users.find((u) => u.email === email);

        if (findInStoredUsers !== undefined) {
            alert('Email already exist. Please try other email');
            return;
        }

        // You could add this new user to the array or call an API in a real app
        const newUser = { id: generateUUID(), name, email, password };
        setUser(newUser);
        await AsyncStorage.setItem('user', JSON.stringify(newUser));

        addUserToStorage(newUser);
    };

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const rand = Math.random() * 16 | 0;
            const value = char === 'x' ? rand : (rand & 0x3) | 0x8;
            return value.toString(16);
        });
    };

    const addUserToStorage = async (newUser) => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            let users = storedUsers ? JSON.parse(storedUsers) : [];

            users.push(newUser);

            await AsyncStorage.setItem('users', JSON.stringify(users));

            console.log('User added successfully');
        } catch (e) {
            console.error('Error adding user:', e);
        }
    }

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
