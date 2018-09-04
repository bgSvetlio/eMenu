import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {AuthGuard} from "./auth-guard";
import {AuthService} from "./auth.service";
import {JwtHelper} from "angular2-jwt";
import {AuthInterceptor} from "./auth-interceptor";
import { MenuComponent } from './menu/menu.component';
import {MenuService} from "./menu.service";
import { MenuCreateComponent } from './menu-create/menu-create.component';
import {
    AccordionModule,
    CalendarModule,
    CheckboxModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule, PasswordModule
} from "primeng/primeng";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DishCardComponent } from './dish-card/dish-card.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import { DishCardCreateComponent } from './dish-card-create/dish-card-create.component';
import { DailyOrdersComponent } from './daily-orders/daily-orders.component';
import {OrdersService} from "./orders.service";
import { AllCompaniesDailyOrdersComponent } from './all-companies-daily-orders/all-companies-daily-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    MenuCreateComponent,
    DishCardComponent,
    DishCardCreateComponent,
    DailyOrdersComponent,
    AllCompaniesDailyOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
      AccordionModule,
      BrowserAnimationsModule,
      CardModule,
      CheckboxModule,
      CalendarModule,
      ButtonModule,
      InputTextModule,
      InputTextareaModule,
      FileUploadModule,
      PasswordModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService,  AuthGuard, AuthService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, JwtHelper, MenuService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
