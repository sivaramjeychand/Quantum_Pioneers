import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const [simulations, setSimulations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimulations = async () => {
            try {
                const res = await axios.get('/api/dashboard');
                setSimulations(res.data.simulations);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSimulations();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <button className="list-group-item list-group-item-action" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="mb-4">Dashboard</h1>
                    <div className="row">
                        {simulations.map(sim => (
                            <div key={sim.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{sim.name}</h5>
                                        <p className="card-text">{sim.description}</p>
                                        <button className="btn btn-primary">Run Simulation</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;