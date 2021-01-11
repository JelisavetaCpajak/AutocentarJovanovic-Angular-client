import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KreiranjePredmetaPageRoutingModule } from './kreiranje-predmeta-routing.module';

import { KreiranjePredmetaPage } from './kreiranje-predmeta.page';
import { NoviNalogZaUplatuComponent } from './novi-nalog-za-uplatu/novi-nalog-za-uplatu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KreiranjePredmetaPageRoutingModule
  ],
  declarations: [KreiranjePredmetaPage,NoviNalogZaUplatuComponent],
  entryComponents: [NoviNalogZaUplatuComponent]
})
export class KreiranjePredmetaPageModule {}
