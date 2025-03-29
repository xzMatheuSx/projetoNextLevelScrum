import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipamentoTipoDto } from './create-equipamento-tipo.dto';

export class UpdateEquipamentoTipoDto extends PartialType(CreateEquipamentoTipoDto) {}
