import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ quizzes }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Available Quizzes
                </h2>
            }
        >
            <Head title="Quizzes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {quizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quizzes.map(quiz => (
                                <Link
                                    key={quiz.id}
                                    href={route('quizzes.show', quiz.id)}
                                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {quiz.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {quiz.description}
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>{quiz.questions_count} questions</span>
                                        <span className="text-blue-600 hover:text-blue-800">
                                            View Quiz →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <p className="text-gray-500">No quizzes available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
