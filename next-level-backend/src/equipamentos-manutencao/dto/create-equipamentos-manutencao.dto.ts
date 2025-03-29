import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateEquipamentosManutencaoDto {
    @IsNotEmpty()
    @IsNumber()
    equipamentoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    usuarioAlt: number;
  
    @IsNotEmpty()
    @IsString()
    data: string;
  
    @IsString()
    observacao?: string;
  }