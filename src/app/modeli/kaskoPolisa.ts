
import { ZahtevZaKaskoOsiguranjem } from './zahtevZaKaskoOsiguranjem';
import { Vozilo } from './vozilo.model';
import { KaskoStavka } from './kaskoStavka';

export class KaskoPolisa {

    constructor(

        public sifra_kasko: string,
        public ugovarac: string,
        public premija: number,
        public porez: number,
        public ukupna_premija: number,
        public datum_od: Date,
        public datum_do: Date,
        public vozilo: Vozilo,
        public zahtevZaKaskoOsiguranjem: ZahtevZaKaskoOsiguranjem,
        public nizStavki: KaskoStavka[]
    ) { }

}