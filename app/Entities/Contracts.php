<?php

namespace App\Entities;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Contracts extends BaseEntity
{
    use Notifiable;

    protected $table = 'tbl_contracts';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'code',
        'signdate',
        'customer_id',
        'content',
        'value',
        'durationdate',
        'product_name',
        'number',
        'unit',
        'standard',
        'outsourcing',
        'packing',
        'success_date',
        'image',
        'note'
    ];

    protected $hidden = [
    ];

    public function Customers()
    {
        return $this->belongsTo(Customers::class, 'customer_id', 'id');
    }
}