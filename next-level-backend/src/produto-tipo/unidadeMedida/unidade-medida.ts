import { UnidadeMedida } from "./unidade-medida.enum";

export function unidadeMedidaDesc(
    unidade: string
): string {

    switch (unidade) {
        case "GR":
           return "Gramas";
        case "KG":
            return "Kg";
        case "LT":
            return "Litros";
        case "ML":
            return "Ml";
        case "UN":
            return "Unitário"
    }

    return "Indefinido"
}