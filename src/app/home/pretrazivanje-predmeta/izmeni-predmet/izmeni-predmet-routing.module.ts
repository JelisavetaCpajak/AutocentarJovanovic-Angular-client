import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IzmeniPredmetPage } from './izmeni-predmet.page';

const routes: Routes = [
  {
    path: '',
    component: IzmeniPredmetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IzmeniPredmetPageRoutingModule {}
