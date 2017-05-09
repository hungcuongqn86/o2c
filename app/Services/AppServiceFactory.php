<?php
namespace App\Services;

use App\Services\Impl\ListsService;

class AppServiceFactory {
	protected static $mListsService;
	public static function mUsersService() {
		if (self::$mListsService == null) {
			self::$mListsService = new ListsService();
		}
		return self::$mListsService;
	}
}
