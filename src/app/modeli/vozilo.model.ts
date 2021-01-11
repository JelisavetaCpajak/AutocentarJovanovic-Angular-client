import { Klijent } from './klijent.model';

export class Vozilo {

    constructor(
        public broj_sasije: string,
        public masa: number,
        public snaga_motora: number,
        public zapremina_motora: number,
        public broj_motora:string,
        public kategorija: string,
        public marka: string,
        public model: string,
        public pogonsko_gorivo: string,
        public boja: string,
        public max_masa: number,
        public broj_osovina: number,
        public godina_proizvodnje: number,
        public br_mesta_za_sedenje: number,
        public datum_prve_registracije: Date,
        public klijent: Klijent
    ) { }

}