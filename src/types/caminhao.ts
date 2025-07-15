import type { CaminhaoSchema } from "@/schemas/caminhao";

export interface Caminhao extends CaminhaoSchema {
  id?: string
  resultado: Resultado
}
export interface Resultado {
  aprovado: boolean;
  balancoDianteiro: number;
  calculoLimite: number;
  faixasLateral: number;
  faixasTraseira: number;
  observacoes: string[];
}
