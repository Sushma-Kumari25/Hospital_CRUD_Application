import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponentBase } from '../../../shared/app-component-base';
import {
  CreatePatientAdmissionDto,
  NameValueDto,
  PatientAdmissionDto,
  PatientAdmissionServiceProxy
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  templateUrl: './create.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    LocalizePipe,
    
]
})
export class CreatePatientAdmissionComponent extends AppComponentBase implements OnInit {

  @Output() onSave = new EventEmitter<any>();

  saving = false;
  

  Pa: PatientAdmissionDto = new PatientAdmissionDto();

  patientList: NameValueDto[] = [];
  doctorList: NameValueDto[] = [];
  bedList: NameValueDto[] = [];

  constructor(
    injector: Injector,
    private _paService: PatientAdmissionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadDoctors();
    this.loadBeds();
  }

  loadPatients(): void {
    this._paService.getPatientLookup().subscribe(res => {
      this.patientList = res;
    });
  }

  loadDoctors(): void {
    this._paService.getDoctorLookup().subscribe(res => {
      this.doctorList = res;
    });
  }

  loadBeds(): void {
    this._paService.getBedLookup().subscribe(res => {
      this.bedList = res;
    });
  }

  save(): void {
    this.saving = true;

    const input = CreatePatientAdmissionDto.fromJS(this.Pa);

    this._paService.create(input).subscribe({
      next: () => {
        this.notify.success('Patient admitted successfully');
        this.onSave.emit();
        this.bsModalRef.hide();
        this.saving = false;
      },
      error: () => {
        this.notify.error('Something went wrong');
        this.saving = false;
      }
    });
  }
}
