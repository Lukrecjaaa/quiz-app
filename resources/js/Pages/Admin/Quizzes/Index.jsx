import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ quizzes }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this quiz?')) {
            router.delete(route('admin.quizzes.destroy', id));
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                        <span>Manage Quizzes</span>
                        <span className="text-3xl">🌷</span>
                    </h2>
                    <Link
                        href={route('admin.quizzes.create')}
                        className="inline-flex items-center rounded-full border-2 border-cute-pink-200 bg-gradient-to-r from-cute-pink-400 via-cute-pink-500 to-pastel-purple-400 px-5 py-2 font-comfortaa font-bold text-white shadow-lg transition hover:scale-105"
                    >
                        Create New Quiz
                    </Link>
                </div>
            }
        >
            <Head title="Manage Quizzes" />

            <div className="py-12 relative">
                <div className="absolute left-10 top-12 text-7xl opacity-10">🌸</div>
                <div className="absolute right-10 bottom-12 text-6xl opacity-10">💖</div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="girly-card overflow-hidden rounded-3xl shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-cute-pink-100">
                                <thead className="bg-gradient-to-r from-cute-pink-50 via-white to-pastel-lavender-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                            Title
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                            Questions
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                            Published
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                            Creator
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-comfortaa font-semibold uppercase tracking-wide text-pastel-purple-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-cute-pink-50 bg-white/90">
                                    {quizzes.map(quiz => (
                                        <tr key={quiz.id} className="transition hover:bg-cute-pink-50/70">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm font-semibold text-pastel-purple-700">
                                                    {quiz.title}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-pastel-purple-700">
                                                {quiz.questions_count}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                                    quiz.is_published
                                                        ? 'bg-cute-pink-100 text-cute-pink-600'
                                                        : 'bg-pastel-lavender-100 text-pastel-purple-600'
                                                }`}>
                                                    {quiz.is_published ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-quicksand text-pastel-lavender-700">
                                                {quiz.creator.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm space-x-2">
                                                <Link
                                                    href={route('admin.quizzes.edit', quiz.id)}
                                                    className="inline-flex items-center rounded-full border-2 border-cute-pink-200 px-3 py-1 font-comfortaa font-semibold text-cute-pink-500 transition hover:scale-105 hover:bg-cute-pink-50"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(quiz.id)}
                                                    className="inline-flex items-center rounded-full border-2 border-rose-200 px-3 py-1 font-comfortaa font-semibold text-rose-500 transition hover:scale-105 hover:bg-rose-50"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
