import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NalogZaUplatuTakse } from 'src/app/modeli/nalogzaUplatuTakse.model';
import { NgForm } from '@angular/forms';
import { Klijent } from 'src/app/modeli/klijent.model';
import { KlijentService } from 'src/app/servisi/klijent.service';

@Component({
  selector: 'app-novi-nalog-za-uplatu',
  templateUrl: './novi-nalog-za-uplatu.component.html',
  styleUrls: ['./novi-nalog-za-uplatu.component.scss'],
})
export class NoviNalogZaUplatuComponent implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;
  ucitaniKlijent: Klijent;
  brojSasije: string;
  
  constructor(private modalCtrl: ModalController, private klijentService: KlijentService) { }

  ngOnInit() {
    this.klijentService.vratiKlijentaZaVozilo(this.brojSasije).subscribe(klijent => {
      this.ucitaniKlijent = klijent;
    }, err => {
      console.log(err);
    });

  }
  
  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel'); 
  }
  posaljiPodatke() {
    this.modalCtrl.dismiss(
      { napravljeniNalog: new NalogZaUplatuTakse(null, this.form.value.primalac, this.form.value.iznos, this.form.value.svrhaUplate, this.form.value.datum, this.form.value.racunPrimaoca,this.ucitaniKlijent,false, false, false)}, 'confirm');
  }

}
