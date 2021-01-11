import { PolisaOsiguranja } from './polisaOsiguranja.model';
import { SaobracajnaDozvola } from './saobracajnaDozvola.model';
import { RegistracioniList } from './registracioniList.model';
import { NalogZaUplatuTakse } from './nalogzaUplatuTakse.model';

export class Predmet {

    constructor(

        public id_predmeta: string,
        public polisa: PolisaOsiguranja,
        public saobracajna: SaobracajnaDozvola,
        public registracioni_list: RegistracioniList,
        public nalozi: NalogZaUplatuTakse[]

    ) { }

}