import { Klijent } from './klijent.model';
import { Predmet } from './predmet.model';

export class NalogZaUplatuTakse{

    constructor(
        public sifra_naloga: string,
        public primalac: string,
        public iznos: number,
        public svrha_uplate: string,
        public datum: Date,
        public racun_primaoca: string,
        public klijent: Klijent,
        public kreiranje: boolean,
        public izmena: boolean, 
        public brisanje: boolean

    ) { }

}