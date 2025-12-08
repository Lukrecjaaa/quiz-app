import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, attempts }) {
    return (
        <AdminLayout
            header={
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>Admin Dashboard</span>
                    <span className="text-3xl">🌸</span>
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="relative py-12">
                <div className="absolute left-10 top-10 text-7xl opacity-10">🌺</div>
                <div className="absolute right-12 bottom-12 text-7xl opacity-10">💫</div>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        <div className="girly-card rounded-3xl p-6 shadow-xl">
                            <div className="text-sm font-comfortaa font-semibold text-pastel-purple-600">Total Quizzes</div>
                            <div className="mt-2 text-3xl font-extrabold text-cute-pink-500">{stats.total_quizzes}</div>
                        </div>
                        <div className="girly-card rounded-3xl p-6 shadow-xl">
                            <div className="text-sm font-comfortaa font-semibold text-pastel-purple-600">Total Users</div>
                            <div className="mt-2 text-3xl font-extrabold text-pastel-purple-600">{stats.total_users}</div>
                        </div>
                        <div className="girly-card rounded-3xl p-6 shadow-xl">
                            <div className="text-sm font-comfortaa font-semibold text-pastel-purple-600">Total Attempts</div>
                            <div className="mt-2 text-3xl font-extrabold text-pastel-purple-600">{stats.total_attempts}</div>
                        </div>
                        <div className="girly-card rounded-3xl p-6 shadow-xl">
                            <div className="text-sm font-comfortaa font-semibold text-pastel-purple-600">Average Score</div>
                            <div className="mt-2 text-3xl font-extrabold text-cute-pink-500">
                                {stats.average_score ? stats.average_score.toFixed(1) : '0.0'}%
                            </div>
                        </div>
                    </div>

                    <div className="girly-card overflow-hidden rounded-3xl shadow-2xl">
                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-comfortaa font-bold text-pastel-purple-700">Recent Quiz Attempts</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-cute-pink-100">
                                    <thead className="bg-gradient-to-r from-cute-pink-50 via-white to-pastel-lavender-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                                User
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                                Quiz
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                                Score
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-cute-pink-50 bg-white/90">
                                        {attempts.data.map(attempt => (
                                            <tr key={attempt.id} className="transition hover:bg-cute-pink-50/70">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-pastel-purple-700">
                                                    {attempt.user.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-pastel-purple-700">
                                                    {attempt.quiz.title}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
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
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-quicksand text-pastel-lavender-700">
                                                    {new Date(attempt.completed_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {attempts.last_page > 1 && (
                                <div className="mt-4 flex items-center justify-between">
                                    {attempts.prev_page_url && (
                                        <Link
                                            href={attempts.prev_page_url}
                                            className="rounded-full bg-white/80 px-4 py-2 font-comfortaa font-semibold text-pastel-purple-600 transition hover:scale-105 hover:bg-cute-pink-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    <span className="text-sm font-quicksand text-pastel-lavender-700">
                                        Page {attempts.current_page} of {attempts.last_page}
                                    </span>
                                    {attempts.next_page_url && (
                                        <Link
                                            href={attempts.next_page_url}
                                            className="rounded-full bg-white/80 px-4 py-2 font-comfortaa font-semibold text-pastel-purple-600 transition hover:scale-105 hover:bg-cute-pink-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
