
import { ZapisnikOTehnickomPregledu } from './zapisnikOTehnickomPregledu.model';
import { Atest } from './atest.model';

export class AtestZapisnik {

    constructor(

        public zapisnik: ZapisnikOTehnickomPregledu,
        public atest: Atest,
        public datum_koriscenja: Date

    ) { }

}