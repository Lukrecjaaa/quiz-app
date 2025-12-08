<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminQuestionController extends Controller
{
    public function create(Quiz $quiz)
    {
        return Inertia::render('Admin/Questions/Create', [
            'quiz' => $quiz,
        ]);
    }

    public function store(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'question_type' => 'required|in:multiple_choice,true_false,text_input',
            'options' => 'required|array|min:1',
            'options.*.text' => 'required|string',
            'options.*.is_correct' => 'required|boolean',
        ]);

        $maxOrder = $quiz->questions()->max('order') ?? 0;

        $question = Question::create([
            'quiz_id' => $quiz->id,
            'question_text' => $validated['question_text'],
            'question_type' => $validated['question_type'],
            'order' => $maxOrder + 1,
        ]);

        foreach ($validated['options'] as $optionData) {
            QuestionOption::create([
                'question_id' => $question->id,
                'option_text' => $optionData['text'],
                'is_correct' => $optionData['is_correct'],
            ]);
        }

        return redirect()->route('admin.quizzes.edit', $quiz);
    }

    public function edit(Quiz $quiz, Question $question)
    {
        $question->load('options');

        return Inertia::render('Admin/Questions/Edit', [
            'quiz' => $quiz,
            'question' => $question,
        ]);
    }

    public function update(Request $request, Quiz $quiz, Question $question)
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'question_type' => 'required|in:multiple_choice,true_false,text_input',
            'options' => 'required|array|min:1',
            'options.*.text' => 'required|string',
            'options.*.is_correct' => 'required|boolean',
        ]);

        $question->update([
            'question_text' => $validated['question_text'],
            'question_type' => $validated['question_type'],
        ]);

        $question->options()->delete();

        foreach ($validated['options'] as $optionData) {
            QuestionOption::create([
                'question_id' => $question->id,
                'option_text' => $optionData['text'],
                'is_correct' => $optionData['is_correct'],
            ]);
        }

        return redirect()->route('admin.quizzes.edit', $quiz);
    }

    public function destroy(Quiz $quiz, Question $question)
    {
        $question->delete();

        return redirect()->route('admin.quizzes.edit', $quiz);
    }
}
