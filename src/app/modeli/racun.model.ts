
import { Klijent } from './klijent.model';
import { ZapisnikOTehnickomPregledu } from './zapisnikOTehnickomPregledu.model';
import { StavkaRacuna } from './stavkaRacuna';

export class Racun {

    constructor(

        public sifra_racuna: string,
        public datum: Date,
        public ukupno_sa_pdv: number,
        public ukupno_bez_pdv: number,
        public klijent: Klijent,
        public zapisnik: ZapisnikOTehnickomPregledu,
        public nizStavki: StavkaRacuna[]
    ) { }

}