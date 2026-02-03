import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


import { BedRoutingModule } from './bed-routing.module';
import { BedComponent } from './bed.component';

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forChild(),
    BedRoutingModule,
    BedComponent
  ]
})
export class BedModule {}
