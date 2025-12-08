import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function MyAttempts({ attempts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>My Quiz Attempts</span>
                    <span className="text-3xl">🌸</span>
                </h2>
            }
        >
            <Head title="My Attempts" />

            <div className="relative py-12">
                <div className="absolute left-10 top-12 text-7xl opacity-10">🌺</div>
                <div className="absolute right-10 bottom-10 text-6xl opacity-20">✨</div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="girly-card overflow-hidden rounded-3xl shadow-2xl">
                        {attempts.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-cute-pink-100">
                                    <thead className="bg-gradient-to-r from-cute-pink-50 via-white to-pastel-lavender-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wider text-pastel-purple-600">
                                                Quiz
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wider text-pastel-purple-600">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wider text-pastel-purple-600">
                                                Score
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wider text-pastel-purple-600">
                                                Percentage
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wider text-pastel-purple-600">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-cute-pink-50 bg-white/80">
                                        {attempts.map(attempt => (
                                            <tr key={attempt.id} className="transition-all hover:bg-cute-pink-50/70">
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm font-semibold text-pastel-purple-700">
                                                        {attempt.quiz.title}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm font-quicksand text-pastel-lavender-700">
                                                        {new Date(attempt.completed_at).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm font-semibold text-pastel-purple-700">
                                                        {attempt.score} / {attempt.max_score}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                                        attempt.percentage >= 80
                                                            ? 'bg-cute-pink-100 text-cute-pink-600'
                                                            : attempt.percentage >= 60
                                                            ? 'bg-pastel-lavender-100 text-pastel-purple-600'
                                                            : 'bg-rose-100 text-rose-500'
                                                    }`}>
                                                        {attempt.percentage}%
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <Link
                                                        href={route('quiz-attempts.show', attempt.id)}
                                                        className="inline-flex items-center rounded-full border-2 border-cute-pink-200 px-4 py-1 font-comfortaa font-semibold text-cute-pink-500 transition duration-200 hover:scale-105 hover:bg-cute-pink-50"
                                                    >
                                                        View Results
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p className="mb-4 font-quicksand text-pastel-lavender-600">
                                    You haven't taken any quizzes yet.
                                </p>
                                <Link
                                    href={route('quizzes.index')}
                                    className="inline-flex items-center rounded-full bg-gradient-to-r from-cute-pink-300 to-pastel-lavender-300 px-5 py-2 font-comfortaa font-bold text-white shadow-lg transition hover:scale-105"
                                >
                                    Browse Quizzes →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
