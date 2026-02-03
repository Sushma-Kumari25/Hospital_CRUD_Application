import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { AppComponentBase } from '../../../shared/app-component-base';
import { RoomServiceProxy, UpdateRoomDto } from '../../../shared/service-proxies/service-proxies';

import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  templateUrl: './edit-room.component.html',
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
export class EditRoomComponent extends AppComponentBase implements OnInit {

  saving = false;
  id!: number;

  room: any = {
    roomNumber: '',
    bedType: null,
    isActive: false
  };

  constructor(
    injector: Injector,
    private _roomsService: RoomServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadRoom();
    }
  }

 loadRoom(): void {
  this._roomsService.getRoomById(this.id).subscribe(res => {
    this.room = {
      roomNumber: res.roomNumber,
      bedType: res.bedType,
      isActive: res.isActive  
    };
  });
}


  save(): void {
    if (!this.room.roomNumber || !this.room.bedType) {
      this.notify.warn('Please fill all required fields', 'Validation');
      return;
    }

    this.saving = true;

    const input = new UpdateRoomDto();
    input.id = this.id;
    input.init(this.room);

    this._roomsService.updateRoom(input).subscribe({
      next: () => {
        this.notify.success('Room updated successfully ✅', 'Success');
        this.saving = false;
        this.bsModalRef.hide();   // ✅ modal close
      },
      error: () => {
        this.notify.error('Failed to update room ❌', 'Error');
        this.saving = false;
      }
    });
  }
}
