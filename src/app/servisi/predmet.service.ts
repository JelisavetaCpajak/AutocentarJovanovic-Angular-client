import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Predmet } from '../modeli/predmet.model';
import { NalogZaUplatuTakse } from '../modeli/nalogzaUplatuTakse.model';
import { DatePipe } from '@angular/common';
import { Ovlascenje } from '../modeli/ovlascenje.model';
import { RegistracionaNalepnica } from '../modeli/registracionaNalepnica.model';

@Injectable({
    providedIn: 'root'
})
export class PredmetService {

    constructor(private http: HttpClient, public datepipe: DatePipe) { }

    pretraziPredmet(jmbgIliPib: string) {

        return this.http.get<{
            id_predmeta: string,
            sifra_polise: string,
            reg_oznaka: string,
            broj_sasije: string,
            ime_prezime_ovlascenog: string,
            kontrolni_broj: string,
            id_ovlascenja: string
        }[]>(`http://localhost:6499/api/predmet/${jmbgIliPib}`);

    }

    pretraziNalogeZaPredmet(idPredmeta: string) {

        return this.http.get<{
            id_predmeta: string,
            sifra_naloga: string,
            primalac: string,
            iznos: number,
            svrha_uplate: string,
            datum: Date
            racun_primaoca: string,
            id_klijenta: string,
            jmbg: string,
            broj_lk: string,
            datum_vazenja_lk_klijenta: Date,
            ime_prezime_klijenta: string,
            adresa_klijenta: string,
            ime_firme: string,
            pib: string,
            adresa_firme: string
        }[]>(`http://localhost:6499/api/predmet/nalozi/${idPredmeta}`);

    }

    kreirajPredmet(ceoPredmet: {predmet: Predmet, ovlascenje: Ovlascenje, regNal: RegistracionaNalepnica}) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');

        console.log(ceoPredmet.predmet.nalozi[0].datum);
        return this.http.post(`http://localhost:6499/api/predmet`,
            JSON.stringify(
                {
                    predmet: ceoPredmet.predmet,
                    ovlascenje: ceoPredmet.ovlascenje,
                    regNal: ceoPredmet.regNal

                }),
            { headers: header }
        );
    }


    obrisiPredmet(ceoPredmet: {predmet: Predmet, ovlascenje: Ovlascenje, regNalepnica: RegistracionaNalepnica}) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');

        const options = {
            headers: header,
            body: JSON.stringify(
                {
                    predmet: ceoPredmet.predmet,
                    ovlascenje: ceoPredmet.ovlascenje,
                    regNal: ceoPredmet.regNalepnica
                })
        }
        return this.http.delete(`http://localhost:6499/api/predmet/obrisi`,
        options);
    }

    izmeniPredmet(predmet: Predmet) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.put(`http://localhost:6499/api/predmet/izmena`,
            JSON.stringify(
                {
                    predmet
                }),
            { headers: header }
        );
    }
    

    ucitajSaobracajne() {
        return this.http.get<{
            reg_oznaka: string,
            datum_od: Date,
            datum_do: Date,
            broj_saobracajne: string,
            serijski_broj: string,
            broj_sasije: string
        }[]>(`http://localhost:6499/api/saobracajna`);
    }

    ucitajOvlascenja() {
        return this.http.get<{
            id_ovlascenja: string,
            ime_prezime_ovlascenog: string,
            broj_lk_ovlascenog: string,
            id_klijenta: string,
            broj_sasije: string
        }[]>(`http://localhost:6499/api/ovlascenje`);
    }
    ucitajRegListove() {
        return this.http.get<{
            id_reg_lista: string,
            sifra_firme: string,
            broj_sasije: string,
            id_broj: string
        }[]>(`http://localhost:6499/api/regList`);
    }
    ucitajRegNalepnice() {
        return this.http.get<{
            kontrolni_broj: string,
            broj_tablica: string,
            datum_vazenja_registracije: Date,
            broj_sasije: string,
        }[]>(`http://localhost:6499/api/regNalepnica`);
    }
    ucitajPolise() {
        return this.http.get<{
            sifra_polise: string,
            datum_izdavanja: Date,
            premijski_stepen: string,
            premija: number,
            pocetak_osiguranja: Date,
            istek_osiguranja: Date,
            broj_sasije: string,
            id_zahteva: string,
            id_potvrde_o_informisanju: string
        }[]>(`http://localhost:6499/api/polisa`);
    }
}