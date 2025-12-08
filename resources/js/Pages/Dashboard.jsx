import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Icon from '@mdi/react';
import { mdiChartBar, mdiClipboardText, mdiFileDocument } from '@mdi/js';

export default function Dashboard({ stats, recentAttempts, recentQuizzes }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gradient-to-br from-cute-pink-50 via-pastel-lavender-50 to-pastel-purple-50 min-h-screen relative overflow-hidden">
                <div className="absolute top-10 right-10 text-8xl opacity-20">🌸</div>
                <div className="absolute bottom-20 left-10 text-7xl opacity-20">🌺</div>
                <div className="absolute top-1/3 right-1/4 text-6xl opacity-10">🌷</div>
                <div className="absolute bottom-1/3 left-1/4 text-6xl opacity-10">🏵️</div>
                <div className="absolute top-1/2 right-1/3 text-5xl opacity-10">✿</div>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6 relative z-10">
                    <div className="bg-gradient-to-r from-cute-pink-200 via-pastel-lavender-200 to-pastel-purple-200 rounded-3xl p-8 text-white mb-6 shadow-2xl border-4 border-white relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 text-6xl opacity-30">🌸</div>
                        <div className="absolute -bottom-4 -left-4 text-6xl opacity-30">🌺</div>
                        <h1 className="text-4xl font-comfortaa font-bold mb-3 text-pastel-purple-800 relative z-10">Welcome to Quiz App! 🦄</h1>
                        <p className="text-pastel-purple-700 text-lg font-quicksand relative z-10">Test your knowledge, track your progress, and have fun!</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white overflow-hidden shadow-xl rounded-3xl p-6 border-4 border-cute-pink-200 transform hover:scale-105 transition-all relative">
                            <div className="absolute top-2 right-2 text-3xl">🌸</div>
                            <div className="text-cute-pink-400 text-sm uppercase tracking-wide font-comfortaa font-semibold">Total Quizzes Taken</div>
                            <div className="text-5xl font-comfortaa font-bold text-cute-pink-400 mt-2">{stats.total_quizzes || 0}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-xl rounded-3xl p-6 border-4 border-pastel-lavender-200 transform hover:scale-105 transition-all relative">
                            <div className="absolute top-2 right-2 text-3xl">🌺</div>
                            <div className="text-pastel-lavender-400 text-sm uppercase tracking-wide font-comfortaa font-semibold">Average Score</div>
                            <div className="text-5xl font-comfortaa font-bold text-pastel-lavender-400 mt-2">
                                {stats.average_score ? stats.average_score.toFixed(1) : '0.0'}%
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-xl rounded-3xl p-6 border-4 border-pastel-purple-200 transform hover:scale-105 transition-all relative">
                            <div className="absolute top-2 right-2 text-3xl">🌷</div>
                            <div className="text-pastel-purple-400 text-sm uppercase tracking-wide font-comfortaa font-semibold">Best Score</div>
                            <div className="text-5xl font-comfortaa font-bold text-pastel-purple-400 mt-2">
                                {stats.best_score ? stats.best_score.toFixed(1) : '0.0'}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-xl rounded-3xl border-4 border-cute-pink-100 relative">
                        <div className="absolute top-4 right-4 text-4xl opacity-30">🌸</div>
                        <div className="p-6">
                            <h3 className="text-3xl font-comfortaa font-bold text-cute-pink-400 mb-4 flex items-center">
                                <Icon path={mdiChartBar} size={1.3} className="text-cute-pink-400 mr-3" />
                                Recent Quiz Attempts
                            </h3>
                            {recentAttempts.length > 0 ? (
                                <div className="space-y-3">
                                    {recentAttempts.map(attempt => (
                                        <Link
                                            key={attempt.id}
                                            href={route('quiz-attempts.show', attempt.id)}
                                            className="block p-5 border-3 border-cute-pink-100 rounded-2xl hover:border-pastel-lavender-300 hover:shadow-xl transition-all bg-gradient-to-r from-cute-pink-50 to-pastel-lavender-50"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-medium">{attempt.quiz.title}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(attempt.completed_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-lg">{attempt.percentage}%</div>
                                                    <div className="text-sm text-gray-500">
                                                        {attempt.score}/{attempt.max_score}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No attempts yet. Start taking quizzes!</p>
                            )}
                            {recentAttempts.length > 0 && (
                                <Link
                                    href={route('quiz-attempts.my')}
                                    className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                                >
                                    View all attempts
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-xl rounded-3xl border-4 border-pastel-lavender-100 relative">
                        <div className="absolute top-4 right-4 text-4xl opacity-30">🌺</div>
                        <div className="p-6">
                            <h3 className="text-3xl font-comfortaa font-bold text-pastel-lavender-400 mb-4 flex items-center">
                                <Icon path={mdiClipboardText} size={1.3} className="text-pastel-lavender-400 mr-3" />
                                Available Quizzes
                            </h3>
                            {recentQuizzes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recentQuizzes.map(quiz => (
                                        <Link
                                            key={quiz.id}
                                            href={route('quizzes.show', quiz.id)}
                                            className="block p-7 border-4 border-cute-pink-100 rounded-3xl hover:border-pastel-lavender-300 hover:shadow-2xl transition-all bg-gradient-to-br from-cute-pink-50 via-pastel-lavender-50 to-pastel-purple-50 transform hover:scale-105 relative overflow-hidden"
                                        >
                                            <div className="absolute -bottom-2 -right-2 text-6xl opacity-10">🌸</div>
                                            <div className="font-comfortaa font-bold text-xl text-pastel-purple-600 relative z-10">{quiz.title}</div>
                                            <div className="text-sm text-pastel-lavender-600 mt-2 font-quicksand relative z-10">{quiz.description}</div>
                                            <div className="mt-4 flex items-center justify-between relative z-10">
                                                <span className="text-sm text-pastel-lavender-500 flex items-center font-semibold">
                                                    <Icon path={mdiFileDocument} size={0.8} className="mr-1" />
                                                    {quiz.questions_count} questions
                                                </span>
                                                <span className="text-sm font-comfortaa font-bold text-white bg-gradient-to-r from-cute-pink-300 to-pastel-lavender-300 px-4 py-2 rounded-full shadow-md">
                                                    Start →
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No quizzes available yet.</p>
                            )}
                            <Link
                                href={route('quizzes.index')}
                                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                            >
                                Browse all quizzes
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
