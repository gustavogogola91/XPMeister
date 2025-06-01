"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createAulaSchema = z.object({
  Nome: z.string().min(1, "Informe o nome da aula."),
  Descricao: z.string().min(1, "Informe a descrição da aula."),
  LinkVideo: z.string().url("Informe uma URL de vídeo válida."),
  LinkArquivo: z.string().url("Informe uma URL de arquivo válida."),
  NumeroSequencia: z
    .number({ invalid_type_error: "Informe um número de sequência válido." })
    .int("O número de sequência deve ser inteiro.")
    .positive("O número de sequência deve ser maior que zero."),
  ModuloId: z
    .number({ invalid_type_error: "Selecione um módulo." })
    .int()
    .positive("Selecione um módulo válido."),
});
type CreateAulaDto = z.infer<typeof createAulaSchema>;

type ModuloOption = {
  id: number;
  titulo: string;
};

const BACKEND_URL = "http://localhost:5017";

export default function CreateAulaPage() {
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
  } = useForm<CreateAulaDto>({
    resolver: zodResolver(createAulaSchema),
    defaultValues: {
      Nome: "",
      Descricao: "",
      LinkVideo: "",
      LinkArquivo: "",
      NumeroSequencia: 1,
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

  const onSubmit = async (data: CreateAulaDto) => {
    setSubmitError(null);
    setLoadingSubmit(true);

    try {
      const response = await fetch(`${BACKEND_URL}/aula`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nome: data.Nome,
          Descricao: data.Descricao,
          LinkVideo: data.LinkVideo,
          LinkArquivo: data.LinkArquivo,
          NumeroSequencia: data.NumeroSequencia,
          ModuloId: data.ModuloId,
        }),
      });

      if (!response.ok) {
        const texto = await response.text();
        throw new Error(`Erro ${response.status}: ${texto || "não foi possível criar aula."}`);
      }

      router.push("/Pages/AdminAulas");
    } catch (err: any) {
      setSubmitError(err.message || "Erro ao criar aula.");
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
        <p className="text-xl font-semibold text-red-700 mb-4">Erro ao carregar módulos:</p>
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
      {/* Cabeçalho com título e botão “Voltar à Lista de Aulas” */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <Link
          href="/Pages/AdminDashboard"
          className="text-sm bg-purple text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Voltar ao Dashboard
        </Link>
        <Link
          href="/Pages/AdminAulas"
          className="text-sm bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Voltar à Lista de Aulas
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h1 className="text-4xl text-purple font-bold text-gray-800">Criar Nova Aula</h1>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
        {/* Se houver erro ao submeter, exibe aqui */}
        {submitError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo: Nome */}
          <div className="mb-4">
            <label htmlFor="Nome" className="text-purple-700 block font-medium mb-1">
              Nome
            </label>
            <input
              type="text"
              id="Nome"
              {...register("Nome")}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.Nome ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting || loadingSubmit}
            />
            {formErrors.Nome && (
              <p className="text-sm text-red-600 mt-1">{formErrors.Nome.message}</p>
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

          {/* Campo: LinkVideo */}
          <div className="mb-4">
            <label htmlFor="LinkVideo" className="text-purple-700 block font-medium mb-1">
              Link do Vídeo
            </label>
            <input
              type="url"
              id="LinkVideo"
              {...register("LinkVideo")}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.LinkVideo ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="https://..."
              disabled={isSubmitting || loadingSubmit}
            />
            {formErrors.LinkVideo && (
              <p className="text-sm text-red-600 mt-1">{formErrors.LinkVideo.message}</p>
            )}
          </div>

          {/* Campo: LinkArquivo */}
          <div className="mb-4">
            <label htmlFor="LinkArquivo" className="text-purple-700 block font-medium mb-1">
              Link do Arquivo
            </label>
            <input
              type="url"
              id="LinkArquivo"
              {...register("LinkArquivo")}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.LinkArquivo ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="https://..."
              disabled={isSubmitting || loadingSubmit}
            />
            {formErrors.LinkArquivo && (
              <p className="text-sm text-red-600 mt-1">{formErrors.LinkArquivo.message}</p>
            )}
          </div>

          {/* Campo: NumeroSequencia */}
          <div className="mb-4">
            <label htmlFor="NumeroSequencia" className="text-purple-700 block font-medium mb-1">
              Número de Sequência
            </label>
            <input
              type="number"
              id="NumeroSequencia"
              {...register("NumeroSequencia", { valueAsNumber: true })}
              className={`text-purple-700 w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.NumeroSequencia ? "border-red-500" : "border-gray-300"
              }`}
              min={1}
              disabled={isSubmitting || loadingSubmit}
            />
            {formErrors.NumeroSequencia && (
              <p className="text-sm text-red-600 mt-1">{formErrors.NumeroSequencia.message}</p>
            )}
          </div>

          {/* Campo: ModuloId (dropdown) */}
          <div className="mb-6">
            <label htmlFor="ModuloId" className="text-purple-700 block font-medium mb-1">
              Selecionar Módulo
            </label>
            <select
              id="ModuloId"
              {...register("ModuloId", { valueAsNumber: true })}
              className={`text-purple-700 w-full border rounded px-3 py-2 focus:outline-none ${
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

          {/* Botão “Criar Aula” */}
          <button
            type="submit"
            disabled={isSubmitting || loadingSubmit}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 disabled:opacity-50"
          >
            {isSubmitting || loadingSubmit ? "Criando..." : "Criar Aula"}
          </button>
        </form>
      </div>
    </div>
  );
}
