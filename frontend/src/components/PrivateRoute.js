import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element: Component }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Or any loading spinner/component you prefer
    }

    return user ? <Component /> : <Navigate to="/" state={{ from: "private" }} />;
};

export default PrivateRoute;