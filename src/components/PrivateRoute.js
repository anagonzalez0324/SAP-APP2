import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = () => {
    const { authTokens } = useContext(AuthContext);
    return authTokens ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;