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
        //
        $faker = Faker\Factory::create();

        for($i = 0; $i < 100; $i++) {
            $email = 'hungcuongqn86@gmail.com';
            if($i){
                $email = $faker->unique()->email;
            }
            App\Entities\Users::create([
                'name' => $faker->text(15),
                'email' => $email,
                'password'  => '$2y$10$IpvybCDn8hlkQUzZ/4KUHOZ49MMqXaYh.LuP6z8f7rp1ChLI3jlbK',
                'role' => 'ADMIN',
                'department_code' => '1',
                'enabled' => rand(0,1)
            ]);
        }
    }
}
