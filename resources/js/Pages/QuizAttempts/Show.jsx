import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Show({ attempt, percentile, scoreDistribution }) {
    const chartData = Object.entries(scoreDistribution).map(([range, count]) => ({
        range,
        count,
    }));

    const passed = attempt.percentage >= 60;

    useEffect(() => {
        if (attempt.percentage >= 80) {
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);

            return () => clearInterval(interval);
        }
    }, [attempt.percentage]);

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
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-8 border-t-4 border-blue-500">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                {attempt.quiz.title}
                            </h3>
                            <div className={`text-7xl font-bold mb-6 animate-pulse ${passed ? 'text-green-600' : 'text-orange-600'}`}>
                                {attempt.percentage}%
                            </div>
                            <div className="text-xl text-gray-700 mb-2">
                                Score: <span className="font-bold">{attempt.score}</span> / {attempt.max_score}
                            </div>
                            {attempt.percentage >= 90 && (
                                <div className="text-2xl font-bold text-purple-600 animate-bounce mt-4">
                                    OUTSTANDING!
                                </div>
                            )}
                            {attempt.percentage >= 80 && attempt.percentage < 90 && (
                                <div className="text-xl font-semibold text-green-600 mt-4">
                                    Excellent Work!
                                </div>
                            )}
                            {attempt.percentage >= 60 && attempt.percentage < 80 && (
                                <div className="text-lg font-medium text-blue-600 mt-4">
                                    Good Job!
                                </div>
                            )}
                            {attempt.percentage < 60 && (
                                <div className="text-lg font-medium text-orange-600 mt-4">
                                    Keep Practicing!
                                </div>
                            )}
                        </div>

                        <div className="border-t pt-6">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6 mb-6 shadow-md">
                                <p className="text-blue-900 text-center font-bold text-xl">
                                    You scored better than <span className="text-3xl text-purple-600">{percentile}%</span> of users!
                                </p>
                                <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${percentile}%` }}
                                    ></div>
                                </div>
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
