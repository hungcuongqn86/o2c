<?php
namespace App\Entities;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Lists extends BaseEntity
{
    use Notifiable;

    protected $table = 'tbl_lists';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'listtype_code',
        'code',
        'name',
        'enabled'
    ];

    protected $hidden = [
    ];
}