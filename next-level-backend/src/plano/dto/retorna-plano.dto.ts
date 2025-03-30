export class RetornaPlanoDTO {
    id: number;
    descricao: string;
    qtdDiasSemana: string;
    valor: number;

    constructor(
        id: number, descricao: string, 
        qtdDiasSemana: string, valor: number
    ) {
        this.id = id;
        this.descricao = descricao;
        this.qtdDiasSemana = qtdDiasSemana;
        this.valor = valor
    }
}