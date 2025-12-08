import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ quizzes }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>Available Quizzes</span>
                    <span className="text-3xl">✨</span>
                </h2>
            }
        >
            <Head title="Quizzes" />

            <div className="relative py-12">
                <div className="absolute -left-6 top-8 text-7xl opacity-20">🌸</div>
                <div className="absolute right-8 bottom-10 text-6xl opacity-20">🌺</div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {quizzes.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {quizzes.map(quiz => (
                                <Link
                                    key={quiz.id}
                                    href={route('quizzes.show', quiz.id)}
                                    className="girly-card relative overflow-hidden rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl polka-dots-large"
                                >
                                    <div className="absolute -right-3 -top-3 text-5xl opacity-25">🌷</div>
                                    <h3 className="mb-2 text-xl font-comfortaa font-bold text-pastel-purple-700">
                                        {quiz.title}
                                    </h3>
                                    <p className="mb-4 text-sm font-quicksand text-pastel-lavender-600">
                                        {quiz.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-pastel-lavender-600">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 font-semibold shadow-sm">
                                            {quiz.questions_count} questions
                                        </span>
                                        <span className="rounded-full bg-gradient-to-r from-cute-pink-300 to-pastel-lavender-300 px-4 py-2 font-comfortaa font-bold text-white shadow-lg">
                                            View Quiz →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="girly-card rounded-3xl p-8 text-center shadow-xl">
                            <p className="text-pastel-lavender-600">No quizzes available yet. Stay tuned for something cute!</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
