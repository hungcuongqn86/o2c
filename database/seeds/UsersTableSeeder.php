<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Entities\Users::create([
            'name' => 'Nguyễn Hùng Cường',
            'email' => 'hungcuongqn86@gmail.com',
            'password' => '$2y$10$IpvybCDn8hlkQUzZ/4KUHOZ49MMqXaYh.LuP6z8f7rp1ChLI3jlbK',
            'role' => 'ADMIN',
            'department_code' => '1',
            'enabled' => 1
        ]);

        App\Entities\Users::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => '$2y$10$o7FxTZ6DG0QHjZHlRpIhjer/tSM.kZVEGBjTH5V7qQHfpQCb2jGSi',
            'role' => 'ADMIN',
            'department_code' => 'PKHTH',
            'enabled' => 1
        ]);
    }
}
