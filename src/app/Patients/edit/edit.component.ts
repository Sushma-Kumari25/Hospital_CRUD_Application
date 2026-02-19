import {
  Component,
  Injector,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

import { AppComponentBase } from '../../../shared/app-component-base';
import { PatientsServiceProxy } from '../../../shared/service-proxies/service-proxies';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'edit.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpValidationSummaryComponent,
    AbpModalFooterComponent,
    LocalizePipe
  ]
})
export class EditPatientComponent extends AppComponentBase implements OnInit {

  saving = false;
  id!: number;

  patient: any = {id: 0,
  patientCode: '',
  firstName: '',
  lastName: '',
  gender: 0};

  @Output() onSave = new EventEmitter<any>();

  selectedFile?: File;
  existingPhotoPath?: string;

  dateOfBirthString = '';

  constructor(
    injector: Injector,
    private _patientsService: PatientsServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadPatient();
    }
  }

  // ================= LOAD =================
 loadPatient(): void {

  this._patientsService.getPatientById(this.id)
    .subscribe(result => {

      // ⭐ NEW OBJECT ASSIGN
      this.patient = { ...result };

      if (result.dateOfBirth) {
        this.dateOfBirthString =
          moment(result.dateOfBirth).format('YYYY-MM-DD');
      }

      if (result.photoPath) {
        const baseUrl = 'https://localhost:44311';
        this.existingPhotoPath =
          result.photoPath.startsWith('http')
            ? result.photoPath
            : baseUrl + (result.photoPath.startsWith('/') ? result.photoPath : '/' + result.photoPath);
      }

      // ⭐ FORCE CHANGE DETECT
      this.cd.detectChanges();

    });
}


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // ================= SAVE =================
  save(): void {

    this.saving = true;

    const formData = new FormData();

    formData.append('Id', this.patient.id.toString());
    formData.append('PatientCode', this.patient.patientCode);
    formData.append('FirstName', this.patient.firstName);
    formData.append('LastName', this.patient.lastName);
    formData.append(
      'DateOfBirth',
      moment(this.dateOfBirthString).format('YYYY-MM-DD')
    );
    formData.append('Gender', this.patient.gender?.toString() || '');
    formData.append('PhoneNumber', this.patient.phoneNumber || '');
    formData.append('Email', this.patient.email || '');
    formData.append('Address', this.patient.address || '');

    if (this.selectedFile) {
      formData.append('Photo', this.selectedFile, this.selectedFile.name);
    }

    this.http.post('/api/services/app/Patients/UpdatePatient', formData)
      .subscribe({
        next: () => {

          
          setTimeout(() => {

            this.saving = false;

            this.notify.success(
              `${this.patient.firstName} ${this.patient.lastName} updated successfully`,
              'Success'
            );

            this.onSave.emit(null);

            this.bsModalRef.hide();

          });

        },
        error: (err) => {

          setTimeout(() => {
            this.saving = false;
            const msg = err?.error?.error?.message || 'Update failed';
            this.notify.error(msg, 'Error');
          });

        }
      });
  }
}
