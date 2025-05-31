"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Modulo = {
  id: number;
  nome: string;
  ordem: number;
};

const moduloSchema = z.object({
  id: z.number().int().positive(),
  nome: z.string().min(3, "O nome deve ter ao menos 3 caracteres."),
  ordem: z
    .number({ invalid_type_error: "A ordem deve ser um número." })
    .int("A ordem deve ser um número inteiro.")
    .positive("A ordem deve ser maior que zero."),
});
type ModuloForm = z.infer<typeof moduloSchema>;

const BACKEND_URL = "http://localhost:5017";

export default function AdminModulosPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ModuloForm>({
    resolver: zodResolver(moduloSchema),
    defaultValues: { id: 0, nome: "", ordem: 1 },
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
      setModulos([]);
      setLoading(false);
      return;
    }
    if (!res.ok) {
      throw new Error(`Erro ${res.status}: falha ao obter módulos.`);
    }
    const data: Modulo[] = await res.json();
    setModulos(data);
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao carregar módulos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  const startEdit = (modulo: Modulo) => {
    setEditingId(modulo.id);
    reset(modulo);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset({ id: 0, nome: "", ordem: 1 });
  };

  const onSubmit = async (data: ModuloForm) => {
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/modulo/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: data.nome, ordem: data.ordem }),
      });
      if (!res.ok) {
        throw new Error(`Erro ${res.status}: não foi possível atualizar.`);
      }
      setModulos((prev) =>
        prev.map((m) =>
          m.id === data.id ? { ...m, nome: data.nome, ordem: data.ordem } : m
        )
      );
      setEditingId(null);
      reset({ id: 0, nome: "", ordem: 1 });
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
        throw new Error(`Erro ${res.status}: não foi possível excluir.`);
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
      {/* Cabeçalho com título e botão de voltar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Módulos</h1>
        <Link
          href="/Pages/AdminDashboard"
          className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Voltar ao Dashboard
        </Link>
      </div>

      {/* Conteúdo: tabela */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        {modulos.length === 0 ? (
          <p className="text-gray-600">Não há módulos cadastrados.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Nome</th>
                <th className="border px-4 py-2 text-left">Ordem</th>
                <th className="border px-4 py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {modulos.map((modulo) =>
                editingId === modulo.id ? (
                  // Linha em modo edição
                  <tr key={modulo.id} className="bg-yellow-50">
                    <td className="border px-4 py-2">{modulo.id}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        {...register("nome")}
                        className="w-full border rounded px-2 py-1"
                        disabled={isSubmitting}
                      />
                      {formErrors.nome && (
                        <p className="text-sm text-red-600">{formErrors.nome.message}</p>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        {...register("ordem", { valueAsNumber: true })}
                        className="w-20 border rounded px-2 py-1"
                        disabled={isSubmitting}
                      />
                      {formErrors.ordem && (
                        <p className="text-sm text-red-600">{formErrors.ordem.message}</p>
                      )}
                    </td>
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
                  // Linha normal somente leitura
                  <tr key={modulo.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{modulo.id}</td>
                    <td className="border px-4 py-2">{modulo.nome}</td>
                    <td className="border px-4 py-2">{modulo.ordem}</td>
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
