import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IzmeniRacunPage } from './izmeni-racun.page';

const routes: Routes = [
  {
    path: '',
    component: IzmeniRacunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IzmeniRacunPageRoutingModule {}
