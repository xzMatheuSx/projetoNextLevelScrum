import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoTipo } from './entities/produto-tipo.entity';
import { CreateProdutoTipoDto } from './dto/create-produto-tipo.dto';
import { UpdateProdutoTipoDto } from './dto/update-produto-tipo.dto';
import { ListProdutoTipoDto } from './dto/list-produto-tipo.dto';
import { unidadeMedidaDesc } from './unidadeMedida/unidade-medida';
import { Produto } from 'src/produto/entities/produto.entity';
import { UnidadeMedida } from './unidadeMedida/unidade-medida.enum';
import { RetornaUnidadeMedida } from './unidadeMedida/retorna-unidade-medida.dto';
@Injectable()
export class ProdutoTipoService {

  constructor(
    @InjectRepository(ProdutoTipo)
    private produtoTipoRepository: Repository<ProdutoTipo>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>
  ) {}
  
  async create(createProdutoTipoDto: CreateProdutoTipoDto) {
    const produtoTipo = this.produtoTipoRepository.create(
        createProdutoTipoDto
    )
    
    const aux = await this.produtoTipoRepository.save(produtoTipo)

    return 'O tipo de produto foi cadastrado com sucesso!';
  }

  async findAll(): Promise<ListProdutoTipoDto[]> {
    let produtoTipos = await this.produtoTipoRepository.find();

    console.log(produtoTipos)
    return produtoTipos.map(it => 
        new ListProdutoTipoDto(it.id, it.descricao, it.vendaAGranel, unidadeMedidaDesc(it.unidadeMedida))
    );
  }

  async findOne(id: number) {
    const produtoTipo = await this.produtoTipoRepository.findOne({ where: { id } });
    
    if (!produtoTipo) {
      throw new NotFoundException(`Não foi possível encontrar o tipo de produto de id ${id}`);
    }

    return produtoTipo;
  }

  async update(id: number, updateProdutoTipoDto: UpdateProdutoTipoDto) {
    try{
        const produtoTipoEntity = await this.produtoTipoRepository.findOne({ where: { id } });
        
        if (!produtoTipoEntity) {
            throw new NotFoundException(`Não foi possível encontrar o tipo de produto de id ${id}`);
        }

        Object.assign(produtoTipoEntity, updateProdutoTipoDto);

        this.produtoTipoRepository.save(produtoTipoEntity);

        return ('Os dados do tipo de produto foram atualizados com sucesso')
        }catch(error){
        throw new InternalServerErrorException('Falha ao atualizar o tipo de produto')
        }
    }

  async remove(id: number) {
    try {
        if ((await this.produtoRepository.find( {where: { produtoTipo: { id: id } }} )).length > 0) {
            throw new NotFoundException(`Atenção! Já existem produtos configurados com esse tipo de produto! Não será possível excluir.`);
        }

        const result = await this.produtoTipoRepository.delete(id);
        
        if (result.affected === 0) {
          throw new NotFoundException(`Não foi possível encontrar o tipo de produto informado`);
        }
    
        return (`O tipo de produto foi excluido com sucesso!`)
      } catch (error) {
        throw new InternalServerErrorException('Ocorreu um erro ao excluir o tipo de produto!');
      }
    }


    retornaUnidadeMedidas() {
        let unidades: RetornaUnidadeMedida[] = [] 

        unidades.push(
            new RetornaUnidadeMedida(UnidadeMedida.GR, "GR")
        )

        unidades.push(
            new RetornaUnidadeMedida(UnidadeMedida.KG, "KG")
        )

        unidades.push(
            new RetornaUnidadeMedida(UnidadeMedida.LT, "LT")
        )

        unidades.push(
            new RetornaUnidadeMedida(UnidadeMedida.ML, "ML")
        )

        unidades.push(
            new RetornaUnidadeMedida(UnidadeMedida.UN, "UN")
        )

        return unidades
    }
}
