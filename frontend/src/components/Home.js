import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.from === "private") {
            toast.error("Please sign in to access this page.");
        }
    }, [location]);

    return (
        <div className="text-center mt-5">
            <h1>Welcome to Quantum Pioneers</h1>
            <p>Access your physics simulations by logging in or registering a new account.</p>
            <div className="mt-3">
                <Link to="/login" className="btn btn-primary me-2">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
            <div className="mt-4">
                <a href="https://docs.google.com/document/d/19uAqr00AwmV_gYRkMt3PrMPiExi5pz_u/edit?usp=sharing&ouid=106253090538477231880&rtpof=true&sd=true" className="btn btn-outline-dark me-2" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-file-earmark-text"></i> README
                </a>
                <a href="https://github.com/sivaramjeychand/Quantum_Pioneers" className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-github"></i> GitHub
                </a>
            </div>
            <footer className="mt-5 text-muted">
                <small>By Quantum Pioneers team</small>
            </footer>
        </div>
    );
};

export default Home;