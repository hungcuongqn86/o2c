<?php

use Illuminate\Database\Seeder;

class ListTableSeeder extends Seeder
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
            $listtype_code = 'department';
            if($i>50){
                $listtype_code = 'unit';
            }
            App\Entities\Lists::create([
                'listtype_code' => $listtype_code,
                'code' => $faker->text(20),
                'name' => $faker->text(99),
                'enabled' => rand(0,1)
            ]);
        }
    }
}
