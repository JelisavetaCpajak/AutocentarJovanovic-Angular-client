import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { NoviNalogZaUplatuComponent } from '../../kreiranje-predmeta/novi-nalog-za-uplatu/novi-nalog-za-uplatu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Predmet } from 'src/app/modeli/predmet.model';
import { Ovlascenje } from 'src/app/modeli/ovlascenje.model';
import { RegistracionaNalepnica } from 'src/app/modeli/registracionaNalepnica.model';
import { IzmeniNalogZaUplatuComponent } from './izmeni-nalog-za-uplatu/izmeni-nalog-za-uplatu.component';
import { NalogZaUplatuTakse } from 'src/app/modeli/nalogzaUplatuTakse.model';
import { PredmetService } from 'src/app/servisi/predmet.service';


@Component({
  selector: 'app-izmeni-predmet',
  templateUrl: './izmeni-predmet.page.html',
  styleUrls: ['./izmeni-predmet.page.scss'],
})
export class IzmeniPredmetPage implements OnInit {

  napravljeniNalog: NalogZaUplatuTakse;
  predmetZaIzmenu: { predmet: Predmet, ovlascenje: Ovlascenje, regNalepnica: RegistracionaNalepnica };


  constructor(private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private predmetService: PredmetService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.predmetZaIzmenu =
      {
        predmet: this.router.getCurrentNavigation().extras.state.predmet,
        ovlascenje: this.router.getCurrentNavigation().extras.state.ovlascenje,
        regNalepnica: this.router.getCurrentNavigation().extras.state.regNalepnica
      }
    });
  }

  onNapraviNalog() {
    this.modalCtrl
      .create({
        component: NoviNalogZaUplatuComponent,
        cssClass: 'modal-view',
        componentProps: {
          brojSasije: this.predmetZaIzmenu.predmet.registracioni_list.vozilo.broj_sasije
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          this.napravljeniNalog = rezultat.data.napravljeniNalog;
          this.napravljeniNalog.kreiranje = true;
          //this.napravljeniNalog.sifra_naloga = this.napraviNovuSifruNaloga();
          this.predmetZaIzmenu.predmet.nalozi.push(this.napravljeniNalog);
        }
      });
  }

  onObrisiNalog(indeksNalogaZaBrisanje: number) {

    if (this.predmetZaIzmenu.predmet.nalozi[indeksNalogaZaBrisanje].kreiranje === true) {
      this.predmetZaIzmenu.predmet.nalozi.splice(indeksNalogaZaBrisanje, 1);
      return;
    } else if (this.predmetZaIzmenu.predmet.nalozi[indeksNalogaZaBrisanje].izmena === true) {
      this.predmetZaIzmenu.predmet.nalozi[indeksNalogaZaBrisanje].izmena = false;
      this.predmetZaIzmenu.predmet.nalozi[indeksNalogaZaBrisanje].brisanje = true;
    } else {
      this.predmetZaIzmenu.predmet.nalozi[indeksNalogaZaBrisanje].brisanje = true;
    }

  }

  onIzmeniNalog(indeksNalogaZaIzmenu: number) {
    this.modalCtrl
      .create({
        component: IzmeniNalogZaUplatuComponent,
        cssClass: 'modal-view',
        componentProps: {
          nalogZaIzmenu: this.predmetZaIzmenu.predmet.nalozi[indeksNalogaZaIzmenu]
        }

      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          if (!rezultat.data.izmenjeniNalog.kreiranje) {
            rezultat.data.izmenjeniNalog.izmena = true;
          }

          this.predmetZaIzmenu.predmet.nalozi[indeksNalogaZaIzmenu] = rezultat.data.izmenjeniNalog;
        }
      });

  }

  izmeniPredmet() {

    let brojPostojecih = 0;

    for (let index = 0; index < this.predmetZaIzmenu.predmet.nalozi.length; index++) {
      if (this.predmetZaIzmenu.predmet.nalozi[index].brisanje === false) {
        brojPostojecih++;
      }
    }
    if (brojPostojecih === 0) {
      this.kreirajAlert('Predmet mora sadržati bar jedan nalog!');
      return;
    }


    this.loadingCtrl
      .create({ message: 'Izmena predmeta...' })
      .then(loadingEl => {
        loadingEl.present();

        this.predmetService.izmeniPredmet(this.predmetZaIzmenu.predmet)
          .subscribe(res => {
            loadingEl.dismiss();
            this.kreirajAlert('Predmet je uspešno izmenjen.');
            this.navCtrl.navigateBack('home/pretrazivanje-predmeta');
          }, err => {
            loadingEl.dismiss();
            this.kreirajAlert('Došlo je do greške prilikom izmene predmeta.');
          });
      });
  }


  kreirajAlert(tekst: string) {
    this.alertCtrl.create({
      header: tekst,
      buttons: [{
        text: 'OK',
        role: 'cancel',
      }
      ]
    }).then(alertEl => {
      return alertEl.present();
    });

  }
}
