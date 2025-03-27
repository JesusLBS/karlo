import React from 'react';
import LoginForm from '../components/LoginForm';
import AuthLayout from '../../../shared/layouts/AuthLayout';
import AuthService from '../services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../utils/toastNotifications';
import { setAuth } from '../../../redux/auth/authSlice';

interface LoginPageProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const authService = new AuthService();

const LoginPage: React.FC<LoginPageProps> = ({ toggleTheme, darkMode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (_credentials: { email: string; password: string }) => {
        try {

            const response = await authService.login(_credentials);

            if (!response.ok) {
                showErrorToast('Error al iniciar sesión. Verifica tus credenciales.');
                return;
            }

            const token = response.data.token;
            localStorage.setItem('x-token', token);

            // Dispatch Redux action to update the global auth state
            dispatch(setAuth({ isAuthenticated: true, token, userId: "1" }));

            showSuccessToast('¡Inicio de sesión exitoso!');
            navigate("/dashboard/home");
        } catch (error) {
            showErrorToast('Hubo un error en el servidor. Inténtalo de nuevo.');
            console.error(error);
        }
    };

    return (
        <AuthLayout title="Sign In" toggleTheme={toggleTheme} darkMode={darkMode}>
            <LoginForm onSubmit={handleLogin} />
        </AuthLayout>
    );
};

export default LoginPage;
