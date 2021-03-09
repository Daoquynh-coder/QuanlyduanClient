import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { LoginControlComponent } from '@app/shared/user-controls/login/login-control.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  OnInit {
  constructor(private authenticationService: AuthenticationService,public dialog: MatDialog,){

  }
  ngOnInit() {
    if (!this.authenticationService.credentials || !this.authenticationService.credentials.id) {
      const dialogRef = this.dialog.open(LoginControlComponent);
      this.authenticationService.sharedDialogRefLogin(dialogRef);
    }
  }

}
