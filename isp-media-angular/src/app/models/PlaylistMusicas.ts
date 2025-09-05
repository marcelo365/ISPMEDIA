import { Grupo } from "./Grupo";
import { MembroGrupo } from "./MembroGrupo";
import { Musica } from "./Musica";
import { Playlist } from "./Playlist";
import { PlaylistMusica } from "./PlaylistMusica";
import { Utilizador } from "./Utilizador";

export class PlaylistMusicas {
    constructor(
        public playlist: Playlist,
        public musicas: Array<PlaylistMusica>
    ) { }
}