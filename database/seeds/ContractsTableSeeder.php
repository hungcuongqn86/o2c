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
        $sql = "INSERT INTO `tbl_contracts` (`id`, `code`, `signdate`, `customer_id`, `content`, `value`, `durationdate`, `product_name`, `number`, `unit`, `standard`, `outsourcing`, `packing`, `success_date`, `image`, `note`, `created_at`, `updated_at`) VALUES";
        $sql .= "(104, 'HD01', '2017-06-14 10:00:00', 1, 'In sách giao khoa NXB Giáo dục', '30000', '2017-06-14 10:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),";
        $sql .= "(105, 'HD02', '2017-06-14 10:00:00', 2, 'In Sách giáo lịch sử lớp 9', '300000', '2017-06-14 10:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),";
        $sql .= "(107, 'HD03', '2017-06-14 10:00:00', 1, 'Vở học sinh lớp 8', '300112', '2017-06-14 10:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),";
        $sql .= "(108, 'HĐ04', '2017-06-14 10:00:00', 1, 'Sách  tiếng việt 5', '600000', '2017-06-14 10:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),";
        $sql .= "(109, 'HD06', '2017-06-14 10:00:00', 1, 'Sách giáo khoa lớp 1', '5000000', '2017-06-14 10:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);";
        // echo $sql;exit;
        DB::unprepared($sql);
    }
}
