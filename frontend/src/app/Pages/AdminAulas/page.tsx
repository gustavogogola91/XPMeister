"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ModuloCompleto = {
  id: number;
  titulo: string;
};

type AulaCompleta = {
  id: number;
  nome: string;
  descricao: string;
  linkVideo: string;
  linkArquivo: string;
  numeroSequencia: number;
  modulo: ModuloCompleto;
};

type ModuloOption = {
  id: number;
  titulo: string;
};

const editarAulaSchema = z.object({
  id: z.number().int().positive(),
  Nome: z.string().min(1, "Informe o nome da aula."),
  Descricao: z.string().min(1, "Informe a descrição da aula."),
  LinkVideo: z.string().url("Informe uma URL de vídeo válida."),
  LinkArquivo: z.string().url("Informe uma URL de arquivo válida."),
  NumeroSequencia: z
    .number({ invalid_type_error: "Número de sequência inválido." })
    .int("O número de sequência deve ser inteiro.")
    .positive("O número de sequência deve ser maior que zero."),
  ModuloId: z
    .number({ invalid_type_error: "Selecione um módulo." })
    .int()
    .positive("Selecione um módulo válido."),
});
type EditarAulaForm = z.infer<typeof editarAulaSchema>;

const BACKEND_URL = "http://localhost:5017";

export default function AdminAulasPage() {
  //Estados para listas e carregamento
  const [aulas, setAulas] = useState<AulaCompleta[]>([]);
  const [modulos, setModulos] = useState<ModuloOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Estados para filtros de busca
  const [searchName, setSearchName] = useState<string>("");
  const [searchModuloId, setSearchModuloId] = useState<number>(0);

  //Estados para janela de visualização/edição
  const [selectedAula, setSelectedAula] = useState<AulaCompleta | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  //React Hook Form para edição dentro do modal
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<EditarAulaForm>({
    resolver: zodResolver(editarAulaSchema),
    defaultValues: {
      id: 0,
      Nome: "",
      Descricao: "",
      LinkVideo: "",
      LinkArquivo: "",
      NumeroSequencia: 1,
      ModuloId: 0,
    },
  });

  //Função para buscar módulos e aulas
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      //Busca módulos
      const respModulos = await fetch(`${BACKEND_URL}/modulo`);
      if (!respModulos.ok && respModulos.status !== 404) {
        throw new Error(`Erro ${respModulos.status}: falha ao obter módulos.`);
      }
      let listaModulos: ModuloOption[] = [];
      if (respModulos.status === 200) {
        const dataMods: Array<{ id: number; titulo: string }> = await respModulos.json();
        listaModulos = dataMods.map((m) => ({ id: m.id, titulo: m.titulo }));
      }
      setModulos(listaModulos);

      //Busca aulas completas com módulo aninhado
      const respAulas = await fetch(`${BACKEND_URL}/aula/completa`);
      if (!respAulas.ok && respAulas.status !== 404) {
        throw new Error(`Erro ${respAulas.status}: falha ao obter aulas.`);
      }
      let listaAulas: AulaCompleta[] = [];
      if (respAulas.status === 200) {
        const dataAulas: AulaCompleta[] = await respAulas.json();

        // Ordenar por Id de módulo e numero de sequencia
        listaAulas = dataAulas.sort((a, b) => {
          if (a.modulo.id !== b.modulo.id) return a.modulo.id - b.modulo.id;
          return a.numeroSequencia - b.numeroSequencia;
        });
      }
      setAulas(listaAulas);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar dados.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Janela para visulizar detalhes das aulas.
  const openViewModal = (aula: AulaCompleta) => {
    setSelectedAula(aula);
    setModalMode("view");
  };

  //Janela para edição de aulas
  const openEditModal = (aula: AulaCompleta) => {
    setSelectedAula(aula);
    setModalMode("edit");
    reset({
      id: aula.id,
      Nome: aula.nome,
      Descricao: aula.descricao,
      LinkVideo: aula.linkVideo,
      LinkArquivo: aula.linkArquivo,
      NumeroSequencia: aula.numeroSequencia,
      ModuloId: aula.modulo.id,
    });
  };

  const closeModal = () => {
    setSelectedAula(null);
    setModalMode("view");
    reset({
      id: 0,
      Nome: "",
      Descricao: "",
      LinkVideo: "",
      LinkArquivo: "",
      NumeroSequencia: 1,
      ModuloId: 0,
    });
  };

  const onSubmit = async (data: EditarAulaForm) => {
    try {
      const res = await fetch(`${BACKEND_URL}/aula/${data.id}`, {
        method: "PUT",
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
      if (!res.ok) {
        const texto = await res.text();
        throw new Error(`Erro ${res.status}: ${texto || "falha ao atualizar aula."}`);
      }
      await fetchData();
      closeModal();
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar aula.");
    }
  };

  const deleteAula = async (id: number) => {
    if (!confirm("Deseja realmente excluir esta aula?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/aula/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const texto = await res.text();
        throw new Error(`Erro ${res.status}: ${texto || "falha ao excluir aula."}`);
      }
      await fetchData();
      closeModal();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir aula.");
    }
  };

  //Filtro por nome e modulos
  const filteredAulas = aulas.filter((a) => {
    const matchesName = a.nome.toLowerCase().includes(searchName.toLowerCase());
    const matchesModulo = searchModuloId === 0 || a.modulo.id === searchModuloId;
    return matchesName && matchesModulo;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Carregando aulas...</p>
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
          onClick={() => fetchData()}
        >
          Recarregar
        </button>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Cabeçalho com título e botão “Voltar ao Dashboard” */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <Link
          href="/Pages/AdminDashboard"
          className="text-sm bg-purple text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Voltar ao Dashboard
        </Link>
        <Link
          href="/Pages/AdminCriarAulas"
          className="text-sm bg-purple text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Criar Nova Aula
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h1 className="text-4xl text-purple font-bold text-gray-800">Gerenciar Aulas</h1>
      </div>

      {/* Filtros de busca */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
        {/* Busca por nome */}
        <input
          type="text"
          placeholder="Buscar por nome da aula..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />
        {/* Dropdown de módulos */}
        <select
          value={searchModuloId}
          onChange={(e) => setSearchModuloId(Number(e.target.value))}
          className="text-purple w-full sm:w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none"
        >
          <option value={0}>Todos os módulos</option>
          {modulos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Botão para recarregar manualmente */}
      <div className="max-w-4xl mx-auto flex justify-end mb-4">
        <button
          onClick={() => {
            setSearchName("");
            setSearchModuloId(0);
            fetchData();
          }}
          className="text-sm bg-purple text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Recarregar Lista
        </button>
      </div>

      {/* Tabela de aulas filtradas */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        {filteredAulas.length === 0 ? (
          <p className="text-gray-600">Nenhuma aula encontrada.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border text-purple px-4 py-2 text-left">Módulo</th>
                <th className="border text-purple px-4 py-2 text-left">Nome da Aula</th>
                <th className="border text-purple px-4 py-2 text-left">Seq.</th>
              </tr>
            </thead>
            <tbody>
              {filteredAulas.map((aula) => (
                <tr
                  key={aula.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => openViewModal(aula)}
                >
                  <td className="border px-4 py-2">{aula.modulo.titulo}</td>
                  <td className="border px-4 py-2">{aula.nome}</td>
                  <td className="border px-4 py-2">{aula.numeroSequencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/*Janela de edição*/}
      {selectedAula && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className="
              relative 
              max-w-3xl w-full sm:w-11/12 
              bg-white rounded-lg shadow-xl 
              overflow-y-auto 
              max-h-[90vh] 
              pointer-events-auto
            "
          >
            {/* Botão de fechar (X) */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-purple-600 hover:text-purple-900"
            >
              ✕
            </button>

            {/* Conteúdo do modal: modo view ou edit */}
            {modalMode === "view" ? (
              <div className="p-6 space-y-4">
                <h2 className="text-2xl text-purple font-semibold">Detalhes da Aula</h2>
                <p>
                  <span className="text-purple-700 font-medium">Nome:</span> {selectedAula.nome}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Descrição:</span> {selectedAula.descricao}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Vídeo:</span>{" "}
                  <a
                    href={selectedAula.linkVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Ver Vídeo
                  </a>
                </p>
                <p>
                  <span className="font-medium text-purple-700">Arquivo:</span>{" "}
                  <a
                    href={selectedAula.linkArquivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Baixar Arquivo
                  </a>
                </p>
                <p>
                  <span className="font-medium text-purple-700">Número de Sequência:</span>{" "}
                  {selectedAula.numeroSequencia}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Módulo:</span>{" "}
                  {selectedAula.modulo.titulo}
                </p>

                {/* Botões Editar / Excluir / Fechar */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => openEditModal(selectedAula)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteAula(selectedAula.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Editar Aula</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Campo: Nome */}
                  <div>
                    <label htmlFor="Nome" className="block font-medium mb-1 text-purple-700">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="Nome"
                      {...register("Nome")}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.Nome ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.Nome && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.Nome.message}
                      </p>
                    )}
                  </div>

                  {/* Campo: Descrição */}
                  <div>
                    <label htmlFor="Descricao" className="block font-medium mb-1 text-purple-700">
                      Descrição
                    </label>
                    <textarea
                      id="Descricao"
                      {...register("Descricao")}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.Descricao ? "border-red-500" : "border-gray-300"
                      }`}
                      rows={3}
                      disabled={isSubmitting}
                    />
                    {formErrors.Descricao && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.Descricao.message}
                      </p>
                    )}
                  </div>

                  {/* Campo: LinkVideo */}
                  <div>
                    <label htmlFor="LinkVideo" className="block font-medium mb-1 text-purple-700">
                      Link do Vídeo
                    </label>
                    <input
                      type="url"
                      id="LinkVideo"
                      {...register("LinkVideo")}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.LinkVideo ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.LinkVideo && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.LinkVideo.message}
                      </p>
                    )}
                  </div>

                  {/* Campo: LinkArquivo */}
                  <div>
                    <label htmlFor="LinkArquivo" className="block font-medium mb-1 text-purple-700">
                      Link do Arquivo
                    </label>
                    <input
                      type="url"
                      id="LinkArquivo"
                      {...register("LinkArquivo")}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.LinkArquivo ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.LinkArquivo && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.LinkArquivo.message}
                      </p>
                    )}
                  </div>

                  {/* Campo: NumeroSequencia */}
                  <div>
                    <label htmlFor="NumeroSequencia" className="block font-medium mb-1 text-purple-700">
                      Número de Sequência
                    </label>
                    <input
                      type="number"
                      id="NumeroSequencia"
                      {...register("NumeroSequencia", { valueAsNumber: true })}
                      className={`text-purple-700 w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.NumeroSequencia
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      min={1}
                      disabled={isSubmitting}
                    />
                    {formErrors.NumeroSequencia && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.NumeroSequencia.message}
                      </p>
                    )}
                  </div>

                  {/* Campo: ModuloId (dropdown) */}
                  <div>
                    <label htmlFor="ModuloId" className="block font-medium mb-1 text-purple-700">
                      Selecionar Módulo
                    </label>
                    <select
                      id="ModuloId"
                      {...register("ModuloId", { valueAsNumber: true })}
                      className={`text-purple-700 w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.ModuloId ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    >
                      <option value={0}>-- Selecione --</option>
                      {modulos.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.titulo}
                        </option>
                      ))}
                    </select>
                    {formErrors.ModuloId && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.ModuloId.message}
                      </p>
                    )}
                  </div>

                  {/* Botões “Salvar” / “Cancelar” */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-purple text-white rounded hover:bg-purple-800 disabled:opacity-50"
                    >
                      {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
