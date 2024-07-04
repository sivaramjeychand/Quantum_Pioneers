import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [simulations, setSimulations] = useState([]);
    const [currentTab, setCurrentTab] = useState('Dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSimulations = async () => {
            try {
                const res = await axios.get('/api/simulations');
                setSimulations(res.data.simulations);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSimulations();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItemStyle = {
        cursor: 'pointer',
        padding: '10px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center'
    };

    const hoverStyle = {
        backgroundColor: '#e9ecef'  // Light grey background on hover
    };

    const icons = {
        Dashboard: 'bi-house-door',
        Simulations: 'bi-gear',
        'Virtual Lab': 'bi-vr',
        Forum: 'bi-chat-left-text',
        Contests: 'bi-trophy',
        Logout: 'bi-box-arrow-right'
    };

    const changeTab = (tab) => {
        if (tab === 'Logout') {
            handleLogout();
        } else {
            setCurrentTab(tab);
            navigate(`/${tab.toLowerCase().replace(/\s/g, '')}`);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <div style={{
                padding: 20,
                width: 250,
                background: '#f0f0f0',
                position: 'fixed',
                height: '100vh',
                overflowY: 'auto'
            }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <img src="/logo.png" alt="Quantum Pioneers Logo" style={{ maxWidth: '100px' }} />
                    <h1>Quantum Pioneers</h1>
                    <hr style={{ border: '1px solid #ccc', margin: '10px 20px' }} />
                </div>
                <div>
                    {Object.entries(icons).map(([item, icon], index) => (
                        <p key={index}
                           style={menuItemStyle}
                           onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                           onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                           onClick={() => changeTab(item)}>
                            <i className={`bi ${icon}`} style={{ marginRight: 10 }}></i>
                            {item}
                        </p>
                    ))}
                </div>
            </div>
            <div style={{ flexGrow: 1, padding: 20, marginLeft: 250, overflowY: 'auto', height: '100vh' }}>
                <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: 10 }}>{currentTab}</h2>
                <h3 style={{ color: '#666', marginTop: 20 }}>Welcome {user.username} to Quantum Pioneers where Physics is made easier, more interactive, and more interesting than ever before!</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
                    {simulations.map(sim => (
                        <div key={sim.id} style={{ width: '33%', padding: 10 }}>
                            <div style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                                <img src={sim.image} alt={sim.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ padding: '15px' }}>
                                    <h5 style={{ fontSize: '18px', fontWeight: '600' }}>{sim.name}</h5>
                                    <p style={{ fontSize: '14px', color: '#666' }}>{sim.description}</p>
                                    <button style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                        Run Simulation
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
