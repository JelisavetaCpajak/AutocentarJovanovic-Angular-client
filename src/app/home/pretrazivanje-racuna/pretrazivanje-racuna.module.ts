import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PretrazivanjeRacunaPageRoutingModule } from './pretrazivanje-racuna-routing.module';

import { PretrazivanjeRacunaPage } from './pretrazivanje-racuna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PretrazivanjeRacunaPageRoutingModule
  ],
  declarations: [PretrazivanjeRacunaPage]
})
export class PretrazivanjeRacunaPageModule {}
