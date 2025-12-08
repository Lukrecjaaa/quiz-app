<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuizAttempt;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $attempts = QuizAttempt::with(['user', 'quiz'])
            ->latest()
            ->paginate(20);

        $stats = [
            'total_quizzes' => Quiz::count(),
            'total_users' => User::where('is_admin', false)->count(),
            'total_attempts' => QuizAttempt::count(),
            'average_score' => QuizAttempt::avg('percentage'),
        ];

        return Inertia::render('Admin/Dashboard', [
            'attempts' => $attempts,
            'stats' => $stats,
        ]);
    }
}
