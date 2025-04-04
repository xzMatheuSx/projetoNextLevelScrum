import { PartialType } from '@nestjs/swagger';
import { CreateMensalidadeDto } from './create-mensalidade.dto';

export class UpdateMensalidadeDto extends PartialType(CreateMensalidadeDto) {}
