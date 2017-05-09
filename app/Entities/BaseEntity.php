<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class BaseEntity extends Model {
	/**
	 * @var bool
	 */
	public $skip = false;

	public function __construct($attributes = []) {
		parent::__construct($attributes);
	}

	public static function getTableName() {
		return with(new static )->getTable();
	}

	protected static function boot() {
		static::saving(function ($model) {

			return true;
		});
	}
}