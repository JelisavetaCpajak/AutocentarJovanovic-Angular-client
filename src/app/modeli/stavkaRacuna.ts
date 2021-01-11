
export class StavkaRacuna {

    constructor(

        public redni_broj: number,
        public naziv: string,
        public kolicina: number,
        public cena_sa_pdv: number,
        public cena_bez_pdv: number,
        public kreiranje: boolean,
        public izmena: boolean, 
        public brisanje: boolean
    ) { }

}