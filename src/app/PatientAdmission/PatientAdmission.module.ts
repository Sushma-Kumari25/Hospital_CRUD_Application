import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AbpModalHeaderComponent } from '../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '../../shared/pipes/localize.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PatientAdmissionComponent } from './PatientAdmission.component';

const routes: Routes = [
  { path: '', component: PatientAdmissionComponent },
];

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ModalModule.forChild(),
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    AbpValidationSummaryComponent,
    LocalizePipe,
    PatientAdmissionComponent
  ],
})
export class PatientAdmissionModule { }
