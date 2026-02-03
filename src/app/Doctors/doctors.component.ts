import { Component, Injector, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateDoctorComponent } from './create/create-doctor.component';
import { EditDoctorComponent } from './edit/edit-doctor.component';
import { AppComponentBase } from '../../shared/app-component-base';
import { DoctorsDto, DoctorsServiceProxy } from '../../shared/service-proxies/service-proxies';
import { LocalizePipe } from "../../shared/pipes/localize.pipe";
import { CommonModule } from '@node_modules/@angular/common';
import { FormsModule } from '@node_modules/@angular/forms';


@Component({
templateUrl: './doctors.component.html',
imports: [LocalizePipe,CommonModule,FormsModule]
})
export class DoctorsComponent extends AppComponentBase implements OnInit {


doctors: DoctorsDto[] = [];


constructor(
injector: Injector,
private _doctorsService: DoctorsServiceProxy,
private _modalService: BsModalService
) {
super(injector);
}


ngOnInit(): void {
this.loadDoctors();
}


loadDoctors() {
  this._doctorsService.getAllDoctors().subscribe(res => {
    
    this.doctors = res;  
    console.log('Loaded doctors:', this.doctors);
  });
}



createDoctor() {
const modal: BsModalRef = this._modalService.show(CreateDoctorComponent, {
class: 'modal-lg'
});


modal.content.onSave.subscribe(() => {
this.loadDoctors();
});
}


editDoctor(d: DoctorsDto) {
const modal: BsModalRef = this._modalService.show(EditDoctorComponent, {
class: 'modal-lg',
initialState: { id: d.id }
});


modal.content.onSave.subscribe(() => {
this.loadDoctors();
});
}


deleteDoctor(d: DoctorsDto) {
abp.message.confirm(
'Delete doctor ' + d.fullName + ' ?',
undefined,
(result: boolean) => {
if (result) {
this._doctorsService.deleteDoctor(d.id).subscribe(() => {
this.notify.success('Deleted successfully');
this.loadDoctors();
});
}
}
);
}
}