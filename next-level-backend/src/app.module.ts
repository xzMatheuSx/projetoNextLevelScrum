import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { EquipamentoTipoModule } from './equipamento-tipo/equipamento-tipo.module';
import { EquipamentosManutencaoModule } from './equipamentos-manutencao/equipamentos-manutencao.module';
import { AlunoPresencaModule } from './aluno-presenca/aluno-presenca.module';
import { PagamentoAlunoModule } from './pagamento-aluno/pagamento-aluno.module';
import { PlanoAlunoModule } from './plano-aluno/plano-aluno.module';
import { PlanoModule } from './plano/plano.module';
import { ProdutoTipoModule } from './produto-tipo/produto-tipo.module';
import { ProdutoModule } from './produto/produto.module';
import { MovimentoEstoqueModule } from './movimento-estoque/movimento-estoque.module';
import { VendaModule } from './venda/venda.module';
import { VendaProdutoModule } from './venda-produto/venda-produto.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Plano } from './plano/entities/plano.entity';
import { Aluno } from './alunos/entities/aluno.entity';
import { PlanoAluno } from './plano-aluno/entities/plano-aluno.entity';
import { PagamentoAluno } from './pagamento-aluno/entities/pagamento-aluno.entity';
import { ProdutoTipo } from './produto-tipo/entities/produto-tipo.entity';
import { Produto } from './produto/entities/produto.entity';
import { AlunoPresenca } from './aluno-presenca/entities/aluno-presenca.entity';
import { EquipamentoTipo } from './equipamento-tipo/entities/equipamento-tipo.entity';
import { Equipamento } from './equipamentos/entities/equipamento.entity';
import { EquipamentosManutencao } from './equipamentos-manutencao/entities/equipamentos-manutencao.entity';
import { MovimentoEstoque } from './movimento-estoque/entities/movimento-estoque.entity';
import { Venda } from './venda/entities/venda.entity';
import { VendaProduto } from './venda-produto/entities/venda-produto.entity';


@Module({
  imports: 
  [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'next-level',
      entities: [
        Usuario, Plano, Aluno, PlanoAluno,
        PagamentoAluno, ProdutoTipo, Produto,
        AlunoPresenca, EquipamentoTipo, Equipamento,
        EquipamentosManutencao, MovimentoEstoque,
        Venda, VendaProduto
      ],
      synchronize: true,
    }),
    AlunosModule, UsuariosModule, ProdutoModule, EquipamentosModule, EquipamentoTipoModule, 
    EquipamentosManutencaoModule, AlunoPresencaModule,
    PagamentoAlunoModule, PlanoAlunoModule, PlanoModule, 
    ProdutoTipoModule, ProdutoModule, MovimentoEstoqueModule, 
    VendaModule, VendaProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}