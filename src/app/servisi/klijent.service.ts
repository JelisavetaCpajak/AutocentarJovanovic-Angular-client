import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Klijent } from '../modeli/klijent.model';

@Injectable({
    providedIn: 'root'
})
export class KlijentService {

    constructor(private http: HttpClient) { }

    kreirajKlijenta(klijent: Klijent) {

        const header = new HttpHeaders().set('Content-Type', 'application/json');
        const kreiraniKlijent: Klijent = klijent;
        return this.http.post<{idKlijenta: string}>(`http://localhost:6499/api/klijent`,
            JSON.stringify(klijent),
            { headers: header }
        );
    }

    pretraziKlijenta(imeKlijentaIliFirme: string){
        return this.http.get<Klijent[]>(`http://localhost:6499/api/klijent/ime/${imeKlijentaIliFirme}`);
    }

    pretraziKlijentaPoID(idKlijenta: string){
        return this.http.get<Klijent[]>(`http://localhost:6499/api/klijent/id/${idKlijenta}`);
    }


    vratiKlijentaZaVozilo(brojSasije: string){
        return this.http.get<Klijent>(`http://localhost:6499/api/klijent/brojSasije/${brojSasije}`);
    }

}