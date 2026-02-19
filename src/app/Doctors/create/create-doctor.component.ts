import {
  Component,
  Injector,
  EventEmitter,
  Output
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import {
  DoctorsServiceProxy,
  FileParameter
} from '../../../shared/service-proxies/service-proxies';
import { AbpModalFooterComponent } from "@shared/components/modal/abp-modal-footer.component";
import { SharedModule } from "@shared/shared.module";

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  standalone: true,
  imports: [AbpModalFooterComponent, SharedModule]
})
export class CreateDoctorComponent extends AppComponentBase {

  saving = false;

  doctor: any = {
    doctorCode: '',
    fullName: '',
    qualification: '',
    phoneNumber: '',
    email: '',
    isAvailable: true
  };

  photo1?: File;
  photo2?: File;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _doctorsService: DoctorsServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  onPhoto1Selected(e: any) {
    this.photo1 = e.target.files[0];
  }

  onPhoto2Selected(e: any) {
    this.photo2 = e.target.files[0];
  }

  save() {

    if (this.saving) return;
    this.saving = true;

    // ⭐ Convert File → FileParameter
    const photo1Param: FileParameter | undefined = this.photo1
      ? { data: this.photo1, fileName: this.photo1.name }
      : undefined;

    const photo2Param: FileParameter | undefined = this.photo2
      ? { data: this.photo2, fileName: this.photo2.name }
      : undefined;

    this._doctorsService
      .createDoctor(
        this.doctor.doctorCode,
        this.doctor.fullName,
        this.doctor.qualification,
        this.doctor.phoneNumber,
        this.doctor.email,
        this.doctor.isAvailable,
        photo1Param,
        photo2Param
      )
      .subscribe({
        next: () => {
          this.notify.success('Doctor created successfully');
          this.bsModalRef.hide();
          this.onSave.emit(null);
        },
        error: () => {
          this.notify.error('Error creating doctor');
        },
        complete: () => {
          this.saving = false;
        }
      });
  }
}
