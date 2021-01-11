import { Zahtev } from './zahtev.model';
import { Klijent } from './klijent.model';

export class ZahtevZaKaskoOsiguranjem extends Zahtev {

    constructor(id_zahteva: string, klijent: Klijent) {
        super(id_zahteva, klijent);
    }

}