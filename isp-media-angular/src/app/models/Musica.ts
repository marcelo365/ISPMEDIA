import { Album } from "./Album";
import { Categoria } from "./Categoria";

export class Musica {
    constructor(
        public id: number | null, // opcional ao criar nova música
        public titulo: string,
        public duracao: string, // LocalTime representado como string, ex: "00:03:45"
        public formato: string,
        public tamanho: number, // MB
        public letra: string,
        public dataLancamento: string, // LocalDate como ISO string: "2025-06-21"
        public caminhoFicheiro: string,
        public caminhoFoto: string,
        public album: Album | null, // relacionamento com Album
        public categoria: Categoria | null // relacionamento com Categoria
    ) { }
}