import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Racun } from '../modeli/racun.model';



@Injectable({
  providedIn: 'root'
})

export class RacunService{

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  pretraziRacun(jmbgIliPib: string) {

    return this.http.get<{
        sifra_racuna: string,
        datum: Date,
        ukupno_sa_pdv: number,
        ukupno_bez_pdv: number,
        id_klijenta: string,
        ime_prezime_klijenta: string,
        ime_firme: string,
        id_broj: string,
        reg_oznaka: string,
        broj_sasije: string

    }[]>(`http://localhost:6499/api/racun/${jmbgIliPib}`);

}

  pretraziStavkeRacuna(sifra_racuna: string){

    return this.http.get<{
      sifra_racuna: string,
      redni_broj: number,
      naziv: string,
      kolicina: number,
      cena_sa_pdv: number,
      cena_bez_pdv: number,
      datum: Date,
      ukupno_sa_pdv: number,
      ukupno_bez_pdv: number,
      id_klijenta: string,
      id_zapisnika : string
  }[]>(`http://localhost:6499/api/racun/stavke/${sifra_racuna}`);
  }

  obrisiRacun(racun:Racun) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    const options = {
        headers: header,
        body: JSON.stringify(
            {
                racun
                
            })
    }
    return this.http.delete(`http://localhost:6499/api/racun/obrisi`,
    options);
}

  ucitajZapisnike(){
    return this.http.get<{
      id_broj: string,
      datum: Date,
      vreme_pocetka: Date,
      vreme_zavrsetka: Date,
      ocena_ispravnosti: boolean,
      kontrolor: string,
      atest_za_plin: boolean,
      atest_za_stakla: boolean,
      reg_oznaka: string,
      broj_sasije: string,
      id_klijenta: string
  }[]>(`http://localhost:6499/api/zapisnik.OTehnickomPregledu`);

  }

  ucitajZapisnikeZaKlijenta(id_klijenta: string){
    return this.http.get<{
      id_broj: string,
      datum: Date,
      vreme_pocetka: Date,
      vreme_zavrsetka: Date,
      ocena_ispravnosti: boolean,
      kontrolor: string,
      atest_za_plin: boolean,
      atest_za_stakla: boolean,
      reg_oznaka: string,
      broj_sasije: string,
      id_klijenta: string
  }[]>(`http://localhost:6499/api/zapisnik.OTehnickomPregledu/${id_klijenta}`);

  }

  ucitajKlijente(){
    return this.http.get<{
      id_klijenta: string,
      jmbg: string,
      broj_lk: string,
      datum_vazenja_lk_klijenta: Date,
      ime_prezime_klijenta: string,
      adresa_klijenta: string,
      ime_firme: string,
      pib: string,
      adresa_firme: string
  }[]>(`http://localhost:6499/api/klijent`);

  }

  kreirajRacun(racun:Racun){
    const header = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post(`http://localhost:6499/api/racun`,
            JSON.stringify(
                {
                  racun
                }),
            { headers: header }
        );

  }

  izmeniRacun(racun: Racun) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`http://localhost:6499/api/racun/izmena`,
        JSON.stringify(
            {
                racun
            }),
        { headers: header }
    );
}

}