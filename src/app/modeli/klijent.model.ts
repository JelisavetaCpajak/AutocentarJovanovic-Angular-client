export class Klijent {

    constructor(
        public id_klijenta: string,
        public jmbg: string,
        public broj_lk: string,
        public datum_vazenja_lk_klijenta: Date,
        public ime_prezime_klijenta: string,
        public adresa_klijenta: string,
        public ime_firme: string,
        public pib: string,
        public adresa_firme: string,

    ) { }

}