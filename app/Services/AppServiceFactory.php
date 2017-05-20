<?php
namespace App\Services;

use App\Entities\Customers;
use App\Services\Impl\ListsService;
use App\Services\Impl\UsersService;
use App\Services\Impl\ContractService;
use App\Services\Impl\CustomersService;
use App\Services\Impl\ProducttypeService;

class AppServiceFactory {
	protected static $mListsService;
	public static function mListsService() {
		if (self::$mListsService == null) {
			self::$mListsService = new ListsService();
		}
		return self::$mListsService;
	}

    protected static $mUsersService;
    public static function mUsersService() {
        if (self::$mUsersService == null) {
            self::$mUsersService = new UsersService();
        }
        return self::$mUsersService;
    }

    protected static $mCustomerService;
    public static function mCustomerService() {
        if (self::$mCustomerService == null) {
            self::$mCustomerService = new CustomersService();
        }
        return self::$mCustomerService;
    }

    protected static $mContractService;
    public static function mContractService() {
        if (self::$mContractService == null) {
            self::$mContractService = new ContractService();
        }
        return self::$mContractService;
    }

    protected static $mProducttypeService;
    public static function mProducttypeService() {
        if (self::$mProducttypeService == null) {
            self::$mProducttypeService = new ProducttypeService();
        }
        return self::$mProducttypeService;
    }
}
