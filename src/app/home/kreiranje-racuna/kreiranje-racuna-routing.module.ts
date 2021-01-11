import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KreiranjeRacunaPage } from './kreiranje-racuna.page';

const routes: Routes = [
  {
    path: '',
    component: KreiranjeRacunaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KreiranjeRacunaPageRoutingModule {}
