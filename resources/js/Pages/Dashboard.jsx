import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Total Quizzes Taken</div>
                            <div className="text-3xl font-bold text-gray-900">{stats.total_quizzes || 0}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Average Score</div>
                            <div className="text-3xl font-bold text-gray-900">
                                {stats.average_score ? stats.average_score.toFixed(1) : '0.0'}%
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Best Score</div>
                            <div className="text-3xl font-bold text-gray-900">
                                {stats.best_score ? stats.best_score.toFixed(1) : '0.0'}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Quiz Attempts</h3>
                            {recentAttempts.length > 0 ? (
                                <div className="space-y-3">
                                    {recentAttempts.map(attempt => (
                                        <Link
                                            key={attempt.id}
                                            href={route('quiz-attempts.show', attempt.id)}
                                            className="block p-4 border rounded hover:bg-gray-50"
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
                            <Link
                                href={route('quiz-attempts.my')}
                                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                            >
                                View all attempts
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Available Quizzes</h3>
                            {recentQuizzes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recentQuizzes.map(quiz => (
                                        <Link
                                            key={quiz.id}
                                            href={route('quizzes.show', quiz.id)}
                                            className="block p-4 border rounded hover:bg-gray-50"
                                        >
                                            <div className="font-medium">{quiz.title}</div>
                                            <div className="text-sm text-gray-500 mt-1">{quiz.description}</div>
                                            <div className="text-sm text-gray-400 mt-2">
                                                {quiz.questions_count} questions
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
