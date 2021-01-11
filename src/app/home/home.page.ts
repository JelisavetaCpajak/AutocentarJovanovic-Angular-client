import { Component } from "@angular/core";
import { ActionSheetController, NavController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController
  ) {}

  onRegistracija() {
    this.actionSheetCtrl
      .create({
        header: "Izaberite opciju",
        buttons: [
          {
            text: "Pretraživanje predmeta",
            handler: () => {
              this.navCtrl.navigateForward("home/pretrazivanje-predmeta");
            },
          },
          {
            text: "Kreiranje predmeta",
            handler: () => {
              this.navCtrl.navigateForward("home/kreiranje-predmeta");
            },
          },
          {
            text: "Izađi",
            role: "cancel",
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  onTehnickiPregled() {
    this.actionSheetCtrl
      .create({
        header: "Izaberite opciju",
        buttons: [
          {
            text: "Pretraživanje računa",
            handler: () => {
              this.navCtrl.navigateForward("home/pretrazivanje-racuna");
            },
          },
          {
            text: "Kreiranje računa",
            handler: () => {
              this.navCtrl.navigateForward("home/kreiranje-racuna");
            },
          },
          {
            text: "Izađi",
            role: "cancel",
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  onOsiguranje() {
    this.actionSheetCtrl
      .create({
        header: "Izaberite opciju",
        buttons: [
          {
            text: "Pretraživanje kasko polise",
            handler: () => {
              this.navCtrl.navigateForward("home/pretrazivanje-kasko-polise");
            },
          },
          {
            text: "Kreiranje kasko polise",
            handler: () => {
              this.navCtrl.navigateForward("home/kreiranje-kasko-polise");
            },
          },
          {
            text: "Izađi",
            role: "cancel",
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }
}
