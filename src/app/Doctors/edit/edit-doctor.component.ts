import { Component, Injector, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import { DoctorsDto, DoctorsServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { AbpModalHeaderComponent } from "../../../shared/components/modal/abp-modal-header.component";
import { AbpModalFooterComponent } from "../../../shared/components/modal/abp-modal-footer.component";
import { CommonModule } from '@angular/common';
import { LocalizePipe } from "../../../shared/pipes/localize.pipe";
import { AbpValidationSummaryComponent } from "../../../shared/components/validation/abp-validation.summary.component";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AbpModalFooterComponent,
    AbpValidationSummaryComponent,
    AbpModalHeaderComponent,
    LocalizePipe
  ]
})
export class EditDoctorComponent extends AppComponentBase implements OnInit {

  saving = false;
  id!: number;
  doctor: DoctorsDto = new DoctorsDto();

  photo1: File | null = null;
  photo2: File | null = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private http: HttpClient,
    private _doctorsService: DoctorsServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (!this.id) return;

    this._doctorsService.getDoctorById(this.id).subscribe(res => {
      this.doctor = res;
      this.cd.detectChanges();   // ⭐ fixes NG0100
    });
  }

  // ⭐ FILE CHANGE
  onFileChange(event: any, photoNumber: number) {
    const file = event.target.files[0];
    if (!file) return;

    if (photoNumber === 1) this.photo1 = file;
    else this.photo2 = file;
  }

  // 🚀 SAVE
  save(): void {

    this.saving = true;

    const formData = new FormData();

    formData.append('Id', this.doctor.id.toString());
    formData.append('DoctorCode', this.doctor.doctorCode);
    formData.append('FullName', this.doctor.fullName);
    formData.append('Qualification', this.doctor.qualification);
    formData.append('PhoneNumber', this.doctor.phoneNumber);
    formData.append('Email', this.doctor.email);
    formData.append('IsAvailable', String(this.doctor.isAvailable));

    if (this.photo1) formData.append('Photo1', this.photo1);
    if (this.photo2) formData.append('Photo2', this.photo2);

    // ⭐ USE PUT FOR UPDATE
    this.http.put(
      '/api/services/app/Doctors/UpdateDoctor',
      formData
    ).subscribe(() => {

      this.notify.success('Doctor updated successfully');
      this.onSave.emit(null);
      this.bsModalRef.hide();
      this.saving = false;

    }, () => {
      this.saving = false;
    });
  }
}
