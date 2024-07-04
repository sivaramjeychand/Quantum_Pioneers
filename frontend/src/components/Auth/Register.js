import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const navigate = useNavigate();

    const validateInput = (name, value) => {
        let errors = { ...formErrors };

        if (value === '') {
            errors[name] = '';
        } else if (name === 'name') {
            let nameErrors = [];
            if (value.length < 4 || value.length > 20) {
                nameErrors.push("Name must have a length of between 4 and 20 characters");
            }
            if (value.includes("'") || value.includes('"')) {
                nameErrors.push("Name must not contain apostrophes");
            }
            errors.name = nameErrors.join('<br />');
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            errors.email = emailRegex.test(value) ? '' : "Invalid email format";
        } else if (name === 'password') {
            let passwordErrors = [];
            if (!/[A-Z]/.test(value)) {
                passwordErrors.push("Password must contain at least one upper case letter");
            }
            if (!/[a-z]/.test(value)) {
                passwordErrors.push("Password must contain at least one lower case letter");
            }
            if (!/\d/.test(value)) {
                passwordErrors.push("Password must contain at least one numerical character");
            }
            if (!/\W/.test(value)) {
                passwordErrors.push("Password must contain at least one special character");
            }
            if (value.includes("'") || value.includes('"')) {
                passwordErrors.push("Password must not contain apostrophes");
            }
            errors.password = passwordErrors.join('<br />');
        } else if (name === 'password2') {
            errors.password2 = value === formData.password ? '' : "Doesn't match password";
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
    
        if (formData.password !== formData.password2) {
            toast.error('Passwords do not match');
            setFormData(prevData => ({ ...prevData, password2: '' }));
            return;
        }
    
        const success = await register(formData.name, formData.email, formData.password);
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
                    <h2 className="text-center mb-4">Register an account</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                            <input
                                type="text"
                                className={`form-control ${formErrors.name ? 'is-invalid' : formData.name ? 'is-valid' : ''}`}
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                placeholder="Name"
                                autoComplete="off"
                                required
                            />
                            {formErrors.name && (
                                <div className="invalid-feedback" style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: formErrors.name }}></div>
                            )}
                        </div>
                    </div>
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
                                <div className="invalid-feedback" style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: formErrors.password }}></div>
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Password Confirmation</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock-fill"></i>
                            </span>
                            <input
                                type="password"
                                className={`form-control ${formErrors.password2 ? 'is-invalid' : formData.password2 ? 'is-valid' : ''}`}
                                id="password2"
                                name="password2"
                                value={formData.password2}
                                onChange={onChange}
                                placeholder="Password Confirmation"
                                autoComplete="off"
                                required
                            />
                            {formErrors.password2 && (
                                <div className="invalid-feedback" style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: formErrors.password2 }}></div>
                            )}
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>
                            Register
                        </button>
                        <button type="button" className="btn btn-link" onClick={() => navigate('/')}>
                            Return to Home
                        </button>
                    </div>
                    <div className="text-center mt-3">
                        Already have an account? <button type="button" className="btn btn-link p-0" onClick={() => navigate('/login')}>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
