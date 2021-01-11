import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PretrazivanjeRacunaPage } from './pretrazivanje-racuna.page';

const routes: Routes = [
  {
    path: '',
    component: PretrazivanjeRacunaPage
  },
  {
    path: 'izmeni-racun',
    loadChildren: () => import('./izmeni-racun/izmeni-racun.module').then( m => m.IzmeniRacunPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PretrazivanjeRacunaPageRoutingModule {}
