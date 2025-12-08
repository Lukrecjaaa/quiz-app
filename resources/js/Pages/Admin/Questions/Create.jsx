import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ quiz }) {
    const [questionType, setQuestionType] = useState('multiple_choice');
    const { data, setData, post, processing, errors } = useForm({
        question_text: '',
        question_type: 'multiple_choice',
        options: [
            { text: '', is_correct: false },
            { text: '', is_correct: false },
        ],
    });

    const handleAddOption = () => {
        setData('options', [...data.options, { text: '', is_correct: false }]);
    };

    const handleRemoveOption = (index) => {
        const newOptions = data.options.filter((_, i) => i !== index);
        setData('options', newOptions);
    };

    // Ensure only one correct answer for single-choice questions
    const handleOptionChange = (index, field, value) => {
        const newOptions = [...data.options];
        newOptions[index][field] = value;
        if (field === 'is_correct' && value && (questionType === 'multiple_choice' || questionType === 'text_input')) {
            newOptions.forEach((opt, i) => {
                if (i !== index) opt.is_correct = false;
            });
        }
        setData('options', newOptions);
    };

    const handleTypeChange = (type) => {
        setQuestionType(type);
        setData('question_type', type);

        if (type === 'true_false') {
            setData('options', [
                { text: 'True', is_correct: false },
                { text: 'False', is_correct: false },
            ]);
        } else if (type === 'text_input') {
            setData('options', [{ text: '', is_correct: true }]);
        } else {
            setData('options', [
                { text: '', is_correct: false },
                { text: '', is_correct: false },
            ]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.quizzes.questions.store', quiz.id));
    };

    return (
        <AdminLayout
            header={
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>Add Question to {quiz.title}</span>
                    <span className="text-3xl">🌸</span>
                </h2>
            }
        >
            <Head title="Add Question" />

            <div className="relative py-12">
                <div className="absolute left-6 top-10 text-7xl opacity-10">🌺</div>
                <div className="absolute right-8 bottom-12 text-6xl opacity-10">✨</div>
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="girly-card overflow-hidden rounded-3xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel value="Question Text" className="mb-2" />
                                <textarea
                                    value={data.question_text}
                                    onChange={(e) => setData('question_text', e.target.value)}
                                    rows="3"
                                    className="w-full rounded-2xl border-2 border-cute-pink-100 bg-white/80 p-4 font-quicksand text-pastel-purple-700 shadow-md placeholder:text-pastel-lavender-400 focus:border-pastel-purple-300 focus:ring-4 focus:ring-cute-pink-100 transition-all"
                                    required
                                ></textarea>
                                <InputError message={errors.question_text} className="mt-2 text-rose-500" />
                            </div>

                            <div>
                                <InputLabel value="Question Type" className="mb-2" />
                                <select
                                    value={questionType}
                                    onChange={(e) => handleTypeChange(e.target.value)}
                                    className="w-full rounded-2xl border-2 border-cute-pink-100 bg-white/80 p-3 font-quicksand text-pastel-purple-700 shadow-md focus:border-pastel-purple-300 focus:ring-4 focus:ring-cute-pink-100 transition-all"
                                >
                                    <option value="multiple_choice">Multiple Choice</option>
                                    <option value="true_false">True/False</option>
                                    <option value="text_input">Text Input</option>
                                </select>
                            </div>

                            <div>
                                <InputLabel value={questionType === 'text_input' ? 'Correct Answer' : 'Options'} className="mb-2" />
                                <div className="space-y-3">
                                    {data.options.map((option, index) => (
                                        <div key={index} className="flex flex-col gap-3 rounded-2xl border border-cute-pink-100 bg-white/70 p-4 shadow-inner sm:flex-row sm:items-center">
                                            <TextInput
                                                type="text"
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                                placeholder={questionType === 'text_input' ? 'Correct answer' : `Option ${index + 1}`}
                                                className="w-full flex-1"
                                                required
                                                readOnly={questionType === 'true_false'}
                                            />
                                            {questionType !== 'text_input' && (
                                                <label className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-comfortaa text-pastel-purple-700 shadow-sm">
                                                    <input
                                                        type={questionType === 'true_false' ? 'radio' : 'checkbox'}
                                                        checked={option.is_correct}
                                                        onChange={(e) => handleOptionChange(index, 'is_correct', e.target.checked)}
                                                        className="h-4 w-4 accent-cute-pink-400"
                                                    />
                                                    Correct
                                                </label>
                                            )}
                                            {questionType === 'multiple_choice' && data.options.length > 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveOption(index)}
                                                    className="inline-flex items-center rounded-full border-2 border-rose-200 px-3 py-1 font-comfortaa text-sm font-semibold text-rose-500 transition hover:scale-105 hover:bg-rose-50"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {questionType === 'multiple_choice' && (
                                    <button
                                        type="button"
                                        onClick={handleAddOption}
                                        className="mt-3 inline-flex items-center rounded-full border-2 border-cute-pink-200 px-4 py-1 text-sm font-comfortaa font-semibold text-cute-pink-500 transition hover:scale-105 hover:bg-cute-pink-50"
                                    >
                                        + Add Option
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <Link
                                    href={route('admin.quizzes.edit', quiz.id)}
                                    className="inline-flex items-center rounded-full border-2 border-pastel-lavender-200 bg-white/80 px-5 py-2 font-comfortaa font-semibold text-pastel-purple-600 shadow-md transition hover:scale-105 hover:bg-pastel-lavender-50"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton type="submit" disabled={processing} className="px-8 shadow-xl">
                                    Add Question
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
