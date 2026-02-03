import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CreatePatientAdmissionDto, NameValueDto, PatientAdmissionDto, PatientAdmissionServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    AbpModalHeaderComponent,
    LocalizePipe
],
})
export class CreatePatientAdmissionComponent extends AppComponentBase implements OnInit {

  [x: string]: any;

  successMessage: string = '';
  errorMessage: string = '';

  saving = false;

  Pa: PatientAdmissionDto = new PatientAdmissionDto();

  patientList: NameValueDto[] = [];
  doctorList: NameValueDto[] = [];
  bedList: NameValueDto[] = [];
  roomList: NameValueDto[] = [];

  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _pa: PatientAdmissionServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadDoctors();
    this.loadBeds(); // optional roomId if method adjusted
  }

  loadPatients(): void {
    this._pa.getPatientLookup().subscribe(result => {
      this.patientList = result;
      this.cd.detectChanges();
      console.log('Loaded Patients:', this.patientList);
    });
  }

  loadDoctors(): void {
    this._pa.getDoctorLookup().subscribe(result => {
      this.doctorList = result;
      this.cd.detectChanges();
      console.log('Loaded Doctors:', this.doctorList);
    });
  }

  loadBeds(): void {
    this._pa.getBedLookup().subscribe(result => {
      this.bedList = result;
      this.cd.detectChanges();
      console.log('Loaded Beds:', this.bedList);
    });
  }

  save(): void {
    this.saving = true;
    const input: CreatePatientAdmissionDto = {
        ...this.Pa,
        init: function (_data?: any): void {
            throw new Error('Function not implemented.');
        },
        toJSON: function (data?: any) {
            throw new Error('Function not implemented.');
        },
        clone: function (): CreatePatientAdmissionDto {
            throw new Error('Function not implemented.');
        }
    };

    this._pa.create(input).subscribe({
      next: () => {
        this.saving = false;
        this.notify.success(`${this.Pa.firstName}, created successfully ✅`, 'Success');
        this.onSave.emit(null);
        setTimeout(() => this.bsModalRef.hide(), 1200);
      },
      error: (err) => {
        this.saving = false;
        const errorMsg = err?.error?.error?.message || 'Email already exists ❌';
        this.notify.error(errorMsg, 'Error');
        this.cd.detectChanges();
      }
    });
  }
}
