import { Album } from "./Album";
import { Artista } from "./Artista";

export class AlbumArtista {
    constructor(
        public id: number | null,
        public album: Album,
        public artista: Artista
    ) { }
}