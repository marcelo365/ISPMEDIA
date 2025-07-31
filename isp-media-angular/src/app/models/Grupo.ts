import { Utilizador } from "./Utilizador";

export class Grupo {
    constructor(
        public id: number | null,
        public nome: string,
        public descricao: string,
        public dataCriacao: string,
        public utilizador: Utilizador, //que criou o grupo
        public publico : Boolean
    ) { }
}