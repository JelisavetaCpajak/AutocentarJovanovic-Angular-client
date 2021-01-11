import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KreirajVoziloPageRoutingModule } from './kreiraj-vozilo-routing.module';

import { KreirajVoziloPage } from './kreiraj-vozilo.page';
import { PretraziKlijentaComponent } from '../pretrazi-klijenta/pretrazi-klijenta.component';
import { KreirajKlijentaComponent } from '../kreiraj-klijenta/kreiraj-klijenta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KreirajVoziloPageRoutingModule
  ],
  declarations: [KreirajVoziloPage, PretraziKlijentaComponent, KreirajKlijentaComponent],
  entryComponents: [PretraziKlijentaComponent, KreirajKlijentaComponent]
})
export class KreirajVoziloPageModule {}
