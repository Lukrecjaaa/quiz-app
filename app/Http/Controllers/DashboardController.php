<?php

namespace App\Http\Controllers;

use App\Models\QuizAttempt;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $attempts = QuizAttempt::where('user_id', auth()->id())
            ->with('quiz')
            ->latest()
            ->take(5)
            ->get();

        $stats = [
            'total_quizzes' => QuizAttempt::where('user_id', auth()->id())->distinct('quiz_id')->count(),
            'average_score' => QuizAttempt::where('user_id', auth()->id())->avg('percentage'),
            'best_score' => QuizAttempt::where('user_id', auth()->id())->max('percentage'),
        ];

        $recentQuizzes = Quiz::where('is_published', true)
            ->withCount('questions')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'recentAttempts' => $attempts,
            'stats' => $stats,
            'recentQuizzes' => $recentQuizzes,
        ]);
    }
}
