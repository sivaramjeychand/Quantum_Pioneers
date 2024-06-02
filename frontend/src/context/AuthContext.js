import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return { ...state, ...action.payload, isAuthenticated: true, loading: false };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return { ...state, token: null, isAuthenticated: false, loading: false, user: null };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) axios.defaults.headers.common['x-auth-token'] = token;
        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider
            value={{ ...state, loadUser, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

