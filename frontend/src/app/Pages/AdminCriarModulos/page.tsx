"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createModuloSchema = z.object({
  Titulo: z.string().min(1, "Informe o título do módulo."),
  Descricao: z.string().min(1, "Informe a descrição do módulo."),
  Dificuldade: z.nativeEnum(
    { 
      Desconhecido: 0, 
      Facil: 1, 
      Medio: 2, 
      Dificil: 3 
    },
    {
      errorMap: () => ({ message: "Selecione uma dificuldade válida." }),
    }
  ),
});
type CreateModuloDto = z.infer<typeof createModuloSchema>;

const BACKEND_URL = "http://localhost:5017";

export default function CreateModuloPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<CreateModuloDto>({
    resolver: zodResolver(createModuloSchema),
    defaultValues: {
      Titulo: "",
      Descricao: "",
      Dificuldade: 0,
    },
  });

  const onSubmit = async (data: CreateModuloDto) => {
    setSubmitError(null);
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/modulo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Titulo: data.Titulo,
          Descricao: data.Descricao,
          Dificuldade: data.Dificuldade,
        }),
      });

      if (!response.ok) {
        const texto = await response.text();
        throw new Error(`Erro ${response.status}: ${texto || "não foi possível criar módulo."}`);
      }

      router.push("/Pages/AdminModulos");
    } catch (err: any) {
      setSubmitError(err.message || "Erro ao criar módulo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Cabeçalho com título e “Voltar à Lista” */}

      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <Link
          href="/Pages/AdminDashboard"
          className="text-sm bg-purple text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Voltar ao Dashboard
        </Link>
        <Link
          href="/Pages/AdminModulos"
          className="text-sm bg-purple text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Voltar à Lista
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h1 className="text-4xl text-purple font-bold text-gray-800">Criar Novo Módulo</h1>
      </div>

      <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
        {/* Se houver erro ao submeter, mostra aqui */}
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
              disabled={isSubmitting || loading}
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
              rows={4}
              disabled={isSubmitting || loading}
            />
            {formErrors.Descricao && (
              <p className="text-sm text-red-600 mt-1">{formErrors.Descricao.message}</p>
            )}
          </div>

          {/* Campo: Dificuldade (select) */}
          <div className="mb-6">
            <label htmlFor="Dificuldade" className="text-purple-700 block font-medium mb-1">
              Nível de Dificuldade
            </label>
            <select
              id="Dificuldade" 
              {...register("Dificuldade", { valueAsNumber: true })}
              className={`text-purple-700 w-full border rounded px-3 py-2 focus:outline-none ${
                formErrors.Dificuldade ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isSubmitting || loading}
            >
              {/*enum no backend*/}
              <option value={0} className="text-purple-700">Desconhecido</option>
              <option value={1} className="text-purple-700">Fácil</option>
              <option value={2} className="text-purple-700">Médio</option>
              <option value={3} className="text-purple-700">Difícil</option>
            </select>
            {formErrors.Dificuldade && (
              <p className="text-sm text-red-600 mt-1">{formErrors.Dificuldade.message}</p>
            )}
          </div>

          {/* Botão “Criar Módulo” */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-800 disabled:opacity-50"
          >
            {isSubmitting || loading ? "Criando..." : "Criar Módulo"}
          </button>
        </form>
      </div>
    </div>
  );
}
