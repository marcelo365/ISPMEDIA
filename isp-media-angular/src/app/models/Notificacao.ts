import { Utilizador } from "./Utilizador";

export class Notificacao {
    constructor(
        public id: number | null,
        public mensagem: string,
        public lida: boolean,
        public dataCriacao: string,
        public utilizador: Utilizador //destinatário
    ) { }
}