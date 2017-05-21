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

        for($index = 0; $index < count(self::$sampleDumpListCode); $index++) {
            $listtype_code = self::$sampleDumpListCode[$index]['code'];
            for($i = 0; $i < 5; $i++) {
                App\Entities\Lists::create([
                    'listtype_code' => $listtype_code,
                    'code' => $faker->text(20),
                    'name' => $faker->text(99),
                    'enabled' => rand(0,1)
                ]);
            }
        }
    }

    static $sampleDumpListCode = [
        ['code' => 'department', 'name' => 'LISTTYPE.department'],
        ['code' => 'unit', 'name' => 'LISTTYPE.unit'],
        ['code' => 'standard', 'name' => 'LISTTYPE.standard'],
        ['code' => 'outsourcing', 'name' => 'LISTTYPE.outsourcing'],
        ['code' => 'packing', 'name' => 'LISTTYPE.packing'],
        ['code' => 'mold', 'name' => 'LISTTYPE.mold'],
        ['code' => 'number_hand', 'name' => 'LISTTYPE.number_hand'],
        ['code' => 'print_type', 'name' => 'LISTTYPE.print_type'],
        ['code' => 'print_size', 'name' => 'LISTTYPE.print_size'],
        ['code' => 'print_color', 'name' => 'LISTTYPE.print_color'],
        ['code' => 'zinc_type', 'name' => 'LISTTYPE.zinc_type'],
        ['code' => 'machine', 'name' => 'LISTTYPE.machine'],
        ['code' => 'paper_type', 'name' => 'LISTTYPE.paper_type'],
        ['code' => 'size_store', 'name' => 'LISTTYPE.size_store'],
        ['code' => 'cut_type', 'name' => 'LISTTYPE.cut_type'],
        ['code' => 'number_char', 'name' => 'LISTTYPE.number_char']
    ];
}
