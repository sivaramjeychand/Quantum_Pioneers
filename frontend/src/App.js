import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" component={Home} exact />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
