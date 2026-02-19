import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import {PatientsDto, PatientsServiceProxy } from '../../shared/service-proxies/service-proxies';
import { CreatePatientComponent } from './create/create.component';
import { EditPatientComponent } from './edit/edit.component';
import { LocalizePipe } from "../../shared/pipes/localize.pipe";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, LocalizePipe]
})
export class PatientsComponent implements OnInit {

  patients: PatientsDto[] = [];
  filteredPatients: PatientsDto[] = [];
  keyword: string = '';

  genderMap: { [key: number]: string } = {
    5: 'Male',
    10: 'Female',
    15: 'Other'
  };

  constructor(
    private _patientsService: PatientsServiceProxy,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this._patientsService.getAllPatients().subscribe({
      next: (res) => {
        this.patients = res;
        this.filteredPatients = [...this.patients];
      },
      error: (err) => console.error(err)
    });
  }

  list(): void {
    if (!this.keyword?.trim()) {
      this.filteredPatients = [...this.patients];
      return;
    }

    const k = this.keyword.toLowerCase().trim();

    this.filteredPatients = this.patients.filter(p =>
      p.firstName?.toLowerCase().includes(k) ||
      p.patientCode?.toLowerCase().includes(k) ||
      p.email?.toLowerCase().includes(k)
    );
  }

  createPatient(): void {
    const ref = this._modalService.show(CreatePatientComponent, { class: 'modal-lg' });

    ref.content.onSave.pipe(take(1)).subscribe(() => this.loadPatients());
  }

  editPatient(patient: PatientsDto): void {
    const ref = this._modalService.show(EditPatientComponent, {
      class: 'modal-lg',
      initialState: { id: patient.id }
    });

    ref.content.onSave.pipe(take(1)).subscribe(() => this.loadPatients());
  }

  deletePatient(patient: PatientsDto): void {
    if (!confirm(`Delete ${patient.firstName} ${patient.lastName}?`)) return;

    this._patientsService.deletePatient(patient.id).subscribe(() => this.loadPatients());
  }

  // ⭐ PHOTO FIX
  getPhotoUrl(photoPath: string): string {
    if (!photoPath) return '';

    const baseUrl = 'https://localhost:44311';

    return photoPath.startsWith('http')
      ? photoPath
      : baseUrl + (photoPath.startsWith('/') ? photoPath : '/' + photoPath);
  }
}
