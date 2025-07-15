"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deletarCaminhao, listarCaminhoes } from "@/services/caminhao-storage";
import type { Caminhao } from "@/types/caminhao"
import localforage from "localforage";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "caminhaoSelecionado";

export default function Caminhoes() {
  const [caminhoes, setCaminhoes] = useState<Caminhao[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCaminhoes();
  }, [])

  async function loadCaminhoes() {
    const r = await listarCaminhoes();
    setCaminhoes(r)
  }

  async function deleteCaminhao(id: string) {
    await deletarCaminhao(id);
    loadCaminhoes();
  }

  async function selecionarCaminhao(c: Caminhao) {
    await localforage.setItem(STORAGE_KEY, c)
    navigate("/"); 
  }

  return (
    <>
      <div className="flex min-w-[600px] max-w-[1000px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Placa</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caminhoes.map((caminhao) => (
              <TableRow 
                key={caminhao.id}
                onClick={() => selecionarCaminhao(caminhao)}
                className="cursor-pointer"
                >
                <TableCell className="font-medium">{caminhao.placa}</TableCell>
                <TableCell>{caminhao.cliente}</TableCell>
                <TableCell>{caminhao.resultado.aprovado ? "APROVADO" : "REPROVADO"}</TableCell>
                <TableCell className="text-right">
                  <Trash 
                    onClick={(e) => {
                    e.stopPropagation();
                    deleteCaminhao(caminhao.id!);
                  }}
                    className="text-red-600 hover:text-red-800 cursor-pointer" 
                    size={16}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}