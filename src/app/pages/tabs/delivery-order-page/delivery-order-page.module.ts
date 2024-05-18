import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryOrderPagePageRoutingModule } from './delivery-order-page-routing.module';

import { DeliveryOrderPagePage } from './delivery-order-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryOrderPagePageRoutingModule
  ],
  declarations: [DeliveryOrderPagePage]
})
export class DeliveryOrderPagePageModule {}
