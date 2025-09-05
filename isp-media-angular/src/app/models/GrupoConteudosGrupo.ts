import { ConteudoGrupo } from "./ConteudoGrupo";
import { Grupo } from "./Grupo";
import { MembroGrupo } from "./MembroGrupo";
import { Utilizador } from "./Utilizador";

export class GrupoConteudosGrupo {
    constructor(
        public grupo: Grupo,
        public conteudosGrupo: Array<ConteudoGrupo>
    ) { }
}