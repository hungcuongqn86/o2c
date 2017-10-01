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
        $sql = "INSERT INTO `tbl_lists` (`id`, `listtype_code`, `code`, `name`, `enabled`, `created_at`, `updated_at`) VALUES
(1, 'department', 'PKHTH', 'Phòng Kế hoạch - Tổng hợp', 1, NULL, NULL),
(2, 'department', 'PXTKCB', 'PX. THIẾT KẾ - CHẾ BẢN', 1, NULL, NULL),
(6, 'unit', 'Laborum quam a.', 'Expedita voluptatem omnis blanditiis veritatis.', 1, NULL, NULL),
(7, 'unit', 'Consequatur.', 'Nemo distinctio quia earum natus neque earum id. Ad repellat corrupti suscipit commodi.', 0, NULL, NULL),
(8, 'unit', 'Saepe eos commodi.', 'Fugit id quis sed. Quibusdam incidunt nam minima. Fugiat distinctio hic est suscipit quia.', 0, NULL, NULL),
(9, 'unit', 'Sapiente temporibus.', 'Tempora ea qui tempora iusto non. Ipsa quis magnam optio eligendi nostrum inventore.', 0, NULL, NULL),
(10, 'unit', 'Omnis quos.', 'Mollitia qui officia veritatis perspiciatis sed ut eum.', 1, NULL, NULL),
(11, 'standard', 'Voluptatem rem.', 'Veritatis vel ut aut iure eos molestiae. Ab facere aut quia provident maxime est quidem animi.', 1, NULL, NULL),
(12, 'standard', 'Harum nobis rem id.', 'Eaque animi ut quia ut. At numquam saepe sint voluptate. Amet non vero delectus in doloremque.', 0, NULL, NULL),
(13, 'standard', 'Tempora excepturi.', 'Natus eveniet ad odio odit excepturi ipsa harum. Omnis quo eaque aut quo minima debitis sit.', 1, NULL, NULL),
(14, 'standard', 'Et et est aut.', 'Quia minus numquam animi harum a porro explicabo. Aut voluptatem voluptate eveniet labore.', 1, NULL, NULL),
(15, 'standard', 'Exercitationem.', 'Non suscipit odio qui tempora. Et voluptate quibusdam ad repudiandae ut fuga.', 1, NULL, NULL),
(16, 'cach_gia_cong', 'Aut dicta provident.', 'Cán bóng', 1, NULL, NULL),
(17, 'cach_gia_cong', 'Enim eaque.', 'Cán mờ', 1, NULL, NULL),
(18, 'cach_gia_cong', 'Laborum dolorum.', 'Ép nhũ', 1, NULL, NULL),
(19, 'cach_gia_cong', 'Provident dolorem.', 'Khâu chỉ', 1, NULL, NULL),
(20, 'cach_gia_cong', 'Magnam laboriosam.', 'Dán chỉ cách trang', 1, NULL, NULL),
(21, 'packing', 'Blanditiis eligendi.', 'Accusantium numquam dignissimos voluptatem odio voluptatibus molestiae reiciendis ut.', 0, NULL, NULL),
(22, 'packing', 'Rerum alias minus.', 'Harum sit aut aut saepe sit. Soluta doloremque esse accusamus ut repudiandae nisi.', 0, NULL, NULL),
(23, 'packing', 'Placeat harum.', 'Quo perferendis optio fugiat molestias distinctio at.', 0, NULL, NULL),
(24, 'packing', 'Atque animi saepe.', 'Qui harum nam vel adipisci quaerat quisquam.', 1, NULL, NULL),
(25, 'packing', 'Blanditiis minus.', 'Est est amet cumque occaecati nihil debitis. Architecto ducimus quia molestiae omnis vitae.', 1, NULL, NULL),
(26, 'mold', 'Esse et quae soluta.', 'A reiciendis ipsam est. Adipisci a consequuntur ut rerum.', 0, NULL, NULL),
(27, 'mold', 'Dolores voluptatem.', 'Non magnam non et ut et sit optio ullam. Quam fugit ex perferendis autem quo.', 0, NULL, NULL),
(28, 'mold', 'Aut mollitia.', 'Ex incidunt assumenda possimus sunt. Quas sint officia veniam.', 0, NULL, NULL),
(29, 'mold', 'Dignissimos esse.', 'Enim quas corporis laborum veritatis saepe error odio. Odio impedit quos quo neque.', 1, NULL, NULL),
(30, 'mold', 'Ut sed veritatis.', 'Illo totam et iusto eveniet omnis eius ut voluptas. Ut excepturi ex aliquid voluptatum.', 0, NULL, NULL),
(31, 'number_hand', 'Laudantium ut quam.', 'Quae nam ut molestias et aut. In ad aliquam in occaecati est perferendis maiores.', 0, NULL, NULL),
(32, 'number_hand', 'Rerum quibusdam et.', 'Delectus aliquam molestias ducimus itaque ipsam. Eos eum qui consequatur nisi.', 0, NULL, NULL),
(33, 'number_hand', 'Impedit adipisci.', 'Modi autem incidunt non minima. Laboriosam quia eligendi sunt aut minus.', 0, NULL, NULL),
(34, 'number_hand', 'Mollitia animi est.', 'Voluptatem dolore omnis aut assumenda possimus pariatur sint aut.', 1, NULL, NULL),
(35, 'number_hand', 'Dolores repellendus.', 'Natus qui voluptas unde. Molestiae laboriosam magnam atque laboriosam exercitationem magni.', 1, NULL, NULL),
(36, 'print_type', 'Nulla velit tempora.', 'Ipsum quis unde deserunt nulla ut id. Ea consequatur suscipit commodi non.', 0, NULL, NULL),
(37, 'print_type', 'Occaecati iusto.', 'Molestiae ducimus ea vero voluptatem eum quisquam eos. Eius et voluptatem cum sed.', 1, NULL, NULL),
(38, 'print_type', 'Error.', 'Ratione quo tenetur molestiae voluptate eaque.', 0, NULL, NULL),
(39, 'print_type', 'Deleniti.', 'Corrupti quis molestias dolores alias quisquam quia. Ut fugit cupiditate aut nisi labore.', 1, NULL, NULL),
(40, 'print_type', 'Ab rerum ut ut et.', 'Est placeat quia quia quam qui perferendis inventore voluptas.', 1, NULL, NULL),
(41, 'print_size', 'Facilis nemo.', 'Tempora fuga nemo facilis laborum quam. Illo adipisci facilis voluptates et.', 0, NULL, NULL),
(42, 'print_size', 'Est pariatur quia.', 'Qui rem incidunt nobis nihil cum rem consequuntur minus.', 0, NULL, NULL),
(43, 'print_size', 'Perspiciatis.', 'Sit eaque aut aut dicta. Incidunt at culpa blanditiis. Perspiciatis aliquid earum totam voluptas.', 1, NULL, NULL),
(44, 'print_size', 'Dolor et mollitia.', 'Molestiae quod ex qui sit doloribus quo omnis.', 0, NULL, NULL),
(45, 'print_size', 'Asperiores quia.', 'Vel praesentium quia vero vel vero aut. Deleniti ut qui aut nemo eveniet et ipsam.', 0, NULL, NULL),
(46, 'mau_in', '4/4', '4/4', 1, NULL, NULL),
(47, 'mau_in', '3/3', '3/3', 1, NULL, NULL),
(48, 'mau_in', '2/2', '2/2', 1, NULL, NULL),
(49, 'mau_in', '1/1', '1/1', 1, NULL, NULL),
(50, 'mau_in', '4/0', '4/0', 1, NULL, NULL),
(51, 'zinc_type', 'CTP', 'CTP', 1, NULL, NULL),
(53, 'zinc_type', 'M8', 'M8', 1, NULL, NULL),
(56, 'machine', 'Est reprehenderit.', 'Nostrum rerum asperiores voluptate. Itaque enim placeat sit id et quo.', 1, NULL, NULL),
(57, 'machine', 'Vel consectetur qui.', 'Cumque eligendi eos qui dolores. Vero facilis error modi. Voluptatem et aliquid enim dolor vitae.', 0, NULL, NULL),
(58, 'machine', 'Dolores sint sint.', 'Ab voluptatem et quia sed labore consequatur placeat.', 0, NULL, NULL),
(59, 'machine', 'A est est.', 'Rerum iure repellendus rerum quia ut delectus dolor.', 0, NULL, NULL),
(60, 'machine', 'Voluptatem aliquam.', 'Consequuntur facilis facere expedita voluptatem dicta quod repudiandae vero.', 0, NULL, NULL),
(66, 'size_store', 'Qui qui ut ex.', 'Facilis similique omnis aut pariatur. Adipisci odit ut officia distinctio.', 0, NULL, NULL),
(67, 'size_store', 'Ipsum ipsum.', 'Qui quibusdam autem est. Non error aliquam qui odio est voluptatibus.', 1, NULL, NULL),
(68, 'size_store', 'Veritatis nihil aut.', 'Laboriosam aut eum dolores laudantium voluptatem fugiat qui ducimus.', 0, NULL, NULL),
(69, 'size_store', 'Et occaecati ipsa.', 'Dolores voluptatem deleniti repellendus doloribus aliquam qui voluptas.', 0, NULL, NULL),
(70, 'size_store', 'Sit ullam qui.', 'Omnis voluptate autem veniam rem maxime quos fugiat.', 1, NULL, NULL),
(71, 'cut_type', 'Omnis rerum iusto.', 'Corrupti vero soluta possimus porro ducimus cumque laboriosam.', 0, NULL, NULL),
(72, 'cut_type', 'Illo cum labore.', 'Ut quo assumenda qui fugit quis. Minus recusandae non sed harum qui in velit officia.', 1, NULL, NULL),
(73, 'cut_type', 'Magni officia velit.', 'Dolore et magni nihil natus voluptatem architecto ratione dolor. Vero omnis aliquam rem eos.', 0, NULL, NULL),
(74, 'cut_type', 'Tempora cupiditate.', 'Alias earum debitis sit non qui repellendus. Cum dolores ut consequatur in eligendi.', 0, NULL, NULL),
(75, 'cut_type', 'Neque in illum.', 'Corrupti natus eius veniam quaerat rerum suscipit.', 1, NULL, NULL),
(76, 'number_char', 'Ea et iure unde.', 'Quia sit adipisci distinctio fugiat. Aut nisi maxime ut tempora voluptates nostrum.', 1, NULL, NULL),
(77, 'number_char', 'In accusantium.', 'Enim quisquam consequatur reprehenderit officia corrupti voluptas a est.', 1, NULL, NULL),
(78, 'number_char', 'Sed maiores qui.', 'Vel iste neque praesentium similique laudantium molestiae voluptatem.', 0, NULL, NULL),
(79, 'number_char', 'Id delectus rerum.', 'Consequuntur nihil aut doloribus minus. Ipsum placeat ut quasi iusto.', 1, NULL, NULL),
(80, 'number_char', 'Consequatur ex.', 'Qui sunt illo fuga. Minus dolorem odit eveniet perspiciatis excepturi quis deserunt.', 0, NULL, NULL),
(81, 'cach_gia_cong', 'DGC1', 'Chỉ đầu', 1, NULL, NULL),
(82, 'department', 'ADMIN', 'ADMIN', 1, NULL, NULL);";
        // echo $sql;exit;
        DB::unprepared($sql);
    }
}
