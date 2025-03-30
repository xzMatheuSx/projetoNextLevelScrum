export class ListaAlunoDTO {
    matricula: number;
    nome: string;
    diaVencimento: number;
    ativo: boolean;

    constructor(
        matricula: number, nome: string, 
        diaVencimento: number, ativo: boolean
    ) {
        this.matricula = matricula;
        this.nome = nome;
        this.diaVencimento = diaVencimento;
        this.ativo = ativo
    }
}