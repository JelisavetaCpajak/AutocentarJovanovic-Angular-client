import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ZaposleniService } from '../servisi/zaposleni.service';
import { Zaposleni } from '../modeli/zaposleni.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-kreiraj-zaposlenog',
  templateUrl: './kreiraj-zaposlenog.page.html',
  styleUrls: ['./kreiraj-zaposlenog.page.scss'],
})
export class KreirajZaposlenogPage implements OnInit {

  forma: FormGroup;
  constructor(private zaposleniService: ZaposleniService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.forma = new FormGroup({
      ime: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      }),
      prezime: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      }),
      korisnickoIme: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      }),
      sifra: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]
      }),
    });
  }

  kreirajZaposlenog() {

    // tslint:disable-next-line: max-line-length
    const zaposleni = new Zaposleni(null, this.forma.value.ime, this.forma.value.prezime, this.forma.value.korisnickoIme, this.forma.value.sifra);

    this.zaposleniService.kreirajZaposlenog(zaposleni)
      .subscribe(responseData => {

        zaposleni.idZaposlenog = responseData.zaposleniID;

        this.alertCtrl.create({
          header: 'Zaposleni je uspešno kreiran.',
          buttons: [{
            text: 'OK',
            role: 'cancel',
          }
          ]
        }).then(alertEl => {
          return alertEl.present();
        });

      }, err => {
        this.alertCtrl.create({
          header: 'Došlo je do greške prilikom kreiranja zaposlenog.',
          buttons: [{
            text: 'OK',
            role: 'cancel',
          }
          ]
        }).then(alertEl => {
          return alertEl.present();
        });
      });

  }
}
