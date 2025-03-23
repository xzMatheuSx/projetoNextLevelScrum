import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipamentosManutencaoDto } from './create-equipamentos-manutencao.dto';

export class UpdateEquipamentosManutencaoDto extends PartialType(CreateEquipamentosManutencaoDto) {}
