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
        $sql = "INSERT INTO `tbl_customers` (`id`, `code`, `type`, `name`, `gender`, `birthday`, `phone_number1`, `phone_number2`, `email`, `address`, `note`, `company_type`, `company_fields`, `company_code`, `company_phone_number`, `company_name`, `company_email`, `company_website`, `group`, `source`, `created_at`, `updated_at`) VALUES
(1, 'KH0001', 'tc', 'Nguyễn Hùng Cường', 'nam', '1986-07-27 17:00:00', '0974361866', '0974361811', 'hungcuongqn86@gmail.com', '56/46, Lê Văn Hiến, Đức Thắng, Bắc Từ Liêm, Hà Nội', 'note', 'tnhh', 'xuatban', 'DN00022255588', '09865822444', 'Leadsgen', 'leadsgen@asa.com', 'www.leadsgen.vn', 'sach', 'sale', '2017-09-29 17:00:00', '2017-09-29 17:00:00'),
(2, 'KH0002', 'tc', 'Nguyễn Hùng Cường', 'nam', '2017-09-20 17:00:00', '0987455666', '0987555444', 'hungcuongqn86@gmail.com', 'Hà Nội', 'ghi chusss', 'tnhh', 'xuatban', '09998883232', '0436558999', 'công ty abc', 'hungcuongqn86@gmail.com', 'www.abc.vn', 'sach', 'sale', NULL, NULL);
";
        // echo $sql;exit;
        DB::unprepared($sql);
    }
}
