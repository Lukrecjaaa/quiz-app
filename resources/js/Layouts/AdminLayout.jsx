import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cute-pink-50 via-pastel-lavender-50 to-pastel-purple-50">
            <nav className="border-b-4 border-pastel-lavender-200 bg-gradient-to-r from-cute-pink-200 via-pastel-lavender-200 to-pastel-purple-200 shadow-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('admin.dashboard')} className="text-xl font-comfortaa font-extrabold text-pastel-purple-700 drop-shadow">
                                    Quiz Admin
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <Link
                                    href={route('admin.dashboard')}
                                    className="inline-flex items-center border-b-4 border-transparent px-2 pt-2 text-sm font-comfortaa font-semibold leading-5 text-pastel-purple-600 transition duration-150 ease-in-out hover:border-cute-pink-200 hover:text-pastel-purple-800 focus:border-cute-pink-300 focus:text-pastel-purple-800 focus:outline-none"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('admin.quizzes.index')}
                                    className="inline-flex items-center border-b-4 border-transparent px-2 pt-2 text-sm font-comfortaa font-semibold leading-5 text-pastel-purple-600 transition duration-150 ease-in-out hover:border-cute-pink-200 hover:text-pastel-purple-800 focus:border-cute-pink-300 focus:text-pastel-purple-800 focus:outline-none"
                                >
                                    Manage Quizzes
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center border-b-4 border-transparent px-2 pt-2 text-sm font-comfortaa font-semibold leading-5 text-pastel-purple-600 transition duration-150 ease-in-out hover:border-cute-pink-200 hover:text-pastel-purple-800 focus:border-cute-pink-300 focus:text-pastel-purple-800 focus:outline-none"
                                >
                                    Back to Site
                                </Link>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-pastel-purple-500 transition duration-150 ease-in-out hover:bg-cute-pink-50 hover:text-pastel-purple-700 focus:bg-cute-pink-50 focus:text-pastel-purple-700 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <Link
                            href={route('admin.dashboard')}
                            className="block border-l-4 border-transparent py-2 pe-4 ps-3 text-base font-comfortaa font-semibold text-pastel-purple-600 transition duration-150 ease-in-out hover:border-cute-pink-200 hover:bg-cute-pink-50 hover:text-pastel-purple-800 focus:border-cute-pink-200 focus:bg-cute-pink-50 focus:text-pastel-purple-800 focus:outline-none"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route('admin.quizzes.index')}
                            className="block border-l-4 border-transparent py-2 pe-4 ps-3 text-base font-comfortaa font-semibold text-pastel-purple-600 transition duration-150 ease-in-out hover:border-cute-pink-200 hover:bg-cute-pink-50 hover:text-pastel-purple-800 focus:border-cute-pink-200 focus:bg-cute-pink-50 focus:text-pastel-purple-800 focus:outline-none"
                        >
                            Manage Quizzes
                        </Link>
                        <Link
                            href={route('dashboard')}
                            className="block border-l-4 border-transparent py-2 pe-4 ps-3 text-base font-comfortaa font-semibold text-pastel-purple-600 transition duration-150 ease-in-out hover:border-cute-pink-200 hover:bg-cute-pink-50 hover:text-pastel-purple-800 focus:border-cute-pink-200 focus:bg-cute-pink-50 focus:text-pastel-purple-800 focus:outline-none"
                        >
                            Back to Site
                        </Link>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white/80 polka-dots border-b-4 border-cute-pink-100 shadow-lg backdrop-blur">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-10">{children}</main>
        </div>
    );
}
