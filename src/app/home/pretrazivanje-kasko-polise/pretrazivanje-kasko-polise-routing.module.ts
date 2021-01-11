import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PretrazivanjeKaskoPolisePage } from './pretrazivanje-kasko-polise.page';

const routes: Routes = [
  {
    path: '',
    component: PretrazivanjeKaskoPolisePage
  },
  {
    path: 'izmeni-kasko-polisu',
    loadChildren: () => import('./izmeni-kasko-polisu/izmeni-kasko-polisu.module').then( m => m.IzmeniKaskoPolisuPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PretrazivanjeKaskoPolisePageRoutingModule {}
