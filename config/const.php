<?php
/*
|--------------------------------------------------------------------------
| CONSTANTS
|--------------------------------------------------------------------------
|   1. dd(YOUR_DEFINED_CONST);
|   2. dd(config('const.test'));
 */

return [
	'ARRAY_LISTTYPE' => [
		['code' => 'department', 'name' => 'LISTTYPE.department'],
		['code' => 'unit', 'name' => 'LISTTYPE.unit'],
        ['code' => 'standard', 'name' => 'LISTTYPE.standard'],
        ['code' => 'outsourcing', 'name' => 'LISTTYPE.outsourcing'],
        ['code' => 'packing', 'name' => 'LISTTYPE.packing'],
        ['code' => 'mold', 'name' => 'LISTTYPE.mold'],
        ['code' => 'number_hand', 'name' => 'LISTTYPE.number_hand'],
        ['code' => 'print_type', 'name' => 'LISTTYPE.print_type'],
        ['code' => 'print_size', 'name' => 'LISTTYPE.print_size'],
        ['code' => 'print_color', 'name' => 'LISTTYPE.print_color'],
        ['code' => 'zinc_type', 'name' => 'LISTTYPE.zinc_type'],
        ['code' => 'machine', 'name' => 'LISTTYPE.machine'],
        ['code' => 'paper_type', 'name' => 'LISTTYPE.paper_type'],
        ['code' => 'size_store', 'name' => 'LISTTYPE.size_store'],
        ['code' => 'cut_type', 'name' => 'LISTTYPE.cut_type'],
        ['code' => 'number_char', 'name' => 'LISTTYPE.number_char']
	],

    'ARRAY_MENU' => [
        ['name' => 'SIDEBAR.DASHBOARD', 'icon' => 'fa fa-dashboard', 'uri' => 'index',],
        ['name' => 'SIDEBAR.CUSTOMER', 'icon' => 'fa fa-address-card', 'uri' => 'customer'],
        ['name' => 'SIDEBAR.CONTRACT', 'icon' => 'fa fa-th', 'uri' => 'contract'],
        ['name' => 'SIDEBAR.FOLLOW', 'icon' => 'fa fa fa-sliders', 'uri' => 'follow'],
        ['name' => 'SIDEBAR.WAREHOUSE', 'icon' => 'fa fa fa-th-large', 'uri' => 'warehouse'],
        ['name' => 'SIDEBAR.RECORD', 'icon' => 'fa fa fa-archive', 'uri' => 'record'],
        ['name' => 'SIDEBAR.REPORT', 'icon' => 'fa fa-list-alt', 'uri' => 'report'],
        ['name' => 'SIDEBAR.PRODUCT_TYPE', 'icon' => 'fa fa-server', 'uri' => 'producttype'],
        ['name' => 'SIDEBAR.USER', 'icon' => 'fa fa-user-circle-o', 'uri' => 'user'],
        ['name' => 'SIDEBAR.LIST_SYS', 'icon' => 'fa fa-table', 'uri' => 'list'],
    ],

    'LIMIT_PER_PAGE' => 15,

    'ROLE' => [
        ['code' => 'ADMIN', 'name' => 'ROLE.ADMIN'],
        ['code' => 'MANAGER1', 'name' => 'ROLE.MANAGER1'],
        ['code' => 'MANAGER2', 'name' => 'ROLE.MANAGER2'],
        ['code' => 'MANAGER3', 'name' => 'ROLE.MANAGER3'],
        ['code' => 'PERSONNEL1', 'name' => 'ROLE.PERSONNEL1'],
        ['code' => 'PERSONNEL2', 'name' => 'ROLE.PERSONNEL2'],
    ]
];