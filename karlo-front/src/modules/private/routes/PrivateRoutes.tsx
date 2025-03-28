import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import UserPage from '../user/pages/UserPage';

interface PrivateRoutesProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({   }) => {
    return (
        <DashboardLayout >
            <Routes>
                <Route path="users" element={<UserPage />} />
                <Route path="*" element={<Navigate to="/private/users" />} />
            </Routes>
        </DashboardLayout>
    );
};

export default PrivateRoutes;
