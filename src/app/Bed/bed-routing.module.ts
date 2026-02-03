import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedComponent } from './bed.component';

const routes: Routes = [
  {
    path: '',
    component: BedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedRoutingModule {}
