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
        $sql = "INSERT INTO `tbl_producttypes` (`id`, `code`, `name`, `size_config`, `element_config`, `image`, `enabled`, `created_at`, `updated_at`) VALUES
(1, 'SACH', 'Sách', 'dai,rong', 'bia,ruot,gay,phu_ban,to_gac', 'product/20170615131719-hinh-nen-quyen-sach-15.jpg', 1, NULL, NULL),
(2, 'TO_ROI', 'Tờ rơi', 'dai,rong,cao', 'bia,ruot', 'product/20170615131824-tảixuống.jpg', 1, NULL, NULL);";
        // echo $sql;exit;
        DB::unprepared($sql);
    }
}
