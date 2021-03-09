import { Component, OnInit, ViewChild, OnDestroy, Renderer2, ViewChildren, QueryList, NgZone } from "@angular/core";
import { AuthenticationService, Route } from "@app/core";
import { I18nService } from "app/core/i18n.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpResponseBase,
  HttpResponse,
  HttpEventType,
} from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { ISubscription, Subscription } from "rxjs/Subscription";
import { User } from "../../../core/models/user";
import { UserService } from "../../../core/services/user.service";
import { CommonService } from "../../../core/services/common-service/common.service";

import { ConfirmationPopupComponent } from "@app/shared";
import { environment } from "@env/environment";
import { MatMenu, MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatDialog } from "@angular/material/dialog";
import { forEach } from "lodash";
// import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { APICallService } from "@app/core/services/main-page/APICall.service";
import { ReferralLinkService } from "../../../core/services/referral-link.service";
import { of } from "rxjs";
import { LoginControlComponent } from "@app/shared";
import { ShareFunctionService } from "@app/core/services/share-function.service";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"],
  providers: [UserService],
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  tobuyActive: boolean = false;
  rentActive: boolean = false;
  temporaryActive: boolean = false;
  projectsActive: boolean = false;
  credentials: any;
  isLogin: boolean = false;

  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger: any;
  searchObject: any = {};

  structure: any = [];


  subscription1 = new Subscription();


  selectedOperation: number = -1;
  selectedEstate: number = -1;

  objectTempSearch: any = {};
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public authenticationService: AuthenticationService,
    public location: Location,
    public commonService: CommonService,
    public shareFunctionService: ShareFunctionService
  ) { }

  ngOnInit() {
    this.subscription1 = this.authenticationService.onAuth$.subscribe((res) => {
      // console.log("🚀 ~ file: app-header.component.ts ~ line 72 ~ AppHeaderComponent ~ ngOnInit ~ res", res)
      if (res) {
        let tempCre = localStorage.getItem("credentials");
        if (tempCre) {
          this.isLogin = true;
          this.credentials = JSON.parse(localStorage.getItem("credentials"));
        }
      }
    });


  }
  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

  openDialog(content: any): void {
    if (this.isLogin) {

    } else {

      const dialogRef = this.dialog.open(content, { disableClose: true });
      this.authenticationService.sharedDialogRefLogin(dialogRef);
    }
  }
  signOut() {
    localStorage.removeItem("credentials");
    this.authenticationService.onAuth(false);
    this.isLogin = false;
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
