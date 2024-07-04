import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const simulations = [
    {
        id: 1,
        title: "Double Slit Experiment",
        description: "In May of 1801, while pondering some of Newton's experiments, Young came up with the basic idea for the now-famous double-slit experiment to demonstrate the interference of light waves. The demonstration would provide solid evidence that light was a wave, not a particle.",
        image: "/images/double_slit.jpg",
        path: "/double-slit"
    },
    {
        id: 2,
        title: "Rutherford Scattering Experiment",
        description: "Hans Geiger, working in Rutherford's lab, did a series of experiments in 1908 showing that alpha particles are 'scattered' as they pass through thin layers of mica, and foils of gold and aluminum. In the following year, joined by undergraduate Ernest Marsden, they did a series of experiments to untangle confusing results they observed.",
        image: "/images/rutherford.jpg",
        path: "/rutherford-scattering"
    }
];

const Simulations = () => {
    const { logout } = useContext(AuthContext);
    const [currentTab, setCurrentTab] = useState('Simulations');
    const navigate = useNavigate();

    const handleStartSimulation = (path) => {
        navigate(path);
    };

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
                {simulations.map(sim => (
                    <div key={sim.id} style={{
                        padding: '20px',
                        marginBottom: '20px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img src={sim.image} alt={sim.title} style={{ width: '150px', height: '100px', borderRadius: '4px', marginRight: '20px' }} />
                        <div style={{ flex: 1 }}>
                            <h3>{sim.title}</h3>
                            <p>{sim.description}</p>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleStartSimulation(sim.path)}>
                                Start
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Simulations;