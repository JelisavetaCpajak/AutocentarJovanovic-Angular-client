

export class KaskoStavka {

    constructor(

        public rb_stavke: number,
        public ugovoreno_pokrice: string,
        public suma_osiguranja: number,
        public ucesce_osiguranika: string,
        public kreiranje: boolean,
        public izmena: boolean,
        public brisanje: boolean
    ) { }

}