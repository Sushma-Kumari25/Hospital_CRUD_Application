import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { CreateRoomComponent } from './create/create-room.component';
import { EditRoomComponent } from './edit/edit-room.component';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoomsRoutingModule,
     RoomsComponent,
    CreateRoomComponent,
    EditRoomComponent
  ]
})
export class RoomsModule {}
