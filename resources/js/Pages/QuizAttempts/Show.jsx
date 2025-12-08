import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Show({ attempt, percentile, scoreDistribution }) {
    const chartData = Object.entries(scoreDistribution).map(([range, count]) => ({
        range,
        count,
    }));

    const passed = attempt.percentage >= 60;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Quiz Results
                </h2>
            }
        >
            <Head title="Quiz Results" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {attempt.quiz.title}
                            </h3>
                            <div className={`text-5xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-orange-600'}`}>
                                {attempt.percentage}%
                            </div>
                            <div className="text-gray-600">
                                Score: {attempt.score} / {attempt.max_score}
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-blue-900 text-center font-medium">
                                    You scored better than {percentile}% of users who took this quiz!
                                </p>
                            </div>

                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Score Distribution
                            </h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="range" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Your Answers
                        </h4>
                        <div className="space-y-4">
                            {attempt.user_answers.map((answer, index) => {
                                const question = answer.question;
                                const isCorrect = answer.is_correct;

                                return (
                                    <div
                                        key={answer.id}
                                        className={`p-4 border rounded-lg ${
                                            isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h5 className="font-medium text-gray-900">
                                                {index + 1}. {question.question_text}
                                            </h5>
                                            <span className={`text-sm font-semibold ${
                                                isCorrect ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                            </span>
                                        </div>

                                        {question.question_type === 'text_input' ? (
                                            <div className="text-sm">
                                                <div className="mb-1">
                                                    <span className="text-gray-600">Your answer: </span>
                                                    <span className="font-medium">{answer.text_answer || '(No answer)'}</span>
                                                </div>
                                                {!isCorrect && (
                                                    <div>
                                                        <span className="text-gray-600">Correct answer: </span>
                                                        <span className="font-medium text-green-700">
                                                            {question.options.find(o => o.is_correct)?.option_text}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-sm space-y-1">
                                                {question.options.map(option => {
                                                    const isSelected = answer.selected_option_id === option.id;
                                                    const isCorrectOption = option.is_correct;

                                                    return (
                                                        <div
                                                            key={option.id}
                                                            className={`p-2 rounded ${
                                                                isSelected && isCorrectOption
                                                                    ? 'bg-green-200'
                                                                    : isSelected
                                                                    ? 'bg-red-200'
                                                                    : isCorrectOption
                                                                    ? 'bg-green-100'
                                                                    : 'bg-gray-50'
                                                            }`}
                                                        >
                                                            {option.option_text}
                                                            {isSelected && ' (Your answer)'}
                                                            {isCorrectOption && !isSelected && ' (Correct answer)'}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <Link
                            href={route('quizzes.index')}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            Take Another Quiz
                        </Link>
                        <Link
                            href={route('quiz-attempts.my')}
                            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                        >
                            View All Attempts
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
