<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ListTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(tblElementPropertiesSeeder::class);
        $this->call(CustomersTableSeeder::class);
        $this->call(ContractsTableSeeder::class);
        $this->call(ProducttypesTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
    }
}
