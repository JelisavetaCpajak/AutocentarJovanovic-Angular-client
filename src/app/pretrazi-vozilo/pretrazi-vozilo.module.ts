import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PretraziVoziloPageRoutingModule } from './pretrazi-vozilo-routing.module';

import { PretraziVoziloPage } from './pretrazi-vozilo.page';
import { PrikaziVoziloComponent } from './prikazi-vozilo/prikazi-vozilo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PretraziVoziloPageRoutingModule
  ],
  declarations: [PretraziVoziloPage, PrikaziVoziloComponent],
  entryComponents: [PrikaziVoziloComponent]
})
export class PretraziVoziloPageModule {}
