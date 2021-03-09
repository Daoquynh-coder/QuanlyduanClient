import { Component, OnInit, Input, OnDestroy, NgZone } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators, AbstractControl } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "../../../core/authentication/authentication.service";
import { emailValidator } from "../../user-controls/CustomValidators";
import { ToastrService } from "ngx-toastr";
import { Signup, InsertDataSignupSuccess } from "../../../core/models/signup";
import { MatIcon } from "@angular/material/icon";
import { environment } from "@env/environment";
import { ReferralLinkService } from "../../../core/services/referral-link.service";
import { of, Subscription } from "rxjs";
import { GetProjectViewService } from "@app/core/services/get-project-view.service";
import { User } from "@app/core/models/user";
import { LoginControlComponent } from "../login/login-control.component";

@Component({
  selector: "app-signup-control",
  templateUrl: "./signup-control.component.html",
  styleUrls: ["./signup-control.component.css"],
})
export class SignupControlComponent implements OnInit, OnDestroy {
  @Input() dialogRef: any;
  register = new User();
  @Input() phoneNumber: string;
  providers = environment.providersSocial;

  dataInsertLogin: InsertDataSignupSuccess;

  selectItems: any;
  index = 0;

  showHide = false;
  alert = false;

  errorMessage: string;
  private typeSocial: string;
  subscription1 = new Subscription();
  subscription2 = new Subscription();


  hidePass = true;
  hideRePass = true;
  password: "";
  repassword: "";
  submitted: boolean = false;
  invitation_code: string;

  // constructor() {}
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private zone: NgZone,
    public dialog1: MatDialog,
    private referralLinkService: ReferralLinkService,
    private getProjectViewService: GetProjectViewService,
    private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
    private dialogRefSignup: MatDialogRef<SignupControlComponent>
  ) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  handleCloseModal(): void {
    this.auth.dialogRef.close();
  }

  createForm() {

  }

  handleSignup() {
    this.getProjectViewService.getUser(this.register).subscribe((res: any) =>{
      if(res.status){
        this.toastrService.success('Đăng ký thành công!', '')
        const dialogRef = this.dialog.open(LoginControlComponent);
        this.authenticationService.sharedDialogRefLogin(dialogRef);
        this.dialogRefSignup.close();
      } else {
        this.toastrService.success('Đăng ký thất bại!', '')
      }
    },
    err => {

    }
    )
  }

  closeAlert() {
    this.alert = false;
  }

  // close dialog
  closeModal() {
    this.dialog.closeAll();
  }

  // show modal
  signUp(content: any) {
    this.dialog1.open(content);
  }
}
