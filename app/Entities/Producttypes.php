<?php

namespace App\Entities;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Producttypes extends BaseEntity
{
    use Notifiable;

    protected $table = 'tbl_producttypes';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'code',
        'name',
        'size_config',
        'element_config',
        'image',
        'enabled'
    ];

    protected $hidden = [
    ];
}