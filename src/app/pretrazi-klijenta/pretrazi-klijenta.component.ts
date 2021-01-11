import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  LoadingController,
  AlertController,
} from "@ionic/angular";
import { KlijentService } from "../servisi/klijent.service";
import { Klijent } from "../modeli/klijent.model";

@Component({
  selector: "app-pretrazi-klijenta",
  templateUrl: "./pretrazi-klijenta.component.html",
  styleUrls: ["./pretrazi-klijenta.component.scss"],
})
export class PretraziKlijentaComponent implements OnInit {
  tekstPretrage: string;
  pronadjeniKlijenti: Klijent[];

  constructor(
    private modalCtrl: ModalController,
    private klijentService: KlijentService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  posaljiPodatke(pronadjeniKlijent: Klijent) {
    this.modalCtrl.dismiss({ klijent: pronadjeniKlijent }, "confirm");
  }

  onPretrazi() {
    this.loadingCtrl
      .create({ message: "Pretraživanje klijenta..." })
      .then((loadingEl) => {
        loadingEl.present();
        this.klijentService.pretraziKlijenta(this.tekstPretrage).subscribe(
          (responseData) => {
            this.pronadjeniKlijenti = responseData;
            loadingEl.dismiss();
          },
          (err) => {
            console.log(err);
            loadingEl.dismiss();
            this.alertCtrl
              .create({
                header: "Došlo je do greške prilikom pretraživanja klijenta.",
                buttons: [
                  {
                    text: "OK",
                    role: "cancel",
                  },
                ],
              })
              .then((alertEl) => {
                return alertEl.present();
              });
          }
        );
      });
  }

  prikaziPodatke(pronadjeniKlijent) {}
}
