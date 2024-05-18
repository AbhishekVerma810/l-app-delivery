import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickUpOrderPagePageRoutingModule } from './pick-up-order-page-routing.module';

import { PickUpOrderPagePage } from './pick-up-order-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickUpOrderPagePageRoutingModule
  ],
  declarations: [PickUpOrderPagePage]
})
export class PickUpOrderPagePageModule {}
