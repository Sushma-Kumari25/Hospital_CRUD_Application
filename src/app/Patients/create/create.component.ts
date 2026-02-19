import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

import { AppComponentBase } from '../../../shared/app-component-base';
import moment from 'moment';

@Component({
  templateUrl: 'create.component.html',
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
export class CreatePatientComponent extends AppComponentBase implements OnInit {

  saving = false;

  // ⭐ FORM MODEL (must match HTML ngModel names)
  patient: any = {
    patientCode: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 5,
    phoneNumber: '',
    email: '',
    address: ''
  };

  selectedFile?: File;
  patientPhotoUrl?: string;

  @Output() onSave = new EventEmitter<void>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  // ================= FILE SELECT =================
  onFileSelected(event: any) {

    if (event.target.files?.length) {

      this.selectedFile = event.target.files[0];

      // Preview image
      const reader = new FileReader();
      reader.onload = (e: any) => {

        this.patientPhotoUrl = e.target.result;

        // ⭐ NG0100 error fix
        setTimeout(() => this.cd.detectChanges());
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  // ================= SAVE =================
  save(): void {

    // ⭐ REQUIRED FIELD VALIDATION
    if (!this.patient.patientCode ||
        !this.patient.firstName ||
        !this.patient.lastName ||
        !this.patient.dateOfBirth ||
        !this.patient.email) {

      this.notify.warn('Please fill all required fields');
      return;
    }

    // ⭐ PHOTO REQUIRED
    if (!this.selectedFile) {
      this.notify.warn('Photo is required');
      return;
    }

    this.saving = true;

    const formData = new FormData();

    formData.append('PatientCode', this.patient.patientCode);
    formData.append('FirstName', this.patient.firstName);
    formData.append('LastName', this.patient.lastName);

    formData.append(
      'DateOfBirth',
      moment(this.patient.dateOfBirth).format('YYYY-MM-DD')
    );

    formData.append('Gender', this.patient.gender.toString());
    formData.append('PhoneNumber', this.patient.phoneNumber || '');
    formData.append('Email', this.patient.email);
    formData.append('Address', this.patient.address || '');

    // ⭐ PHOTO
    formData.append('Photo', this.selectedFile, this.selectedFile.name);

    // ⭐ API CALL
    this.http.post('/api/services/app/Patients/CreatePatient', formData)
      .subscribe({
        next: () => {

          // Safe UI update (avoid NG0100)
          setTimeout(() => {

            this.saving = false;

            this.notify.success(
              `${this.patient.firstName} ${this.patient.lastName} created successfully`,
              'Success'
            );

            this.onSave.emit();
            this.bsModalRef.hide();

          });
        },
        error: (err) => {

          this.saving = false;

          const msg = err?.error?.error?.message || 'Error creating patient';
          this.notify.error(msg, 'Error');
        }
      });
  }
}
