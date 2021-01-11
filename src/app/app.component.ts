import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Plugins, Capacitor} from '@capacitor/core';
import { Platform, ModalController } from "@ionic/angular";
import { Zaposleni } from "./modeli/zaposleni.model";
import { ZaposleniService } from "./servisi/zaposleni.service";
import { Subscription } from "rxjs";
import { KreirajKlijentaComponent } from "./kreiraj-klijenta/kreiraj-klijenta.component";
import { PretraziKlijentaComponent } from "./pretrazi-klijenta/pretrazi-klijenta.component";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  prijavljeniZaposleni: Zaposleni;
  private zaposleniSub: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private zaposleniService: ZaposleniService
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
    this.zaposleniSub = this.zaposleniService.prijavljeniZaposleni.subscribe(
      (zaposleni) => {
        if (zaposleni) {
          this.prijavljeniZaposleni = new Zaposleni(
            zaposleni.idZaposlenog,
            zaposleni.ime,
            zaposleni.prezime,
            zaposleni.korisnickoIme,
            zaposleni.sifra
          );
        }
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // if (Capacitor.isPluginAvailable('SplashScreen')){
      //   Plugins.SplashScreen.hide();
      // }
    });
  }

  ngOnDestroy() {
    this.zaposleniSub.unsubscribe();
  }

  onKreirajKlijenta() {
    this.modalCtrl
      .create({
        component: KreirajKlijentaComponent,
        cssClass: "modal-view",
        componentProps: {},
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((rezultat) => {
        if (rezultat.role === "confirm") {
          //this.napravljeniNalog.sifra_naloga = this.napraviNovuSifruNaloga();
        }
      });
  }

  onPretraziKlijenta() {
    this.modalCtrl
      .create({
        component: PretraziKlijentaComponent,
        cssClass: "modal-view",
        componentProps: {},
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((rezultat) => {
        if (rezultat.role === "confirm") {
          //this.napravljeniNalog.sifra_naloga = this.napraviNovuSifruNaloga();
        }
      });
  }
}
