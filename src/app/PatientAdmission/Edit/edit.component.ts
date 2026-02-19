import { Component, Injector, OnInit, EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import { PatientAdmissionDto, PatientAdmissionServiceProxy, NameValueDto } from '../../../shared/service-proxies/service-proxies';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';
import moment, { Moment } from 'moment';

@Component({
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    AbpValidationSummaryComponent,
    LocalizePipe
  ]
})
export class EditPatientAdmissionComponent extends AppComponentBase implements OnInit {

  saving = false;

  @Input() id!: number;
  patientAdmission: PatientAdmissionDto = new PatientAdmissionDto();

  patientList: NameValueDto[] = [];
  doctorList: NameValueDto[] = [];
  bedList: NameValueDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _paService: PatientAdmissionServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadLookups();
    if (this.id) {
      this.loadPatientAdmission();
    }
  }

  loadLookups(): void {
    this._paService.getPatientLookup().subscribe(res => { this.patientList = res; this.cd.detectChanges(); });
    this._paService.getDoctorLookup().subscribe(res => { this.doctorList = res; this.cd.detectChanges(); });
    this._paService.getBedLookup().subscribe(res => { this.bedList = res; this.cd.detectChanges(); });
  }

loadPatientAdmission(): void {
  this._paService.get(this.id).subscribe(res => {
    this.patientAdmission = new PatientAdmissionDto();
    this.patientAdmission.init(res); // populate DTO

    // Convert date strings to Moment objects
    this.patientAdmission.admissionDate = res.admissionDate ? moment(res.admissionDate) : null;
    this.patientAdmission.dischargeDate = res.dischargeDate ? moment(res.dischargeDate) : null;

    this.cd.detectChanges(); // update template safely
  });
}


  /** Getters for template binding */
  get admissionDateStr(): string {
    return this.patientAdmission.admissionDate ? this.patientAdmission.admissionDate.format('YYYY-MM-DD') : '';
  }

  get dischargeDateStr(): string {
    return this.patientAdmission.dischargeDate ? this.patientAdmission.dischargeDate.format('YYYY-MM-DD') : '';
  }

  /** Update Moment object when user changes input */
  setAdmissionDate(value: string) {
    this.patientAdmission.admissionDate = value ? moment(value, 'YYYY-MM-DD') : null;
  }

  setDischargeDate(value: string) {
    this.patientAdmission.dischargeDate = value ? moment(value, 'YYYY-MM-DD') : null;
  }

  save(): void {
    this.saving = true;
    this._paService.update(this.patientAdmission).subscribe({
      next: () => {
        this.saving = false;
        this.notify.success('Patient admission updated successfully ✅', 'Success');
        this.onSave.emit(null);
        setTimeout(() => this.bsModalRef.hide(), 1200);
      },
      error: (err) => {
        this.saving = false;
        const errorMsg = err?.error?.error?.message || 'Error while updating ❌';
        this.notify.error(errorMsg, 'Error');
        this.cd.detectChanges();
      }
    });
  }
}
