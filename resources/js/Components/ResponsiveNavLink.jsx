import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-cute-pink-400 bg-cute-pink-50 text-pastel-purple-700 focus:border-cute-pink-500 focus:bg-cute-pink-100 focus:text-pastel-purple-800'
                    : 'border-transparent text-pastel-purple-600 hover:border-cute-pink-200 hover:bg-cute-pink-50 hover:text-pastel-purple-700 focus:border-cute-pink-200 focus:bg-cute-pink-50 focus:text-pastel-purple-700'
            } text-base font-comfortaa font-semibold transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
