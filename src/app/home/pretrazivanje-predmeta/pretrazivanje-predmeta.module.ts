import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PretrazivanjePredmetaPageRoutingModule } from './pretrazivanje-predmeta-routing.module';

import { PretrazivanjePredmetaPage } from './pretrazivanje-predmeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PretrazivanjePredmetaPageRoutingModule
  ],
  declarations: [PretrazivanjePredmetaPage]
})
export class PretrazivanjePredmetaPageModule {}
