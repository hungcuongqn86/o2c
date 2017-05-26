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

    protected $appends = ['is_img'];

    public function getIsImgAttribute()
    {
        if (isset($this->attributes['image']) && $this->attributes['image'] != '') {
            return base64_encode(urlencode($this->attributes['image']));
        }
        return '';
    }

    protected $hidden = [
    ];
}