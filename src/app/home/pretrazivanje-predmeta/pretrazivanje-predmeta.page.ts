import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PredmetService } from 'src/app/servisi/predmet.service';
import { Predmet } from 'src/app/modeli/predmet.model';
import { PolisaOsiguranja } from 'src/app/modeli/polisaOsiguranja.model';
import { SaobracajnaDozvola } from 'src/app/modeli/saobracajnaDozvola.model';
import { RegistracioniList } from 'src/app/modeli/registracioniList.model';
import { Vozilo } from 'src/app/modeli/vozilo.model';
import { RegistracionaNalepnica } from 'src/app/modeli/registracionaNalepnica.model';
import { Ovlascenje } from 'src/app/modeli/ovlascenje.model';
import { NalogZaUplatuTakse } from 'src/app/modeli/nalogzaUplatuTakse.model';
import { Klijent } from 'src/app/modeli/klijent.model';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-pretrazivanje-predmeta',
  templateUrl: './pretrazivanje-predmeta.page.html',
  styleUrls: ['./pretrazivanje-predmeta.page.scss'],
})
export class PretrazivanjePredmetaPage implements OnInit {

  tekstPretrage: string;
  nadjeniPredmeti: { predmet: Predmet, ovlascenje: Ovlascenje, regNalepnica: RegistracionaNalepnica }[] = [];

  constructor(private navCtrl: NavController,
    private predmetService: PredmetService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.nadjeniPredmeti = [];
  }

  onPretrazi() {
    this.nadjeniPredmeti = [];
    this.loadingCtrl
      .create({ message: 'Pretraživanje predmeta...' })
      .then(loadingEl => {
        loadingEl.present();
        this.predmetService.pretraziPredmet(this.tekstPretrage).subscribe(predmeti => {
          
          predmeti.forEach(p => {

            let vozilo = new Vozilo(p.broj_sasije, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

            let regNalepnica = new RegistracionaNalepnica(p.kontrolni_broj, null, null, vozilo);
            let ovlascenje = new Ovlascenje(p.id_ovlascenja, p.ime_prezime_ovlascenog, null, null, vozilo);

            let predmet = new Predmet(
              p.id_predmeta,
              new PolisaOsiguranja(p.sifra_polise, null, null, null, null, null, null, null, null),
              new SaobracajnaDozvola(p.reg_oznaka, null, null, null, null, null),
              new RegistracioniList(null, null, vozilo, null), []);

            this.predmetService.pretraziNalogeZaPredmet(predmet.id_predmeta).subscribe(nalozi => {
              nalozi.forEach(n => {
                predmet.nalozi.push(new NalogZaUplatuTakse(n.sifra_naloga, n.primalac, n.iznos, n.svrha_uplate, n.datum, n.racun_primaoca, new Klijent(n.id_klijenta, n.jmbg, n.broj_lk, n.datum_vazenja_lk_klijenta, n.ime_prezime_klijenta, n.adresa_klijenta, n.ime_firme, n.pib, n.adresa_firme), false, false, false));
              });
            });
            this.nadjeniPredmeti.push({ predmet, ovlascenje, regNalepnica });
          });
          loadingEl.dismiss();

        }, err => {
          console.log(err);
          loadingEl.dismiss();
        });
      });
  }



  onObrisi(izabraniPredmet: { predmet: Predmet, ovlascenje: Ovlascenje, regNalepnica: RegistracionaNalepnica }) {

    this.loadingCtrl
      .create({ message: 'Brisanje predmeta...' })
      .then(loadingEl => {
        loadingEl.present();
        this.predmetService.obrisiPredmet(izabraniPredmet)
          .subscribe(res => {
            loadingEl.dismiss();
            this.kreirajAlert('Predmet je uspešno obrisan.');
            this.nadjeniPredmeti.splice(this.nadjeniPredmeti.indexOf(izabraniPredmet), 1);
          }, err => {
            loadingEl.dismiss();
            this.kreirajAlert('Došlo je do greške prilikom brisanja predmeta.');
            return;
          });
      });

  }

  onIzmeni(nadjeniPredmet: { predmet: Predmet, ovlascenje: Ovlascenje, regNalepnica: RegistracionaNalepnica }) {

    let navigationExtras: NavigationExtras = {
      state: nadjeniPredmet
    };

    this.navCtrl.navigateForward('home/pretrazivanje-predmeta/izmeni-predmet', navigationExtras);

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
