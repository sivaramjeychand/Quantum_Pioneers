import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { loadUser, user } = useContext(AuthContext);

 

    useEffect(() => {
        console.log('Home component mounted');
        loadUser();
    }, []);

    useEffect(() => {
        console.log('User:', user);
    }, [user]);

    return (
        <div>
            <h1>Home</h1>
            {user && <p>Welcome, {user.name}</p>}
        </div>
    );
};

export default Home;

