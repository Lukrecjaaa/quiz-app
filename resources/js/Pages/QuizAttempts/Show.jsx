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
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>Quiz Results</span>
                    <span className="text-3xl">✨</span>
                </h2>
            }
        >
            <Head title="Quiz Results" />

            <div className="relative py-12">
                <div className="absolute left-10 top-12 text-8xl opacity-10">🌸</div>
                <div className="absolute right-8 bottom-12 text-7xl opacity-10">🌺</div>
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    <div className="girly-card overflow-hidden rounded-3xl border-4 border-cute-pink-100 p-8 shadow-2xl polka-dots">
                        <div className="text-center mb-8 relative">
                            <div className="absolute left-4 top-4 text-4xl opacity-30">💖</div>
                            <h3 className="mb-4 text-3xl font-comfortaa font-bold text-pastel-purple-700">
                                {attempt.quiz.title}
                            </h3>
                            <div className={`mb-6 text-7xl font-extrabold animate-pulse ${passed ? 'text-cute-pink-500' : 'text-rose-400'}`}>
                                {attempt.percentage}%
                            </div>
                            <div className="mb-2 text-xl font-quicksand text-pastel-purple-700">
                                Score: <span className="font-bold text-cute-pink-500">{attempt.score}</span> / {attempt.max_score}
                            </div>
                            {attempt.percentage >= 90 && (
                                <div className="mt-4 text-2xl font-bold text-pastel-purple-500 animate-bounce">
                                    OUTSTANDING!
                                </div>
                            )}
                            {attempt.percentage >= 80 && attempt.percentage < 90 && (
                                <div className="mt-4 text-xl font-semibold text-cute-pink-500">
                                    Excellent Work!
                                </div>
                            )}
                            {attempt.percentage >= 60 && attempt.percentage < 80 && (
                                <div className="mt-4 text-lg font-medium text-pastel-purple-600">
                                    Good Job!
                                </div>
                            )}
                            {attempt.percentage < 60 && (
                                <div className="mt-4 text-lg font-medium text-rose-500">
                                    Keep Practicing!
                                </div>
                            )}
                        </div>

                        <div className="border-t-2 border-cute-pink-100 pt-6">
                            {scoreDistribution && Object.values(scoreDistribution).reduce((sum, count) => sum + count, 0) > 1 && (
                                <div className="mb-6 rounded-2xl border-2 border-cute-pink-200 bg-gradient-to-r from-cute-pink-50 via-white to-pastel-lavender-50 p-6 shadow-md">
                                    <p className="text-center text-xl font-comfortaa font-bold text-pastel-purple-700">
                                        You scored better than <span className="text-3xl text-cute-pink-500">{percentile}%</span> of users!
                                    </p>
                                    <div className="mt-3 h-3 w-full rounded-full bg-white shadow-inner">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-cute-pink-400 via-pastel-lavender-400 to-pastel-purple-400 transition-all duration-1000"
                                            style={{ width: `${percentile}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {scoreDistribution && Object.values(scoreDistribution).reduce((sum, count) => sum + count, 0) > 1 ? (
                                <>
                                    <h4 className="mb-4 text-lg font-comfortaa font-semibold text-pastel-purple-700">
                                        Score Distribution
                                    </h4>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="range" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#f17ab8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </>
                            ) : (
                                <div className="py-8 text-center text-pastel-lavender-600">
                                    <p className="text-lg font-comfortaa font-semibold">Be the first to take this quiz!</p>
                                    <p className="mt-2 text-sm font-quicksand">Score distribution will appear once more users complete it.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="girly-card overflow-hidden rounded-3xl p-6 shadow-xl">
                        <h4 className="mb-4 text-lg font-comfortaa font-semibold text-pastel-purple-700">
                            Your Answers
                        </h4>
                        <div className="space-y-4">
                            {attempt.user_answers.map((answer, index) => {
                                const question = answer.question;
                                const isCorrect = answer.is_correct;

                                return (
                                    <div
                                        key={answer.id}
                                        className={`rounded-2xl border p-4 shadow-sm ${
                                            isCorrect ? 'border-cute-pink-200 bg-cute-pink-50' : 'border-rose-200 bg-rose-50'
                                        }`}
                                    >
                                        <div className="mb-2 flex items-start justify-between">
                                            <h5 className="font-semibold text-pastel-purple-700">
                                                {index + 1}. {question.question_text}
                                            </h5>
                                            <span className={`text-sm font-semibold ${
                                                isCorrect ? 'text-cute-pink-500' : 'text-rose-500'
                                            }`}>
                                                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                            </span>
                                        </div>

                                        {question.question_type === 'text_input' ? (
                                            <div className="text-sm">
                                                <div className="mb-1">
                                                    <span className="text-pastel-lavender-700">Your answer: </span>
                                                    <span className="font-semibold text-pastel-purple-700">{answer.text_answer || '(No answer)'}</span>
                                                </div>
                                                {!isCorrect && (
                                                    <div>
                                                        <span className="text-pastel-lavender-700">Correct answer: </span>
                                                        <span className="font-semibold text-cute-pink-500">
                                                            {question.options.find(o => o.is_correct)?.option_text}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="space-y-2 text-sm">
                                                {question.options.map(option => {
                                                    const isSelected = answer.selected_option_id === option.id;
                                                    const isCorrectOption = option.is_correct;

                                                    return (
                                                        <div
                                                            key={option.id}
                                                            className={`rounded-xl p-3 ${
                                                                isSelected && isCorrectOption ? 'bg-cute-pink-100 text-pastel-purple-700' :
                                                                isSelected ? 'bg-rose-100 text-rose-600' :
                                                                isCorrectOption ? 'bg-cute-pink-50 text-pastel-purple-700' :
                                                                'bg-white text-pastel-lavender-700'
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
                            className="inline-flex items-center rounded-full border-2 border-cute-pink-200 bg-gradient-to-r from-cute-pink-400 via-cute-pink-500 to-pastel-purple-400 px-6 py-2 font-comfortaa font-bold text-white shadow-lg transition hover:scale-105"
                        >
                            Take Another Quiz
                        </Link>
                        <Link
                            href={route('quiz-attempts.my')}
                            className="inline-flex items-center rounded-full border-2 border-pastel-lavender-200 bg-white/80 px-6 py-2 font-comfortaa font-semibold text-pastel-purple-600 shadow-md transition hover:scale-105 hover:bg-pastel-lavender-50"
                        >
                            View All Attempts
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
