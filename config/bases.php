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
            'lable' => 'Loại giấy'
        ],
        'mau_in' => [
            'id' => 'mau_in',
            'type' => 'select',
            'lable' => 'Số màu in'
        ],
        'so_trang' => [
            'id' => 'so_trang',
            'type' => 'text',
            'lable' => 'Số trang'
        ],
        'bia_cung' => [
            'id' => 'bia_cung',
            'type' => 'check',
            'lable' => 'Bìa cứng'
        ],
        'cach_gia_cong' => [
            'id' => 'cach_gia_cong',
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

    'command' => [
        [
            'id' => 'tckh'
            , 'name' => 'Lệnh tổng hợp của phòng TCKH'
        ],
        [
            'id' => 'tkcb'
            , 'name' => 'Lệnh thiết kế, chế bản'
        ],
        [
            'id' => 'cat_giay'
            , 'name' => 'Lệnh cắt giấy trắng'
        ],
        [
            'id' => 'may_in'
            , 'name' => 'Lệnh máy in'
        ],
        [
            'id' => 'gia_cong_sau_in'
            , 'name' => 'Lệnh gia công sau in'
        ]
    ]
];