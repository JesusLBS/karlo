import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import HomePage from '../pages/HomePage';

interface DashboardRoutesProps {
    toggleTheme: () => void;
    darkMode: boolean;
}
const DashboardRoutes: React.FC<DashboardRoutesProps> = ({ }) => {
    return (
        <DashboardLayout >
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/dashboard/home" />} />
            </Routes>
        </DashboardLayout>
    );
};

export default DashboardRoutes;
