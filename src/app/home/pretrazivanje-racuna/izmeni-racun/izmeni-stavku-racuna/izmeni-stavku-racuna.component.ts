import { Component, OnInit } from '@angular/core';
import { StavkaRacuna } from 'src/app/modeli/stavkaRacuna';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-izmeni-stavku-racuna',
  templateUrl: './izmeni-stavku-racuna.component.html',
  styleUrls: ['./izmeni-stavku-racuna.component.scss'],
})
export class IzmeniStavkuRacunaComponent implements OnInit {

  stavkaZaIzmenu: StavkaRacuna;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  posaljiPodatke() {
    
    this.modalCtrl.dismiss(
      { izmenjenaStavka: this.stavkaZaIzmenu}, 'confirm');
  }

}
