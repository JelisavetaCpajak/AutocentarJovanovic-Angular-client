import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KreiranjeKaskoPolisePageRoutingModule } from './kreiranje-kasko-polise-routing.module';

import { KreiranjeKaskoPolisePage } from './kreiranje-kasko-polise.page';
import { NovaKaskoStavkaComponent } from './nova-kasko-stavka/nova-kasko-stavka.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KreiranjeKaskoPolisePageRoutingModule
  ],
  declarations: [KreiranjeKaskoPolisePage, NovaKaskoStavkaComponent],
  entryComponents: [NovaKaskoStavkaComponent]
})
export class KreiranjeKaskoPolisePageModule { }
