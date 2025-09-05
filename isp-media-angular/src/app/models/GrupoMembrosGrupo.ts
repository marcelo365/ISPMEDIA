import { Grupo } from "./Grupo";
import { MembroGrupo } from "./MembroGrupo";
import { Utilizador } from "./Utilizador";

export class GrupoMembrosGrupo {
    constructor(
        public grupo: Grupo,
        public membrosGrupo: Array<MembroGrupo>
    ) { }
}