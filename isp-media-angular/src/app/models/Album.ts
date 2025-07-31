import { Utilizador } from "./Utilizador";

export class Album {
    constructor(
        public id: number | null,
        public titulo: string,
        public descricao: string,
        public dataLancamento: string,
        public caminhoFoto: string,
        public utilizador: Utilizador
    ) { }
}