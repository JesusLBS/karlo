import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const PublicRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
