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

@Injectable()
export class AlunosService {
    constructor(
        @InjectRepository(Aluno)
        private alunosRepository: Repository<Aluno>,
    ) {}

    async create(createAlunoDto: CreateAlunoDto) {
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

        const aluno = this.alunosRepository.create(createAlunoDto);

        aluno.ativo = true 

        const aux = await this.alunosRepository.save(aluno);

        return 'O aluno foi cadastrado com sucesso!';
    }

    async findAll(): Promise<Aluno[]> {
        return await this.alunosRepository.find();
    }

    async findOne(matricula: number): Promise<Aluno> {
        const aluno = await this.alunosRepository.findOne({
            where: { matricula },
        });
        if (!aluno) {
            throw new NotFoundException(
                `Aluno com matrícula ${matricula} não encontrado`,
            );
        }
        return aluno;
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
        
            Object.assign(aluno, updateAlunoDto);

            this.alunosRepository.save(aluno);

            return 'Os dados do aluno foram autualizado com sucesso!';
        } catch (error) {
            throw error
        }
    }
}
