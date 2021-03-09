import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "@env/environment";
import { Logger, I18nService, AuthenticationService } from "@app/core";
import { ToastrService } from "ngx-toastr";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {}
}
