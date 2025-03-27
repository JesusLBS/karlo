import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { MailIcon, EyeIcon, EyeOffIcon, GlobeAltIcon } from '@heroicons/react/solid';

const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
});

interface LoginFormProps {
    onSubmit: (credentials: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Formik
            initialValues={{ email: 'chichohdzjesus@gmail.com', password: '12345678' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                setIsSubmitting(true);
                onSubmit(values);
            }}
        >
            {({ errors, touched, handleChange, handleBlur }) => (
                <Form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Email Address"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {touched.email && errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <Field
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={handleClickShowPassword}
                                        className="text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {touched.password && errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="flex justify-between text-sm">
                        <a href="#" className="text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                        <a href="/auth/register" className="text-indigo-600 hover:text-indigo-500">
                            Don't have an account? Sign Up
                        </a>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">or</p>
                        <button
                            type="button"
                            className="mt-2 w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50"
                        >
                            <GlobeAltIcon className="h-5 w-5 mr-2 text-gray-700" />
                            <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
