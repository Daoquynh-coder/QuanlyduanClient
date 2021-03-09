import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { map, catchError } from "rxjs/operators";
import { UserService } from "@app/core/services/user.service";
import { Credentials, InforUserInData } from "../models/credentials";
import { LoginContext } from "../models/login-context";
import { environment } from "@env/environment";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";
import { Signup, InsertDataSignupSuccess } from "../models/signup";
import { ResetPassword } from "../models/user";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

const credentialsKey = "credentials";

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;

  getTokenSocial: string;

  displaySignupLoginSocial = false;

  /** When entering veri phone verification code, only when entering the correct code to return the phone
  number will the screen reset password / signup account displayed **/

  statusDisplayResetPass: boolean = false;

  statusDisplaySignup: boolean = false;

  private _statusVerifyOtpSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  statusVerifyOtp$: Observable<string> = this._statusVerifyOtpSubject.asObservable();

  dialogRef: any;

  // kiểm tra res send otp về đt

  private _statusSendOtpSubject: BehaviorSubject<string> = new BehaviorSubject<string>("-1");

  statusSendOtp$: Observable<string> = this._statusSendOtpSubject.asObservable();

  // kiểm tra res login to server

  private _statusLoginSocialSubject: BehaviorSubject<string> = new BehaviorSubject<string>("-1");

  statusLoginSocial$: Observable<string> = this._statusLoginSocialSubject.asObservable();

  private _infoUserInDataSubject: BehaviorSubject<InforUserInData | null> = new BehaviorSubject<InforUserInData | null>(
    null
  );

  infoUserInData$: Observable<InforUserInData | null> = this._infoUserInDataSubject.asObservable();

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private router: Router, private toastrService: ToastrService,) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);

    // console.log("AuthenticationService -> constructor -> savedCredentials", savedCredentials);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }
  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<boolean>} The user credentials.
   */
  login(username: string, password: string) {
    // console.log(username, password, token, social_type);
    return this.http.post("auth/login", { username, password});
  }

  setStatusLoginSocial(status: string): void {
    this._statusLoginSocialSubject.next(status);
  }

  setStatusSendOtp(status: string): void {
    this._statusSendOtpSubject.next(status);
  }

  setStatusVerifyOtp(status: string): void {
    this._statusVerifyOtpSubject.next(status);
  }

  setStatusDisplayResetPass(status: boolean): void {
    this.statusDisplayResetPass = status;
  }

  setStatusDisplaySignup(status: boolean): void {
    this.statusDisplaySignup = status;
  }

  setInfoUserInData(data: InforUserInData | null) {
    this._infoUserInDataSubject.next(data);
  }

  sharedDialogRefLogin(dialogRef: any): void {
    this.dialogRef = dialogRef;
  }

  // decode token trên server ra info người dùng

  decodeTokenToServer(token: string): void {
    this.http
      .get("user", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .subscribe((data: any) => {
        data.token = token;
          this.router.navigate(["/admin"]).then((result) => { });
        this.setCredentials(data, true);
      });
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  logoutServer() {
    return this.http.post("logout", {}).pipe();
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    // Always get credentials key anytime connect to server

    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    this._credentials = JSON.parse(savedCredentials);
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      this.onAuth(true);
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
    // this.onAuth(true)
  }

  // get environment login social option

  private getProviderInstance(provider: string): any {
    let providerInstance;
    switch (provider) {
      case environment.providersSocial.GOOGLE:
        providerInstance = new auth.GoogleAuthProvider();
        break;
      case environment.providersSocial.FACEBOOK:
        providerInstance = new auth.FacebookAuthProvider();
        break;
      default:
        providerInstance = new auth.GoogleAuthProvider();
        break;
    }
    return providerInstance;
  }

  // call api login social option with firebase

  async signInSocialOptions(provider: string): Promise<any> {
    this.displaySignupLoginSocial = true;
    const res: any = await this.afAuth.auth.signInWithPopup(this.getProviderInstance(provider));

    if (!res) {
      this.setStatusLoginSocial("3");
      this.setStatusLoginSocial("-1");
    } else if (res) {
      this.getTokenSocial = res.credential.toJSON().oauthAccessToken;

      return res;
    } else {
      this.setStatusLoginSocial("3");
      this.setStatusLoginSocial("-1");
    }
  }

  // gửi mã otp về sđt người dùng

  sendOTP(phoneNumber: string, windowRef: any): void {
    this.afAuth.auth
      .signInWithPhoneNumber(phoneNumber, windowRef.recaptchaVerifier)
      .then((confirmationResult) => {
        windowRef.confirmationResult = confirmationResult;
        this.setStatusSendOtp("1");
        this.setStatusSendOtp("-1");
      })
      .catch((err) => {
        this.setStatusSendOtp("0");
        this.setStatusSendOtp("-1");
      });
  }

  // kiểm tra xem mã otp nhập vào có đúng không

  verifyOTP(windowRef: any, numberOtp: string, checkBtnSend: boolean): any {
    windowRef.confirmationResult
      .confirm(numberOtp)
      .then((userCredentials: any) => {
        if (checkBtnSend) {
          this.statusDisplaySignup = true;
        } else {
          this.statusDisplayResetPass = true;
        }
        this.setStatusVerifyOtp("1");
        this.setStatusVerifyOtp("");
      })
      .catch((err: any) => {
        this.setStatusVerifyOtp("0");
        this.setStatusVerifyOtp("");
      });
  }

  // call api login google to server side

  loginWithSocial(username: string | any, password: string | any, social_type: string | any): Observable<any> {
    return this.http.post("auth/login", { username, password, token: this.getTokenSocial, social_type: social_type });
  }

  // call api đăng ký

  registerUser(user: Signup): any {
    // console.log('paramSignUpUser :>> ', user);
    return this.http.post("auth/register", user);
  }

  private _onAuthenticationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.credentials);
  onAuth$: Observable<boolean> = this._onAuthenticationSubject.asObservable();
  public onAuth(status: boolean) {
    this._onAuthenticationSubject.next(status);
  }

  // kiểm tra email/phone có nằm trên server hay chưa
  checkEmailPhoneToServer(data: string): any {
    return this.http.post("user/check-user", { phone_email: data });
  }

  // call api reset password
  resetPassword(params: ResetPassword): any {
    return this.http.post("user/forgot-password", params);
  }

  refreshToken() {

  }
}
