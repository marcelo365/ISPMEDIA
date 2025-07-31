import { Utilizador } from "./Utilizador";

export class Playlist {
    constructor(
        public id: number | null,
        public dataCriacao: string,
        public titulo: string,
        public privada: boolean,
        public utilizador: Utilizador
    ) { }
}