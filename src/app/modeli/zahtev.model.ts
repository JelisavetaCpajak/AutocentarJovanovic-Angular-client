
import { Klijent } from './klijent.model';

export class Zahtev{

    constructor(
        
        public id_zahteva: string,
        public klijent: Klijent,
       
    ) { }

}