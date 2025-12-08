<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\QuizAttempt;
use App\Models\User;
use App\Models\UserAnswer;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('is_admin', true)->first();
        $users = User::where('is_admin', false)->get();

        $quiz1 = Quiz::create([
            'title' => 'PHP Basics Quiz',
            'description' => 'Test your knowledge of PHP fundamentals',
            'created_by' => $admin->id,
            'is_published' => true,
        ]);

        $q1 = Question::create([
            'quiz_id' => $quiz1->id,
            'question_text' => 'What does PHP stand for?',
            'question_type' => 'multiple_choice',
            'order' => 1,
        ]);
        QuestionOption::create(['question_id' => $q1->id, 'option_text' => 'Personal Home Page', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $q1->id, 'option_text' => 'PHP: Hypertext Preprocessor', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q1->id, 'option_text' => 'Private Hypertext Processor', 'is_correct' => false]);

        $q2 = Question::create([
            'quiz_id' => $quiz1->id,
            'question_text' => 'PHP is a server-side scripting language',
            'question_type' => 'true_false',
            'order' => 2,
        ]);
        QuestionOption::create(['question_id' => $q2->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q2->id, 'option_text' => 'False', 'is_correct' => false]);

        $q3 = Question::create([
            'quiz_id' => $quiz1->id,
            'question_text' => 'What symbol is used to start a PHP tag?',
            'question_type' => 'text_input',
            'order' => 3,
        ]);
        QuestionOption::create(['question_id' => $q3->id, 'option_text' => '<?php', 'is_correct' => true]);

        $quiz2 = Quiz::create([
            'title' => 'JavaScript Fundamentals',
            'description' => 'Basic JavaScript concepts',
            'created_by' => $admin->id,
            'is_published' => true,
        ]);

        $q4 = Question::create([
            'quiz_id' => $quiz2->id,
            'question_text' => 'Which keyword is used to declare variables in ES6?',
            'question_type' => 'multiple_choice',
            'order' => 1,
        ]);
        QuestionOption::create(['question_id' => $q4->id, 'option_text' => 'var', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $q4->id, 'option_text' => 'let', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q4->id, 'option_text' => 'define', 'is_correct' => false]);

        $q5 = Question::create([
            'quiz_id' => $quiz2->id,
            'question_text' => 'JavaScript is case-sensitive',
            'question_type' => 'true_false',
            'order' => 2,
        ]);
        QuestionOption::create(['question_id' => $q5->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q5->id, 'option_text' => 'False', 'is_correct' => false]);

        $quiz3 = Quiz::create([
            'title' => 'Laravel Framework Quiz',
            'description' => 'Test your Laravel knowledge',
            'created_by' => $admin->id,
            'is_published' => true,
        ]);

        $q6 = Question::create([
            'quiz_id' => $quiz3->id,
            'question_text' => 'What command creates a new Laravel project?',
            'question_type' => 'multiple_choice',
            'order' => 1,
        ]);
        QuestionOption::create(['question_id' => $q6->id, 'option_text' => 'laravel new project', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $q6->id, 'option_text' => 'composer create-project laravel/laravel', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q6->id, 'option_text' => 'php artisan new', 'is_correct' => false]);

        foreach ($users->take(8) as $index => $user) {
            $attempt = QuizAttempt::create([
                'user_id' => $user->id,
                'quiz_id' => $quiz1->id,
                'score' => rand(1, 3),
                'max_score' => 3,
                'percentage' => rand(33, 100),
                'started_at' => now()->subDays(rand(1, 30)),
                'completed_at' => now()->subDays(rand(1, 30)),
            ]);

            foreach ($quiz1->questions as $question) {
                $correctOption = $question->options()->where('is_correct', true)->first();
                $isCorrect = rand(0, 100) > 30;
                UserAnswer::create([
                    'attempt_id' => $attempt->id,
                    'question_id' => $question->id,
                    'selected_option_id' => $isCorrect ? $correctOption->id : $question->options->first()->id,
                    'is_correct' => $isCorrect,
                ]);
            }
        }
    }
}
