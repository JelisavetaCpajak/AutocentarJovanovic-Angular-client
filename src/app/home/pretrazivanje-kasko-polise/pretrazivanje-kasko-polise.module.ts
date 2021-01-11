import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PretrazivanjeKaskoPolisePageRoutingModule } from './pretrazivanje-kasko-polise-routing.module';

import { PretrazivanjeKaskoPolisePage } from './pretrazivanje-kasko-polise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PretrazivanjeKaskoPolisePageRoutingModule
  ],
  declarations: [PretrazivanjeKaskoPolisePage]
})
export class PretrazivanjeKaskoPolisePageModule {}
