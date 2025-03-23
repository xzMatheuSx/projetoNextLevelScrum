import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoTipoDto } from './create-produto-tipo.dto';

export class UpdateProdutoTipoDto extends PartialType(CreateProdutoTipoDto) {}
