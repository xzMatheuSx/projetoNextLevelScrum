import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoPresencaDto } from './create-aluno-presenca.dto';

export class UpdateAlunoPresencaDto extends PartialType(CreateAlunoPresencaDto) {}
