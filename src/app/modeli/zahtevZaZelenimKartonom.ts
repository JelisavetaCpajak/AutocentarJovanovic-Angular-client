import { Zahtev } from './zahtev.model';
import { Klijent } from './klijent.model';

export class ZahtevZaZelenimKartonom extends Zahtev {

    constructor(id_zahteva: string, klijent: Klijent) {
        super(id_zahteva, klijent);
    }

}