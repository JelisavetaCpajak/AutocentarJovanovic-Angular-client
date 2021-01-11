import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Vozilo } from "src/app/modeli/vozilo.model";

@Component({
  selector: "app-prikazi-vozilo",
  templateUrl: "./prikazi-vozilo.component.html",
  styleUrls: ["./prikazi-vozilo.component.scss"],
})
export class PrikaziVoziloComponent implements OnInit {
  vozilo: Vozilo;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }
}
