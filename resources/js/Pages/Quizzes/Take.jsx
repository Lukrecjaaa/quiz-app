import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Take({ quiz }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // Initialize answer state for all questions upfront
    const { data, setData, post, processing } = useForm({
        quiz_id: quiz.id,
        answers: quiz.questions.map(q => ({
            question_id: q.id,
            selected_option_id: null,
            text_answer: '',
        })),
    });

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    const handleOptionSelect = (optionId) => {
        const updatedAnswers = [...data.answers];
        updatedAnswers[currentQuestionIndex].selected_option_id = optionId;
        setData('answers', updatedAnswers);
    };

    const handleTextInput = (text) => {
        const updatedAnswers = [...data.answers];
        updatedAnswers[currentQuestionIndex].text_answer = text;
        setData('answers', updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {quiz.title}
                </h2>
            }
        >
            <Head title={`Taking ${quiz.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">
                                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                </span>
                                <span className="text-sm text-gray-600">
                                    {Math.round(progress)}% Complete
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {currentQuestion.question_text}
                            </h3>

                            {currentQuestion.question_type === 'text_input' ? (
                                <input
                                    type="text"
                                    value={data.answers[currentQuestionIndex].text_answer}
                                    onChange={(e) => handleTextInput(e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Type your answer here"
                                />
                            ) : (
                                <div className="space-y-3">
                                    {currentQuestion.options.map(option => (
                                        <label
                                            key={option.id}
                                            className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                                                data.answers[currentQuestionIndex].selected_option_id === option.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestion.id}`}
                                                value={option.id}
                                                checked={data.answers[currentQuestionIndex].selected_option_id === option.id}
                                                onChange={() => handleOptionSelect(option.id)}
                                                className="mr-3"
                                            />
                                            <span>{option.option_text}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ← Previous
                            </button>

                            {currentQuestionIndex < quiz.questions.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => post(route('quiz-attempts.store'))}
                                    disabled={processing}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
                                >
                                    Submit Quiz
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
