import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoClientPageRoutingModule } from './info-client-routing.module';

import { InfoClientPage } from './info-client.page';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoClientPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [InfoClientPage]
})
export class InfoClientPageModule {}
