import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
//
@Injectable({
  providedIn: "root",
})
export class ReferralLinkService {
  private _statusReffLinkSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  statusReffLink$: Observable<string> = this._statusReffLinkSubject.asObservable();
  private _phoneNumberSingupSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  phoneNumberSingup$: Observable<string> = this._phoneNumberSingupSubject.asObservable();
  private _statusDisplaySignupSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  statusDisplaySignup$: Observable<boolean> = this._statusDisplaySignupSubject.asObservable();
  setStatusReffLink(code: string) {
    this._statusReffLinkSubject.next(code);
  }
  setStatusDisplaySignup(status: boolean) {
    this._statusDisplaySignupSubject.next(status);
  }
  setPhoneNumberSingup(phone: string) {
    this._phoneNumberSingupSubject.next(phone);
  }
}
