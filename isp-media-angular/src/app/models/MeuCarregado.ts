import { Musica } from "./Musica";
import { Utilizador } from "./Utilizador";
import { Video } from "./Video";

export class MeuCarregado {
    constructor(
        public id: number | null,
        public vinculoDireto: boolean,
        public utilizador: Utilizador,
        public video: Video,
        public musica: Musica
    ) { }
}