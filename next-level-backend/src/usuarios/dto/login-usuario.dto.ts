export class LoginUsuarioDTO {
    usuario: string;
    senha: string;

    constructor(usuario: string, senha: string) {
        this.usuario = usuario;
        this.senha = senha;
    }
}