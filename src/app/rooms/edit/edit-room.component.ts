import { Component, Injector, OnInit, EventEmitter, Output } from '@angular/core';
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
  room: UpdateRoomDto = new UpdateRoomDto();

  @Output() onSave = new EventEmitter<any>(); // ✅ Add Output

  constructor(
    injector: Injector,
    private _roomService: RoomServiceProxy,
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
    this._roomService.getRoomById(this.id).subscribe(res => {
      // ✅ Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.room.id = this.id;
        this.room.roomNumber = res.roomNumber;
        this.room.bedType = res.bedType;
        this.room.isActive = res.isActive;
      });
    });
  }

  save(): void {
    if (!this.room.roomNumber || !this.room.bedType) {
      this.notify.warn('Please fill all required fields', 'Validation');
      return;
    }

    this.saving = true;

    this._roomService.updateRoom(this.room).subscribe({
      next: () => {
        this.notify.success('Room updated successfully', 'Success');
        this.onSave.emit(null); // ✅ Emit event to parent
        this.bsModalRef.hide();
        this.saving = false;
      },
      error: () => {
        this.notify.error('Failed to update room', 'Error');
        this.saving = false;
      }
    });
  }
}
