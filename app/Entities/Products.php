<?php

namespace App\Entities;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Products extends BaseEntity
{
    use Notifiable;

    protected $table = 'tbl_products';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'contract_id',
        'producttype_code',
        'name',
        'description',
        'count',
        'long',
        'large',
        'high',
        'elements'
    ];

    protected $hidden = [
    ];

    public function Producttypes()
    {
        return $this->belongsTo(Producttypes::class, 'producttype_code', 'code');
    }
}