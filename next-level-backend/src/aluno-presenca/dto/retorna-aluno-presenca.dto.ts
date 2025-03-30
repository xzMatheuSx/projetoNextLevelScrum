export class RetonaAlunoPresencaDTO {
    id!: number;
    momento: Date
    alunoMatricula!: number
    alunoNome!: string
    usuarioAltNome!: string

    constructor(
        id: number, momento: Date, 
        alunoMatricula: number, alunoNome: string,
        usuarioAltNome: string
    ) {
        this.id = id;
        this.momento = momento;
        this.alunoMatricula = alunoMatricula;
        this.alunoNome = alunoNome
        this.usuarioAltNome = usuarioAltNome
    }
}