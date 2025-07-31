import { Grupo } from "./Grupo";
import { Utilizador } from "./Utilizador";

export class MembroGrupo {
    constructor(
        public id: number | null,
        public papel: number, // 1=membro, 2=editor, 3=owner
        public estado: number, // 1-aprovado , 2-pendente
        public grupo: Grupo,
        public utilizador: Utilizador
    ) { }
}