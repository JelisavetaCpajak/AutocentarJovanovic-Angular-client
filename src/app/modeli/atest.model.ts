import { Vozilo } from './vozilo.model';
import { Klijent } from './klijent.model';
import { TipAtesta } from './tipAtesta.model';

export class Atest {

    constructor(
        public broj_atesta: string,
        public datum: Date,
        public napomena: string,
        public vozilo: Vozilo,
        public klijent: Klijent,
        public tipAtesta: TipAtesta

    ) { }

}