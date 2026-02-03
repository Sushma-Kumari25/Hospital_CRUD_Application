import { Component, Injector, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AppComponentBase } from '../../shared/app-component-base';
import {  RoomDto, RoomServiceProxy } from '../../shared/service-proxies/service-proxies';
import { LocalizePipe } from "../../shared/pipes/localize.pipe";
import { CommonModule } from '@node_modules/@angular/common';
import { FormsModule } from '@node_modules/@angular/forms';
import { CreateRoomComponent } from './create/create-room.component';
import { EditRoomComponent } from './edit/edit-room.component';


@Component({
templateUrl: './rooms.component.html',
imports: [LocalizePipe,CommonModule,FormsModule]
})
export class RoomsComponent extends AppComponentBase implements OnInit {


rooms: RoomDto[] = [];


constructor(
injector: Injector,
private _roomService: RoomServiceProxy,
private _modalService: BsModalService
) {
super(injector);
}


ngOnInit(): void {
this.loadRoom();
}


loadRoom() {
  this._roomService.getAllRooms().subscribe(res => {
    
    this.rooms = res;  
    console.log('Loaded Rooms:', this.rooms);
  });
}



createRoom() {
const modal: BsModalRef = this._modalService.show(CreateRoomComponent, {
class: 'modal-lg'
});


modal.content.onSave.subscribe(() => {
this.loadRoom();
});
}


editRoom(r: RoomDto) {
const modal: BsModalRef = this._modalService.show(EditRoomComponent, {
class: 'modal-lg',
initialState: { id: r.id }
});


modal.content.onSave.subscribe(() => {
this.loadRoom();
});
}


deleteRoom(r: RoomDto) {
abp.message.confirm(
'Delete Room no ' + r.roomNumber + ' ?',
undefined,
(result: boolean) => {
if (result) {
this._roomService.deleteRoom(r.id).subscribe(() => {
this.notify.success('Deleted successfully');
this.loadRoom();
});
}
}
);
}
}