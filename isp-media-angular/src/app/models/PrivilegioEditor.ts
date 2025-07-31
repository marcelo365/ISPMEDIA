import { Utilizador } from "./Utilizador";

export class PrivilegioEditor {
    constructor(
        public id: number | null,
        public concedente: Utilizador,
        public beneficiario: Utilizador
    ) { }
}