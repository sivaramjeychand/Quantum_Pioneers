import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            setUser(res.data);
            setLoading(false);
        } catch (err) {
            setUser(null);
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/auth/login', body, config);
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
            await loadUser(); // Ensure user is loaded before redirecting
            toast.success(res.data.msg || 'Login successful');
            return true; // Indicate success
        } catch (err) {
            toast.error(err.response.data.msg || 'Login failed');
            return false; // Indicate failure
        }
    };

    const register = async (name, email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ name, email, password });

        try {
            const res = await axios.post('/api/auth/register', body, config);
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
            await loadUser();
            toast.success(res.data.msg || 'Registration successful');
            return true; // Indicate success
        } catch (err) {
            toast.error(err.response.data.msg || 'Registration failed');
            return false; // Indicate failure
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };