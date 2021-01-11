import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Zaposleni } from '../modeli/zaposleni.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ZaposleniService {


    constructor(private http: HttpClient) { }

    private _prijavljeniZaposleni = new BehaviorSubject<Zaposleni>(null);


    get prijavljeniZaposleni() {
        return this._prijavljeniZaposleni.asObservable(); // vraca observable koja sadrzi naseg zaposlenog
      }

    kreirajZaposlenog(zaposleni: Zaposleni) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<{
            zaposleniID: string
        }>(`http://localhost:6499/api/zaposleni`,
            JSON.stringify(
                {
                    ime: zaposleni.ime,
                    prezime: zaposleni.prezime,
                    korisnickoIme: zaposleni.korisnickoIme,
                    sifra: zaposleni.sifra
                }),
            { headers: header }
        );
    }


    prijaviZaposlenog(kIme: string, sifra: string){

        return this.http.get<Zaposleni[]>(`http://localhost:6499/api/zaposleni/${kIme}/${sifra}`)
        .pipe(
            tap(responseData => {
            this._prijavljeniZaposleni.next(responseData[0]);
        }, err => {
            this._prijavljeniZaposleni.next(null);
            console.log(err);
        })
        );

    }
}
