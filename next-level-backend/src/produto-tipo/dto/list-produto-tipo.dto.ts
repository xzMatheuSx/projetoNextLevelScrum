export class ListProdutoTipoDto {

    constructor(
        public id: number,
        public descricao: string,
        public vendaAGranel: boolean,
        public unidadeMedida: string
    ) {}
}