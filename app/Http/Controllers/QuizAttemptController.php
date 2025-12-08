<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\Question;
use App\Models\UserAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizAttemptController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.selected_option_id' => 'nullable|exists:question_options,id',
            'answers.*.text_answer' => 'nullable|string',
        ]);

        $quiz = Quiz::with('questions.options')->findOrFail($validated['quiz_id']);

        $attempt = QuizAttempt::create([
            'user_id' => auth()->id(),
            'quiz_id' => $quiz->id,
            'score' => 0,
            'max_score' => $quiz->questions->count(),
            'percentage' => 0,
            'started_at' => now(),
            'completed_at' => now(),
        ]);

        $correctCount = 0;

        foreach ($validated['answers'] as $answer) {
            $question = $quiz->questions->firstWhere('id', $answer['question_id']);
            $isCorrect = false;

            if ($question->question_type === 'text_input') {
                $correctOption = $question->options->where('is_correct', true)->first();
                if ($correctOption && isset($answer['text_answer'])) {
                    $isCorrect = strtolower(trim($answer['text_answer'])) === strtolower(trim($correctOption->option_text));
                }
            } else {
                if (isset($answer['selected_option_id'])) {
                    $selectedOption = $question->options->firstWhere('id', $answer['selected_option_id']);
                    $isCorrect = $selectedOption && $selectedOption->is_correct;
                }
            }

            if ($isCorrect) {
                $correctCount++;
            }

            UserAnswer::create([
                'attempt_id' => $attempt->id,
                'question_id' => $answer['question_id'],
                'selected_option_id' => $answer['selected_option_id'] ?? null,
                'text_answer' => $answer['text_answer'] ?? null,
                'is_correct' => $isCorrect,
            ]);
        }

        $percentage = ($correctCount / $quiz->questions->count()) * 100;

        $attempt->update([
            'score' => $correctCount,
            'percentage' => round($percentage, 2),
        ]);

        return redirect()->route('quiz-attempts.show', $attempt);
    }

    public function show(QuizAttempt $attempt)
    {
        $attempt->load([
            'quiz',
            'userAnswers.question.options',
            'userAnswers.selectedOption'
        ]);

        $totalAttempts = QuizAttempt::where('quiz_id', $attempt->quiz_id)->count();
        $lowerScoreAttempts = QuizAttempt::where('quiz_id', $attempt->quiz_id)
            ->where('percentage', '<', $attempt->percentage)
            ->count();

        $percentile = $totalAttempts > 0 ? round(($lowerScoreAttempts / $totalAttempts) * 100, 1) : 0;

        $scoreRanges = [
            '0-20%' => 0, '21-40%' => 0, '41-60%' => 0, '61-80%' => 0, '81-100%' => 0
        ];

        $allAttempts = QuizAttempt::where('quiz_id', $attempt->quiz_id)->get();
        foreach ($allAttempts as $att) {
            $range = match(true) {
                $att->percentage <= 20 => '0-20%',
                $att->percentage <= 40 => '21-40%',
                $att->percentage <= 60 => '41-60%',
                $att->percentage <= 80 => '61-80%',
                default => '81-100%',
            };
            $scoreRanges[$range]++;
        }

        return Inertia::render('QuizAttempts/Show', [
            'attempt' => $attempt,
            'percentile' => $percentile,
            'scoreDistribution' => $scoreRanges,
        ]);
    }

    public function myAttempts()
    {
        $attempts = QuizAttempt::where('user_id', auth()->id())
            ->with('quiz')
            ->latest()
            ->get();

        return Inertia::render('QuizAttempts/MyAttempts', [
            'attempts' => $attempts,
        ]);
    }
}
