import { Klijent } from './klijent.model';

export class NalogZaUplatuOsiguranja {

    constructor(
        public sifra_naloga: string,
        public iznos: number,
        public racun_primaoca: string,
        public svrha_uplate: string,
        public primalac: string,
        public datum: Date,
        public klijent: Klijent

    ) { }

}