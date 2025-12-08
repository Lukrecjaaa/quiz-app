<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminQuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::withCount('questions')
            ->with('creator:id,name')
            ->latest()
            ->get();

        return Inertia::render('Admin/Quizzes/Index', [
            'quizzes' => $quizzes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Quizzes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $quiz = Quiz::create([
            ...$validated,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('admin.quizzes.edit', $quiz);
    }

    public function edit(Quiz $quiz)
    {
        $quiz->load('questions.options');

        return Inertia::render('Admin/Quizzes/Edit', [
            'quiz' => $quiz,
        ]);
    }

    public function update(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        $quiz->update($validated);

        return redirect()->route('admin.quizzes.index');
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return redirect()->route('admin.quizzes.index');
    }
}
