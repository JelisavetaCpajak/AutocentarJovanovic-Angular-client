import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { KaskoStavka } from 'src/app/modeli/kaskoStavka';

@Component({
  selector: 'app-nova-kasko-stavka',
  templateUrl: './nova-kasko-stavka.component.html',
  styleUrls: ['./nova-kasko-stavka.component.scss'],
})
export class NovaKaskoStavkaComponent implements OnInit {
  @ViewChild('f', { static: false }) form: NgForm;
 
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    

  }
  
  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel'); 
  }
  posaljiPodatke() {
    this.modalCtrl.dismiss(
      { napravljenaStavka: new KaskoStavka(-1, this.form.value.ugovorenoPokrice, this.form.value.sumaOsiguranja, this.form.value.ucesce, false,false,false )}, 'confirm');
  }

}
