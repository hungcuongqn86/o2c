<?php

return [
    'ARRAY_LISTTYPE' => [
        ['code' => 'department', 'name' => 'LISTTYPE.department'],
        ['code' => 'cach_gia_cong', 'name' => 'LISTTYPE.outsourcing'],
        ['code' => 'loai_giay', 'name' => 'LISTTYPE.paper_type']
    ],
    'properties' => [
        'loai_giay' => [
            'id' => 'loai_giay',
            'type' => 'select',
            'datatype' => 'function',
            'lable' => 'Loại giấy',
            'visible' => true
        ],
        'mau_in' => [
            'id' => 'mau_in',
            'type' => 'select',
            'datatype' => 'list',
            'lable' => 'Số màu in',
            'visible' => true
        ],
        'so_trang' => [
            'id' => 'so_trang',
            'type' => 'text',
            'datatype' => 'list',
            'lable' => 'Số trang',
            'visible' => true
        ],
        'bia_cung' => [
            'id' => 'bia_cung',
            'type' => 'check',
            'datatype' => 'list',
            'lable' => 'Bìa cứng',
            'visible' => true
        ],
        'cach_gia_cong' => [
            'id' => 'cach_gia_cong',
            'type' => 'mcheck',
            'datatype' => 'list',
            'lable' => 'Cách gia công',
            'visible' => true
        ],
        'kho_giay' => [
            'id' => 'kho_giay',
            'type' => 'mcheck',
            'datatype' => 'function',
            'lable' => 'Khổ giấy',
            'visible' => false
        ]
    ],

    'element' => [
        [
            'id' => 'ruot'
            , 'name' => 'ruột'
            , 'properties' => 'so_trang,loai_giay,mau_in,kho_giay'
        ],
        [
            'id' => 'bia'
            , 'name' => 'bìa'
            , 'properties' => 'loai_giay,mau_in,bia_cung,cach_gia_cong,kho_giay'
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
    ]
];