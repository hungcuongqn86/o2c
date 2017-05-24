import {ModuleWithProviders}         from '@angular/core';
import {Routes, RouterModule}  from '@angular/router';
import {IndexComponent} from './index/index.component';
import {RecordComponent} from './record/record.component';
import {ListComponent} from './list/list.component';
import {UserComponent} from './user/user.component';
import {CustomerComponent} from  './customer/customer.component';

const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'index', component: IndexComponent},
    {path: 'contract', loadChildren: './contract/contract.module#ContractModule'},
    {path: 'list', component: ListComponent},
    {path: 'user', component: UserComponent},
    {path: 'customer', component: CustomerComponent},
    {path: 'record', component: RecordComponent},
    {path: 'element', loadChildren: './element/element.module#ElementModule'},
    {path: 'producttype', loadChildren: './producttype/producttype.module#ProducttypeModule'}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
