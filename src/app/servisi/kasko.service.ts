import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { KaskoPolisa } from '../modeli/kaskoPolisa';
import { DatePipe } from '@angular/common';
import { KaskoStavka } from '../modeli/kaskoStavka';

@Injectable({
    providedIn: 'root'
})
export class KaskoService {

    constructor(private http: HttpClient, public datepipe: DatePipe) { }


    kreirajKaskoPolisu(kasko: KaskoPolisa) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post(`http://localhost:6499/api/kaskoPolisa`,
            JSON.stringify(
                {
                    kasko
                }),
            { headers: header }
        );
    }

    izmeniKaskoPolisu(kasko: KaskoPolisa) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.put(`http://localhost:6499/api/kaskoPolisa/izmena`,
            JSON.stringify(
                {
                    kasko
                }),
            { headers: header }
        );
    }


    obrisiKaskoPolisu(kasko: KaskoPolisa) {

        const header = new HttpHeaders().set('Content-Type', 'application/json');

        const options = {
            headers: header,
            body: JSON.stringify(
                {
                    kasko
                })
        }

        return this.http.delete(`http://localhost:6499/api/kaskoPolisa/obrisi`,
            options
        );
    }

    vratiZahteveZaKasko() {
        return this.http.get<{
            id_zahteva: string,
            id_klijenta: string,
            jmbg: string,
            broj_lk: string,
            datum_vazenja_lk_klijenta: Date,
            ime_prezime_klijenta: string,
            adresa_klijenta: string,
            ime_firme: string,
            pib: string,
            adresa_firme: string
        }[]>(`http://localhost:6499/api/zahtevZaKasko`);

    }

    pretraziKaskoPolise(jmbgIliPib: string) {

        return this.http.get<{
            sifra_kasko: string,
            ugovarac: string,
            premija: number,
            porez: number,
            ukupna_premija: number,
            datum_od: Date,
            datum_do: Date,
            id_zahteva: string,
            broj_sasije: string,
            broj_lk: string,
            ime_prezime_klijenta: string,
            ime_firme: string,
            pib: string
        }[]>(`http://localhost:6499/api/kaskoPolisa/${jmbgIliPib}`);

    }

    pretraziStavkeZaKasko(sifraKasko: string) {

        return this.http.get<{
            sifra_kasko: string,
            rb_stavke: number,
            ugovoreno_pokrice: string,
            suma_osiguranja: number,
            ucesce_osiguranika: string,
        }[]>(`http://localhost:6499/api/kaskoPolisa/stavke/${sifraKasko}`);

    }

}