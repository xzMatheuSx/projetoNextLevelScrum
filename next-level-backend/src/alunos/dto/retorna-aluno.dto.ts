export class RetornaAlunoDTO {
    matricula: number;
    nome: string;
    cpf: string;
    email:string;
    telefone:string;
    diaVencimento: number;
    ativo: boolean;

    constructor(
        matricula: number, nome: string, 
        cpf: string, email:string,
        telefone:string, diaVencimento: number,
        ativo: boolean
    ) {
        this.matricula = matricula;
        this.nome = nome;
        this.cpf = cpf
        this.email = email
        this.telefone = telefone
        this.diaVencimento = diaVencimento;
        this.ativo = ativo
    }

}