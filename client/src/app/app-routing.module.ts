import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth-guard";
import {MenuComponent} from "./menu/menu.component";
import {MenuCreateComponent} from "./menu-create/menu-create.component";
import {DailyOrdersComponent} from "./daily-orders/daily-orders.component";
import {AllCompaniesDailyOrdersComponent} from "./all-companies-daily-orders/all-companies-daily-orders.component";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent },

    {path: '', canActivate:[AuthGuard], children: [
            {path: 'index', component: IndexComponent},
            {path: 'menu', component: MenuComponent},
            {path: 'menuCreate', component: MenuCreateComponent},
            {path: 'dailyOrders', component: DailyOrdersComponent},
            {path: 'allCompaniesDailyOrdersComponent', component: AllCompaniesDailyOrdersComponent}
        ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}