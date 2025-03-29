import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoTipo } from 'src/produto-tipo/entities/produto-tipo.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
     imports: [TypeOrmModule.forFeature([Produto, ProdutoTipo, Usuario])], 
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
