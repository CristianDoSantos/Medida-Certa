import type { CaminhaoSchema } from "@/schemas/caminhao";
import { getConfiguracoes } from "../services/configuracoes-storage";
import type { Resultado } from "../types/caminhao";

export async function avaliarCaminhao(c: CaminhaoSchema): Promise<Resultado> {
  const config = await getConfiguracoes();
  const limite = config.limiteBalancoMaximo;
  const calculoLimite = Math.min(Number(c.entreEixos) * config.proporcaoLimiteBalancoPorEntreEixos, limite);
  const balancoDianteiro = (Number(c.comprimentoTotal) - Number(c.entreEixos)) - Number(c.balancoTraseiro);
  const faixasLateral = Math.round((Number(c.comprimentoCarroceria) * config.proporcaoFaixaLateral) / 300);
  const faixasTraseira = Math.round((Number(c.largura) * config.proporcaoFaixaTraseira) / 300);

  const aprovado = Number(c.balancoTraseiro) <= calculoLimite;
  const observacoes: string[] = [];

  if (!aprovado) {
    observacoes.push(`Diminuir o balanço traseiro em ${Number(c.balancoTraseiro) - calculoLimite}mm.`);
  } else {
    observacoes.push(`Você pode aumentar o balanço traseiro em ${calculoLimite - Number(c.balancoTraseiro)}mm.`);
  }

  observacoes.push(`Balanço dianteiro: ${balancoDianteiro}mm`);
  observacoes.push(`Faixas laterais: ${faixasLateral}`);
  observacoes.push(`Faixas traseiras: ${faixasTraseira}`);

  return {
    aprovado,
    balancoDianteiro,
    calculoLimite,
    faixasLateral,
    faixasTraseira,
    observacoes
  };
}
