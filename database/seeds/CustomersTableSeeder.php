<?php

use Illuminate\Database\Seeder;

class CustomersTableSeeder extends Seeder
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
            App\Entities\Customers::create([
                'name' => $faker->text(50)
            ]);
        }
    }
}
