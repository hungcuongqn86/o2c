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
		['code' => 'DEPARTMENT', 'name' => 'LISTTYPE.DEPARTMENT'],
		['code' => 'UNIT', 'name' => 'LISTTYPE.UNIT'],
	],

    'ARRAY_MENU' => [
        ['name' => 'SIDEBAR.DASHBOARD', 'icon' => 'fa fa-dashboard', 'uri' => 'index',
            'child' => [
                ['name' => 'SIDEBAR.WORK_PROCESS', 'icon' => 'fa fa-circle-o', 'uri' => 'dashboard/process'],
                ['name' => 'SIDEBAR.WORK_GENERAL', 'icon' => 'fa fa-circle-o', 'uri' => 'dashboard/general'],
            ]
        ],
        ['name' => 'SIDEBAR.RECORD', 'icon' => 'fa fa-th', 'uri' => 'record'],
        ['name' => 'SIDEBAR.LIST_SYS', 'icon' => 'fa fa-table', 'uri' => 'list'],
        ['name' => 'SIDEBAR.USER', 'icon' => 'fa fa-user-circle-o', 'uri' => 'user'],
    ],
    'LIMIT_PER_PAGE' => 10,
    'ITEM_PER_PAGE_DEFINE' => [
        10,
        25,
        50,
        100,
    ]
];