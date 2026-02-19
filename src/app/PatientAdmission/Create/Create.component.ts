import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit, Output, ChangeDetectorRef } from '@angular/core';
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
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';
import moment, { Moment } from 'moment';

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
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadDoctors();
    this.loadBeds();
  }

  /** Load dropdown lists safely */
  loadPatients(): void {
    this._paService.getPatientLookup().subscribe(res => {
      this.patientList = res;
      this.cd.detectChanges();
    });
  }

  loadDoctors(): void {
    this._paService.getDoctorLookup().subscribe(res => {
      this.doctorList = res;
      this.cd.detectChanges();
    });
  }

  loadBeds(): void {
    this._paService.getBedLookup().subscribe(res => {
      this.bedList = res;
      this.cd.detectChanges();
    });
  }

  /** Moment-safe getters/setters for template binding */
  get admissionDateStr(): string {
    return this.Pa.admissionDate ? this.Pa.admissionDate.format('YYYY-MM-DD') : '';
  }

  setAdmissionDate(value: string) {
    this.Pa.admissionDate = value ? moment(value, 'YYYY-MM-DD') : null;
  }

  get dischargeDateStr(): string {
    return this.Pa.dischargeDate ? this.Pa.dischargeDate.format('YYYY-MM-DD') : '';
  }

  setDischargeDate(value: string) {
    this.Pa.dischargeDate = value ? moment(value, 'YYYY-MM-DD') : null;
  }

  /** Save new patient admission */
  save(): void {
    this.saving = true;

    // Proper DTO instance
    const input = CreatePatientAdmissionDto.fromJS(this.Pa);

    this._paService.create(input).subscribe({
      next: () => {
        this.notify.success('Patient admitted successfully ✅');
        this.onSave.emit();
        this.bsModalRef.hide();
        this.saving = false;
      },
      error: () => {
        this.notify.error('Something went wrong ❌');
        this.saving = false;
      }
    });
  }
}
