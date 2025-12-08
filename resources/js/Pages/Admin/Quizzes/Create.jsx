import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        is_published: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.quizzes.store'));
    };

    return (
        <AdminLayout
            header={
                <h2 className="flex items-center gap-2 text-2xl font-comfortaa font-bold leading-tight text-pastel-purple-700">
                    <span>Create New Quiz</span>
                    <span className="text-3xl">🌼</span>
                </h2>
            }
        >
            <Head title="Create Quiz" />

            <div className="relative py-12">
                <div className="absolute left-6 top-10 text-7xl opacity-10">🌸</div>
                <div className="absolute right-8 bottom-12 text-6xl opacity-10">✨</div>
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
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
                                <InputError message={errors.description} className="mt-2 text-rose-500" />
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 shadow-inner">
                                <Checkbox
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                />
                                <span className="text-sm font-quicksand text-pastel-purple-700">
                                    Publish quiz immediately
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <Link
                                    href={route('admin.quizzes.index')}
                                    className="inline-flex items-center rounded-full border-2 border-pastel-lavender-200 bg-white/80 px-5 py-2 font-comfortaa font-semibold text-pastel-purple-600 shadow-md transition hover:scale-105 hover:bg-pastel-lavender-50"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton type="submit" disabled={processing} className="px-8 shadow-xl">
                                    Create Quiz
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
