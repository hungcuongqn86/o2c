<?php
namespace App\Services;

use App\Services\Impl\ListsService;
use App\Services\Impl\UsersService;
use App\Services\Impl\ContractService;

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

    protected static $mContractService;
    public static function mContractService() {
        if (self::$mContractService == null) {
            self::$mContractService = new ContractService();
        }
        return self::$mContractService;
    }
}
