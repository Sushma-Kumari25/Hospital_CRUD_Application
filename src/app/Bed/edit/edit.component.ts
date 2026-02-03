import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponentBase } from '../../../shared/app-component-base';
import {
  BedServiceProxy,
  UpdateBedDto,
  RoomServiceProxy,
  RoomDto
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    AbpValidationSummaryComponent,
    LocalizePipe
  ]
})
export class EditBedComponent extends AppComponentBase implements OnInit {

  saving = false;
  rooms: RoomDto[] = [];

  
  id!: number;

  bed: any = {
    id: null,
    roomId: null,
    bedNumber: '',
    isOccupied: false
  };

  constructor(
    injector: Injector,
    private _bedService: BedServiceProxy,
    private _roomService: RoomServiceProxy,
    public bsModalRef: BsModalRef,
     private cdr: ChangeDetectorRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadRooms();
    this.loadBed();
  }

loadRooms(): void {
  this._roomService.getAllRooms().subscribe((res: RoomDto[]) => {
    this.rooms = res;
    this.cdr.detectChanges();
  });
}

  loadBed(): void {
    this._bedService.getAll().subscribe(res => {
      this.bed = res;
    });
  }

  save(): void {
    this.saving = true;

    const input = new UpdateBedDto();
    input.init(this.bed);

    this._bedService.update(input).subscribe({
      next: () => {
        this.notify.success('Bed updated successfully ✅');
        this.bsModalRef.hide();
        this.saving = false;
      },
      error: () => {
        this.notify.error('Error while updating bed ❌');
        this.saving = false;
      }
    });
  }
}
