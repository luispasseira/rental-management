<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->email = 'tou@bruh.com';
        $user->username = 'toubruh';
        $user->password = Hash::make('123');
        $user->save();
    }
}
