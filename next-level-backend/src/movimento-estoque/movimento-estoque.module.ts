import { MovimentoEstoque } from './entities/movimento-estoque.entity';
import { Module } from '@nestjs/common';
import { MovimentoEstoqueService } from './movimento-estoque.service';
import { MovimentoEstoqueController } from './movimento-estoque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Produto } from 'src/produto/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimentoEstoque, Usuario, Produto])], 
  controllers: [MovimentoEstoqueController],
  providers: [MovimentoEstoqueService],
})
export class MovimentoEstoqueModule {}
