import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ quiz }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>{quiz.title}</span>
                    <span className="text-3xl">🌸</span>
                </h2>
            }
        >
            <Head title={quiz.title} />

            <div className="relative py-12">
                <div className="absolute left-6 top-16 text-7xl opacity-10">🌺</div>
                <div className="absolute right-10 bottom-16 text-6xl opacity-20">🌼</div>
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="girly-card relative overflow-hidden rounded-3xl p-8 shadow-2xl polka-dots">
                        <div className="absolute -right-8 -top-8 text-8xl opacity-20">🌷</div>
                        <div className="absolute -left-10 -bottom-10 text-8xl opacity-10">✨</div>
                        <div className="relative mb-6">
                            <h3 className="mb-3 text-3xl font-comfortaa font-bold text-pastel-purple-700">
                                {quiz.title}
                            </h3>
                            <p className="mb-4 font-quicksand text-pastel-lavender-700">
                                {quiz.description}
                            </p>
                            <div className="text-sm font-semibold text-pastel-purple-500">
                                <span className="font-bold text-cute-pink-500">{quiz.questions_count}</span> questions
                            </div>
                        </div>

                        <div className="relative border-t-2 border-cute-pink-100 pt-6">
                            <Link
                                href={route('quizzes.take', quiz.id)}
                                className="inline-flex items-center rounded-full border-2 border-cute-pink-200 bg-gradient-to-r from-cute-pink-400 via-cute-pink-500 to-pastel-purple-400 px-6 py-3 font-comfortaa text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-cute-pink-500 hover:via-cute-pink-600 hover:to-pastel-purple-500 focus:outline-none focus:ring-4 focus:ring-cute-pink-200"
                            >
                                Start Quiz
                            </Link>
                            <Link
                                href={route('quizzes.index')}
                                className="ml-4 inline-flex items-center rounded-full border-2 border-pastel-lavender-200 px-5 py-2 font-comfortaa text-sm font-semibold text-pastel-purple-600 transition-all duration-200 hover:scale-105 hover:bg-pastel-lavender-50"
                            >
                                ← Back to Quizzes
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
