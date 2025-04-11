import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MensalidadeService } from "./mensalidade.service";

@Injectable()
export class CadastroMensalidades {

    constructor(private readonly mensalidadeService: MensalidadeService) {}

  private readonly logger = new Logger(CadastroMensalidades.name);

  @Cron('59 23 * * 0')
  handleCron() {
    this.mensalidadeService.gerarMensalidades()
  }
}