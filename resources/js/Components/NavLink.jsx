import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-4 px-2 pt-2 text-sm font-comfortaa font-semibold leading-5 transition-all duration-200 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-cute-pink-400 text-pastel-purple-800 focus:border-cute-pink-500 '
                    : 'border-transparent text-pastel-purple-500 hover:border-cute-pink-200 hover:text-pastel-purple-700 focus:border-cute-pink-300 focus:text-pastel-purple-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
