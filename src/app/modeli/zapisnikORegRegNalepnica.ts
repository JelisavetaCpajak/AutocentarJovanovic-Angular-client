
import { ZapisnikORegistraciji } from './zapisnikORegistraciji';
import { RegistracionaNalepnica } from './registracionaNalepnica.model';

export class ZapisnikORegRegNalepnica {

    constructor(
        public zapisnik: ZapisnikORegistraciji,
        public regNalepnica: RegistracionaNalepnica,


    ) { }

}