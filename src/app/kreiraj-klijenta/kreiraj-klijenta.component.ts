import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { KlijentService } from '../servisi/klijent.service';
import { NgForm } from '@angular/forms';
import { Klijent } from '../modeli/klijent.model';


@Component({
  selector: 'app-kreiraj-klijenta',
  templateUrl: './kreiraj-klijenta.component.html',
  styleUrls: ['./kreiraj-klijenta.component.scss'],
})
export class KreirajKlijentaComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  private labeleZaFizicko: { labela: string, nameZaInput: string }[] = [{ labela: 'JMBG:', nameZaInput: 'jmbg' }, { labela: 'Broj LK:', nameZaInput: 'brojLk' }, { labela: 'Datum važenja LK:', nameZaInput: 'datumVazenjaLk' }, { labela: 'Ime i prezime:', nameZaInput: 'imePrezime' }, { labela: 'Adresa', nameZaInput: 'adresa' }];
  // tslint:disable-next-line: max-line-length
  private labeleZaPravno: { labela: string, nameZaInput: string }[] = [{ labela: 'PIB:', nameZaInput: 'pib' }, { labela: 'Naziv firme:', nameZaInput: 'nazivFirme' }, { labela: 'Adresa firme:', nameZaInput: 'adresaFirme' }];
  labeleZaFormu = this.labeleZaFizicko;
  @ViewChild('f', { static: false }) form: NgForm;
  minDate: Date = new Date();
  maxDate: Date = new Date('2030/01/01');
  izabraniKlijent: Klijent;

  constructor(private modalCtrl: ModalController,
    private klijentService: KlijentService,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController) { }

  ngOnInit() { }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  posaljiPodatke() {
    let noviKlijent;
    if (this.labeleZaFormu && this.labeleZaFormu === this.labeleZaFizicko) {
      // tslint:disable-next-line: max-line-length
      noviKlijent = new Klijent(null, this.form.value.jmbg, this.form.value.brojLk, this.form.value.datumVazenjaLk, this.form.value.imePrezime, this.form.value.adresa, null, null, null);
    } else {
      // tslint:disable-next-line: max-line-length
      noviKlijent = new Klijent(null, null, null, null, null, null, this.form.value.nazivFirme, this.form.value.pib, this.form.value.adresaFirme);
    }
    this.loadingCtrl
      .create({ message: 'Kreiranje klijenta...' })
      .then(loadingEl => {
        loadingEl.present();
        this.klijentService.kreirajKlijenta(noviKlijent)
          .subscribe(klijentId => {
            noviKlijent.id_klijenta = klijentId.idKlijenta;
            this.izabraniKlijent = noviKlijent;
            loadingEl.dismiss();
            this.modalCtrl.dismiss(
              { klijent: this.izabraniKlijent }, 'confirm');
          }, err => {
            console.log(err);
            loadingEl.dismiss();
            this.alertCtrl.create({
              header: 'Došlo je do greške prilikom kreiranja klijenta.',
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

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'fizicko') {
      this.labeleZaFormu = this.labeleZaFizicko;
    } else {
      this.labeleZaFormu = this.labeleZaPravno;
    }
  }
}
