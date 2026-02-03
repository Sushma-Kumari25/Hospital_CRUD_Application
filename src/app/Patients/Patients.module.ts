import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './Patients-routing.module';



@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    PatientsRoutingModule,
     PatientsComponent
  ]
})
export class PatientsModule {}
