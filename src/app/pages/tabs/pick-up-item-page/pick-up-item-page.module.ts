import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickUpItemPagePageRoutingModule } from './pick-up-item-page-routing.module';

import { PickUpItemPagePage } from './pick-up-item-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickUpItemPagePageRoutingModule
  ],
  declarations: [PickUpItemPagePage]
})
export class PickUpItemPagePageModule {}
