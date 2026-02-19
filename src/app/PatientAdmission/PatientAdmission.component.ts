import { Component, Injector, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PatientAdmissionServiceProxy, PatientAdmissionDto } from '../../shared/service-proxies/service-proxies';
import { AppComponentBase } from '../../shared/app-component-base';
import { CreatePatientAdmissionComponent } from './Create/Create.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

@Component({
  selector: 'app-patient-admission',
  templateUrl: './patientAdmission.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LocalizePipe,
  ],
})
export class PatientAdmissionComponent extends AppComponentBase implements OnInit {

  patients: PatientAdmissionDto[] = [];
  bsModalRef?: BsModalRef; 

  constructor(
    injector: Injector,
    private _paService: PatientAdmissionServiceProxy,
    private modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  /** Load all patients */
  loadPatients(): void {
    this._paService.getAll().subscribe(result => {
      this.patients = result;
      console.log('Loaded patients:', this.patients);
    });
  }

  /** Open create modal */
  createPatient(): void {
    this.bsModalRef = this.modalService.show(CreatePatientAdmissionComponent, { class: 'modal-lg' });
    this.bsModalRef.content.onSave.subscribe(() => this.loadPatients());
  }

  /** Open edit modal */
  editPatient(patient: PatientAdmissionDto): void {
    this.bsModalRef = this.modalService.show(CreatePatientAdmissionComponent, { class: 'modal-lg' });
    this.bsModalRef.content.Pa = { ...patient }; // pass the selected patient
    this.bsModalRef.content.onSave.subscribe(() => this.loadPatients());
  }

  /** Delete patient */
  deletePatient(patient: PatientAdmissionDto): void {
    if (!confirm('Are you sure to delete this patient?')) return;

    this._paService.delete(patient.id).subscribe(() => {
      this.notify.success('Deleted successfully ✅', 'Success');
      this.loadPatients();
    });
  }
}
