import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KreirajZaposlenogPageRoutingModule } from './kreiraj-zaposlenog-routing.module';

import { KreirajZaposlenogPage } from './kreiraj-zaposlenog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    KreirajZaposlenogPageRoutingModule
  ],
  declarations: [KreirajZaposlenogPage]
})
export class KreirajZaposlenogPageModule {}
