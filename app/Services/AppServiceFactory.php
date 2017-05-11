<?php
namespace App\Services;

use App\Services\Impl\ListsService;
use App\Services\Impl\UsersService;

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
}
