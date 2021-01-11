import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IzmeniPredmetPageRoutingModule } from './izmeni-predmet-routing.module';

import { IzmeniPredmetPage } from './izmeni-predmet.page';
import { IzmeniNalogZaUplatuComponent } from './izmeni-nalog-za-uplatu/izmeni-nalog-za-uplatu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IzmeniPredmetPageRoutingModule
  ],
  declarations: [IzmeniPredmetPage, IzmeniNalogZaUplatuComponent],
  entryComponents: [IzmeniNalogZaUplatuComponent]
})
export class IzmeniPredmetPageModule {}
