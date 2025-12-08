import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
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
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>Edit Quiz</span>
                    <span className="text-3xl">🌺</span>
                </h2>
            }
        >
            <Head title="Edit Quiz" />

            <div className="relative py-12">
                <div className="absolute left-6 top-10 text-7xl opacity-10">🌸</div>
                <div className="absolute right-8 bottom-12 text-6xl opacity-10">✨</div>
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    <div className="girly-card overflow-hidden rounded-3xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel value="Quiz Title" className="mb-2" />
                                <TextInput
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full"
                                    required
                                />
                                <InputError message={errors.title} className="mt-2 text-rose-500" />
                            </div>

                            <div>
                                <InputLabel value="Description" className="mb-2" />
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="4"
                                    className="w-full rounded-2xl border-2 border-cute-pink-100 bg-white/80 p-4 font-quicksand text-pastel-purple-700 shadow-md placeholder:text-pastel-lavender-400 focus:border-pastel-purple-300 focus:ring-4 focus:ring-cute-pink-100 transition-all"
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-inner">
                                <Checkbox
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                />
                                <span className="text-sm font-quicksand text-pastel-purple-700">
                                    Published
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <Link
                                    href={route('admin.quizzes.index')}
                                    className="inline-flex items-center rounded-full border-2 border-pastel-lavender-200 bg-white/80 px-5 py-2 font-comfortaa font-semibold text-pastel-purple-600 shadow-md transition hover:scale-105 hover:bg-pastel-lavender-50"
                                >
                                    Back to List
                                </Link>
                                <PrimaryButton type="submit" disabled={processing} className="px-8 shadow-xl">
                                    Update Quiz
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="girly-card overflow-hidden rounded-3xl p-8 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-comfortaa font-bold text-pastel-purple-700">Questions</h3>
                            <Link
                                href={route('admin.quizzes.questions.create', quiz.id)}
                                className="inline-flex items-center rounded-full border-2 border-cute-pink-200 bg-gradient-to-r from-cute-pink-400 via-cute-pink-500 to-pastel-purple-400 px-5 py-2 font-comfortaa font-bold text-white shadow-lg transition hover:scale-105"
                            >
                                Add Question
                            </Link>
                        </div>

                        {quiz.questions.length > 0 ? (
                            <div className="space-y-3">
                                {quiz.questions.map((question, index) => (
                                    <div key={question.id} className="rounded-2xl border border-cute-pink-100 bg-white/80 p-4 shadow-inner">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="mb-2 font-semibold text-pastel-purple-700">
                                                    {index + 1}. {question.question_text}
                                                </div>
                                                <div className="mb-2 text-sm font-quicksand text-pastel-lavender-700">
                                                    Type: {question.question_type.replace('_', ' ')}
                                                </div>
                                                <div className="space-y-1 text-sm font-quicksand text-pastel-purple-700">
                                                    {question.options.map(option => (
                                                        <div key={option.id} className={option.is_correct ? 'font-semibold text-cute-pink-500' : ''}>
                                                            {option.is_correct ? '✓ ' : '- '}
                                                            {option.option_text}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="ml-4 flex space-x-2">
                                                <Link
                                                    href={route('admin.quizzes.questions.edit', [quiz.id, question.id])}
                                                    className="inline-flex items-center rounded-full border-2 border-cute-pink-200 px-3 py-1 font-comfortaa font-semibold text-cute-pink-500 transition hover:scale-105 hover:bg-cute-pink-50"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteQuestion(question.id)}
                                                    className="inline-flex items-center rounded-full border-2 border-rose-200 px-3 py-1 font-comfortaa font-semibold text-rose-500 transition hover:scale-105 hover:bg-rose-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-pastel-lavender-700">No questions yet. Add some questions to get started!</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
