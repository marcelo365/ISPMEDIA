import { Musica } from "./Musica";
import { Playlist } from "./Playlist";
import { Utilizador } from "./Utilizador";

export class PlaylistMusica {
    constructor(
        public id: number | null,
        public musica: Musica,
        public playlist: Playlist
    ) { }
}