import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { NoviNalogZaUplatuComponent } from './novi-nalog-za-uplatu/novi-nalog-za-uplatu.component';
import { PredmetService } from 'src/app/servisi/predmet.service';
import { SaobracajnaDozvola } from 'src/app/modeli/saobracajnaDozvola.model';
import { Ovlascenje } from 'src/app/modeli/ovlascenje.model';
import { RegistracioniList } from 'src/app/modeli/registracioniList.model';
import { RegistracionaNalepnica } from 'src/app/modeli/registracionaNalepnica.model';
import { PolisaOsiguranja } from 'src/app/modeli/polisaOsiguranja.model';
import { Vozilo } from 'src/app/modeli/vozilo.model';
import { Klijent } from 'src/app/modeli/klijent.model';
import { ZapisnikOTehnickomPregledu } from 'src/app/modeli/zapisnikOTehnickomPregledu.model';
import { Zahtev } from 'src/app/modeli/zahtev.model';
import { PotvrdaOInformisanju } from 'src/app/modeli/potvrdaOInformisanju.model';
import { NalogZaUplatuTakse } from 'src/app/modeli/nalogzaUplatuTakse.model';
import { NgForm } from '@angular/forms';
import { Predmet } from 'src/app/modeli/predmet.model';


@Component({
  selector: 'app-kreiranje-predmeta',
  templateUrl: './kreiranje-predmeta.page.html',
  styleUrls: ['./kreiranje-predmeta.page.scss'],
})
export class KreiranjePredmetaPage implements OnInit {

  napravljeniNalozi: NalogZaUplatuTakse[] = [];
  ucitaneSaobracajne: SaobracajnaDozvola[] = [];
  ucitanaOvlascenja: Ovlascenje[] = [];
  ucitaniRegListovi: RegistracioniList[] = [];
  ucitaneRegNalepnice: RegistracionaNalepnica[] = [];
  ucitanePolise: PolisaOsiguranja[] = [];
  brojSasije: string;
  @ViewChild('f', { static: false }) form: NgForm;


  constructor(private modalCtrl: ModalController,
    private predmetService: PredmetService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.predmetService.ucitajSaobracajne().subscribe(saobracajne => {
      saobracajne.forEach(saob => {
        this.ucitaneSaobracajne.push(new SaobracajnaDozvola(saob.reg_oznaka, saob.datum_od, saob.datum_do, saob.broj_saobracajne, saob.serijski_broj, new Vozilo(saob.broj_sasije, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)));
      });
    }, err => {
      console.log(err);
    });

    this.predmetService.ucitajOvlascenja().subscribe(ovlascenja => {
      ovlascenja.forEach(ovl => {
        this.ucitanaOvlascenja.push(new Ovlascenje(ovl.id_ovlascenja, ovl.ime_prezime_ovlascenog, ovl.broj_lk_ovlascenog, new Klijent(ovl.id_klijenta, null, null, null, null, null, null, null, null), new Vozilo(ovl.broj_sasije, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)));
      });
    }, err => {
      console.log(err);
    });

    this.predmetService.ucitajRegListove().subscribe(regListovi => {
      regListovi.forEach(regList => {
        this.ucitaniRegListovi.push(new RegistracioniList(regList.id_reg_lista, regList.sifra_firme, new Vozilo(regList.broj_sasije, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null), new ZapisnikOTehnickomPregledu(regList.id_broj, null, null, null, null, null, null, null, null)));
      });
    }, err => {
      console.log(err);
    });

    this.predmetService.ucitajRegNalepnice().subscribe(regNalepnice => {
      regNalepnice.forEach(regNal => {
        this.ucitaneRegNalepnice.push(new RegistracionaNalepnica(regNal.kontrolni_broj, regNal.broj_tablica, regNal.datum_vazenja_registracije, new Vozilo(regNal.broj_sasije, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)));
      });
    }, err => {
      console.log(err);
    });

    this.predmetService.ucitajPolise().subscribe(polise => {
      polise.forEach(pol => {
        this.ucitanePolise.push(new PolisaOsiguranja(pol.sifra_polise, pol.datum_izdavanja, pol.premijski_stepen, pol.premija, pol.pocetak_osiguranja, pol.istek_osiguranja, new Vozilo(pol.broj_sasije, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null), new Zahtev(pol.id_zahteva, null), new PotvrdaOInformisanju
          (pol.id_potvrde_o_informisanju, null, null, null, null, null)));
      });
    }, err => {
      console.log(err);
    });
  }

  onNapraviNalog() {

    for (let index = 0; index < this.ucitaniRegListovi.length; index++) {
      if (this.ucitaniRegListovi[index].id_reg_lista === this.form.value.regList) {
        this.brojSasije = this.ucitaniRegListovi[index].vozilo.broj_sasije;
      }
    }

    this.modalCtrl
      .create({
        component: NoviNalogZaUplatuComponent,
        cssClass: "modal-view",
        componentProps: {
          brojSasije: this.brojSasije
        }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          this.napravljeniNalozi.push(rezultat.data.napravljeniNalog);
        }
      });
  }

  onObrisiNalog(indeksNalogaZaBrisanje: number) {
    this.napravljeniNalozi.splice(indeksNalogaZaBrisanje, 1);
  }

  sacuvajPredmet() {

    let izabranoOvlascenje: Ovlascenje;
    let izabranaNalepnica: RegistracionaNalepnica;

    for (let index = 0; index < this.ucitanaOvlascenja.length; index++) {
      if (this.ucitanaOvlascenja[index].id_ovlascenja === this.form.value.ovlascenje) {
        izabranoOvlascenje = this.ucitanaOvlascenja[index];

        if (this.brojSasije !== this.ucitanaOvlascenja[index].vozilo.broj_sasije) {
          this.kreirajAlert('Ovlašćenje ili registracioni list nisu dobro izabrani.');
          return;
        }
      }

    }

    for (let index = 0; index < this.ucitaneRegNalepnice.length; index++) {
      if (this.ucitaneRegNalepnice[index].kontrolni_broj === this.form.value.regNalepnica) {
        izabranaNalepnica = this.ucitaneRegNalepnice[index];
      }
    }


    let noviPredmet = new Predmet(
      null,
      new PolisaOsiguranja(this.form.value.polisa, null, null, null, null, null, null, null, null),
      new SaobracajnaDozvola(this.form.value.saobracajna, null, null, null, null, null),
      new RegistracioniList(this.form.value.regList, null, null, null),
      this.napravljeniNalozi
    );


    this.loadingCtrl
      .create({ message: 'Kreiranje predmeta...' })
      .then(loadingEl => {
        loadingEl.present();
        
          this.predmetService.kreirajPredmet({ predmet: noviPredmet, ovlascenje: izabranoOvlascenje, regNal: izabranaNalepnica })
            .subscribe(res => {
              console.log(res);
              loadingEl.dismiss();
              this.kreirajAlert('Predmet je uspešno kreiran.');
              this.napravljeniNalozi = [];
              this.brojSasije = null;
              this.form.reset();

            }, err => {
              console.log(err);
              loadingEl.dismiss();
              this.kreirajAlert('Došlo je do greške prilikom kreiranja predmeta.');
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


