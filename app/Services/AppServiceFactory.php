<?php
namespace App\Services;

use App\Services\Impl\AuthService;
use App\Services\Impl\CategorysService;
use App\Services\Impl\LocalsService;
use App\Services\Impl\UsersService;

class AppServiceFactory {
	protected static $mUsersService;
	public static function mUsersService() {
		if (self::$mUsersService == null) {
			self::$mUsersService = new UsersService();
		}
		return self::$mUsersService;
	}

	protected static $mAuthService;
	public static function mAuthService() {
		if (self::$mAuthService == null) {
			self::$mAuthService = new AuthService();
		}
		return self::$mAuthService;
	}

	protected static $mLocalService;
	public static function mLocalService() {
		if (self::$mLocalService == null) {
			self::$mLocalService = new LocalsService();
		}
		return self::$mLocalService;
	}

	protected static $mCategoryService;
	public static function mCategoryService() {
		if (self::$mCategoryService == null) {
			self::$mCategoryService = new CategorysService();
		}
		return self::$mCategoryService;
	}
}
