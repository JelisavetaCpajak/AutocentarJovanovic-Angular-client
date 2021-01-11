import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Racun } from 'src/app/modeli/racun.model';
import { ZapisnikOTehnickomPregledu } from 'src/app/modeli/zapisnikOTehnickomPregledu.model';
import { RacunService } from 'src/app/servisi/racun.service';
import { Klijent } from 'src/app/modeli/klijent.model';
import { Vozilo } from 'src/app/modeli/vozilo.model';
import { SaobracajnaDozvola } from 'src/app/modeli/saobracajnaDozvola.model';
import { StavkaRacuna } from 'src/app/modeli/stavkaRacuna';

@Component({
  selector: 'app-pretrazivanje-racuna',
  templateUrl: './pretrazivanje-racuna.page.html',
  styleUrls: ['./pretrazivanje-racuna.page.scss'],
})

export class PretrazivanjeRacunaPage implements OnInit {

  

    tekstPretrage: string;
    nadjeniRacuni:  Racun [] = [];
  
    constructor(private navCtrl: NavController,
      
      private racunService: RacunService,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController) { }
  
    ngOnInit() {
    }
  
  
    ionViewWillEnter() {
      this.nadjeniRacuni = [];
    }
  
    onPretrazi() {
      this.nadjeniRacuni = [];
      this.loadingCtrl
        .create({ message: 'Pretraživanje racuna...' })
        .then(loadingEl => {
          loadingEl.present();
          console.log("pre pretraziRacun");
          this.racunService.pretraziRacun(this.tekstPretrage).subscribe(racuni =>
             
            {
            
            racuni.forEach(r => {
             
              let klijent= new Klijent(r.id_klijenta,null,null,null,null,null,null,null,null);
              if(r.ime_prezime_klijenta===null)
              {
                klijent.ime_firme=r.ime_firme;
              } else{

               
                klijent.ime_prezime_klijenta=r.ime_prezime_klijenta;
              }
              console.log("ime klijenta:",klijent.ime_prezime_klijenta);
              console.log("ime firme:",klijent.ime_firme);
              let vozilo = new Vozilo(r.broj_sasije, null, null, null, null, null, null, null, null, null, null, null, null, null, null, klijent);
              let saobr_dozvola=new SaobracajnaDozvola(r.reg_oznaka,null,null,null,null,vozilo);
              
              let zapisnik_o_teh_pregledu= new ZapisnikOTehnickomPregledu(r.id_broj,null,null,null,false,null,false,false,saobr_dozvola);
              
              let racun=new Racun(r.sifra_racuna,r.datum,r.ukupno_sa_pdv,r.ukupno_bez_pdv,klijent,zapisnik_o_teh_pregledu,[]);
              
              this.racunService.pretraziStavkeRacuna(racun.sifra_racuna).subscribe(stavke => {
                stavke.forEach(s => {
                  racun.nizStavki.push(new StavkaRacuna(s.redni_broj,s.naziv,s.kolicina,s.cena_sa_pdv,s.cena_bez_pdv,false,false,false));
                });
              });
              this.nadjeniRacuni.push(racun);
            });
            loadingEl.dismiss();
  
          }, err => {
            console.log(err);
            loadingEl.dismiss();
          });
        });
    }
  
  
  
    onObrisi(izabraniRacun: Racun) {
  
      this.loadingCtrl
        .create({ message: 'Brisanje racuna...' })
        .then(loadingEl => {
          loadingEl.present();
          this.racunService.obrisiRacun(izabraniRacun)
            .subscribe(res => {
              loadingEl.dismiss();
              this.kreirajAlert('Racun je uspešno obrisan.');
              this.nadjeniRacuni.splice(this.nadjeniRacuni.indexOf(izabraniRacun), 1);
            }, err => {
              loadingEl.dismiss();
              this.kreirajAlert('Došlo je do greške prilikom brisanja predmeta.');
              return;
            });
        });
  
    }
  
    onIzmeni(nadjeniRacun: Racun) {
  
      let navigationExtras: NavigationExtras = {
        state: nadjeniRacun
      };
  
      this.navCtrl.navigateForward('home/pretrazivanje-racuna/izmeni-racun', navigationExtras);
  
    }
  
    kreirajAlert(tekst: string) {
      this.alertCtrl.create({
        header: tekst,
        buttons: [{
          text: 'OK',
          role: 'cancel',
        }
        ]
      }).then(alertEl => {
        return alertEl.present();
      });
  
    }
  }



