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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white mb-6">
                        <h1 className="text-3xl font-bold mb-2">Welcome to Quiz App!</h1>
                        <p className="text-blue-100">Test your knowledge, track your progress, and compete with others</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6 border-l-4 border-blue-500">
                            <div className="text-gray-500 text-sm uppercase tracking-wide">Total Quizzes Taken</div>
                            <div className="text-4xl font-bold text-blue-600 mt-2">{stats.total_quizzes || 0}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6 border-l-4 border-green-500">
                            <div className="text-gray-500 text-sm uppercase tracking-wide">Average Score</div>
                            <div className="text-4xl font-bold text-green-600 mt-2">
                                {stats.average_score ? stats.average_score.toFixed(1) : '0.0'}%
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6 border-l-4 border-yellow-500">
                            <div className="text-gray-500 text-sm uppercase tracking-wide">Best Score</div>
                            <div className="text-4xl font-bold text-yellow-600 mt-2">
                                {stats.best_score ? stats.best_score.toFixed(1) : '0.0'}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <Icon path={mdiChartBar} size={1.2} className="text-blue-500 mr-2" />
                                Recent Quiz Attempts
                            </h3>
                            {recentAttempts.length > 0 ? (
                                <div className="space-y-3">
                                    {recentAttempts.map(attempt => (
                                        <Link
                                            key={attempt.id}
                                            href={route('quiz-attempts.show', attempt.id)}
                                            className="block p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
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

                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <Icon path={mdiClipboardText} size={1.2} className="text-green-500 mr-2" />
                                Available Quizzes
                            </h3>
                            {recentQuizzes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recentQuizzes.map(quiz => (
                                        <Link
                                            key={quiz.id}
                                            href={route('quizzes.show', quiz.id)}
                                            className="block p-6 border-2 border-gray-200 rounded-lg hover:border-green-400 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50"
                                        >
                                            <div className="font-bold text-lg text-gray-900">{quiz.title}</div>
                                            <div className="text-sm text-gray-600 mt-2">{quiz.description}</div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-sm text-gray-500 flex items-center">
                                                    <Icon path={mdiFileDocument} size={0.7} className="mr-1" />
                                                    {quiz.questions_count} questions
                                                </span>
                                                <span className="text-sm font-semibold text-green-600">
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
