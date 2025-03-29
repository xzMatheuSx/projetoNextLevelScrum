import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({ async: false })
export class IsTelefoneConstraint implements ValidatorConstraintInterface {
    validate(telefone: string) {
        if (!telefone) return false;

        // Expressão regular para validar telefones nos formatos (99) 99999-9999 ou (99) 9999-9999
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

        return telefoneRegex.test(telefone);
    }

    defaultMessage() {
        return 'Número de telefone inválido! Use o formato (99) 99999-9999 ou (99) 9999-9999.';
    }
}

// Decorator personalizado para validação de telefone
export function IsTelefone(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsTelefoneConstraint,
        });
    };
}