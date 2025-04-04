import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, Timestamp } from 'typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { ListaAlunoDTO } from './dto/lista-aluno.dto';
import { RetornaAlunoDTO } from './dto/retorna-aluno.dto';

@Injectable()
export class AlunosService {
    constructor(
        @InjectRepository(Aluno)
        private alunosRepository: Repository<Aluno>,
    ) {}

    async create(createAlunoDto: CreateAlunoDto) {
        console.log(createAlunoDto)
        if (
            (
                await this.alunosRepository.find({
                    where: { cpf: createAlunoDto.cpf },
                })
            ).length > 0
        ) {
            throw new BadRequestException(
                'Atenção! Já existe um aluno com esse CPF',
            );
        }

        if (createAlunoDto.diaVencimento > 30) {
            throw new BadRequestException(
                'Atenção! O dia de vencimento não pode ser maior que dia 30!',
            );
        }

        if (createAlunoDto.dataNascimento == null) {
            throw new BadRequestException(
                'Atenção! É necessário informar a data de nascimento!',
            );
        }

        if (createAlunoDto.dataNascimento){
            if (this.calcularIdade(createAlunoDto.dataNascimento) < 12){
                throw new BadRequestException(
                    'Atenção! Crianças com menos de 12 anos não podem ser matriculadas!'
                )
            }
            if (this.calcularIdade(createAlunoDto.dataNascimento) < 18 
            && (createAlunoDto.responsavel == null || createAlunoDto.responsavel == "")){
                throw new BadRequestException(
                    'Atenção! Para menores de idade é obrigatorio informações do responsável!'
                )
            }
        }
        const aluno = this.alunosRepository.create({
            ...createAlunoDto,
            usuarioAlt: { id: createAlunoDto.usuarioAlt }  // transforma o ID num objeto do tipo Usuario
          });
          
          aluno.ativo = true;
          
          const aux = await this.alunosRepository.save(aluno);
          
          return 'O aluno foi cadastrado com sucesso!';
    }

    async findAll(): Promise<ListaAlunoDTO[]> {
        let alunos = await this.alunosRepository.find();

        return alunos.map((a: Aluno) => 
            new ListaAlunoDTO(
                a.matricula, a.nome, a.diaVencimento, a.ativo
            )
        )
    }

    async findOne(matricula: number): Promise<RetornaAlunoDTO> {
        const aluno = await this.alunosRepository.findOne({
            where: { matricula },
        });
        if (!aluno) {
            throw new NotFoundException(
                `Aluno com matrícula ${matricula} não encontrado`,
            );
        }
        return new RetornaAlunoDTO(
            aluno.matricula, aluno.nome,
            aluno.cpf, aluno.email, aluno.telefone, 
            aluno.diaVencimento, aluno.ativo
        );
    }

    async remove(matricula: number) {
        try {
            const aluno = await this.alunosRepository.findOne({
                where: { matricula },
            })

            if (!aluno){
                throw new InternalServerErrorException("Não foi possível encontrar o aluno informado!")
            }

            aluno!.ativo = false
            aluno!.dataDesativo = new Date()

            this.alunosRepository.save(aluno);

            return `O aluno foi desativado com sucesso!`;
        } catch (error) {
            console.error(`Erro ao remover aluno ${matricula}:`, error);
            throw new InternalServerErrorException('Falha ao remover aluno');
        }
    }
    
    async update(matricula: number, updateAlunoDto: UpdateAlunoDto) {
        try {
            const aluno = await this.alunosRepository.findOne({
                where: { matricula },
            });
            if (!aluno) {
                throw new NotFoundException(
                    `Aluno com ID ${matricula} não encontrado`,
                );
            }

            if (
                (
                    await this.alunosRepository.find({
                        where: { cpf: updateAlunoDto.cpf, matricula: Not(matricula) },
                    })
                ).length > 0
            ) {
                throw new BadRequestException(
                    'Atenção! Já existe um aluno com esse CPF',
                );
            }

            if (updateAlunoDto.diaVencimento){
                if (updateAlunoDto.diaVencimento > 30) {
                    throw new BadRequestException(
                        'Atenção! O dia de vencimento não pode ser maior que dia 30!',
                    );
                }
            }

            if (updateAlunoDto.dataNascimento){
                if (this.calcularIdade(updateAlunoDto.dataNascimento) < 12){
                    throw new BadRequestException(
                        'Atenção! Crianças com menos de 12 anos não podem ser matriculadas!'
                    )
                }
                if (this.calcularIdade(updateAlunoDto.dataNascimento) < 18 && (updateAlunoDto.responsavel == null || updateAlunoDto.responsavel == "")){
                    throw new BadRequestException(
                        'Atenção! Para menores de idade é obrigatorio informações do responsável!'
                    )
                }
            }
        
        
            Object.assign(aluno, updateAlunoDto);

            this.alunosRepository.save(aluno);

            return 'Os dados do aluno foram autualizado com sucesso!';
        } catch (error) {
            throw error
        }
    }

    calcularIdade(dataNascimento: Date, dataAtual = new Date()) {
        const nascimento = new Date(dataNascimento);
        const atual = new Date(dataAtual);
    
        let idade = atual.getFullYear() - nascimento.getFullYear();
        const mesAtual = atual.getMonth();
        const diaAtual = atual.getDate();
        const mesNascimento = nascimento.getMonth();
        const diaNascimento = nascimento.getDate();
    
        // Verifica se a pessoa já fez aniversário no ano atual
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }
    
        return idade;
    }
}
