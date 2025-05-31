"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Modulo = {
  id: number;
  titulo: string;
  descricao: string;
  dificuldade: string;
};

const editarModuloSchema = z.object({
  id: z.number().int().positive(),
  titulo: z.string().min(3, "O título deve ter ao menos 3 caracteres."),
  descricao: z.string().min(1, "Informe a descrição do módulo."),
  dificuldade: z
    .number({ invalid_type_error: "Dificuldade inválida." })
    .int("Dificuldade deve ser um inteiro.")
    .min(0, "Dificuldade mínima = 0")
    .max(3, "Dificuldade máxima = 3"),
});
type EditarModuloForm = z.infer<typeof editarModuloSchema>;

const BACKEND_URL = "http://localhost:5017";

export default function AdminModulosPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<EditarModuloForm>({
    resolver: zodResolver(editarModuloSchema),
    defaultValues: { id: 0, titulo: "", descricao: "", dificuldade: 0 },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchModulos = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/modulo`);
      if (res.status === 404) {
        // Se back retornar 404, tratar como lista vazia
        setModulos([]);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error(`Erro ${res.status}: falha ao obter módulos.`);
      }

      const data: Array<{
        id: number;
        titulo: string;
        descricao: string;
        dificuldade: string;
      }> = await res.json();

      setModulos(
        data.map((m) => ({
          id: m.id,
          titulo: m.titulo,
          descricao: m.descricao,
          dificuldade: m.dificuldade,
        }))
      );
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar módulos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  const startEdit = (modulo: Modulo) => {
    setEditingId(modulo.id);

    let difNum = 0;
    if (modulo.dificuldade.toLowerCase().includes("fac")) {
      difNum = 1;
    } else if (modulo.dificuldade.toLowerCase().includes("mé") || modulo.dificuldade.toLowerCase().includes("med")) {
      difNum = 2;
    } else if (modulo.dificuldade.toLowerCase().includes("dif")) {
      difNum = 3;
    } else {
      difNum = 0;
    }

    reset({
      id: modulo.id,
      titulo: modulo.titulo,
      descricao: modulo.descricao,
      dificuldade: difNum,
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset({ id: 0, titulo: "", descricao: "", dificuldade: 0 });
  };

  const onSubmit = async (data: EditarModuloForm) => {
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/modulo/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Titulo: data.titulo,
          Descricao: data.descricao,
          Dificuldade: data.dificuldade,
        }),
      });

      if (!res.ok) {
        const texto = await res.text();
        throw new Error(`Erro ${res.status}: ${texto || "não foi possível atualizar."}`);
      }

      await fetchModulos();

      setEditingId(null);
      reset({ id: 0, titulo: "", descricao: "", dificuldade: 0 });
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar módulo.");
    }
  };

  const deleteModulo = async (id: number) => {
    setError(null);
    if (!confirm("Deseja realmente excluir este módulo?")) return;

    try {
      const res = await fetch(`${BACKEND_URL}/modulo/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const texto = await res.text();
        throw new Error(`Erro ${res.status}: ${texto || "não foi possível excluir."}`);
      }
      setModulos((prev) => prev.filter((m) => m.id !== id));
      if (editingId === id) cancelEdit();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir módulo.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Carregando módulos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4">
        <p className="text-xl font-semibold text-red-700 mb-4">Erro:</p>
        <p className="text-red-600 mb-6">{error}</p>
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
      {/* Cabeçalho com botão “Voltar ao Dashboard” */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Módulos</h1>
        <Link
          href="/Pages/AdminDashboard"
          className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Voltar ao Dashboard
        </Link>
      </div>

      {/* Tabela de módulos */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        {modulos.length === 0 ? (
          <p className="text-gray-600">Não há módulos cadastrados.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Título</th>
                <th className="border px-4 py-2 text-left">Descrição</th>
                <th className="border px-4 py-2 text-left">Dificuldade</th>
                <th className="border px-4 py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {modulos.map((modulo) =>
                editingId === modulo.id ? (
                  <tr key={modulo.id} className="bg-yellow-50">
                    <td className="border px-4 py-2">{modulo.id}</td>

                    {/* Título editável */}
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        {...register("titulo")}
                        className="w-full border rounded px-2 py-1"
                        disabled={isSubmitting}
                      />
                      {formErrors.titulo && (
                        <p className="text-sm text-red-600">{formErrors.titulo.message}</p>
                      )}
                    </td>

                    {/* Descrição editável */}
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        {...register("descricao")}
                        className="w-full border rounded px-2 py-1"
                        disabled={isSubmitting}
                      />
                      {formErrors.descricao && (
                        <p className="text-sm text-red-600">{formErrors.descricao.message}</p>
                      )}
                    </td>

                    {/* Dificuldade editável (SELECT de números) */}
                    <td className="border px-4 py-2">
                      <select
                        {...register("dificuldade", { valueAsNumber: true })}
                        className="w-full border rounded px-2 py-1"
                        disabled={isSubmitting}
                      >
                        <option value={0}>Desconhecido</option>
                        <option value={1}>Fácil</option>
                        <option value={2}>Médio</option>
                        <option value={3}>Difícil</option>
                      </select>
                      {formErrors.dificuldade && (
                        <p className="text-sm text-red-600">{formErrors.dificuldade.message}</p>
                      )}
                    </td>

                    {/* Botões “Salvar” / “Cancelar” */}
                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        {isSubmitting ? "Salvando..." : "Salvar"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={isSubmitting}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={modulo.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{modulo.id}</td>
                    <td className="border px-4 py-2">{modulo.titulo}</td>
                    <td className="border px-4 py-2">{modulo.descricao}</td>

                    {/* Aqui exibe 'modulo.dificuldade' */}
                    <td className="border px-4 py-2">{modulo.dificuldade}</td>

                    <td className="border px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => startEdit(modulo)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteModulo(modulo.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
