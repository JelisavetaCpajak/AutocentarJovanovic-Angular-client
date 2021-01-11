import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { KaskoStavka } from 'src/app/modeli/kaskoStavka';
import { KaskoPolisa } from 'src/app/modeli/kaskoPolisa';
import { KaskoService } from 'src/app/servisi/kasko.service';
import { IzmeniKaskoStavkuComponent } from './izmeni-kasko-stavku/izmeni-kasko-stavku.component';
import { NovaKaskoStavkaComponent } from '../../kreiranje-kasko-polise/nova-kasko-stavka/nova-kasko-stavka.component';

@Component({
  selector: 'app-izmeni-kasko-polisu',
  templateUrl: './izmeni-kasko-polisu.page.html',
  styleUrls: ['./izmeni-kasko-polisu.page.scss'],
})
export class IzmeniKaskoPolisuPage implements OnInit {


  napravljenaKaskoStavka: KaskoStavka;
  kaskoPolisaZaIzmenu: KaskoPolisa;

  constructor(private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private kaskoService: KaskoService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.kaskoPolisaZaIzmenu = this.router.getCurrentNavigation().extras.state.kaskoPolisa;
    });
  }

  onNapraviStavku() {
    this.modalCtrl
      .create({
        component: NovaKaskoStavkaComponent,
        cssClass: 'modal-view',
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          this.napravljenaKaskoStavka = rezultat.data.napravljenaStavka;
          this.napravljenaKaskoStavka.kreiranje = true;
          this.kaskoPolisaZaIzmenu.nizStavki.push(this.napravljenaKaskoStavka);
        }
      });
  }

  onIzmeniStavku(indeksStavkeZaIzmenu: number) {
    this.modalCtrl
      .create({
        component: IzmeniKaskoStavkuComponent,
        cssClass: 'modal-view',
        componentProps: {
          stavkaZaIzmenu: this.kaskoPolisaZaIzmenu.nizStavki[indeksStavkeZaIzmenu]
        }

      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          if (!rezultat.data.izmenjenaStavka.kreiranje) {
            rezultat.data.izmenjenaStavka.izmena = true;
          }
          this.kaskoPolisaZaIzmenu.nizStavki[indeksStavkeZaIzmenu] = rezultat.data.izmenjenaStavka;

        }
      });
  }

  onObrisiStavku(indeksStavkeZaBrisanje: number) {
    if (this.kaskoPolisaZaIzmenu.nizStavki[indeksStavkeZaBrisanje].kreiranje === true) {
      this.kaskoPolisaZaIzmenu.nizStavki.splice(indeksStavkeZaBrisanje, 1);
      return;
    } else if (this.kaskoPolisaZaIzmenu.nizStavki[indeksStavkeZaBrisanje].izmena === true) {
      this.kaskoPolisaZaIzmenu.nizStavki[indeksStavkeZaBrisanje].izmena = false;
      this.kaskoPolisaZaIzmenu.nizStavki[indeksStavkeZaBrisanje].brisanje = true;
    } else {
      this.kaskoPolisaZaIzmenu.nizStavki[indeksStavkeZaBrisanje].brisanje = true;
    }

  }

  izmeniKaskoPolisu() {

    let brojPostojecih = 0;

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.kaskoPolisaZaIzmenu.nizStavki.length; index++) {

      if (this.kaskoPolisaZaIzmenu.nizStavki[index].brisanje === false) {
        brojPostojecih++;
      }
    }
    if (brojPostojecih === 0) {
      this.kreirajAlert('Kasko polisa mora sadržati bar jednu kasko stavku!');
      return;
    }

    this.loadingCtrl
      .create({ message: 'Izmena kasko polise...' })
      .then(loadingEl => {
        loadingEl.present();
        this.kaskoService.izmeniKaskoPolisu(this.kaskoPolisaZaIzmenu)
          .subscribe(res => {
            loadingEl.dismiss();
            this.kreirajAlert('Kasko polisa je uspešno izmenjena.');
            this.navCtrl.navigateBack('home/pretrazivanje-kasko-polise');

          }, err => {
            loadingEl.dismiss();
            this.kreirajAlert('Došlo je do greške prilikom izmene kasko polise.');
          });

      }
      );
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
