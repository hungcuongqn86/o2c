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
        ['name' => 'SIDEBAR.CUSTOMER', 'icon' => 'fa fa-address-card', 'uri' => 'customer'],
        ['name' => 'SIDEBAR.CONTRACT', 'icon' => 'fa fa-th', 'uri' => 'contract'],
        ['name' => 'SIDEBAR.FOLLOW', 'icon' => 'fa fa fa-sliders', 'uri' => 'follow'],
        ['name' => 'SIDEBAR.WAREHOUSE', 'icon' => 'fa fa fa-th-large', 'uri' => 'warehouse'],
        ['name' => 'SIDEBAR.RECORD', 'icon' => 'fa fa fa-archive', 'uri' => 'record'],
        ['name' => 'SIDEBAR.REPORT', 'icon' => 'fa fa-list-alt', 'uri' => 'report'],
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