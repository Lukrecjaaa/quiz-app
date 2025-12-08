import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Edit({ quiz, question }) {
    const [questionType, setQuestionType] = useState(question.question_type);
    const { data, setData, patch, processing, errors } = useForm({
        question_text: question.question_text,
        question_type: question.question_type,
        options: question.options.map(opt => ({
            text: opt.option_text,
            is_correct: opt.is_correct,
        })),
    });

    const handleAddOption = () => {
        setData('options', [...data.options, { text: '', is_correct: false }]);
    };

    const handleRemoveOption = (index) => {
        const newOptions = data.options.filter((_, i) => i !== index);
        setData('options', newOptions);
    };

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
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.quizzes.questions.update', [quiz.id, question.id]));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Question
                </h2>
            }
        >
            <Head title="Edit Question" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Question Text
                                </label>
                                <textarea
                                    value={data.question_text}
                                    onChange={(e) => setData('question_text', e.target.value)}
                                    rows="3"
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                ></textarea>
                                {errors.question_text && (
                                    <div className="text-red-600 text-sm mt-1">{errors.question_text}</div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Question Type
                                </label>
                                <select
                                    value={questionType}
                                    onChange={(e) => handleTypeChange(e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="multiple_choice">Multiple Choice</option>
                                    <option value="true_false">True/False</option>
                                    <option value="text_input">Text Input</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {questionType === 'text_input' ? 'Correct Answer' : 'Options'}
                                </label>
                                <div className="space-y-3">
                                    {data.options.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                                placeholder={questionType === 'text_input' ? 'Correct answer' : `Option ${index + 1}`}
                                                className="flex-1 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                required
                                                readOnly={questionType === 'true_false'}
                                            />
                                            {questionType !== 'text_input' && (
                                                <label className="flex items-center">
                                                    <input
                                                        type={questionType === 'true_false' ? 'radio' : 'checkbox'}
                                                        checked={option.is_correct}
                                                        onChange={(e) => handleOptionChange(index, 'is_correct', e.target.checked)}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-sm text-gray-600">Correct</span>
                                                </label>
                                            )}
                                            {questionType === 'multiple_choice' && data.options.length > 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveOption(index)}
                                                    className="text-red-600 hover:text-red-900"
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
                                        className="mt-3 text-blue-600 hover:text-blue-900 text-sm"
                                    >
                                        + Add Option
                                    </button>
                                )}
                            </div>

                            <div className="flex justify-between">
                                <Link
                                    href={route('admin.quizzes.edit', quiz.id)}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                                >
                                    Update Question
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
