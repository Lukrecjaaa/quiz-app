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
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8 border-t-4 border-purple-500">
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-semibold text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
                                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                </span>
                                <span className="text-sm font-semibold text-gray-700 bg-green-100 px-3 py-1 rounded-full">
                                    {Math.round(progress)}% Complete
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                <div
                                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mb-8 bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                {currentQuestion.question_text}
                            </h3>

                            {currentQuestion.question_type === 'text_input' ? (
                                <input
                                    type="text"
                                    value={data.answers[currentQuestionIndex].text_answer}
                                    onChange={(e) => handleTextInput(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-xl shadow-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-4 text-lg transition-all"
                                    placeholder="Type your answer here"
                                />
                            ) : (
                                <div className="space-y-4">
                                    {currentQuestion.options.map(option => (
                                        <label
                                            key={option.id}
                                            className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-102 hover:shadow-lg ${
                                                data.answers[currentQuestionIndex].selected_option_id === option.id
                                                    ? 'border-purple-500 bg-purple-100 shadow-md scale-102'
                                                    : 'border-gray-300 bg-white hover:bg-gray-50'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestion.id}`}
                                                value={option.id}
                                                checked={data.answers[currentQuestionIndex].selected_option_id === option.id}
                                                onChange={() => handleOptionSelect(option.id)}
                                                className="mr-4 w-5 h-5"
                                            />
                                            <span className="text-lg font-medium">{option.option_text}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="px-6 py-3 text-gray-700 font-semibold hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                            >
                                ← Previous
                            </button>

                            {currentQuestionIndex < quiz.questions.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all"
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => post(route('quiz-attempts.store'))}
                                    disabled={processing}
                                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
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
