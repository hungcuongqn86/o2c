<?php

return [
    'properties' => [
        'loai_giay' => [
            'type' => 'select',
            'lable' => 'Loại giấy'
        ],
        'mau_in' => [
            'type' => 'select',
            'lable' => 'Số màu in'
        ],
        'so_trang' => [
            'type' => 'text',
            'lable' => 'Số trang'
        ],
        'bia_cung' => [
            'type' => 'check',
            'lable' => 'Bìa cứng'
        ],
        'cach_gia_cong' => [
            'type' => 'mcheck',
            'lable' => 'Cách gia công'
        ]
    ],

    'element' => [
        [
            'id' => 'ruot'
            , 'name' => 'ruột'
            , 'properties' => 'so_trang,loai_giay,mau_in'
        ],
        [
            'id' => 'bia'
            , 'name' => 'bìa'
            , 'properties' => 'loai_giay,mau_in,bia_cung,cach_gia_cong'
        ],
        [
            'id' => 'gay'
            , 'name' => 'gáy'
            , 'properties' => 'cach_gia_cong'
        ],
        [
            'id' => 'to_gac'
            , 'name' => 'tờ gác'
            , 'properties' => 'so_trang,loai_giay,mau_in'
        ],
        [
            'id' => 'phu_ban'
            , 'name' => 'phụ bản'
            , 'properties' => 'so_trang,loai_giay,mau_in'
        ]
    ],
];