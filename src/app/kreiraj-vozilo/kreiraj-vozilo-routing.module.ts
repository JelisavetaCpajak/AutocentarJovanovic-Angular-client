import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KreirajVoziloPage } from './kreiraj-vozilo.page';

const routes: Routes = [
  {
    path: '',
    component: KreirajVoziloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KreirajVoziloPageRoutingModule {}
