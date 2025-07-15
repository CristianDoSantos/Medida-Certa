import type { Resultado } from "../types/caminhao";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ResultadoAvaliacao({ resultado }: { resultado: Resultado }) {
  return (
    <Card className={resultado.aprovado ? "bg-green-100" : "bg-red-100"}>
      <CardHeader>
        <CardTitle>Resultado: {resultado.aprovado ? "Aprovado ✅" : "Reprovado ❌"}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {resultado.observacoes.map((obs, idx) => (
            <li key={idx} className="text-sm text-gray-800">• {obs}</li>
          ))}
        </ul>
        Limite de balanço traseiro: <strong>{resultado.calculoLimite}mm</strong>        
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}