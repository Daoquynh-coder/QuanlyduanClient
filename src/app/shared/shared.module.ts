import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LoaderComponent } from "./loader/loader.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Select2Module } from "ng2-select2";
import { AutofocusDirective, TooltipDirective } from "./directives";
import { FieldErrorsComponent } from "@app/shared/components/form-errors";
import { DropdownBoxComponent } from "@app/shared/user-controls/dropdown-box/dropdown-box.component";
import { DataTableComponent } from "@app/shared/user-controls/data-table/data-table.component";
import { ConfirmationPopupComponent } from "@app/shared/user-controls/confirmation-popup/confirmation-popup.component";
import { DatePickerComponent } from "@app/shared/user-controls/date-picker/date-picker.component";
import { MatMenuModule } from "@angular/material/menu";
import { LoginControlComponent } from "@app/shared/user-controls/login/login-control.component";
import { ResetPasswordComponent } from "@app/shared/user-controls/login/reset-password/reset-password.component";
import { ForgotPasswordComponent } from "@app/shared/user-controls/login/forgot-password/forgot-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupControlComponent } from "@app/shared/user-controls/signup/signup-control.component";
import { MatSelectModule } from "@angular/material/select";
import { RegisterComponent } from "@app/shared/user-controls/signup/register/register.component";
import { AppBreadcrumbsComponent } from "../shared/layout/app-breadcrumbs/app-breadcrumbs.component";
import { AppMenuLeftComponent } from "../shared/layout/app-menu-left/app-menu-left.component";
import { AppTableComponent } from "../shared/layout/app-table/app-table.component";
import { RouterModule } from "@angular/router";
import { PanigationComponent } from "./layout/panigation/panigation.component";
import { AppMenuAdminComponent } from "./layout/app-menu-admin/app-menu-admin.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { SidebarCmpComponent } from './sidebar-cmp/sidebar-cmp/sidebar-cmp.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TranslateModule,
    Select2Module,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule,
  ],
  declarations: [
    LoaderComponent,
    DropdownBoxComponent,
    DataTableComponent,
    ConfirmationPopupComponent,
    AutofocusDirective,
    TooltipDirective,
    FieldErrorsComponent,
    DatePickerComponent,
    LoginControlComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SignupControlComponent,
    RegisterComponent,
    AppBreadcrumbsComponent,
    AppMenuLeftComponent,
    AppTableComponent,
    PanigationComponent,
    AppMenuAdminComponent,
    SidebarCmpComponent,
    NavbarComponent,
  ],
  exports: [
    LoaderComponent,
    DropdownBoxComponent,
    DataTableComponent,
    ConfirmationPopupComponent,
    AutofocusDirective,
    TooltipDirective,
    FieldErrorsComponent,
    DatePickerComponent,
    LoginControlComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SignupControlComponent,
    RegisterComponent,
    AppBreadcrumbsComponent,
    AppMenuLeftComponent,
    AppTableComponent,
    PanigationComponent,
    AppMenuAdminComponent,
  ],
  entryComponents: [LoginControlComponent],
})
export class SharedModule {
  // constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
  //   // Import guard
  //   if (parentModule) {
  //     throw new Error(`${parentModule} has already been loaded. Import SharedModule in the AppModule only.`);
  //   }
  // }
}
