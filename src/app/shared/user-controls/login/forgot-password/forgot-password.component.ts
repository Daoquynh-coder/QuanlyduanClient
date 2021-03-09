import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  NgZone,
  ViewChild,
} from "@angular/core";
import { AuthenticationService, WindowService } from "@app/core";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormControl, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Signup } from "../../../../core/models/signup";
import { of, Subscription } from "rxjs";
import { ReferralLinkService } from "../../../../core/services/referral-link.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit, OnDestroy {
  windowRef: any;
  numberPhoneInternational = "";

  @Input() checkRenderTextTitle: boolean;
  @Input() displayHeader: boolean = true;
  @Input() verifyChangePassw: boolean;
  @Input() verifyChangePhone: boolean;
  @Input() titleName: any = "";
  @Output() btnAAA: any;
  @Output() comfirmChangePassword = new EventEmitter();
  @Output() comfirmChangePhone = new EventEmitter();
  inputInfoUserInfoData: any;
  errorMessage: string;

  formPhoneNumber: FormGroup;
  formVerification: FormGroup;

  statusDisplayBackLoginScr = false;

  submittedVeriOtp = false;

  submittedSendOtp = false;

  statusDisplayCaptcha = true;

  statusBtnSubmitSendOtp = true;

  disableInputNumberphone = false;
  subscription1 = new Subscription();
  subscription2 = new Subscription();
  subscription3 = new Subscription();
  subscription4 = new Subscription();
  subscription5 = new Subscription();
  subscription6 = new Subscription();
  subscription7 = new Subscription();

  constructor(
    private windowService: WindowService,
    public authenticationService: AuthenticationService,
    public afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private zone: NgZone,
    private referralLinkService: ReferralLinkService
  ) {
    this.createFormPhoneNumber();
    this.createFormVerification();
  }

  ngOnInit() {
    this.windowRef = this.windowService.windowRef;
    this.subscription1 = this.authenticationService.infoUserInData$.subscribe((res: any) => {
      if (res !== null) {
        this.inputInfoUserInfoData = res;
      } else {
        return of(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.authenticationService.setStatusDisplayResetPass(false);
    this.authenticationService.setStatusDisplaySignup(false);
    this.disableInputNumberphone = false;
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
    this.subscription6.unsubscribe();
  }

  ngAfterViewInit() {
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "normal",
      callback: (response: any) => {
        this.zone.run(() => {
          this.statusBtnSubmitSendOtp = false;
        });
      },
    });
    this.windowRef.recaptchaVerifier.render();
  }

  private createFormPhoneNumber(): void {
    this.formPhoneNumber = this.fb.group({
      numberPhone: ["", Validators.required],
    });
  }

  private createFormVerification(): void {
    this.formVerification = this.fb.group({
      numberOtp: ["", Validators.required],
    });
  }

  handleBackScr(): void {
    this.statusDisplayBackLoginScr = true;
    this.subscription7 = this.referralLinkService.statusDisplaySignup$.subscribe((res: boolean) => {
      if (res) {
        this.referralLinkService.setStatusDisplaySignup(false);
        this.subscription7.unsubscribe();
      } else {
        this.statusDisplayBackLoginScr = true;
        this.subscription7.unsubscribe();
      }
    });
  }

  handleSubmitOtp() {
    this.submittedVeriOtp = true;
    if (this.formVerification.invalid) {
      return;
    }
    if (this.checkRenderTextTitle) {
      this.handleDisplayResetPassScr();
    } else if (this.verifyChangePassw) {
      this.verifyChangePassword();
    } else if (this.verifyChangePhone) {
      this.verifyChangePhones();
    } else {
      this.handleDisplaySignupScr();
    }
  }

  get fNumberphone(): any {
    return this.formPhoneNumber.controls;
  }

  get fNumberOtp(): any {
    return this.formVerification.controls;
  }

  handleSendOtp(): void {
    this.submittedSendOtp = true;
    if (this.formPhoneNumber.invalid) {
      return;
    }
    if (this.checkRenderTextTitle || this.verifyChangePassw || this.verifyChangePhone) {
      this.sendOtpVerifyingForgotten();
    } else {
      this.sendOtpVerifyingSignup();
    }
  }

  handleCloseModal(): void {
    this.authenticationService.dialogRef.close();
  }

  // call api gửi mã otp về sđt

  async sendOtpVerifying(): Promise<void> {
    // this.formPhoneNumber.value.numberPhone có thể là email/sđt
    let getElementStr: string = this.formPhoneNumber.value.numberPhone.substr(0, 1);
    if (getElementStr != "+84") {
      this.numberPhoneInternational = this.formPhoneNumber.value.numberPhone.replace(getElementStr, "+84");
    }

    await this.authenticationService.sendOTP(this.numberPhoneInternational, this.windowRef);
    this.subscription2 = await this.authenticationService.statusSendOtp$.subscribe((status: string) => {
      if (status === "0") {
        this.errorMessage = "Xảy ra lỗi gửi OTP, vui lòng thử lại sau!";
        this.statusBtnSubmitSendOtp = false;
        this.disableInputNumberphone = false;
        this.statusDisplayCaptcha = true;
        this.toastr.error(this.errorMessage, "");
      } else if (status === "1") {
        this.referralLinkService.setPhoneNumberSingup(this.formPhoneNumber.value.numberPhone);
        this.toastr.success("Gửi mã OTP thành công", "");
        this.statusBtnSubmitSendOtp = true;
        this.disableInputNumberphone = true;
        this.statusDisplayCaptcha = false;
      } else {
        console.log(status);
      }
    });
  }
  // send otp gửi mã otp về sđt khi người dùng đăng ký tài khoản
  sendOtpVerifyingSignup(): void {
    this.authenticationService.checkEmailPhoneToServer(this.formPhoneNumber.value.numberPhone).subscribe(
      (res: any) => {
        this.errorMessage = "Số điện thoại này đã có trên hệ thống, vui lòng điền số điện thoại khác!";
        this.toastr.warning(this.errorMessage, "");
      },
      (err: any) => {
        this.sendOtpVerifying();
      }
    );
  }

  // send otp gửi mã otp về sđt khi người dùng click quên mật khẩu

  sendOtpVerifyingForgotten(): void {
    this.authenticationService.checkEmailPhoneToServer(this.formPhoneNumber.value.numberPhone).subscribe(
      (res: any) => {
        if (res.status) {
          this.sendOtpVerifying();
        } else {
          this.toastr.error(res.message, "");
        }
      },
      (err: any) => {
        this.toastr.error(err.error.message, "");
      }
    );
  }

  async handleDisplayResetPassScr(): Promise<void> {
    await this.authenticationService.verifyOTP(this.windowRef, this.formVerification.value.numberOtp, false);
    await this.checkedSubmitedVerifyOtp();
  }

  async handleDisplaySignupScr(): Promise<void> {
    if (this.authenticationService.displaySignupLoginSocial) {
      await this.authenticationService.verifyOTP(this.windowRef, this.formVerification.value.numberOtp, true);
      await this.checkedSubmitedVerifyOtp();
      await this.signupCheckEmailToSv();
    } else {
      await this.authenticationService.verifyOTP(this.windowRef, this.formVerification.value.numberOtp, true);
      await this.checkedSubmitedVerifyOtp();
      this.authenticationService.displaySignupLoginSocial = false;
    }
  }

  checkedSubmitedVerifyOtp(): void {
    this.subscription3 = this.authenticationService.statusVerifyOtp$.subscribe((status) => {
      if (status === "1") {
        this.toastr.success("Xác minh mã OTP thành công", "");
      } else if (status === "0") {
        this.errorMessage = "Mã OTP sai, vui lòng thử lại!";
        this.toastr.warning(this.errorMessage, "");
      } else {
        console.log(status);
      }
    });
  }

  async verifyChangePassword(): Promise<void> {
    await this.authenticationService.verifyOTP(this.windowRef, this.formVerification.value.numberOtp, true);
    this.subscription4 = this.authenticationService.statusVerifyOtp$.subscribe((status) => {
      if (status === "1") {
        this.comfirmChangePassword.emit(true);
      } else if (status === "0") {
        this.errorMessage = "Mã OTP sai, vui lòng thử lại!";
        this.toastr.error(this.errorMessage, "");
      } else {
        console.log(status);
      }
    });
  }

  async verifyChangePhones(): Promise<void> {
    await this.authenticationService.verifyOTP(this.windowRef, this.formVerification.value.numberOtp, true);
    this.subscription5 = this.authenticationService.statusVerifyOtp$.subscribe((status) => {
      if (status === "1") {
        this.comfirmChangePhone.emit(true);
      } else if (status === "0") {
        this.errorMessage = "Mã OTP sai, vui lòng thử lại!";
        this.toastr.error(this.errorMessage, "");
      } else {
        console.log(status);
      }
    });
  }

  checkEmailPhoneToServer(): void {
    this.authenticationService.checkEmailPhoneToServer(this.inputInfoUserInfoData.email).subscribe(
      (res: any) => {
        this.toastr.error("Đã tồn tại email trong hệ thống, vui lòng đăng ký với email khác!", "");
      },
      (err: any) => {
        const paramsSignup: Signup = {
          name: this.inputInfoUserInfoData.name,
          username: this.inputInfoUserInfoData.username,
          password: this.inputInfoUserInfoData.social_id,
          phone: this.formPhoneNumber.value.numberPhone,
          email: this.inputInfoUserInfoData.email,
          gender: "",
          tax_number: "",
          role_id: 2,
          end_user_role: 0,
          type: this.inputInfoUserInfoData.type,
        };
        this.authenticationService.registerUser(paramsSignup).subscribe(
          async (result: any) => {
            if (result.status) {
              this.toastr.success(result.message, "");
              await this.handleSignInWithModeAndProvider();
              await this.catchStatusLoginWithSocialOptions();
            } else {
              this.toastr.error(result.message, "");
            }
          },
          (err: any) => {
            this.toastr.error("Đã xảy ra lỗi, vui lòng thử lại sau!", "");
          }
        );
      }
    );
  }

  handleSignInWithModeAndProvider(): void {
    const { email, social_id, type } = this.inputInfoUserInfoData;
    // action open modal login gg/fb
    this.authenticationService.loginWithSocial(email, social_id, type).subscribe(
      (res: any) => {
        if (res.status) {
          this.toastr.success(res.message, "");
          let token = res.data.token;
          this.authenticationService.decodeTokenToServer(token);
          this.authenticationService.setStatusLoginSocial("1");
          this.authenticationService.setStatusLoginSocial("-1");
        } else {
          this.toastr.error(res.message, "");
        }
      },
      (err: any) => {
        this.toastr.error("Đã xảy ra lỗi, vui lòng thử lại sau!", "");
      }
    );
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
        this.errorMessage = "Tài khoản này chưa được đăng ký, vui lòng hoàn tất đăng ký để tạo tài khoản!";
        this.toastr.warning(this.errorMessage, "");
      } else {
        console.log(status);
      }
    });
  }

  signupCheckEmailToSv(): void {
    this.subscription6 = this.authenticationService.statusVerifyOtp$.subscribe((status) => {
      if (status === "1") {
        this.checkEmailPhoneToServer();
      } else if (status === "0") {
        this.errorMessage = "Mã OTP sai, vui lòng thử lại!";
        this.toastr.error(this.errorMessage, "");
      } else {
        console.log(status);
      }
    });
  }
}
