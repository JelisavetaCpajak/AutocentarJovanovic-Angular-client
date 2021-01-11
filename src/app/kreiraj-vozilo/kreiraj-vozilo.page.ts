import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { PretraziKlijentaComponent } from '../pretrazi-klijenta/pretrazi-klijenta.component';
import { KreirajKlijentaComponent } from '../kreiraj-klijenta/kreiraj-klijenta.component';
import { Klijent } from '../modeli/klijent.model';
import { VoziloService } from '../servisi/vozilo.service';
import { NgForm } from '@angular/forms';
import { Vozilo } from '../modeli/vozilo.model';

@Component({
  selector: 'app-kreiraj-vozilo',
  templateUrl: './kreiraj-vozilo.page.html',
  styleUrls: ['./kreiraj-vozilo.page.scss'],
})
export class KreirajVoziloPage implements OnInit {
  izabraniKlijent: Klijent;
  maxYear: number = new Date().getFullYear();

  trenutni: Date = new Date();
  maxDate: Date = new Date(this.trenutni.getTime() - 2* this.trenutni.getTimezoneOffset() * 60000);

  @ViewChild('f', { static: false }) form: NgForm;
  constructor(private modalCtrl: ModalController,
              private voziloService: VoziloService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onPretraziKlijenta() {
    this.modalCtrl
      .create({
        component: PretraziKlijentaComponent,
        cssClass: 'modal-view'
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          this.izabraniKlijent = rezultat.data.klijent;
        }
      });
  }

  onKreirajKlijenta() {
    this.modalCtrl
      .create({
        component: KreirajKlijentaComponent,
        cssClass: 'modal-view'
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(rezultat => {
        if (rezultat.role === 'confirm') {
          this.izabraniKlijent = rezultat.data.klijent;
        }
      });
  }

  onKreirajVozilo() {
    if (this.form.value.godinaProizvodnje > this.maxYear) {
      this.alertCtrl.create({
        header: 'Neispravan unos',
        message: 'Godina proizvodnje ne može biti veća od tekuće.',
        buttons: [{
          text: 'OK',
          role: 'cancel',
        }
        ]
      }).then(alertEl => {
        return alertEl.present();
      });
    } else {
      this.loadingCtrl
        .create({ message: 'Kreiranje vozila...' })
        .then(loadingEl => {
          loadingEl.present();
          const vozilo = new Vozilo(
            this.form.value.brojSasije,
            this.form.value.masa,
            this.form.value.snagaMotora,
            this.form.value.zapreminaMotora,
            this.form.value.brojMotora,
            this.form.value.kategorija,
            this.form.value.marka,
            this.form.value.model,
            this.form.value.gorivo,
            this.form.value.boja,
            this.form.value.maxMasa,
            this.form.value.brojOsovina,
            this.form.value.godinaProizvodnje,
            this.form.value.brojMestaZaSedenje,
            this.form.value.datumPrveReg,
            this.izabraniKlijent);
          this.voziloService.kreirajVozilo(vozilo)
            .subscribe(result => {
              console.log(result);
              loadingEl.dismiss();
              this.alertCtrl.create({
                header: 'Vozilo je kreirano.',
                buttons: [{
                  text: 'OK',
                  role: 'cancel',
                }
                ]
              }).then(alertEl => {
                this.form.reset({
                  kategorija: 'PUTNICKO VOZILO',
                  gorivo: 'EVRO DIZEL',
                  brojOsovina: '2',
                  brojMestaZaSedenje: '2',
                });
                this.izabraniKlijent = null;
                return alertEl.present();
              });
            }, err => {
              console.log(err);
              loadingEl.dismiss();
              this.alertCtrl.create({
                header: 'Došlo je do greške prilikom kreiranja vozila.',
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
  }

}
