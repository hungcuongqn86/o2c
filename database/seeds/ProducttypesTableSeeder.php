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

        for ($i = 0; $i < 10; $i++) {
            $code = 'SACH';
            $name = 'Sách';
            if ($i) {
                $code = $faker->text(20);
                $name = $faker->text(200);
            }
            App\Entities\Producttypes::create([
                'code' => $code,
                'name' => $name,
                'size_config' => 'dai,rong,cao',
                'element_config' => 'bia,ruot',
                'image' => '',
                'enabled' => rand(0, 1),
            ]);
        }
    }
}
