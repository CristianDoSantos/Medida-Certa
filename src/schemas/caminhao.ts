import { z } from "zod"

export const caminhaoSchema = z.object({
  placa: z.string().optional(),
  cliente: z.string().optional(),
  comprimentoTotal: z.string().refine((val) => val.trim() !== "" && val !== "0", {
      message: "Informe um valor válido",
    }),
  entreEixos: z.string().refine((val) => val.trim() !== "" && val !== "0", {
      message: "Informe um valor válido",
    }),
  balancoTraseiro: z.string().refine((val) => val.trim() !== "" && val !== "0", {
      message: "Informe um valor válido",
    }),
  comprimentoCarroceria: z.string().refine((val) => val.trim() !== "" && val !== "0", {
      message: "Informe um valor válido",
    }),
  largura: z.string().refine((val) => val.trim() !== "" && val !== "0", {
      message: "Informe um valor válido",
    }),
})

export type CaminhaoSchema = z.infer<typeof caminhaoSchema>