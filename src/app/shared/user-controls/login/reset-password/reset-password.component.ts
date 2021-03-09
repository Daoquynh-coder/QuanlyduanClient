import { Component, OnInit, Input } from "@angular/core";
import { AuthenticationService, WindowService } from "@app/core";
import { FormControl, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ResetPassword } from "../../../../core/models/user";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  formRsPass: FormGroup;

  submitted = false;
  checkValuePassword = false;

  statusHideShowNewPass = false;
  statusHideShowReNewPass = false;
  errorMessage: string;

  @Input() numberPhoneOrEmail: string;

  constructor(
    public authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.createFormRsPass();
  }

  ngOnInit() { }

  handleCloseModal(): void {
    this.authenticationService.dialogRef.close();
  }

  private createFormRsPass(): void {
    this.formRsPass = this.fb.group({
      newPassword: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      reNewPassword: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  get f() {
    return this.formRsPass.controls;
  }

  handleResetPassword() {
    this.submitted = true;
    const paramsResetPassword: ResetPassword = {
      phone_email: this.numberPhoneOrEmail,
      new_password: this.formRsPass.value.newPassword,
      confirm_password: this.formRsPass.value.reNewPassword,
    };
    if (this.formRsPass.invalid) {
      return;
    } else if (this.formRsPass.value.newPassword != this.formRsPass.value.reNewPassword) {
      this.checkValuePassword = true;
      return;
    }

    this.authenticationService.resetPassword(paramsResetPassword).subscribe(
      (res: any) => {
        this.toastr.success("Thay đổi mật khẩu thành công", "");
        this.authenticationService.dialogRef.close();
      },
      (err: any) => {
        this.errorMessage = "Xảy ra lỗi thay đổi mật khẩu, vui lòng thử lại sau!";
        this.toastr.error(this.errorMessage, "");
      }
    );
  }

  handleHideShowNewPassword(): void {
    this.statusHideShowNewPass = !this.statusHideShowNewPass;
  }

  handleHideShowReNewPassword(): void {
    this.statusHideShowReNewPass = !this.statusHideShowReNewPass;
  }
}
