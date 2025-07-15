import localforage from "localforage"

export interface Configuracoes {
  limiteBalancoTraseiro: number         // mm
  proporcaoFaixaLateral: number         // ex: 0.33
  proporcaoFaixaTraseira: number        // ex: 0.8
  proporcaoLimiteBalancoPorEntreEixos: number // ex: 0.6
  limiteBalancoMaximo: number           // ex: 3500
}

const STORAGE_KEY = "configuracoes"

const padrao: Configuracoes = {
  limiteBalancoTraseiro: 3500,
  proporcaoFaixaLateral: 0.33,
  proporcaoFaixaTraseira: 0.8,
  proporcaoLimiteBalancoPorEntreEixos: 0.6,
  limiteBalancoMaximo: 3500,
}

export async function getConfiguracoes(): Promise<Configuracoes> {
  const config = await localforage.getItem<Configuracoes>(STORAGE_KEY)
  return config || padrao
}

export async function salvarConfiguracoes(novas: Configuracoes): Promise<void> {
  await localforage.setItem(STORAGE_KEY, novas)
}

export function getConfiguracoesPadrao(): Configuracoes {
  return padrao
}
