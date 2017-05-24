<?php

namespace App\Entities;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class ElementProperties extends BaseEntity
{
    use Notifiable;

    protected $table = 'tbl_element_properties';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'element_code',
        'properties_code',
        'list_code'
    ];

    protected $hidden = [
    ];
}