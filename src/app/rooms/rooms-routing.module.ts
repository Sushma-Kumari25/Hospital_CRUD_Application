import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { CreateRoomComponent } from './create/create-room.component';
import { EditRoomComponent } from './edit/edit-room.component';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'create', component: CreateRoomComponent },
  { path: 'edit/:id', component: EditRoomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {}
