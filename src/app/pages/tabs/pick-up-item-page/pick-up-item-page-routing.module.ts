import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickUpItemPagePage } from './pick-up-item-page.page';

const routes: Routes = [
  {
    path: '',
    component: PickUpItemPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickUpItemPagePageRoutingModule {}
