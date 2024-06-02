import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <div>
                <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div>
                <input type="password" name="password" value={password} onChange={onChange} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

