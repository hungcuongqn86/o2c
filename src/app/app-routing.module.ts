import {ModuleWithProviders}         from '@angular/core';
import {Routes, RouterModule}  from '@angular/router';
import {IndexComponent} from './index/index.component';
import {RecordComponent} from './record/record.component';
import {ListComponent} from './list/list.component';
import {UserComponent} from './user/user.component';
import {CustomerComponent} from  './customer/customer.component';
import {ContractComponent} from  './contract/contract.component';

const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'index', component: IndexComponent},
    {path: 'contract', component: ContractComponent},
    {path: 'list', component: ListComponent},
    {path: 'user', component: UserComponent},
    {path: 'customer', component: CustomerComponent},
    {path: 'record', component: RecordComponent},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
