import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
    validate(cpf: string) {
        if (!cpf) return false;

        // Remove a máscara do CPF (deixa apenas números)
        const cleanCpf = cpf.replace(/\D/g, '');

        // CPF deve ter 11 dígitos numéricos
        if (cleanCpf.length !== 11) return false;

        // Verifica se todos os números são iguais (ex: 111.111.111-11)
        if (/^(\d)\1{10}$/.test(cleanCpf)) return false;

        // Função para calcular dígitos verificadores do CPF
        const calcDigit = (slice: number) => {
            const numbers = cleanCpf.slice(0, slice).split('').map(num => parseInt(num));
            let sum = numbers.reduce((acc, num, index) => acc + num * (slice + 1 - index), 0);
            const rest = sum % 11;
            return rest < 2 ? 0 : 11 - rest;
        };

        // Calcula os dois dígitos verificadores
        const digit1 = calcDigit(9);
        const digit2 = calcDigit(10);

        // Verifica se os dígitos calculados são iguais aos informados
        return digit1 === parseInt(cleanCpf[9]) && digit2 === parseInt(cleanCpf[10]);
    }

    defaultMessage() {
        return 'CPF inválido!';
    }
}

// Decorator personalizado para validação de CPF
export function IsCpf(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCpfConstraint,
        });
    };
}