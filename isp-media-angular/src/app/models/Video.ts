import { Categoria } from "./Categoria";
import { Musica } from "./Musica";

export class Video {
    constructor(
        public id: number | null, 
        public titulo: string,
        public descricao: string,
        public duracao: string, // LocalTime representado como string, ex: "00:03:45"
        public formato: string,
        public tamanho: number, // MB
        public dataLancamento: string, // LocalDate como ISO string: "2025-06-21"
        public autor: string,
        public caminhoFicheiro: string,
         public caminhoFoto: string,
        //public caminhoFoto: string,
        public musica: Musica | null, // relacionamento com Música
        public categoria: Categoria | null // relacionamento com Categoria
    ) { }
}