import { Component, OnInit, ViewChild } from '@angular/core';
import { ZahtevZaKaskoOsiguranjem } from 'src/app/modeli/zahtevZaKaskoOsiguranjem';
import { Vozilo } from 'src/app/modeli/vozilo.model';
import { NgForm } from '@angular/forms';
import { KaskoStavka } from 'src/app/modeli/kaskoStavka';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { NovaKaskoStavkaComponent } from './nova-kasko-stavka/nova-kasko-stavka.component';
import { KaskoService } from 'src/app/servisi/kasko.service';
import { Klijent } from 'src/app/modeli/klijent.model';
import { VoziloService } from 'src/app/servisi/vozilo.service';
import { KaskoPolisa } from 'src/app/modeli/kaskoPolisa';

@Component({
  selector: 'app-kreiranje-kasko-polise',
  templateUrl: './kreiranje-kasko-polise.page.html',
  styleUrls: ['./kreiranje-kasko-polise.page.scss'],
})
export class KreiranjeKaskoPolisePage implements OnInit {

  ucitaniZahteviZaKaskom: ZahtevZaKaskoOsiguranjem[] = [];
  ucitanaVozila: Vozilo[] = [];
  napravljeneKaskoStavke: KaskoStavka[] = [];
  izabraniZahtev: ZahtevZaKaskoOsiguranjem;
  ukupnaPremija: number;

  @ViewChild('f', { static: false }) form: NgForm;

  minDate: Date = new Date();
  maxDate: Date = new Date(`${new Date().getFullYear() + 1}-01-01`);
  trenutniDatum: Date = new Date();
  datumZavrsetka: string = (new Date(`${this.trenutniDatum.getFullYear() + 1}-${this.trenutniDatum.getMonth() + 1}-${this.trenutniDatum.getDate()}`)).toISOString();

  constructor(private modalCtrl: ModalController,
              private kaskoService: KaskoService,
              private voziloService: VoziloService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.kaskoService.vratiZahteveZaKasko().subscribe(zahtevi => {
      zahtevi.forEach(zahtev => {
        this.ucitaniZahteviZaKaskom.push(new ZahtevZaKaskoOsiguranjem(zahtev.id_zahteva,
          new Klijent(
            zahtev.id_klijenta,
            zahtev.jmbg,
            zahtev.broj_lk,
            zahtev.datum_vazenja_lk_klijenta,
            zahtev.ime_prezime_klijenta,
            zahtev.adresa_klijenta,
            zahtev.ime_firme,
            zahtev.pib,
            zahtev.adresa_firme)));
      });
    }, err => {
      console.log(err);
    });


  }


  onNapraviKaskoStavku() {
    this.modalCtrl
      .create({
        component: NovaKaskoStavkaComponent,
        cssClass: 'modal-view'
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          this.napravljeneKaskoStavke.push(rezultat.data.napravljenaStavka);
        }
      });

  }
  promeniDatum() {
    this.datumZavrsetka = (new Date(`${(new Date(this.trenutniDatum)).getFullYear() + 1}-${(new Date(this.trenutniDatum)).getMonth() + 1}-${(new Date(this.trenutniDatum)).getDate()}`)).toISOString();
  }

  onObrisiKaskoStavku(indeksStavkeZaBrisanje: number) {
    this.napravljeneKaskoStavke.splice(indeksStavkeZaBrisanje, 1);
  }

  ucitajVozila() {

    this.ucitanaVozila = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.ucitaniZahteviZaKaskom.length; i++) {
      if (this.ucitaniZahteviZaKaskom[i].id_zahteva === this.form.value.zahtevZaKasko) {
        this.izabraniZahtev = this.ucitaniZahteviZaKaskom[i];
      }

    }

    if (this.izabraniZahtev) {
      // tslint:disable-next-line: max-line-length
      this.voziloService.pretraziVozilo(this.izabraniZahtev.klijent.ime_prezime_klijenta ? this.izabraniZahtev.klijent.ime_prezime_klijenta : this.izabraniZahtev.klijent.ime_firme)
        .subscribe(responseData => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < responseData.length; i++) {
            const v = responseData[i];
            const vozilo = new Vozilo(
              v.broj_sasije,
              v.masa,
              v.snaga_motora,
              v.zapremina_motora,
              v.broj_motora,
              v.kategorija,
              v.marka,
              v.model,
              v.pogonsko_gorivo,
              v.boja,
              v.max_masa,
              v.broj_osovina,
              v.godina_proizvodnje,
              v.br_mesta_za_sedenje,
              v.datum_prve_registracije,
              new Klijent(
                v.id_klijenta,
                v.jmbg,
                v.broj_lk,
                v.datum_vazenja_lk_klijenta,
                v.ime_prezime_klijenta,
                v.adresa_klijenta,
                v.ime_firme,
                v.pib,
                v.adresa_firme));
            this.ucitanaVozila.push(vozilo);
          }
        });
    }
  }


  sacuvajKaskoPolisu() {

    const novaKaskoPolisa = new KaskoPolisa(
      null,
      this.form.value.ugovarac,
      this.form.value.premija,
      this.form.value.porez,
      this.ukupnaPremija,
      this.form.value.pocetakOsig,
      new Date(this.datumZavrsetka),
      new Vozilo(this.form.value.vozilo, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null),
      new ZahtevZaKaskoOsiguranjem(this.form.value.zahtevZaKasko, null),
      this.napravljeneKaskoStavke);

    this.loadingCtrl
      .create({ message: 'Kreiranje kasko polise...' })
      .then(loadingEl => {
        loadingEl.present();
        this.kaskoService.kreirajKaskoPolisu(novaKaskoPolisa)
          .subscribe(res => {
            loadingEl.dismiss();
            this.kreirajAlert('Kasko polisa je uspešno kreirana.');
            this.izabraniZahtev = null;
            this.napravljeneKaskoStavke = [];
            this.ucitanaVozila = [];
            this.ukupnaPremija = -1;
            this.form.value.zahtevZaKasko = null;
            this.form.reset();
           
          }, err => {
            loadingEl.dismiss();
            this.kreirajAlert('Došlo je do greške prilikom kreiranja kasko polise.');
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

  postaviUkupnuPremiju() {
    this.ukupnaPremija = this.form.value.premija + this.form.value.porez;
  }

}
