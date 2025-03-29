export class PesquisaUsuarioDTO {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;

    constructor(id: number, nome: string, email: string, ativo: boolean) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.ativo = ativo
    }
}