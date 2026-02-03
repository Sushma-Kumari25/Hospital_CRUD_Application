import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PatientsDto, PatientsServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CreatePatientComponent } from './create/create.component';
import { EditPatientComponent } from './edit/edit.component';
import { LocalizePipe } from "../../shared/pipes/localize.pipe";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, LocalizePipe]
})
export class PatientsComponent implements OnInit {

  patients: PatientsDto[] = [];

  constructor(
    private _patientsService: PatientsServiceProxy,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this._patientsService.getAllPatients().subscribe(
      (res: any) => {
        this.patients = res;
      }
    );
  }

  createPatient() {
    const ref = this._modalService.show(CreatePatientComponent, { class: 'modal-lg' });
    ref.content.onSave.subscribe(() => this.loadPatients());
  }

  editPatient(p: PatientsDto) {
    const ref = this._modalService.show(EditPatientComponent, { class: 'modal-lg', initialState: { id: p.id } });
    ref.content.onSave.subscribe(() => this.loadPatients());
  }

  deletePatient(p: PatientsDto) {
    if(confirm('Delete patient?')) {
      this._patientsService.deletePatient(p.id).subscribe(() => this.loadPatients());
    }
  }

  // ✅ get full photo URL
  getPhotoUrl(photoPath: string): string {
    if (!photoPath) return '';
    return 'https://localhost:44311' + photoPath; // change port if needed
  }
}
