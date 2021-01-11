
import { SaobracajnaDozvola } from './saobracajnaDozvola.model';

export class ZapisnikORegistraciji {

    constructor(
        public id_reg_zapisnika: string,
        public datum_i_vreme_izdavanja_nalepnice: Date,
        public saobracajna: SaobracajnaDozvola,

    ) { }

}