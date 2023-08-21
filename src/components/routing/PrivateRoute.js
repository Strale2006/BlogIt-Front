import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem("authToken");

    if (isAuthenticated) {
        return <Route {...rest} element={<Component />} />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
