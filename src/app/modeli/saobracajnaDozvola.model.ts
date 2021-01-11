import { Vozilo } from './vozilo.model';

export class SaobracajnaDozvola {

    constructor(

        public reg_oznaka: string,
        public datum_od: Date,
        public datum_do: Date,
        public broj_saobracajne: string,
        public serijski_broj: string,
        public vozilo: Vozilo

    ) { }

}