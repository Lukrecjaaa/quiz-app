import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';

export default function Edit({ quiz }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: quiz.title,
        description: quiz.description || '',
        is_published: quiz.is_published,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.quizzes.update', quiz.id));
    };

    const handleDeleteQuestion = (questionId) => {
        if (confirm('Are you sure you want to delete this question?')) {
            router.delete(route('admin.quizzes.questions.destroy', [quiz.id, questionId]));
        }
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Quiz
                </h2>
            }
        >
            <Head title="Edit Quiz" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quiz Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.title && (
                                    <div className="text-red-600 text-sm mt-1">{errors.title}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="4"
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        Published
                                    </span>
                                </label>
                            </div>

                            <div className="flex justify-between">
                                <Link
                                    href={route('admin.quizzes.index')}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                                >
                                    Back to List
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                                >
                                    Update Quiz
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Questions</h3>
                            <Link
                                href={route('admin.quizzes.questions.create', quiz.id)}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                            >
                                Add Question
                            </Link>
                        </div>

                        {quiz.questions.length > 0 ? (
                            <div className="space-y-3">
                                {quiz.questions.map((question, index) => (
                                    <div key={question.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 mb-2">
                                                    {index + 1}. {question.question_text}
                                                </div>
                                                <div className="text-sm text-gray-500 mb-2">
                                                    Type: {question.question_type.replace('_', ' ')}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {question.options.map(option => (
                                                        <div key={option.id} className={option.is_correct ? 'font-semibold' : ''}>
                                                            {option.is_correct ? '✓ ' : '- '}
                                                            {option.option_text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 ml-4">
                                                <Link
                                                    href={route('admin.quizzes.questions.edit', [quiz.id, question.id])}
                                                    className="text-blue-600 hover:text-blue-900 text-sm"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteQuestion(question.id)}
                                                    className="text-red-600 hover:text-red-900 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No questions yet. Add some questions to get started!</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
