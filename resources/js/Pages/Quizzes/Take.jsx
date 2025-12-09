import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SparkleCanvas from '@/Components/SparkleCanvas';
import CursorTrail from '@/Components/CursorTrail';
import ConfettiBurst from '@/Components/ConfettiBurst';
import ClickRipple from '@/Components/ClickRipple';
import GlitterTransition from '@/Components/GlitterTransition';
import { Head, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Take({ quiz }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const confettiRef = useRef(null);
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

        if (confettiRef.current) {
            confettiRef.current.burst(window.innerWidth / 2, window.innerHeight / 2);
        }
    };

    const handleTextInput = (text) => {
        const updatedAnswers = [...data.answers];
        updatedAnswers[currentQuestionIndex].text_answer = text;
        setData('answers', updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            if (confettiRef.current) {
                confettiRef.current.burst(window.innerWidth / 2, 200);
            }
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
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>{quiz.title}</span>
                    <span className="text-3xl">🌸</span>
                </h2>
            }
        >
            <Head title={`Taking ${quiz.title}`} />

            <SparkleCanvas />
            <CursorTrail />
            <ConfettiBurst ref={confettiRef} />
            <ClickRipple />

            <div className="relative py-12">
                <div className="absolute left-6 top-12 text-8xl opacity-10">🌷</div>
                <div className="absolute right-6 bottom-10 text-7xl opacity-20">💮</div>
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="girly-card relative overflow-hidden rounded-3xl border-4 border-cute-pink-100 p-8 shadow-2xl polka-dots rainbow-border">
                        <div className="absolute -right-8 -top-8 text-8xl opacity-10">✨</div>
                        <div className="absolute -left-6 bottom-6 text-6xl opacity-10">🌺</div>
                        <div className="relative mb-8">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-comfortaa font-bold text-pastel-purple-600 shadow-md">
                                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                                </span>
                                <span className="rounded-full bg-gradient-to-r from-cute-pink-200 to-pastel-lavender-200 px-4 py-2 text-sm font-comfortaa font-bold text-pastel-purple-700 shadow-md magical-pulse">
                                    {Math.round(progress)}% Complete
                                </span>
                            </div>
                            <div className="h-3 w-full rounded-full bg-white/60 shadow-inner">
                                <div
                                    className="h-3 rounded-full bg-gradient-to-r from-cute-pink-400 via-pastel-lavender-400 to-pastel-purple-400 shadow-lg transition-all duration-500 rainbow-glow"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <GlitterTransition transitionKey={currentQuestionIndex}>
                            <div className="relative mb-8 rounded-2xl bg-gradient-to-br from-cute-pink-50 via-white to-pastel-lavender-50 p-6 shadow-inner">
                                <div className="sparkle absolute right-4 top-4 h-4 w-4"></div>
                                <h3 className="mb-6 text-2xl font-comfortaa font-bold text-pastel-purple-700">
                                    {currentQuestion.question_text}
                                </h3>

                                {currentQuestion.question_type === 'text_input' ? (
                                    <input
                                        type="text"
                                        value={data.answers[currentQuestionIndex].text_answer}
                                        onChange={(e) => handleTextInput(e.target.value)}
                                        className="w-full rounded-2xl border-2 border-cute-pink-100 bg-white/80 p-4 text-lg font-quicksand text-pastel-purple-700 shadow-lg placeholder:text-pastel-lavender-400 focus:border-pastel-purple-300 focus:ring-4 focus:ring-cute-pink-100 transition-all hover-glow"
                                        placeholder="Type your answer here"
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        {currentQuestion.options.map(option => (
                                            <label
                                                key={option.id}
                                                className={`flex items-center rounded-2xl border-2 p-5 font-quicksand cursor-pointer transition-all transform hover:scale-[1.01] hover-glow ${
                                                    data.answers[currentQuestionIndex].selected_option_id === option.id
                                                        ? 'border-cute-pink-300 bg-gradient-to-r from-cute-pink-50 via-white to-pastel-lavender-50 shadow-md scale-[1.02] rainbow-glow'
                                                        : 'border-cute-pink-100 bg-white hover:bg-cute-pink-50'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${currentQuestion.id}`}
                                                    value={option.id}
                                                    checked={data.answers[currentQuestionIndex].selected_option_id === option.id}
                                                    onChange={() => handleOptionSelect(option.id)}
                                                    className="mr-4 h-5 w-5 text-cute-pink-400 focus:ring-cute-pink-300"
                                                />
                                                <span className="text-lg font-semibold text-pastel-purple-700">{option.option_text}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </GlitterTransition>

                        <div className="flex items-center justify-between pt-4">
                            <SecondaryButton
                                type="button"
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className="bg-white/80 text-pastel-purple-600 hover:text-pastel-purple-700"
                            >
                                ← Previous
                            </SecondaryButton>

                            {currentQuestionIndex < quiz.questions.length - 1 ? (
                                <PrimaryButton
                                    type="button"
                                    onClick={handleNext}
                                    className="px-8 shadow-xl"
                                >
                                    Next →
                                </PrimaryButton>
                            ) : (
                                <PrimaryButton
                                    type="button"
                                    onClick={() => post(route('quiz-attempts.store'))}
                                    disabled={processing}
                                    className="px-8 shadow-xl"
                                >
                                    Submit Quiz ✨
                                </PrimaryButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
