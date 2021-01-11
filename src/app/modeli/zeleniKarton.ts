
import { PolisaOsiguranja } from './polisaOsiguranja.model';
import { ZahtevZaZelenimKartonom } from './zahtevZaZelenimKartonom';

export class ZeleniKarton {

    constructor(

        public br: string,
        public osiguravac: string,
        public datum_od: Date,
        public datum_do: Date,
        public polisa: PolisaOsiguranja,
        public zahtevZaZelenimKartonom: ZahtevZaZelenimKartonom,

    ) { }

}