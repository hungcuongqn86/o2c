<?php

use Illuminate\Database\Seeder;

class ContractsTableSeeder extends Seeder
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
            App\Entities\Contracts::create([
                'code' => $faker->text(20),
                'signdate' => $faker->dateTimeBetween($startDate = '-15 day', $endDate = '-1 days')->format('Y-m-d H:i').':00',
                'customer_id' => rand(0,10),
                'content' => $faker->text(100),
                'value' => '1000000000',
                'durationdate' => $faker->dateTimeBetween($startDate = '+15 day', $endDate = '+100 days')->format('Y-m-d H:i').':00'
            ]);
        }
    }
}
