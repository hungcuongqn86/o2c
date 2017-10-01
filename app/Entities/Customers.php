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
        'code',
        'type',
        'title',
        'name',
        'gender',
        'birthday',
        'phone_number1',
        'phone_number2',
        'email',
        'address',
        'note',
        'company_type',
        'company_fields',
        'company_code',
        'company_phone_number',
        'company_name',
        'company_email',
        'company_website',
        'company_address',
        'group',
        'source'
    ];

    protected $hidden = [
    ];
}