import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoAlunoDto } from './create-plano-aluno.dto';

export class UpdatePlanoAlunoDto extends PartialType(CreatePlanoAlunoDto) {}
