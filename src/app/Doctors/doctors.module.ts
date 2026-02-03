import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';




@NgModule({
declarations: [],
imports: [
CommonModule,
FormsModule,
DoctorsRoutingModule,
DoctorsComponent
]
})
export class DoctorsModule {}