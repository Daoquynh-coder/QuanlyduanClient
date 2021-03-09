import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { finalize, first } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "@env/environment";
import { Logger, I18nService, AuthenticationService } from "@app/core";
import { AppHeaderComponent } from "../../layout";
import { ToastrService } from "ngx-toastr";
import { UtilityService } from "../../../core/services/utility.service";
import { MatDialog } from "@angular/material/dialog";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { InsertDataSignupSuccess } from "../../../core/models/signup";
import { ThrowStmt } from "@angular/compiler";
import { of, Subscription } from "rxjs";
import { ReferralLinkService } from "../../../core/services/referral-link.service";
import { GetProjectViewService } from '../../../core/services/get-project-view.service';
const log = new Logger("Login");

@Component({
  selector: "app-login-control",
  templateUrl: "./login-control.component.html",
  styleUrls: ["./login-control.component.scss"],
})
export class LoginControlComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  providers = environment.providersSocial;

  statusDisplayForgotPass: boolean = false;

  statusHideShowPass: boolean = false;

  statusDisplaySignup: boolean = false;

  submitted = false;

  errorMessage: string;
  subscription1 = new Subscription();
  subscription2 = new Subscription();
  subscription3 = new Subscription();
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private afAuth: AngularFireAuth,
    public authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private referralLinkService: ReferralLinkService,
    private GetProjectViewService: GetProjectViewService
  ) {
    this.createFormLogin();
  }

  ngOnInit() {
    this.displayScrSignupAfterInviteCode();
  }

  ngOnDestroy(): void {
    this.statusDisplayForgotPass = false;
    this.statusDisplaySignup = false;
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  displayScrSignupAfterInviteCode() {
    this.subscription3 = this.referralLinkService.statusDisplaySignup$.subscribe((res: boolean) => {
      if (!res) {
        return of(false);
      } else {
        this.statusDisplaySignup = res;
        this.subscription3.unsubscribe();
      }
    });
  }

  async handleSignInWithModeAndProvider(provider: string): Promise<void> {
    // action open modal login gg/fb
    await this.authenticationService.signInSocialOptions(provider);
    await this.catchCheckLoginWithSocialToSv(provider);
  }

  catchCheckLoginWithSocialToSv(provider: string): void {
    this.subscription1 = this.authenticationService.statusLoginSocial$.subscribe((res) => {
      if (res === "3") {
        this.errorMessage = "Đã xảy ra lỗi, vui lòng thử lại sau!!";
        this.toastr.error(this.errorMessage, "");
      } else {
        this.handleLoginWithSocial(provider);
      }
    });
  }

  handleLoginWithSocial(provider: string) {
    const userName: any = null;
    const password: any = null;
    this.authenticationService.loginWithSocial(userName, password, provider).subscribe(
      async (res: any) => {
        if (res.status) {
          await this.checkRes(res);
          await this.catchStatusLoginWithSocialOptions();
        } else {
          this.errorMessage = "Đã xảy ra lỗi, vui lòng thử lại sau!!";
          this.toastr.error(this.errorMessage, "");
        }
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage, "");
      }
    );
  }

  checkRes(res: any) {
    let token = res.data.token;
    if (token) {
      this.authenticationService.decodeTokenToServer(token);
      this.authenticationService.setStatusLoginSocial("1");
      this.authenticationService.setStatusLoginSocial("-1");
    } else {
      this.authenticationService.setInfoUserInData(res.data);
      this.authenticationService.setStatusLoginSocial("0");
      this.authenticationService.setStatusLoginSocial("-1");
    }
  }

  catchStatusLoginWithSocialOptions(): void {
    this.subscription2 = this.authenticationService.statusLoginSocial$.subscribe((status) => {
      if (status === "1") {
        this.authenticationService.dialogRef.close(true);
        this.authenticationService.onAuth(true);
        this.toastr.success("Đăng nhập thành công", "");
      } else if (status === "0") {
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
        this.statusDisplaySignup = true;
        // this.errorMessage = "Tài khoản này chưa được đăng ký, vui lòng hoàn tất đăng ký để tạo tài khoản!";
        // this.toastr.warning(this.errorMessage, "Error");
      } else {
        console.log(status);
      }
    });
  }

  handleDisplayForgotPassScr(): void {
    this.statusDisplayForgotPass = true;
  }

  handleCloseModal(): void {
    this.authenticationService.dialogRef.close();
  }

  forceLogout() { }

  // redirectToHomepage() {
  //   if (this.authenticationService.isAuthenticated()) {
  //     this.router.navigate(['/'], { replaceUrl: true });
  //     return;
  //   }
  // }

  handleLogin(e: any): any {
    this.submitted = true;
    const token: any = null;
    const socialType: any = null;
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.authenticationService.dialogRef.close(true);
            this.authenticationService.onAuth(true);
            this.authenticationService.decodeTokenToServer(res.token)
            this.toastr.success("Đăng nhập thành công", "");
            // AppHeaderComponent.updateUserStatus.next(true);
            this.router.navigate['/'];
          } else {
            this.toastr.error(res.message, '')
            // this.toastr.error(this.translateService.instant('System.PIMS_LABEL_0199'), 'Error');
          }
        },
        (error: any) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage, "Lỗi", {
            extendedTimeOut: 1000,
          });
        }
      );
  }

  handleHideShowPassword(): void {
    this.statusHideShowPass = !this.statusHideShowPass;
  }

  get f() {
    return this.loginForm.controls;
  }

  private createFormLogin(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.compose([Validators.required, Validators.minLength(4)])],
    });
  }
}
