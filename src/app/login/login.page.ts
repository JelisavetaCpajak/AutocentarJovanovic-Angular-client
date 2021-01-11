import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ZaposleniService } from '../servisi/zaposleni.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class LoginPage implements OnInit {

  constructor(private menuCtrl: MenuController,
              private zaposleniService: ZaposleniService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController) { }

  private zaposleniSub: Subscription;

  @ViewChild('f', { static: false }) form: NgForm;

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.form.reset();
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  onPrijaviSe(){
    this.loadingCtrl
      .create({ message: 'Prijavljivanje...' })
      .then(loadingEl => {
        loadingEl.present();
        this.zaposleniService.prijaviZaposlenog(this.form.value.korisnickoIme, this.form.value.sifra)
        .subscribe(zaposleni => {
          if (!zaposleni || zaposleni.length === 0) {
            loadingEl.dismiss();
            this.alertCtrl.create({
              header: 'Došlo je do greške prilikom prijavljivanja.',
              buttons: [{
                text: 'OK',
                role: 'cancel',
              }
              ]
            }).then(alertEl => {
              return alertEl.present();
            });
          } else {
            loadingEl.dismiss();
            this.navCtrl.navigateForward('/home');
          }
        });
      });
  }

}
