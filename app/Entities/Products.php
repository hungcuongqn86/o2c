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
        'count',
        'long',
        'large',
        'high',
        'cover_color',
        'inside_color',
        'cover_paper_type',
        'inside_paper_type',
        'standard',
        'number_page',
        'hardcover',
        'number_page_annex',
        'inside_color_annex',
        'inside_paper_type_annex',
        'sheet_hung',
        'outsource_type'
    ];

    protected $hidden = [
    ];
}