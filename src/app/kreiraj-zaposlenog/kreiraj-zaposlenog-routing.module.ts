import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KreirajZaposlenogPage } from './kreiraj-zaposlenog.page';

const routes: Routes = [
  {
    path: '',
    component: KreirajZaposlenogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KreirajZaposlenogPageRoutingModule {}
