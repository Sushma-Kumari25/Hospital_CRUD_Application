import { Component, Injector, OnInit, EventEmitter, output, ChangeDetectorRef } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CreateDoctorsDto, DoctorsServiceProxy } from '../../../shared/service-proxies/service-proxies';

import { AbpValidationSummaryComponent } from "../../../shared/components/validation/abp-validation.summary.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbpModalFooterComponent } from "../../../shared/components/modal/abp-modal-footer.component";
import { AbpModalHeaderComponent } from "../../../shared/components/modal/abp-modal-header.component";
import { LocalizePipe } from "../../../shared/pipes/localize.pipe";


@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
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
export class CreateDoctorComponent extends AppComponentBase implements OnInit {


saving = false;
doctor = new CreateDoctorsDto();
successMessage: string = '';
errorMessage: string = '';


onSave = output<EventEmitter<any>>();


constructor(
injector: Injector,
private _doctorsService: DoctorsServiceProxy,
public bsModalRef: BsModalRef,
private cd: ChangeDetectorRef
) {
super(injector);
}


ngOnInit(): void {}


save(): void {
this.saving = true;


this._doctorsService.createDoctor(this.doctor).subscribe(() => {
this.notify.success('Doctor created successfully');
this.onSave.emit(null);
this.bsModalRef.hide();


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