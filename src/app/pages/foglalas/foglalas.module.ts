import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoglalasRoutingModule } from './foglalas-routing.module';
import { FoglalasComponent } from './foglalas.component';
import { ListComponent } from './list/list.component';
import { ViewerComponent } from './viewer/viewer.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';




@NgModule({
  declarations: [
    ListComponent,
    ViewerComponent,
    FoglalasComponent,
    DateFormatPipe,

  ],
  imports: [
    CommonModule,
    FoglalasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class FoglalasModule { }
