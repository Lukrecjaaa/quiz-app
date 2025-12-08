import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, attempts }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Total Quizzes</div>
                            <div className="text-3xl font-bold text-gray-900">{stats.total_quizzes}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Total Users</div>
                            <div className="text-3xl font-bold text-gray-900">{stats.total_users}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Total Attempts</div>
                            <div className="text-3xl font-bold text-gray-900">{stats.total_attempts}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Average Score</div>
                            <div className="text-3xl font-bold text-gray-900">
                                {stats.average_score ? stats.average_score.toFixed(1) : '0.0'}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Quiz Attempts</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Quiz
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Score
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {attempts.data.map(attempt => (
                                            <tr key={attempt.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {attempt.user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {attempt.quiz.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        attempt.percentage >= 80
                                                            ? 'bg-green-100 text-green-800'
                                                            : attempt.percentage >= 60
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-orange-100 text-orange-800'
                                                    }`}>
                                                        {attempt.percentage}%
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(attempt.completed_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {attempts.last_page > 1 && (
                                <div className="mt-4 flex justify-between items-center">
                                    {attempts.prev_page_url && (
                                        <Link
                                            href={attempts.prev_page_url}
                                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    <span className="text-sm text-gray-600">
                                        Page {attempts.current_page} of {attempts.last_page}
                                    </span>
                                    {attempts.next_page_url && (
                                        <Link
                                            href={attempts.next_page_url}
                                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
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
