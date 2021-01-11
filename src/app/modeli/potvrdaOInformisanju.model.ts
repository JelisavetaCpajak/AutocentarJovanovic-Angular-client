import { Vozilo } from './vozilo.model';

export class PotvrdaOInformisanju{

    constructor(
        
        public id_potvrde: string,
        public datum: Date,
        public osiguravac: string,
        public mesto: string,
        public nacin_informisanja: string,
        public vrsta_osiguranja: string,
       
    ) { }

}