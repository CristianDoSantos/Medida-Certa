import localforage from "localforage";
import type { Caminhao } from "../types/caminhao";

const STORAGE_KEY = "caminhoes";

export async function salvarCaminhao(c: Caminhao) {
  const existentes = await listarCaminhoes()

  if (!c.id) {
    c.id = crypto.randomUUID()
    existentes.push(c)
  } else {
    const index = existentes.findIndex((x) => x.id === c.id)
    if (index !== -1) {
      existentes[index] = c
    } else {
      existentes.push(c)
    }
  }

  await localforage.setItem(STORAGE_KEY, existentes)
}

export async function listarCaminhoes(): Promise<Caminhao[]> {
  return (await localforage.getItem<Caminhao[]>(STORAGE_KEY)) || [];
}

export async function deletarCaminhao(id: string) {
  const existentes = await listarCaminhoes()
  const atualizados = existentes.filter((c) => c.id !== id)
  await localforage.setItem(STORAGE_KEY, atualizados)
}