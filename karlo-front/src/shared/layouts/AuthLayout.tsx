import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  toggleTheme: () => void;
  darkMode: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, toggleTheme, darkMode }) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
      </button>

      <div className="w-full max-w-lg bg-white dark:bg-gray-100 p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-900 mb-6">{title}</h1>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
