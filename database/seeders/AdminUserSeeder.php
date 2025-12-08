<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin'),
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        $mlpPonies = [
            'Twilight Sparkle',
            'Starlight Glimmer',
            'Fluttershy',
            'Rainbow Dash',
            'Pinkie Pie',
            'Rarity',
            'Applejack',
            'Sunset Shimmer',
            'Princess Celestia',
            'Princess Luna',
        ];

        foreach ($mlpPonies as $index => $name) {
            User::create([
                'name' => $name,
                'email' => 'user' . ($index + 1) . '@example.com',
                'password' => Hash::make('1234'),
                'is_admin' => false,
                'email_verified_at' => now(),
            ]);
        }
    }
}
