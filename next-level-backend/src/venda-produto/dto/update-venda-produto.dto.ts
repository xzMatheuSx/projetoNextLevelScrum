import { PartialType } from '@nestjs/mapped-types';
import { CreateVendaProdutoDto } from './create-venda-produto.dto';

export class UpdateVendaProdutoDto extends PartialType(CreateVendaProdutoDto) {}
