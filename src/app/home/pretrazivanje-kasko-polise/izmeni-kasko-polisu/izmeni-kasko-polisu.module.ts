import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IzmeniKaskoPolisuPageRoutingModule } from './izmeni-kasko-polisu-routing.module';

import { IzmeniKaskoPolisuPage } from './izmeni-kasko-polisu.page';
import { IzmeniKaskoStavkuComponent } from './izmeni-kasko-stavku/izmeni-kasko-stavku.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IzmeniKaskoPolisuPageRoutingModule
  ],
  declarations: [IzmeniKaskoPolisuPage, IzmeniKaskoStavkuComponent],
  entryComponents: [IzmeniKaskoStavkuComponent]
})
export class IzmeniKaskoPolisuPageModule {}
