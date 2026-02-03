import {
  Component,
  Injector,
  OnInit,
  ChangeDetectorRef,
  output,
  EventEmitter,
  Output
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

import { AppComponentBase } from '../../../shared/app-component-base';
import { CreatePatientsDto, PatientsServiceProxy } from '../../../shared/service-proxies/service-proxies';
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
export class CreatePatientComponent
  extends AppComponentBase
  implements OnInit {

  saving = false;
successMessage: string = '';
errorMessage: string = '';

  // form model
  patient: CreatePatientsDto = new CreatePatientsDto();

  selectedFile!: File;
  @Output() onSave = new EventEmitter<void>();


  constructor(
    injector: Injector,
    private _patientsService: PatientsServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {  }
    
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  save(): void {
   
    this.saving = true;

    if (this.patient.dateOfBirth) {
    this.patient.dateOfBirth = moment(this.patient.dateOfBirth);
  }
   // ✅ create FormData to send file + other fields
    const formData = new FormData();
    formData.append('patientCode', this.patient.patientCode);
    formData.append('firstName', this.patient.firstName);
    formData.append('lastName', this.patient.lastName);
    formData.append('dateOfBirth', this.patient.dateOfBirth ? moment(this.patient.dateOfBirth).format('YYYY-MM-DD') : '');
    formData.append('gender', this.patient.gender?.toString() || '');
    formData.append('phoneNumber', this.patient.phoneNumber || '');
    formData.append('email', this.patient.email || '');
    formData.append('address', this.patient.address || '');
    formData.append('createdAt', this.patient.createdAt ? moment(this.patient.createdAt).toISOString() : '');

    // ✅ append photo if selected
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    
    this._patientsService.createPatient(this.patient).subscribe({
      next: () => {
        this.saving = false;

        
        this.notify.success(
          `${this.patient.firstName} ${this.patient.lastName} created successfully `,
          'Success'
        );

  
        this.onSave.emit(null);

        
        setTimeout(() => {
          this.bsModalRef.hide();
        }, 1200);
      },



      

      error: (err) => {
        this.saving = false;

        const errorMsg =
          err?.error?.error?.message || 'Patient code already exists ';
          err?.error?.error?.message || 'Email is already associated with another patient';
          

      
        this.notify.error(errorMsg, 'Error');

        this.cd.detectChanges();
      }
      
    });
  }
}
