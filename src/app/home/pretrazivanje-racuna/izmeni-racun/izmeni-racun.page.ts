import { Component, OnInit } from "@angular/core";
import { StavkaRacuna } from "src/app/modeli/stavkaRacuna";
import { Racun } from "src/app/modeli/racun.model";
import {
  ModalController,
  LoadingController,
  AlertController,
  NavController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { RacunService } from "src/app/servisi/racun.service";
import { NovaStavkaRacunaComponent } from "../../kreiranje-racuna/nova-stavka-racuna/nova-stavka-racuna.component";
import { IzmeniStavkuRacunaComponent } from "./izmeni-stavku-racuna/izmeni-stavku-racuna.component";

@Component({
  selector: "app-izmeni-racun",
  templateUrl: "./izmeni-racun.page.html",
  styleUrls: ["./izmeni-racun.page.scss"],
})
export class IzmeniRacunPage implements OnInit {
  napravljenaStavka: StavkaRacuna;
  racunZaIzmenu: Racun;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private racunService: RacunService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.racunZaIzmenu = {
        sifra_racuna: this.router.getCurrentNavigation().extras.state
          .sifra_racuna,
        datum: this.router.getCurrentNavigation().extras.state.datum,
        ukupno_sa_pdv: this.router.getCurrentNavigation().extras.state
          .ukupno_sa_pdv,
        ukupno_bez_pdv: this.router.getCurrentNavigation().extras.state
          .ukupno_bez_pdv,
        klijent: this.router.getCurrentNavigation().extras.state.klijent,
        zapisnik: this.router.getCurrentNavigation().extras.state.zapisnik,
        nizStavki: this.router.getCurrentNavigation().extras.state.nizStavki,
      };
    });
  }

  onNapraviStavku() {
    this.modalCtrl
      .create({
        component: NovaStavkaRacunaComponent,
        cssClass: "modal-view",
        componentProps: {
          brojSasije: this.racunZaIzmenu.zapisnik.saobracajna.vozilo
            .broj_sasije,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((rezultat) => {
        if (rezultat.role === "confirm") {
          this.napravljenaStavka = rezultat.data.napravljenaStavka;
          this.napravljenaStavka.kreiranje = true;

          this.racunZaIzmenu.nizStavki.push(this.napravljenaStavka);
          this.azurirajPodatke();
        }
      });

    //this.azurirajPodatke();
  }

  onIzmeniStavku(indeksStavkeZaIzmenu: number) {
    this.modalCtrl
      .create({
        component: IzmeniStavkuRacunaComponent,
        cssClass: "modal-view",
        componentProps: {
          stavkaZaIzmenu: this.racunZaIzmenu.nizStavki[indeksStavkeZaIzmenu],
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((rezultat) => {
        if (rezultat.role === "confirm") {
          if (!rezultat.data.izmenjenaStavka.kreiranje) {
            rezultat.data.izmenjenaStavka.izmena = true;
          }
          this.racunZaIzmenu.nizStavki[indeksStavkeZaIzmenu] =
            rezultat.data.izmenjenaStavka;
          this.azurirajPodatke();
        }
      });

    //this.azurirajPodatke();
  }

  onObrisiStavku(indeksStavkeZaBrisanje: number) {
    if (
      this.racunZaIzmenu.nizStavki[indeksStavkeZaBrisanje].kreiranje === true
    ) {
      this.racunZaIzmenu.nizStavki.splice(indeksStavkeZaBrisanje, 1);
      this.azurirajPodatke();
      return;
    } else if (
      this.racunZaIzmenu.nizStavki[indeksStavkeZaBrisanje].izmena === true
    ) {
      this.racunZaIzmenu.nizStavki[indeksStavkeZaBrisanje].izmena = false;
      this.racunZaIzmenu.nizStavki[indeksStavkeZaBrisanje].brisanje = true;
    } else {
      this.racunZaIzmenu.nizStavki[indeksStavkeZaBrisanje].brisanje = true;
    }

    //this.azurirajPodatke();
  }

  izmeniRacun() {
    let brojPostojecih = 0;

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.racunZaIzmenu.nizStavki.length; index++) {
      if (this.racunZaIzmenu.nizStavki[index].brisanje === false) {
        brojPostojecih++;
      }
    }
    if (brojPostojecih === 0) {
      this.kreirajAlert("Racun mora sadržati bar jednu stavku!");
      return;
    }

    // let sumaBezPdv = 0;
    // let sumaSaPdv = 0;

    // for (let index = 0; index < this.racunZaIzmenu.nizStavki.length; index++) {
    //   if (
    //     // this.racunZaIzmenu.nizStavki[index].kreiranje === true ||
    //     // this.racunZaIzmenu.nizStavki[index].kreiranje === true ||
    //     this.racunZaIzmenu.nizStavki[index].brisanje !== true
    //   ) {
    //     sumaBezPdv +=
    //       this.racunZaIzmenu.nizStavki[index].kolicina *
    //       this.racunZaIzmenu.nizStavki[index].cena_bez_pdv;

    //     sumaSaPdv +=
    //       this.racunZaIzmenu.nizStavki[index].kolicina *
    //       this.racunZaIzmenu.nizStavki[index].cena_sa_pdv;
    //   }
    // }

    // this.racunZaIzmenu.ukupno_bez_pdv = sumaBezPdv;
    // this.racunZaIzmenu.ukupno_sa_pdv = sumaSaPdv;

    this.azurirajPodatke();
    console.log("!!!!racun za izmenu: ", this.racunZaIzmenu);
    this.loadingCtrl
      .create({ message: "Izmena racuna..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.racunService.izmeniRacun(this.racunZaIzmenu).subscribe(
          (res) => {
            loadingEl.dismiss();
            this.kreirajAlert("Racun je uspešno izmenjen.");
            this.navCtrl.navigateBack("home/pretrazivanje-racuna");
          },
          (err) => {
            loadingEl.dismiss();
            this.kreirajAlert("Došlo je do greške prilikom izmene racuna.");
          }
        );
      });
  }

  kreirajAlert(tekst: string) {
    this.alertCtrl
      .create({
        header: tekst,
        buttons: [
          {
            text: "OK",
            role: "cancel",
          },
        ],
      })
      .then((alertEl) => {
        return alertEl.present();
      });
  }

  azurirajPodatke() {
    let sumaBezPdv = 0;
    let sumaSaPdv = 0;

    for (let index = 0; index < this.racunZaIzmenu.nizStavki.length; index++) {
      if (
        // this.racunZaIzmenu.nizStavki[index].kreiranje === true ||
        // this.racunZaIzmenu.nizStavki[index].kreiranje === true ||
        this.racunZaIzmenu.nizStavki[index].brisanje !== true
      ) {
        sumaBezPdv +=
          this.racunZaIzmenu.nizStavki[index].kolicina *
          this.racunZaIzmenu.nizStavki[index].cena_bez_pdv;

        sumaSaPdv +=
          this.racunZaIzmenu.nizStavki[index].kolicina *
          this.racunZaIzmenu.nizStavki[index].cena_sa_pdv;
      }
    }

    this.racunZaIzmenu.ukupno_bez_pdv = sumaBezPdv;
    this.racunZaIzmenu.ukupno_sa_pdv = sumaSaPdv;

    console.log("kjkjkjkjkjkjkjjkjk ", this.racunZaIzmenu);
  }
}
