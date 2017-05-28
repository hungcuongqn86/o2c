<?php

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
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

        for ($i = 0; $i < 100; $i++) {
            App\Entities\Products::create([
                'contract_id' => rand(0, 10),
                'producttype_code' => 'SACH',
                'name' => $faker->text(25),
                'description' => $faker->text(100),
                'count' => rand(100, 500),
                'dai' => rand(100, 500),
                'rong' => rand(100, 500),
                'cao' => rand(100, 500),
            ]);
        }
    }
}
