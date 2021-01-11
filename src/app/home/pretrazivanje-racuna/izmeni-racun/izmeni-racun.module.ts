import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IzmeniRacunPageRoutingModule } from './izmeni-racun-routing.module';

import { IzmeniRacunPage } from './izmeni-racun.page';
import { IzmeniStavkuRacunaComponent } from './izmeni-stavku-racuna/izmeni-stavku-racuna.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IzmeniRacunPageRoutingModule
  ],
  declarations: [IzmeniRacunPage,IzmeniStavkuRacunaComponent],
  entryComponents: [IzmeniStavkuRacunaComponent]
})
export class IzmeniRacunPageModule {}
