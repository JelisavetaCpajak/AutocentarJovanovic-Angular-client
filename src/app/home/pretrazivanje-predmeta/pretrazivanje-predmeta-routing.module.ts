import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PretrazivanjePredmetaPage } from './pretrazivanje-predmeta.page';

const routes: Routes = [
  {
    path: '',
    component: PretrazivanjePredmetaPage
  },
  {
    path: 'izmeni-predmet',
    loadChildren: () => import('./izmeni-predmet/izmeni-predmet.module').then( m => m.IzmeniPredmetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PretrazivanjePredmetaPageRoutingModule {}
