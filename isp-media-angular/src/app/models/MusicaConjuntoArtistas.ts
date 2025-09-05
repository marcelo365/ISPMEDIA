import { Artista } from "./Artista";
import { ConteudoGrupo } from "./ConteudoGrupo";
import { Grupo } from "./Grupo";
import { MembroGrupo } from "./MembroGrupo";
import { Musica } from "./Musica";
import { MusicaArtista } from "./MusicaArtista";
import { Utilizador } from "./Utilizador";

export class MusicaConjuntoArtistas {
    constructor(
        public musica: Musica,
        public conjuntoArtistas: Array<MusicaArtista>
    ) { }
}