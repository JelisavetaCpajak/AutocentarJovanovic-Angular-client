import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { NoviNalogZaUplatuComponent } from './../kreiranje-predmeta/novi-nalog-za-uplatu/novi-nalog-za-uplatu.component';
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
import { StavkaRacuna } from 'src/app/modeli/stavkaRacuna';
import { KlijentService } from 'src/app/servisi/klijent.service';
import { RacunService } from 'src/app/servisi/racun.service';
import { Racun } from 'src/app/modeli/racun.model';
import { NovaStavkaRacunaComponent } from './nova-stavka-racuna/nova-stavka-racuna.component';

@Component({
  selector: 'app-kreiranje-racuna',
  templateUrl: './kreiranje-racuna.page.html',
  styleUrls: ['./kreiranje-racuna.page.scss'],
})
export class KreiranjeRacunaPage implements OnInit {

  napravljeneStavke: StavkaRacuna[] = [];
  ucitaniKlijenti: Klijent[] = [];
  ucitaniZapisnici : ZapisnikOTehnickomPregledu[]=[];
  izabranRacun: Racun;
  ukupnaVrednostBezpdv: number=0;
  ukupnaVrednostSapdv: number=0;
  datum: Date;

  @ViewChild('f', { static: false }) form: NgForm;


  constructor(private modalCtrl: ModalController,
    private racunService: RacunService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {

    this.racunService.ucitajKlijente().subscribe(klijenti => {
      klijenti.forEach(kl => {
        this.ucitaniKlijenti.push(new Klijent(kl.id_klijenta,kl.jmbg,kl.broj_lk,kl.datum_vazenja_lk_klijenta,kl.ime_prezime_klijenta,kl.adresa_klijenta,kl.ime_firme,kl.pib,kl.adresa_firme));
      });
    }, err => {
      console.log(err);
    });



    this.racunService.ucitajZapisnike().subscribe(zapisnici => {
      console.log(zapisnici);
      zapisnici.forEach(zap => {
        this.ucitaniZapisnici.push(new ZapisnikOTehnickomPregledu(zap.id_broj,zap.datum,zap.vreme_pocetka,zap.vreme_zavrsetka,zap.ocena_ispravnosti,zap.kontrolor,zap.atest_za_plin,zap.atest_za_stakla,new SaobracajnaDozvola(zap.reg_oznaka,null,null,null,null,new Vozilo(zap.broj_sasije,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new Klijent(zap.id_klijenta,null,null,null,null,null,null,null,null)))));
      });
    }, err => {
      console.log(err);
    });

    

        
  }

  onNapraviStavku(klijentId:string) {
    
    this.modalCtrl
      .create({
        component: NovaStavkaRacunaComponent,
        cssClass: "modal-view"
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          this.napravljeneStavke.push(rezultat.data.napravljenaStavka);
        }
      });
  }

  onObrisiStavku(indeksStavkeZaBrisanje: number) {
    this.napravljeneStavke.splice(indeksStavkeZaBrisanje, 1);
  }

  sacuvajRacun() {

    
    let izabraniKlijent: Klijent;
    let izabraniZapisnik: ZapisnikOTehnickomPregledu;

    

    for (let index = 0; index < this.ucitaniKlijenti.length; index++) {
      if (this.ucitaniKlijenti[index].id_klijenta === this.form.value.klijent) {
        izabraniKlijent = this.ucitaniKlijenti[index];

        
      }

    }

    for (let index = 0; index < this.ucitaniZapisnici.length; index++) {
      if (this.ucitaniZapisnici[index].id_broj === this.form.value.zapisnik) {
        izabraniZapisnik = this.ucitaniZapisnici[index];

        
      }

    }
    

    if (izabraniKlijent.id_klijenta !== izabraniZapisnik.saobracajna.vozilo.klijent.id_klijenta) {
      
      

      this.kreirajAlert('Za datog klijenta mogu se izabrati samo zapisnici koji se na njega i odnose!');
      return;
    }
    this.datum=this.form.value.datum;

    for (let index = 0; index < this.napravljeneStavke.length; index++) {
      this.ukupnaVrednostBezpdv=this.ukupnaVrednostBezpdv+this.napravljeneStavke[index].cena_bez_pdv*this.napravljeneStavke[index].kolicina;

    }

    for (let index = 0; index < this.napravljeneStavke.length; index++) {
      this.ukupnaVrednostSapdv=this.ukupnaVrednostSapdv+this.napravljeneStavke[index].cena_sa_pdv*this.napravljeneStavke[index].kolicina;

    }


    

    let noviRacun = new Racun(null,this.datum,this.ukupnaVrednostSapdv,this.ukupnaVrednostBezpdv,izabraniKlijent,izabraniZapisnik,this.napravljeneStavke);


    this.loadingCtrl
      .create({ message: 'Kreiranje racuna...' })
      .then(loadingEl => {
        loadingEl.present();
        
          this.racunService.kreirajRacun(noviRacun)
            .subscribe(res => {
              console.log(res);
              loadingEl.dismiss();
              this.kreirajAlert('Racun je uspešno kreiran.');
              this.napravljeneStavke = [];
              this.datum = null;
              this.ukupnaVrednostBezpdv=0;
              this.ukupnaVrednostSapdv=0;
              this.form.reset();

            }, err => {
              console.log(err);
              loadingEl.dismiss();
              this.kreirajAlert('Došlo je do greške prilikom kreiranja racuna.');
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



