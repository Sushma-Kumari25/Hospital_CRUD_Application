import { Component, Injector, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { EditBedComponent } from './edit/edit.component';
import { CreateBedComponent } from './create/create.component';
import { AppComponentBase } from '../../shared/app-component-base';
import { BedDto, BedServiceProxy } from '../../shared/service-proxies/service-proxies';
import { LocalizePipe } from "../../shared/pipes/localize.pipe";
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@node_modules/@angular/forms';
import { CommonModule } from '@node_modules/@angular/common';
import { EventEmitter, Output } from '@angular/core';

@Component({
  templateUrl: './bed.component.html',
  imports: [LocalizePipe,FormsModule,CommonModule],
  standalone:true
})
export class BedComponent extends AppComponentBase implements OnInit {

  beds: BedDto[] = [];
  notify: any;

  constructor(
    injector: Injector,
    private _bedService: BedServiceProxy,
    private cdr: ChangeDetectorRef,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getBeds();
  }

 getBeds(): void {
  this._bedService.getAll().subscribe((res:BedDto[]) =>{
    this.beds = res;
    this.cdr.detectChanges();
  }) ;
 }

//  @Output() onSave = new EventEmitter<void>();



  createBed(): void {
    const ref = this._modalService.show(CreateBedComponent);

    ref.onHidden?.subscribe(() => {
      this.getBeds();
    });
  }

  editBed(bed: BedDto): void {
    const ref = this._modalService.show(EditBedComponent, {
      initialState: {
        id: bed.id
      }
    });

    ref.onHidden?.subscribe(() => {
      this.getBeds();
    });
  }

 deleteBed(bed: BedDto): void {
  abp.message.confirm(
    this.l('AreYouSureDelete'), 
    undefined,                 
    (result: boolean) => {
      if (result) {
        this._bedService.delete(bed.id).subscribe(() => {
          this.notify.success(this.l('SuccessfullyDeleted'));
          this.getBeds(); 
        });
      }
    }
  );
}
}
