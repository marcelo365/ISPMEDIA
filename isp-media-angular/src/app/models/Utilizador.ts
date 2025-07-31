
export class Utilizador {
    constructor(
        public id: number | null,
        public nome: string,
        public username: string,
        public senha: string,
        public email: string,
        public dataRegisto: string,
        public tipo: number, // 1=normal , 2=administrador
        public ativo: number
    ) { }
}