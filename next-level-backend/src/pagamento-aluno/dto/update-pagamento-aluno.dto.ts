import { PartialType } from '@nestjs/mapped-types';
import { CreatePagamentoAlunoDto } from './create-pagamento-aluno.dto';

export class UpdatePagamentoAlunoDto extends PartialType(CreatePagamentoAlunoDto) {}
