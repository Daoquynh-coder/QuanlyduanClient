import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider'
import { HomeService } from '@app/core/services/home.service';
import { NguCarouselModule } from '@ngu/carousel';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import {MatAutocompleteModule} from "@angular/material/autocomplete";



@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    NguCarouselModule,
    MatExpansionModule,
    MatAutocompleteModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
  ]
})
export class HomeModule { }
