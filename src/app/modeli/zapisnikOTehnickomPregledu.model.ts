import { SaobracajnaDozvola } from './saobracajnaDozvola.model';

export class ZapisnikOTehnickomPregledu {

    constructor(

        public id_broj: string,
        public datum: Date,
        public vreme_pocetka: Date,
        public vreme_zavrsetka: Date,
        public ocena_ispravnosti: boolean,
        public kontrolor: string,
        public atest_za_plin: boolean,
        public atest_za_stakla: boolean,
        public saobracajna: SaobracajnaDozvola


    ) { }

}