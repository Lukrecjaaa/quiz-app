<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\User;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('is_admin', true)->first();

        // Quiz 1: My Little Pony (G4) Knowledge
        $mlpQuiz = Quiz::create([
            'title' => 'My Little Pony: Friendship is Magic Quiz',
            'description' => 'Test your knowledge of MLP G4 characters, locations, and episodes!',
            'created_by' => $admin->id,
            'is_published' => true,
        ]);

        $q1 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'What is Twilight Sparkle\'s special talent?',
            'question_type' => 'multiple_choice',
            'order' => 1,
        ]);
        QuestionOption::create(['question_id' => $q1->id, 'option_text' => 'Magic', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q1->id, 'option_text' => 'Weather Control', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $q1->id, 'option_text' => 'Baking', 'is_correct' => false]);

        $q2 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'Which Element of Harmony does Fluttershy represent?',
            'question_type' => 'multiple_choice',
            'order' => 2,
        ]);
        QuestionOption::create(['question_id' => $q2->id, 'option_text' => 'Kindness', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q2->id, 'option_text' => 'Loyalty', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $q2->id, 'option_text' => 'Honesty', 'is_correct' => false]);

        $q3 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'Rainbow Dash is known for performing what aerial stunt?',
            'question_type' => 'text_input',
            'order' => 3,
        ]);
        QuestionOption::create(['question_id' => $q3->id, 'option_text' => 'Sonic Rainboom', 'is_correct' => true]);

        $q4 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'Pinkie Pie has a pet alligator named Gummy.',
            'question_type' => 'true_false',
            'order' => 4,
        ]);
        QuestionOption::create(['question_id' => $q4->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q4->id, 'option_text' => 'False', 'is_correct' => false]);

        $q5 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'What is the name of the main town where most ponies live?',
            'question_type' => 'text_input',
            'order' => 5,
        ]);
        QuestionOption::create(['question_id' => $q5->id, 'option_text' => 'Ponyville', 'is_correct' => true]);

        $q6 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'Which pony runs the Carousel Boutique?',
            'question_type' => 'multiple_choice',
            'order' => 6,
        ]);
        QuestionOption::create(['question_id' => $q6->id, 'option_text' => 'Rarity', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q6->id, 'option_text' => 'Applejack', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $q6->id, 'option_text' => 'Fluttershy', 'is_correct' => false]);

        $q7 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'Applejack works at Sweet Apple Acres farm.',
            'question_type' => 'true_false',
            'order' => 7,
        ]);
        QuestionOption::create(['question_id' => $q7->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q7->id, 'option_text' => 'False', 'is_correct' => false]);

        $q8 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'What is Princess Celestia\'s role in Equestria?',
            'question_type' => 'multiple_choice',
            'order' => 8,
        ]);
        QuestionOption::create(['question_id' => $q8->id, 'option_text' => 'She raises the sun', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q8->id, 'option_text' => 'She raises the moon', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $q8->id, 'option_text' => 'She controls the weather', 'is_correct' => false]);

        $q9 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'Which pony represents the Element of Loyalty?',
            'question_type' => 'multiple_choice',
            'order' => 9,
        ]);
        QuestionOption::create(['question_id' => $q9->id, 'option_text' => 'Rainbow Dash', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q9->id, 'option_text' => 'Applejack', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $q9->id, 'option_text' => 'Twilight Sparkle', 'is_correct' => false]);

        $q10 = Question::create([
            'quiz_id' => $mlpQuiz->id,
            'question_text' => 'Starlight Glimmer was originally a villain before becoming friends with Twilight.',
            'question_type' => 'true_false',
            'order' => 10,
        ]);
        QuestionOption::create(['question_id' => $q10->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $q10->id, 'option_text' => 'False', 'is_correct' => false]);

        // Quiz 2: Sanrio Knowledge
        $sanrioQuiz = Quiz::create([
            'title' => 'Sanrio Characters Quiz',
            'description' => 'How well do you know your favorite Sanrio characters?',
            'created_by' => $admin->id,
            'is_published' => true,
        ]);

        $s1 = Question::create([
            'quiz_id' => $sanrioQuiz->id,
            'question_text' => 'What animal is Hello Kitty?',
            'question_type' => 'multiple_choice',
            'order' => 1,
        ]);
        QuestionOption::create(['question_id' => $s1->id, 'option_text' => 'Cat', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $s1->id, 'option_text' => 'Dog', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $s1->id, 'option_text' => 'Rabbit', 'is_correct' => false]);

        $s2 = Question::create([
            'quiz_id' => $sanrioQuiz->id,
            'question_text' => 'Cinnamoroll is a puppy with long ears that enable him to fly.',
            'question_type' => 'true_false',
            'order' => 2,
        ]);
        QuestionOption::create(['question_id' => $s2->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $s2->id, 'option_text' => 'False', 'is_correct' => false]);

        $s3 = Question::create([
            'quiz_id' => $sanrioQuiz->id,
            'question_text' => 'What color is My Melody\'s hood?',
            'question_type' => 'multiple_choice',
            'order' => 3,
        ]);
        QuestionOption::create(['question_id' => $s3->id, 'option_text' => 'Pink', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $s3->id, 'option_text' => 'Blue', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $s3->id, 'option_text' => 'Yellow', 'is_correct' => false]);

        $s4 = Question::create([
            'quiz_id' => $sanrioQuiz->id,
            'question_text' => 'Kuromi is My Melody\'s rival and has a skull on her hood.',
            'question_type' => 'true_false',
            'order' => 4,
        ]);
        QuestionOption::create(['question_id' => $s4->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $s4->id, 'option_text' => 'False', 'is_correct' => false]);

        $s5 = Question::create([
            'quiz_id' => $sanrioQuiz->id,
            'question_text' => 'In what year was Hello Kitty created?',
            'question_type' => 'multiple_choice',
            'order' => 5,
        ]);
        QuestionOption::create(['question_id' => $s5->id, 'option_text' => '1974', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $s5->id, 'option_text' => '1980', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $s5->id, 'option_text' => '1985', 'is_correct' => false]);

        $s6 = Question::create([
            'quiz_id' => $sanrioQuiz->id,
            'question_text' => 'What is the name of the penguin character with a yellow beak?',
            'question_type' => 'text_input',
            'order' => 6,
        ]);
        QuestionOption::create(['question_id' => $s6->id, 'option_text' => 'Badtz-Maru', 'is_correct' => true]);

        $s7 = Question::create([
            'quiz_id' => $sanrioQuiz->id,
            'question_text' => 'Pompompurin is a golden retriever who loves pudding.',
            'question_type' => 'true_false',
            'order' => 7,
        ]);
        QuestionOption::create(['question_id' => $s7->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $s7->id, 'option_text' => 'False', 'is_correct' => false]);

        $s8 = Question::create([
            'quiz_id' => $sanrioQuiz->id,
            'question_text' => 'Which character is a little twin star?',
            'question_type' => 'multiple_choice',
            'order' => 8,
        ]);
        QuestionOption::create(['question_id' => $s8->id, 'option_text' => 'Kiki and Lala', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $s8->id, 'option_text' => 'Hello Kitty and Mimmy', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $s8->id, 'option_text' => 'Keroppi and Friends', 'is_correct' => false]);

        // Quiz 3: Rust Programming
        $rustQuiz = Quiz::create([
            'title' => 'Rust Programming Fundamentals',
            'description' => 'Test your knowledge of Rust programming concepts and syntax',
            'created_by' => $admin->id,
            'is_published' => true,
        ]);

        $r1 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'What is the main purpose of Rust\'s ownership system?',
            'question_type' => 'multiple_choice',
            'order' => 1,
        ]);
        QuestionOption::create(['question_id' => $r1->id, 'option_text' => 'Memory safety without garbage collection', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $r1->id, 'option_text' => 'Faster compilation times', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $r1->id, 'option_text' => 'Better syntax highlighting', 'is_correct' => false]);

        $r2 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'Rust variables are mutable by default.',
            'question_type' => 'true_false',
            'order' => 2,
        ]);
        QuestionOption::create(['question_id' => $r2->id, 'option_text' => 'True', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $r2->id, 'option_text' => 'False', 'is_correct' => true]);

        $r3 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'What keyword is used to declare a mutable variable in Rust?',
            'question_type' => 'text_input',
            'order' => 3,
        ]);
        QuestionOption::create(['question_id' => $r3->id, 'option_text' => 'mut', 'is_correct' => true]);

        $r4 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'Which command is used to build a Rust project?',
            'question_type' => 'multiple_choice',
            'order' => 4,
        ]);
        QuestionOption::create(['question_id' => $r4->id, 'option_text' => 'cargo build', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $r4->id, 'option_text' => 'rustc build', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $r4->id, 'option_text' => 'rust compile', 'is_correct' => false]);

        $r5 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'What is the Result type used for in Rust?',
            'question_type' => 'multiple_choice',
            'order' => 5,
        ]);
        QuestionOption::create(['question_id' => $r5->id, 'option_text' => 'Error handling', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $r5->id, 'option_text' => 'Memory allocation', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $r5->id, 'option_text' => 'Type conversion', 'is_correct' => false]);

        $r6 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'In Rust, a value can have multiple owners at the same time.',
            'question_type' => 'true_false',
            'order' => 6,
        ]);
        QuestionOption::create(['question_id' => $r6->id, 'option_text' => 'True', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $r6->id, 'option_text' => 'False', 'is_correct' => true]);

        $r7 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'What symbol is used for borrowing in Rust?',
            'question_type' => 'text_input',
            'order' => 7,
        ]);
        QuestionOption::create(['question_id' => $r7->id, 'option_text' => '&', 'is_correct' => true]);

        $r8 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'Which macro is used to print to the console in Rust?',
            'question_type' => 'multiple_choice',
            'order' => 8,
        ]);
        QuestionOption::create(['question_id' => $r8->id, 'option_text' => 'println!', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $r8->id, 'option_text' => 'print()', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $r8->id, 'option_text' => 'console.log', 'is_correct' => false]);

        $r9 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'Traits in Rust are similar to interfaces in other languages.',
            'question_type' => 'true_false',
            'order' => 9,
        ]);
        QuestionOption::create(['question_id' => $r9->id, 'option_text' => 'True', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $r9->id, 'option_text' => 'False', 'is_correct' => false]);

        $r10 = Question::create([
            'quiz_id' => $rustQuiz->id,
            'question_text' => 'What is the standard way to handle a None value in an Option type?',
            'question_type' => 'multiple_choice',
            'order' => 10,
        ]);
        QuestionOption::create(['question_id' => $r10->id, 'option_text' => 'Pattern matching with match', 'is_correct' => true]);
        QuestionOption::create(['question_id' => $r10->id, 'option_text' => 'Using try-catch', 'is_correct' => false]);
        QuestionOption::create(['question_id' => $r10->id, 'option_text' => 'Ignoring it', 'is_correct' => false]);
    }
}
