import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KreiranjeRacunaPageRoutingModule } from './kreiranje-racuna-routing.module';

import { KreiranjeRacunaPage } from './kreiranje-racuna.page';
import { NovaStavkaRacunaComponent } from './nova-stavka-racuna/nova-stavka-racuna.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KreiranjeRacunaPageRoutingModule
  ],
  declarations: [KreiranjeRacunaPage,NovaStavkaRacunaComponent],
  entryComponents: [NovaStavkaRacunaComponent]
})
export class KreiranjeRacunaPageModule {}
