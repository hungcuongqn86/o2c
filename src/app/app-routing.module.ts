import {ModuleWithProviders}         from '@angular/core';
import {Routes, RouterModule}  from '@angular/router';
import {RecordComponent} from './record/record.component';
import {ListComponent} from './list/list.component';
import {UserComponent} from './user/user.component';
import {CustomerComponent} from  './customer/customer.component';
import {ErrorComponent} from './error/error.component';

const appRoutes: Routes = [
    {path: '', loadChildren: './contract/contract.module#ContractModule'},
    {path: 'index', loadChildren: './contract/contract.module#ContractModule'},
    {path: 'contract', loadChildren: './contract/contract.module#ContractModule'},
    {path: 'list', component: ListComponent},
    {path: 'user', component: UserComponent},
    {path: 'customer', component: CustomerComponent},
    {path: 'record', component: RecordComponent},
    {path: 'element', loadChildren: './element/element.module#ElementModule'},
    {path: 'producttype', loadChildren: './producttype/producttype.module#ProducttypeModule'},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
