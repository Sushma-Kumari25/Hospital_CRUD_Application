import {
  Component,
  Injector
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '../../../shared/app-component-base';
import {
  RoomServiceProxy,
  CreateRoomDto
} from '../../../shared/service-proxies/service-proxies';
import { AbpModalHeaderComponent } from "../../../shared/components/modal/abp-modal-header.component";
import { LocalizePipe } from "../../../shared/pipes/localize.pipe";
import { AbpValidationSummaryComponent } from "../../../shared/components/validation/abp-validation.summary.component";
import { AbpModalFooterComponent } from "../../../shared/components/modal/abp-modal-footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: './create-room.component.html',
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
export class CreateRoomComponent extends AppComponentBase {

  saving = false;

  room: any = {
    roomNumber: '',
    bedType: null,
    IsActive: true
  };

  constructor(
    injector: Injector,
    private _roomService: RoomServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  save(): void {
    this.saving = true;

    const input = new CreateRoomDto();
    input.init(this.room);

    this._roomService.createRoom(input).subscribe({
      next: () => {
        this.notify.success('Room created successfully ✅', 'Success');
        this.bsModalRef.hide();
        this.saving = false;
      },
      error: () => {
        this.notify.error('Error while creating room ❌', 'Error');
        this.saving = false;
      }
    });
  }
}
