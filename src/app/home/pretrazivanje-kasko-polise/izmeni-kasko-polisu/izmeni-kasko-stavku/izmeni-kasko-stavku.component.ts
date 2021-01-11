import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KaskoStavka } from 'src/app/modeli/kaskoStavka';

@Component({
  selector: 'app-izmeni-kasko-stavku',
  templateUrl: './izmeni-kasko-stavku.component.html',
  styleUrls: ['./izmeni-kasko-stavku.component.scss'],
})
export class IzmeniKaskoStavkuComponent implements OnInit {


  stavkaZaIzmenu: KaskoStavka;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  posaljiPodatke() {

    this.modalCtrl.dismiss(
      { izmenjenaStavka: this.stavkaZaIzmenu}, 'confirm');
  }
}
