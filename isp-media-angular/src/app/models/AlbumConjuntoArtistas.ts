import { Album } from "./Album";
import { AlbumArtista } from "./AlbumArtista";
import { Artista } from "./Artista";
import { ConteudoGrupo } from "./ConteudoGrupo";
import { Grupo } from "./Grupo";
import { MembroGrupo } from "./MembroGrupo";
import { Musica } from "./Musica";
import { Utilizador } from "./Utilizador";

export class AlbumConjuntoArtistas {
    constructor(
        public album: Album,
        public conjuntoArtistas: Array<AlbumArtista>
    ) { }
}