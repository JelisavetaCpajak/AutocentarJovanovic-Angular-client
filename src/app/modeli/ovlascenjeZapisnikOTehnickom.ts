
import { Ovlascenje } from './ovlascenje.model';
import { ZapisnikOTehnickomPregledu } from './zapisnikOTehnickomPregledu.model';

export class OvlascenjeZapisnikOTehnickom {

    constructor(
        public ovlascenje: Ovlascenje,
        public zapisnik: ZapisnikOTehnickomPregledu,

    ) { }

}