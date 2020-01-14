import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrderPageRoutingModule } from './add-order-routing.module';

import { AddOrderPage } from './add-order.page';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOrderPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [AddOrderPage]
})
export class AddOrderPageModule {}
