import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PretraziVoziloPage } from './pretrazi-vozilo.page';

const routes: Routes = [
  {
    path: '',
    component: PretraziVoziloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PretraziVoziloPageRoutingModule {}
