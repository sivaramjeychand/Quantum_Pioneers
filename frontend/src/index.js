import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <AuthProvider>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
        <App />
    </AuthProvider>,
    document.getElementById('root')
);

reportWebVitals();