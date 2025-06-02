"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

enum NivelDificuldade {
  Desconhecido = 0,
  Facil = 1,
  Medio = 2,
  Dificil = 3,
}

const createDesafioSchema = z.object({
  Titulo: z.string().min(3, "O título deve ter ao menos 3 caracteres."),
  Descricao: z.string().min(1, "Informe a descrição do desafio."),
  NivelDificuldade: z.enum([
    NivelDificuldade[0].toString(),
    NivelDificuldade[1].toString(),
    NivelDificuldade[2].toString(),
    NivelDificuldade[3].toString(),
  ]).transform((val) => Number(val) as NivelDificuldade),
  DataEntrega: z
    .string({ invalid_type_error: "Informe uma data de entrega válida." })
    .refine((d) => !Number.isNaN(Date.parse(d)), "Data de entrega inválida."),
  PontuacaoMaxima: z
    .number({ invalid_type_error: "Pontuação deve ser um número." })
    .int("Pontuação deve ser um número inteiro.")
    .min(1, "A pontuação mínima é 1.")
    .max(1000, "A pontuação máxima permitida é 1000."),
  ModuloId: z
    .number({ invalid_type_error: "Selecione um módulo." })
    .int("Módulo inválido.")
    .positive("Selecione um módulo válido."),
});
type CreateDesafioDto = z.infer<typeof createDesafioSchema>;

type ModuloOption = {
  id: number;
  titulo: string;
};

const BACKEND_URL = "http://localhost:5017";

export default function CreateDesafioPage() {
  const router = useRouter();

  const [modulos, setModulos] = useState<ModuloOption[]>([]);
  const [loadingModulos, setLoadingModulos] = useState(true);
  const [modulosError, setModulosError] = useState<string | null>(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<CreateDesafioDto>({
    resolver: zodResolver(createDesafioSchema),
    defaultValues: {
      Titulo: "",
      Descricao: "",
      NivelDificuldade: NivelDificuldade.Facil,
      DataEntrega: new Date().toISOString().substr(0, 10),
      PontuacaoMaxima: 100,
      ModuloId: 0,
    },
  });

  const fetchModulos = async () => {
    setLoadingModulos(true);
    setModulosError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/modulo`);
      if (res.status === 404) {
        setModulos([]);
        setLoadingModulos(false);
        return;
      }
      if (!res.ok) {
        throw new Error(`Erro ${res.status}: não foi possível obter módulos.`);
      }
      const data: Array<{ id: number; titulo: string }> = await res.json();
      setModulos(data.map((m) => ({ id: m.id, titulo: m.titulo })));
      setLoadingModulos(false);
    } catch (err: any) {
      setModulosError(err.message || "Erro ao carregar módulos.");
      setLoadingModulos(false);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  const onSubmit = async (data: CreateDesafioDto) => {
    setSubmitError(null);
    setLoadingSubmit(true);

    try {
      const payload = {
        Titulo: data.Titulo,
        Descricao: data.Descricao,
        NivelDificuldade: data.NivelDificuldade,
        DataEntrega: data.DataEntrega,
        PontuacaoMaxima: data.PontuacaoMaxima,
        // UsuarioId: data.UsuarioId
        ModuloId: data.ModuloId,
      };

      const response = await fetch(`${BACKEND_URL}/desafio/criar-desafio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const texto = await response.text();
        throw new Error(
          `Erro ${response.status}: ${texto || "não foi possível criar desafio."}`
        );
      }

      router.push("/Pages/AdminDesafios");
    } catch (err: any) {
      setSubmitError(err.message || "Erro ao criar desafio.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingModulos) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Carregando módulos para o dropdown...</p>
      </div>
    );
  }

  if (modulosError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4">
        <p className="text-xl font-semibold text-red-700 mb-4">
          Erro ao carregar módulos:
        </p>
        <p className="text-red-600 mb-6">{modulosError}</p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => fetchModulos()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Cabeçalho com “Voltar ao Dashboard” e “Voltar à Lista de Desafios” */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <Link
          href="/Pages/AdminDashboard"
          className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Voltar ao Dashboard
        </Link>
        <Link
          href="/Pages/AdminDesafios"
          className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Voltar à Lista de Desafios
        </Link>
      </div>

      {/* Título da página */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h1 className="text-4xl text-purple-700 font-bold text-gray-800">Criar Novo Desafio</h1>
      </div>

      {/* Formulário */}
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
        {submitError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo: Título */}
          <div className="mb-4">
            <label htmlFor="Titulo" className="text-purple-700 block font-medium mb-1">
              Título
            </label>
            <input
              type="text"
              id="Titulo"
              {...register("Titulo")}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.Titulo ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting || loadingSubmit}
            />
            {formErrors.Titulo && (
              <p className="text-sm text-red-600 mt-1">{formErrors.Titulo.message}</p>
            )}
          </div>

          {/* Campo: Descrição */}
          <div className="mb-4">
            <label htmlFor="Descricao" className="text-purple-700 block font-medium mb-1">
              Descrição
            </label>
            <textarea
              id="Descricao"
              {...register("Descricao")}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.Descricao ? "border-red-500" : "border-gray-300"
              }`}
              rows={3}
              disabled={isSubmitting || loadingSubmit}
            />
            {formErrors.Descricao && (
              <p className="text-sm text-red-600 mt-1">{formErrors.Descricao.message}</p>
            )}
          </div>

          {/* Campo: Dificuldade */}
          <div className="mb-4">
            <label htmlFor="NivelDificuldade" className="text-purple-700 block font-medium mb-1">
              Nível de Dificuldade
            </label>
            <select
              id="NivelDificuldade"
              {...register("NivelDificuldade", { valueAsNumber: true })}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.NivelDificuldade ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting || loadingSubmit}
            >
              <option value={NivelDificuldade.Desconhecido}>Desconhecido</option>
              <option value={NivelDificuldade.Facil}>Fácil</option>
              <option value={NivelDificuldade.Medio}>Médio</option>
              <option value={NivelDificuldade.Dificil}>Difícil</option>
            </select>
            {formErrors.NivelDificuldade && (
              <p className="text-sm text-red-600 mt-1">{formErrors.NivelDificuldade.message}</p>
            )}
          </div>

          {/* Campo: DataEntrega */}
          <div className="mb-4">
            <label htmlFor="DataEntrega" className="text-purple-700 block font-medium mb-1">
              Data de Entrega
            </label>
            <input
              type="date"
              id="DataEntrega"
              {...register("DataEntrega")}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.DataEntrega ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting || loadingSubmit}
            />
            {formErrors.DataEntrega && (
              <p className="text-sm text-red-600 mt-1">{formErrors.DataEntrega.message}</p>
            )}
          </div>

          {/* Campo: Pontuação*/}
          <div className="mb-4">
            <label htmlFor="PontuacaoMaxima" className="text-purple-700 block font-medium mb-1">
              Pontuação Máxima
            </label>
            <input
              type="number"
              id="PontuacaoMaxima"
              {...register("PontuacaoMaxima", { valueAsNumber: true })}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.PontuacaoMaxima ? "border-red-500" : "border-gray-300"
              }`}
              min={1}
              max={1000}
              disabled={isSubmitting || loadingSubmit}
            />
            {formErrors.PontuacaoMaxima && (
              <p className="text-sm text-red-600 mt-1">{formErrors.PontuacaoMaxima.message}</p>
            )}
          </div>

          {/* Campo: MóduloId*/}
          <div className="mb-6">
            <label htmlFor="ModuloId" className="text-purple-700 block font-medium mb-1">
              Selecionar Módulo
            </label>
            <select
              id="ModuloId"
              {...register("ModuloId", { valueAsNumber: true })}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.ModuloId ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting || loadingSubmit}
            >
              <option value={0}>-- Selecione --</option>
              {modulos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.titulo}
                </option>
              ))}
            </select>
            {formErrors.ModuloId && (
              <p className="text-sm text-red-600 mt-1">{formErrors.ModuloId.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loadingSubmit}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 disabled:opacity-50"
          >
            {isSubmitting || loadingSubmit ? "Criando..." : "Criar Desafio"}
          </button>
        </form>
      </div>
    </div>
  );
}
