"use client"

import type { Caminhao, Resultado } from "@/types/caminhao"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { avaliarCaminhao } from "@/utils/avaliador"
import { salvarCaminhao } from "@/services/caminhao-storage"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { CaminhaoSchema } from "@/schemas/caminhao"
import { caminhaoSchema } from "@/schemas/caminhao"
import { useForm } from "react-hook-form"
import { ResultadoAvaliacao } from "@/components/resultado-avaliacao"
import type z from "zod"
import localforage from "localforage"

const STORAGE_KEY = "caminhaoSelecionado";

export default function Home() {
  const [resultado, setResultado] = useState<Resultado | null>(null)

  const form = useForm<z.infer<typeof caminhaoSchema>>({
    resolver: zodResolver(caminhaoSchema),
    defaultValues: {
      cliente: "",
      placa: "",
      comprimentoTotal: "",
      entreEixos: "",
      balancoTraseiro: "",
      comprimentoCarroceria: "",
      largura: "",
    },
  })

  useEffect(() => {
    const fetchCaminhao = async () => {
      const caminhaoSelecionado = await localforage.getItem<Caminhao>(STORAGE_KEY)

      if (caminhaoSelecionado) {
        form.reset({
          cliente: caminhaoSelecionado.cliente,
          placa: caminhaoSelecionado.placa,
          comprimentoTotal: caminhaoSelecionado.comprimentoTotal,
          entreEixos: caminhaoSelecionado.entreEixos,
          balancoTraseiro: caminhaoSelecionado.balancoTraseiro,
          comprimentoCarroceria: caminhaoSelecionado.comprimentoCarroceria,
          largura: caminhaoSelecionado.largura,
        });
        await localforage.removeItem(STORAGE_KEY)
      }
    }
    fetchCaminhao()
  }, [form])

  async function onSubmit(values: CaminhaoSchema) {
    const r = await avaliarCaminhao(values)
    const caminhao: Caminhao = {
      ...values,
      resultado: r,
    }
    await salvarCaminhao(caminhao)
    setResultado(r)
  }

  function limparForm() {
    setResultado(null);
    form.reset({
      cliente: "",
      placa: "",
      comprimentoTotal: "",
      entreEixos: "",
      balancoTraseiro: "",
      comprimentoCarroceria: "",
      largura: "",
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full pr-6 md:w-auto md:pr-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
            <FormField
              control={form.control}
              name="cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe o nome do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe a placa" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="comprimentoTotal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comprimento Total</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Informe o comprimento total" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comprimentoCarroceria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comprimento Carroceria</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Informe o comprimento da carroceria" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="entreEixos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entre Eixos</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Informe o entre eixos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balancoTraseiro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balanço Traseiro</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Informe o balanço traseiro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="largura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Largura</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Informe largura" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button type="button" onClick={limparForm} className="w-[200px]" variant={"outline"}>Limpar</Button>
            <Button type="submit" className="w-[200px]">Calcular</Button>
          </div>
        </form>
      </Form>
      {resultado && (
        <div className="mt-6">
          <ResultadoAvaliacao resultado={resultado} />
        </div>
      )}
    </>
  )
}