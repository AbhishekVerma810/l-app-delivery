import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryItemDetailsPageRoutingModule } from './delivery-item-details-routing.module';

import { DeliveryItemDetailsPage } from './delivery-item-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryItemDetailsPageRoutingModule
  ],
  declarations: [DeliveryItemDetailsPage]
})
export class DeliveryItemDetailsPageModule {}
