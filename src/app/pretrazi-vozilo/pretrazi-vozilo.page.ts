import { Component, OnInit } from '@angular/core';
import { VoziloService } from '../servisi/vozilo.service';
import { Vozilo } from '../modeli/vozilo.model';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { PrikaziVoziloComponent } from './prikazi-vozilo/prikazi-vozilo.component';
import { Klijent } from '../modeli/klijent.model';


@Component({
  selector: 'app-pretrazi-vozilo',
  templateUrl: './pretrazi-vozilo.page.html',
  styleUrls: ['./pretrazi-vozilo.page.scss'],
})
export class PretraziVoziloPage implements OnInit {
  tekstPretrage: string;
  pronadjenaVozila: Vozilo[] = [];

  constructor(private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private voziloService: VoziloService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onPretrazi() {
    this.loadingCtrl
      .create({ message: 'Pretraživanje vozila...' })
      .then(loadingEl => {
        loadingEl.present();
        this.voziloService.pretraziVozilo(this.tekstPretrage)
          .subscribe(responseData => {
            for (let i = 0; i < responseData.length; i++) {
              let v = responseData[i];
              let vozilo = new Vozilo(
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
              this.pronadjenaVozila.push(vozilo);
            }
            loadingEl.dismiss();
          }, err => {
            console.log(err);
            loadingEl.dismiss();
            this.alertCtrl.create({
              header: 'Došlo je do greške prilikom pretraživanja vozila.',
              buttons: [{
                text: 'OK',
                role: 'cancel',
              }
              ]
            }).then(alertEl => {
              return alertEl.present();
            });
          });
      });
  }

  prikaziVozilo(vozilo: Vozilo) {

    this.modalCtrl
      .create({
        component: PrikaziVoziloComponent,
        cssClass: 'modal-view',
        componentProps: {
          vozilo
        }
      })
      .then(modalEl => {
        modalEl.present();
      });

  }
}

