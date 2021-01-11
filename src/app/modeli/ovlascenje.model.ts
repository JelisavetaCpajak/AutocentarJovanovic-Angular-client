import { Vozilo } from './vozilo.model';
import { Klijent } from './klijent.model';

export class Ovlascenje {

    constructor(
        public id_ovlascenja: string,
        public ime_prezime_ovlascenog: string,
        public broj_lk_ovlascenog: string,
        public klijent: Klijent,
        public vozilo: Vozilo

    ) { }

}