import { ApiProperty } from "@nestjs/swagger";

export class LoginUsuarioDTO {
    @ApiProperty({ description: 'Usuário' })
    usuario: string;
    @ApiProperty({ description: 'Senha' })
    senha: string;

    constructor(usuario: string, senha: string) {
        this.usuario = usuario;
        this.senha = senha;
    }
}