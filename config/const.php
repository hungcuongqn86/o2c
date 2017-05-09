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
        ['id' => 0, 'name' => 'SIDEBAR.DASHBOARD', 'icon' => 'fa-dashboard',
            'child' => [
                ['id' => 1, 'name' => 'SIDEBAR.WORK_PROCESS', 'icon' => 'fa-circle-o'],
                ['id' => 2, 'name' => 'SIDEBAR.WORK_GENERAL', 'icon' => 'fa-circle-o'],
            ]
        ],
        ['id' => 3, 'name' => 'SIDEBAR.LIST_SYS', 'icon' => 'fa-table'],
    ]
];