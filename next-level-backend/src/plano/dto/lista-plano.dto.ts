export class ListaPlanoDTO {
    id: number;
    descricao: string;
    qtdDiasSemana: string;
    valor: number;
    usuarioAltNome: string;

    constructor(
        id: number, descricao: string, 
        qtdDiasSemana: string, valor: number, usuarioAltNome: string
    ) {
        this.id = id;
        this.descricao = descricao;
        this.qtdDiasSemana = qtdDiasSemana;
        this.valor = valor
        this.usuarioAltNome = usuarioAltNome
    }
}