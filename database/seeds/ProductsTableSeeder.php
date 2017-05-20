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

        for($i = 0; $i < 100; $i++) {
            App\Entities\Products::create([
                'contract_id' => rand(0,10),
                'producttype_code' => 'SACH',
                'count' => rand(100,500),
                'long' => rand(100,500),
                'large' => rand(100,500),
                'high' => rand(100,500),
                'cover_color' => $faker->text(10),
                'inside_color' => $faker->text(10),
                'cover_paper_type' => $faker->text(10),
                'inside_paper_type' => $faker->text(10),
                'number_page' => rand(300,500),
                'hardcover' => rand(0,1),
                'number_page_annex' => rand(1,10),
                'inside_color_annex' => $faker->text(10),
                'inside_paper_type_annex' => $faker->text(10),
                'sheet_hung' => $faker->text(10),
                'outsource_type' => 'LAMINATE_GLOSSY,LAMINATE_BLURRY,LAMINATE_EMULSION'
            ]);
        }
    }
}
