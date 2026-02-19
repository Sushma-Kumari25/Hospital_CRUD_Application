import { Component, Injector, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateDoctorComponent } from './create/create-doctor.component';
import { EditDoctorComponent } from './edit/edit-doctor.component';
import { AppComponentBase } from '../../shared/app-component-base';
import { DoctorsDto, DoctorsServiceProxy } from '../../shared/service-proxies/service-proxies';
import { LocalizePipe } from "../../shared/pipes/localize.pipe";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './doctors.component.html',
  standalone: true,
  imports: [LocalizePipe, CommonModule, FormsModule]
})
export class DoctorsComponent extends AppComponentBase implements OnInit {

  doctors: DoctorsDto[] = [];

  // 🔥 CHANGE BASE URL IF API PORT DIFFERENT
 private baseUrl = 'https://localhost:44311';


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

  // ✅ LOAD DOCTORS
  loadDoctors(): void {
    this._doctorsService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctors = res;
        console.log('Loaded doctors:', this.doctors);
      },
      error: (err) => {
        console.error('Error loading doctors', err);
        this.notify.error('Failed to load doctors');
      }
    });
  }

  // ✅ PHOTO URL FUNCTION (FOR BOTH PHOTOS)
  getPhotoUrl(path?: string): string {
    if (!path) {
      return 'assets/no-image.png'; // default image
    }

    // If backend returns relative path like /uploads/abc.jpg
    return this.baseUrl + path;
  }

  // ✅ CREATE
  createDoctor(): void {
    const modal: BsModalRef = this._modalService.show(CreateDoctorComponent, {
      class: 'modal-lg'
    });

    modal.content?.onSave?.subscribe(() => {
      this.loadDoctors();
    });
  }

  // ✅ EDIT
  editDoctor(d: DoctorsDto): void {
    const modal: BsModalRef = this._modalService.show(EditDoctorComponent, {
      class: 'modal-lg',
      initialState: { id: d.id }
    });

    modal.content?.onSave?.subscribe(() => {
      this.loadDoctors();
    });
  }

  // ✅ DELETE
  deleteDoctor(d: DoctorsDto): void {
    abp.message.confirm(
      `Delete doctor ${d.fullName} ?`,
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
