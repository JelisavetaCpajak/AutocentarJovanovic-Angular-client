import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { KlijentService } from "src/app/servisi/klijent.service";

import { StavkaRacuna } from "src/app/modeli/stavkaRacuna";
import { Klijent } from "src/app/modeli/klijent.model";

@Component({
  selector: "app-nova-stavka-racuna",
  templateUrl: "./nova-stavka-racuna.component.html",
  styleUrls: ["./nova-stavka-racuna.component.scss"],
})
export class NovaStavkaRacunaComponent implements OnInit {
  @ViewChild("f", { static: false }) form: NgForm;
  //  ucitaniKlijent: Klijent;
  //  brojSasije: string;

  constructor(
    private modalCtrl: ModalController,
    private klijentService: KlijentService
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel");
  }

  posaljiPodatke() {
    this.modalCtrl.dismiss(
      {
        napravljenaStavka: new StavkaRacuna(
          -1,
          this.form.value.nazivStavke,
          this.form.value.kolicina,
          this.form.value.cenaSaPDV,
          this.form.value.cenaBezPDV,
          true,
          false,
          false
        ),
      },
      "confirm"
    );
  }
}
