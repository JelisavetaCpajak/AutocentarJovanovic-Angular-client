import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KreiranjePredmetaPage } from './kreiranje-predmeta.page';

const routes: Routes = [
  {
    path: '',
    component: KreiranjePredmetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KreiranjePredmetaPageRoutingModule {}
