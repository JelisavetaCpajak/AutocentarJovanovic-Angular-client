import { Vozilo } from './vozilo.model';

export class RegistracionaNalepnica{

    constructor(
        
        public kontrolni_broj: string,
        public broj_tablica: string,
        public datum_vazenja_registracije: Date,
        public vozilo: Vozilo,
       
    ) { }

}