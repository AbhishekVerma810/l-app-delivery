import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryOrderPagePage } from './delivery-order-page.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryOrderPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryOrderPagePageRoutingModule {}
