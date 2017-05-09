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
            $listtype_code = 'DEPARTMENT';
            if($i>50){
                $listtype_code = 'UNIT';
            }
            App\Entities\Lists::create([
                'listtype_code' => $faker->text(10),
                'code' => $listtype_code,
                'name' => $faker->text(99),
                'enabled' => rand(0,1)
            ]);
        }
    }
}
