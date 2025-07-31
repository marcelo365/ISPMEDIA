import { Grupo } from "./Grupo";
import { Musica } from "./Musica";
import { Utilizador } from "./Utilizador";
import { Video } from "./Video";

export class ConteudoGrupo {
    constructor(
        public id: number | null,
        public grupo: Grupo,
        public video: Video | null,
        public musica: Musica | null,
        public utilizador: Utilizador
    ) { }
}