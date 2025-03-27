import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showSuccessToast } from '../../utils/toastNotifications';
import { logout } from '../../redux/auth/authSlice';
import {
    MenuIcon, XIcon, HomeIcon, UsersIcon, CogIcon,
    BriefcaseIcon, CubeIcon, ShoppingCartIcon
} from '@heroicons/react/solid';

const menuItems = [
    { name: 'Home', link: '/dashboard/home', icon: <HomeIcon className="w-6 h-6" /> },
    { name: 'Users', link: '/private/users', icon: <UsersIcon className="w-6 h-6" /> },
    { name: 'Negocios', link: '/private/business', icon: <BriefcaseIcon className="w-6 h-6" /> },
    { name: 'Productos', link: '/private/products', icon: <CubeIcon className="w-6 h-6" /> },
    { name: 'Orden de compra', link: '/private/purchaseorder', icon: <ShoppingCartIcon className="w-6 h-6" /> },
    { name: 'Settings', link: '/private/settings', icon: <CogIcon className="w-6 h-6" /> }
];


interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        showSuccessToast('¡Cierre de sesión exitoso!');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:relative md:translate-x-0`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-4">
                    {menuItems.map((item) => (
                        <Link key={item.name} to={item.link} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                            {item.icon}
                            <span className="ml-3">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex-1 flex flex-col">
                <header className="flex items-center justify-between bg-white shadow p-4">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden">
                        <MenuIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center  ml-auto">
                        <button onClick={handleLogout} className="text-red-500">Logout</button>
                    </div>
                </header>
                <main className="flex-1 p-4 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
