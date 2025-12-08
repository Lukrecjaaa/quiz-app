<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::where('is_published', true)
            ->withCount('questions')
            ->with('creator:id,name')
            ->latest()
            ->get();

        return Inertia::render('Quizzes/Index', [
            'quizzes' => $quizzes,
        ]);
    }

    public function show(Quiz $quiz)
    {
        $quiz->loadCount('questions');
        $quiz->load('creator:id,name');

        return Inertia::render('Quizzes/Show', [
            'quiz' => $quiz,
        ]);
    }

    public function take(Quiz $quiz)
    {
        $quiz->load(['questions' => function ($query) {
            $query->orderBy('order')->with('options');
        }]);

        return Inertia::render('Quizzes/Take', [
            'quiz' => $quiz,
        ]);
    }
}
