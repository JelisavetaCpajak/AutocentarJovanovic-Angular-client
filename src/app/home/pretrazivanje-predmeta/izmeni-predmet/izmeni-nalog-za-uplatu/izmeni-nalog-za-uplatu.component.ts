import { Component, OnInit } from '@angular/core';
import { NalogZaUplatuTakse } from 'src/app/modeli/nalogzaUplatuTakse.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-izmeni-nalog-za-uplatu',
  templateUrl: './izmeni-nalog-za-uplatu.component.html',
  styleUrls: ['./izmeni-nalog-za-uplatu.component.scss'],
})
export class IzmeniNalogZaUplatuComponent implements OnInit {

  nalogZaIzmenu: NalogZaUplatuTakse;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  posaljiPodatke() {
    this.modalCtrl.dismiss(
      { izmenjeniNalog: this.nalogZaIzmenu }, 'confirm');
  }
}
