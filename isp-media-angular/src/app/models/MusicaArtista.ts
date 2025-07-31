import { Artista } from "./Artista";
import { Musica } from "./Musica";

export class MusicaArtista {
    constructor(
        public id: number | null,
        public musica: Musica,
        public artista: Artista
    ) { }
}