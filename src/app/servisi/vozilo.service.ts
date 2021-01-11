import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vozilo } from '../modeli/vozilo.model';
import { KlijentService } from './klijent.service';

interface VoziloZaKlijenta {
    adresa_firme: string,
    adresa_klijenta: string,
    boja: string,
    br_mesta_za_sedenje: number,
    broj_lk: string,
    broj_motora: string,
    broj_osovina: number,
    broj_sasije: string,
    datum_prve_registracije: Date,
    datum_vazenja_lk_klijenta: Date,
    godina_proizvodnje: number,
    id_klijenta: string,
    ime_firme: string,
    ime_prezime_klijenta: string,
    jmbg: string,
    kategorija: string,
    marka: string,
    masa: number,
    max_masa: number,
    model: string,
    pib: string,
    pogonsko_gorivo: string,
    snaga_motora: number,
    zapremina_motora: number
  }




@Injectable({
    providedIn: 'root'
})
export class VoziloService {

    constructor(private http: HttpClient, private klijentService: KlijentService) { }

    kreirajVozilo(vozilo: Vozilo) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post(`http://localhost:6499/api/vozilo`,
            JSON.stringify(
                {
                    brojSasije: vozilo.broj_sasije,
                    masa: vozilo.masa,
                    snagaMotora: vozilo.snaga_motora,
                    zapreminaMotora: vozilo.zapremina_motora,
                    brojMotora: vozilo.broj_motora,
                    kategorija: vozilo.kategorija,
                    marka: vozilo.marka,
                    model: vozilo.model,
                    pogonskoGorivo: vozilo.pogonsko_gorivo,
                    boja: vozilo.boja,
                    maxMasa: vozilo.max_masa,
                    brojOsovina: vozilo.broj_osovina,
                    godinaProizvodnje: vozilo.godina_proizvodnje,
                    brojMestaZaSedenje: vozilo.br_mesta_za_sedenje,
                    datumPrveRegistracije: vozilo.datum_prve_registracije,
                    klijent: vozilo.klijent.id_klijenta
                }),
            { headers: header }
        );
    }

    pretraziVozilo(imePrezimeIliNaziv: string) {
        return this.http.get<VoziloZaKlijenta[]>(`http://localhost:6499/api/vozilo/${imePrezimeIliNaziv}`);
       
    }
    
}