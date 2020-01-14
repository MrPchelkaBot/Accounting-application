import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoOrderPageRoutingModule } from './info-order-routing.module';

import { InfoOrderPage } from './info-order.page';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoOrderPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [InfoOrderPage]
})
export class InfoOrderPageModule {}
