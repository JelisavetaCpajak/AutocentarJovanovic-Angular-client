import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./servisi/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "home",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "kreiraj-vozilo",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./kreiraj-vozilo/kreiraj-vozilo.module").then(
        (m) => m.KreirajVoziloPageModule
      ),
  },
  {
    path: "pretrazi-vozilo",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./pretrazi-vozilo/pretrazi-vozilo.module").then(
        (m) => m.PretraziVoziloPageModule
      ),
  },

  {
    path: "kreiraj-klijenta",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./kreiraj-klijenta/kreiraj-klijenta.component").then(
        (m) => m.KreirajKlijentaComponent
      ),
  },
  {
    path: "pretrazi-klijenta",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./pretrazi-klijenta/pretrazi-klijenta.component").then(
        (m) => m.PretraziKlijentaComponent
      ),
  },

  {
    path: "kreiraj-zaposlenog",
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import("./kreiraj-zaposlenog/kreiraj-zaposlenog.module").then(
        (m) => m.KreirajZaposlenogPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
