import {
  Component,
  Injector,
  OnInit,
  ChangeDetectorRef,
  output,
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
import { PatientsServiceProxy, UpdatePatientsDto } from '../../../shared/service-proxies/service-proxies';
import moment from 'moment';



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
export class EditPatientComponent
  extends AppComponentBase
  implements OnInit {

  saving = false;

  id!: number;

  // form model
  patient: UpdatePatientsDto = new UpdatePatientsDto();

  // event for parent refresh
  onSave = output<EventEmitter<any>>();

   // Photo file
  selectedFile?: File;
  existingPhotoPath?: string;

  constructor(
    injector: Injector,
    private _patientsService: PatientsServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadPatient();
    }
  }

  loadPatient(): void {
    this._patientsService.getPatientById(this.id).subscribe(result => {
      this.patient.init(result);
      this.cd.detectChanges();
    });
  }
 // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  // ---------- Update ----------
  save(): void {
    this.saving = true;

      if (this.patient.dateOfBirth) {
        this.patient.dateOfBirth = moment(this.patient.dateOfBirth);
      }
let payload: any;
    if (this.selectedFile) {
      payload = new FormData();
      payload.append('Id', this.patient.id.toString());
      payload.append('PatientCode', this.patient.patientCode);
      payload.append('FirstName', this.patient.firstName);
      payload.append('LastName', this.patient.lastName);
      payload.append('DateOfBirth', this.patient.dateOfBirth.toISOString());
      payload.append('Gender', this.patient.gender.toString());
      payload.append('PhoneNumber', this.patient.phoneNumber);
      payload.append('Email', this.patient.email);
      payload.append('Address', this.patient.address || '');
      payload.append('Photo', this.selectedFile, this.selectedFile.name);
    } else {
      payload = this.patient;
    }
    this._patientsService.updatePatient(this.patient).subscribe({
      next: () => {
        this.saving = false;

        // Success popup
        this.notify.success(
          `${this.patient.firstName} ${this.patient.lastName} updated successfully ✅`,
          'Success'
        );

        // refresh list
        this.onSave.emit(null);

        // close modal
        setTimeout(() => {
          this.bsModalRef.hide();
        }, 1200);
      },

      error: (err) => {
        this.saving = false;

        // backend error message
        const errorMsg =
          err?.error?.error?.message || 'Update failed ❌';

        this.notify.error(errorMsg, 'Error');
        this.cd.detectChanges();
      }
    });
  }
}
