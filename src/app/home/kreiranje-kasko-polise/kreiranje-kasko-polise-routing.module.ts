import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KreiranjeKaskoPolisePage } from './kreiranje-kasko-polise.page';

const routes: Routes = [
  {
    path: '',
    component: KreiranjeKaskoPolisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KreiranjeKaskoPolisePageRoutingModule {}
