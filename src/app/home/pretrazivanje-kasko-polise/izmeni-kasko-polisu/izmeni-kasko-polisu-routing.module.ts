import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IzmeniKaskoPolisuPage } from './izmeni-kasko-polisu.page';

const routes: Routes = [
  {
    path: '',
    component: IzmeniKaskoPolisuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IzmeniKaskoPolisuPageRoutingModule {}
