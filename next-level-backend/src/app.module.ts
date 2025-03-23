import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { EquipamentoModule } from './equipamento/equipamento.module';
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

@Module({
  imports: [AlunosModule, UsuariosModule, ProdutosModule, EquipamentosModule, EquipamentoModule, EquipamentoTipoModule, EquipamentosManutencaoModule, AlunoPresencaModule, PagamentoAlunoModule, PlanoAlunoModule, PlanoModule, ProdutoTipoModule, ProdutoModule, MovimentoEstoqueModule, VendaModule, VendaProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
