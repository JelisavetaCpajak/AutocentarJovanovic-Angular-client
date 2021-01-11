import { Vozilo } from './vozilo.model';
import { PotvrdaOInformisanju } from './potvrdaOInformisanju.model';
import { Zahtev } from './zahtev.model';

export class PolisaOsiguranja{
    constructor(
        public sifra_polise: string,
        public datum_izdavanja: Date,
        public premijski_stepen: string,
        public premija: number,
        public pocetak_osiguranja: Date,
        public istek_osiguranja: Date,
        public vozilo: Vozilo,
        public zahtev: Zahtev,
        public potvrda_o_informisanju: PotvrdaOInformisanju
      
    ) { }

}