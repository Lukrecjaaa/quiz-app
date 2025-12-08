import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ quiz }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {quiz.title}
                </h2>
            }
        >
            <Head title={quiz.title} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {quiz.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {quiz.description}
                            </p>
                            <div className="text-sm text-gray-500">
                                <span className="font-medium">{quiz.questions_count}</span> questions
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <Link
                                href={route('quizzes.take', quiz.id)}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Start Quiz
                            </Link>
                            <Link
                                href={route('quizzes.index')}
                                className="inline-block ml-4 text-gray-600 hover:text-gray-900"
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
