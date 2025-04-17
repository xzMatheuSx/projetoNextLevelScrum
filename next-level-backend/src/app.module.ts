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
import { Presenca } from './aluno-presenca/entities/aluno-presenca.entity';
import { EquipamentoTipo } from './equipamento-tipo/entities/equipamento-tipo.entity';
import { Equipamento } from './equipamentos/entities/equipamento.entity';
import { EquipamentosManutencao } from './equipamentos-manutencao/entities/equipamentos-manutencao.entity';
import { MovimentoEstoque } from './movimento-estoque/entities/movimento-estoque.entity';
import { Venda } from './venda/entities/venda.entity';
import { VendaProduto } from './venda-produto/entities/venda-produto.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Mensalidade } from './mensalidade/entities/mensalidade.entity';
import { MensalidadeModule } from './mensalidade/mensalidade.module';
import { ComprovantePagamento } from './mensalidade/entities/comprovante.entity';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: 
  [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: process.env.PGHOST,
      port: 5432,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      synchronize: true,
      autoLoadEntities: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },

      entities: [
        Usuario, Plano, Aluno, PlanoAluno,
        PagamentoAluno, ProdutoTipo, Produto,
        Presenca, EquipamentoTipo, Equipamento,Mensalidade,
        EquipamentosManutencao, MovimentoEstoque,
        Venda, VendaProduto,ComprovantePagamento
      ],
     
    }),
    AlunosModule, UsuariosModule, ProdutoModule, EquipamentosModule, EquipamentoTipoModule, 
    EquipamentosManutencaoModule, AlunoPresencaModule,
    PagamentoAlunoModule, PlanoAlunoModule, PlanoModule, 
    ProdutoTipoModule, ProdutoModule, MovimentoEstoqueModule, MensalidadeModule,
    VendaModule, VendaProdutoModule, AuthModule,
    ConfigModule.forRoot({
        isGlobal: true, 
      }),
      ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
