import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { KaskoService } from 'src/app/servisi/kasko.service';
import { KaskoPolisa } from 'src/app/modeli/kaskoPolisa';
import { Vozilo } from 'src/app/modeli/vozilo.model';
import { ZahtevZaKaskoOsiguranjem } from 'src/app/modeli/zahtevZaKaskoOsiguranjem';
import { KaskoStavka } from 'src/app/modeli/kaskoStavka';
import { NavigationExtras } from '@angular/router';
import { Klijent } from 'src/app/modeli/klijent.model';

@Component({
  selector: 'app-pretrazivanje-kasko-polise',
  templateUrl: './pretrazivanje-kasko-polise.page.html',
  styleUrls: ['./pretrazivanje-kasko-polise.page.scss'],
})
export class PretrazivanjeKaskoPolisePage implements OnInit {

  tekstPretrage: string;
  nadjeneKaskoPolise: KaskoPolisa[] = [];

  constructor(private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private kaskoService: KaskoService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.nadjeneKaskoPolise = [];
  }

  onPretrazi() {
    this.nadjeneKaskoPolise = [];
    this.loadingCtrl
      .create({ message: 'Pretraživanje kasko polise...' })
      .then(loadingEl => {
        loadingEl.present();
        this.kaskoService.pretraziKaskoPolise(this.tekstPretrage)
          .subscribe(kaskoPolise => {
            kaskoPolise.forEach(kp => {

              let kaskoPolisa = new KaskoPolisa(
                kp.sifra_kasko,
                kp.ugovarac,
                kp.premija,
                kp.porez,
                kp.ukupna_premija,
                kp.datum_od,
                kp.datum_do,
                new Vozilo(kp.broj_sasije, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null),
                new ZahtevZaKaskoOsiguranjem(kp.id_zahteva, new Klijent(
                  null,
                  null,
                  kp.broj_lk,
                  null,
                  kp.ime_prezime_klijenta,
                  null,
                  kp.ime_firme,
                  kp.pib,
                  null)),
                []);

              this.kaskoService.pretraziStavkeZaKasko(kaskoPolisa.sifra_kasko)
                .subscribe(kaskoStavke => {
                  kaskoStavke.forEach(ks => {
                    kaskoPolisa.nizStavki.push(new KaskoStavka(ks.rb_stavke, ks.ugovoreno_pokrice, ks.suma_osiguranja, ks.ucesce_osiguranika, false, false, false));
                  });
                });
              this.nadjeneKaskoPolise.push(kaskoPolisa);
            });
            loadingEl.dismiss();

          }, err => {
            console.log(err);
            loadingEl.dismiss();
          });
      });
  }



  onIzmeni(izabranaKaskoPolisa: { kaskoPolisa: KaskoPolisa }) {
    let navigationExtras: NavigationExtras = {
      state: izabranaKaskoPolisa
    };

    this.navCtrl.navigateForward('home/pretrazivanje-kasko-polise/izmeni-kasko-polisu', navigationExtras);

  }


  onObrisi(izabranaKaskoPolisa: KaskoPolisa) {
    this.loadingCtrl
      .create({ message: 'Brisanje kasko polise...' })
      .then(loadingEl => {
        loadingEl.present();
        this.kaskoService.obrisiKaskoPolisu(izabranaKaskoPolisa)
        .subscribe(res => {
          loadingEl.dismiss();
          this.kreirajAlert('Kasko polisa je uspešno obrisana.');
          this.nadjeneKaskoPolise.splice(this.nadjeneKaskoPolise.indexOf(izabranaKaskoPolisa), 1);
        }, err => {
          loadingEl.dismiss();
          this.kreirajAlert('Došlo je do greške prilikom brisanja kasko polise.');
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
