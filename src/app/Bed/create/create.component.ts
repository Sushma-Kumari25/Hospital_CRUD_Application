import { Component, Injector, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import { AppComponentBase } from '../../../shared/app-component-base';
import {
  BedServiceProxy,
  CreateBedDto,
  RoomServiceProxy,
  RoomDto
} from '../../../shared/service-proxies/service-proxies';

import { AbpModalHeaderComponent } from '../../../shared/components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from '../../../shared/components/modal/abp-modal-footer.component';
import { AbpValidationSummaryComponent } from '../../../shared/components/validation/abp-validation.summary.component';
import { LocalizePipe } from '../../../shared/pipes/localize.pipe';

@Component({
  templateUrl: './create.component.html',
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
export class CreateBedComponent extends AppComponentBase implements OnInit {

  saving = false;
  rooms: RoomDto[] = [];

  bed: any = {
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
  }

loadRooms(): void {
  this._roomService.getAllRooms().subscribe((res: RoomDto[]) => {
    this.rooms = res;
    this.cdr.detectChanges();
  });
}



  save(): void {
    this.saving = true;

    const input = new CreateBedDto();
    input.init(this.bed);

    this._bedService.create(input).subscribe({
      next: () => {
        this.notify.success('Bed created successfully ✅');
        this.bsModalRef.hide();
        this.saving = false;
      },
      error: () => {
        this.notify.error('Error while creating bed ❌');
        this.saving = false;
      }
    });
  }
}
