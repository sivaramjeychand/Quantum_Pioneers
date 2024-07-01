import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const validateInput = (name, value) => {
        let errors = { ...formErrors };

        if (value === '') {
            errors[name] = '';
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            errors.email = emailRegex.test(value) ? '' : "Invalid email format";
        } else if (name === 'password') {
            errors.password = value ? '' : "Password cannot be empty";
        }

        setFormErrors(errors);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        validateInput(name, value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const success = await login(formData.email, formData.password);
        if (success) {
            navigate('/dashboard');
        }
    };

    const isFormValid = () => {
        return Object.values(formErrors).every(error => error === '') && 
               Object.values(formData).every(field => field !== '');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="col-md-4">
                <form onSubmit={onSubmit} className="card p-4 shadow">
                    <h2 className="text-center mb-4">Log in to your account</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input
                                type="email"
                                className={`form-control ${formErrors.email ? 'is-invalid' : formData.email ? 'is-valid' : ''}`}
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={onChange}
                                placeholder="Email address"
                                autoComplete="off"
                                required
                            />
                            {formErrors.email && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>{formErrors.email}</div>
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input
                                type="password"
                                className={`form-control ${formErrors.password ? 'is-invalid' : formData.password ? 'is-valid' : ''}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={onChange}
                                placeholder="Password"
                                autoComplete="off"
                                required
                            />
                            {formErrors.password && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>{formErrors.password}</div>
                            )}
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>Log in</button>
                        <button type="button" className="btn btn-link" onClick={() => navigate('/')}>Return to Home</button>
                    </div>
                    <div className="text-center mt-3">
                        New to Quantum Pioneers? <button type="button" className="btn btn-link p-0" onClick={() => navigate('/register')}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;