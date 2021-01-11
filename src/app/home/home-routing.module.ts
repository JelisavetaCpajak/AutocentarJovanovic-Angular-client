import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'pretrazivanje-predmeta',
    loadChildren: () => import('./pretrazivanje-predmeta/pretrazivanje-predmeta.module').then( m => m.PretrazivanjePredmetaPageModule)
  },
  {
    path: 'kreiranje-predmeta',
    loadChildren: () => import('./kreiranje-predmeta/kreiranje-predmeta.module').then( m => m.KreiranjePredmetaPageModule)
  },
  {
    path: 'kreiranje-kasko-polise',
    loadChildren: () => import('./kreiranje-kasko-polise/kreiranje-kasko-polise.module').then( m => m.KreiranjeKaskoPolisePageModule)
  },
  {
    path: 'pretrazivanje-kasko-polise',
    loadChildren: () => import('./pretrazivanje-kasko-polise/pretrazivanje-kasko-polise.module').then( m => m.PretrazivanjeKaskoPolisePageModule)
  },
  {
    path: 'kreiranje-racuna',
    loadChildren: () => import('./kreiranje-racuna/kreiranje-racuna.module').then( m => m.KreiranjeRacunaPageModule)
  },
  {
    path: 'pretrazivanje-racuna',
    loadChildren: () => import('./pretrazivanje-racuna/pretrazivanje-racuna.module').then( m => m.PretrazivanjeRacunaPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
