import { Component, Injector, OnInit, EventEmitter, output, NgModule } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import { DoctorsDto, DoctorsServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { AbpModalHeaderComponent } from "../../../shared/components/modal/abp-modal-header.component";
import { AbpModalFooterComponent } from "../../../shared/components/modal/abp-modal-footer.component";
import { CommonModule } from '@angular/common';
import { LocalizePipe } from "../../../shared/pipes/localize.pipe";
import { AbpValidationSummaryComponent } from "../../../shared/components/validation/abp-validation.summary.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-doctor',
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


onSave = output<EventEmitter<any>>();


constructor(
injector: Injector,
private _doctorsService: DoctorsServiceProxy,
public bsModalRef: BsModalRef
) {
super(injector);
}


ngOnInit(): void {
this._doctorsService.getDoctorById(this.id).subscribe(res => {
this.doctor = res;
});
}


save(): void {
this.saving = true;


this._doctorsService.updateDoctor(this.doctor).subscribe(() => {
this.notify.success('Doctor updated successfully');
this.onSave.emit(null);
this.bsModalRef.hide();
});
}
}