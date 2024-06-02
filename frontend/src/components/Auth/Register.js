import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            console.error('Passwords do not match');
        } else {
            register({ name, email, password });
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            <div>
                <input type="text" name="name" value={name} onChange={onChange} required />
            </div>
            <div>
                <input type="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div>
                <input type="password" name="password" value={password} onChange={onChange} required />
            </div>
            <div>
                <input type="password" name="password2" value={password2} onChange={onChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

