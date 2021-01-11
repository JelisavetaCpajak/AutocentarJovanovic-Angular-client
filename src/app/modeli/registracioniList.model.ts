import { ZapisnikOTehnickomPregledu } from './zapisnikOTehnickomPregledu.model';
import { Vozilo } from './vozilo.model';

export class RegistracioniList {

    constructor(
        
        public id_reg_lista: string,
        public sifra_firme: string,
        public vozilo: Vozilo,
        public zapisnik_o_tehnickom: ZapisnikOTehnickomPregledu
     
    ) { }

}