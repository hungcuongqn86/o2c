<?php
namespace App\Entities;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Customers extends BaseEntity
{
    use Notifiable;

    protected $table = 'tbl_customers';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];

    protected $hidden = [
    ];
}