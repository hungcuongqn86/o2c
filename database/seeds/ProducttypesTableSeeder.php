<?php

use Illuminate\Database\Seeder;

class ProducttypesTableSeeder extends Seeder
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

        for($i = 0; $i < 10; $i++) {
            App\Entities\Producttypes::create([
                'code' => $faker->text(20),
                'name' => $faker->text(200),
                'size_config' => $faker->text(100),
                'color_config' => $faker->text(100),
                'paper_type_config' => $faker->text(100),
                'number_page' => rand(0,1),
                'hardcover' => rand(0,1),
                'annex' => rand(0,1),
                'sheet_hung' => rand(0,1),
                'outsource_type_config' => $faker->text(100),
                'enabled' => rand(0,1),
            ]);
        }
    }
}
