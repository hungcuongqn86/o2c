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
        'color_config',
        'paper_type_config',
        'number_page',
        'hardcover',
        'annex',
        'sheet_hung',
        'outsource_type_config',
        'enabled'
    ];

    protected $hidden = [
    ];
}