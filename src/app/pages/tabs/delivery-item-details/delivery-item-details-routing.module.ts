import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryItemDetailsPage } from './delivery-item-details.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryItemDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryItemDetailsPageRoutingModule {}
