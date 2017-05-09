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
		['id' => 0, 'name' => 'USER.SUPPER_ADMIN'],
		['id' => 1, 'name' => 'USER.ADMIN_BASE'],
		['id' => 2, 'name' => 'USER.RECEIVER'],
		['id' => 3, 'name' => 'USER.USER_COMMON'],
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
    ]
];