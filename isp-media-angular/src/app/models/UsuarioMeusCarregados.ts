import { Grupo } from "./Grupo";
import { MembroGrupo } from "./MembroGrupo";
import { MeuCarregado } from "./MeuCarregado";
import { Utilizador } from "./Utilizador";

export class UsuarioMeusCarregados {
    constructor(
        public utilizador: Utilizador,
        public meusCarregados: Array<MeuCarregado>
    ) { }
}