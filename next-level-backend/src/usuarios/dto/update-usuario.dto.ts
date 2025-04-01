import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
    @ApiProperty({ description: 'Nome' })
  nome?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Usuario' })
  usuario?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'Email' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Senha' })
  senha?: string;
}