"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ModuloSimplificado = {
  id: number;
  titulo: string;
};

type UsuarioSimplificado = {
  id: number;
  nome: string;
};

type DesafioCompleto = {
  id: number;
  titulo: string;
  descricao: string;
  nivelDificuldade: number;    
  dataEntrega: string;         
  pontuacaoMaxima: number;
  usuarioId: number;
  usuario: UsuarioSimplificado;
  moduloId: number;
  modulo: ModuloSimplificado;
  ativo: boolean;
};

enum NivelDificuldade {
  Desconhecido = 0,
  Facil = 1,
  Medio = 2,
  Dificil = 3,
}

const editarDesafioSchema = z.object({
  id: z.number().int().positive(),
  Titulo: z.string().min(3, "O título deve ter ao menos 3 caracteres."),
  Descricao: z.string().min(1, "Informe a descrição do desafio."),
  NivelDificuldade: z
    .number({ invalid_type_error: "Selecione um nível de dificuldade válido." })
    .int("Dificuldade deve ser inteiro.")
    .min(0, "Dificuldade mínima = 0")
    .max(3, "Dificuldade máxima = 3"),
  DataEntrega: z
    .string({ invalid_type_error: "Informe uma data de entrega válida." })
    .refine((d) => !Number.isNaN(Date.parse(d)), "Data de entrega inválida."),
  PontuacaoMaxima: z
    .number({ invalid_type_error: "Informe uma pontuação válida." })
    .int("Pontuação deve ser um número inteiro.")
    .min(1, "A pontuação mínima é 1.")
    .max(1000, "A pontuação máxima permitida é 1000."),
  UsuarioId: z
    .number({ invalid_type_error: "Usuário inválido." })
    .int()
    .positive("UsuarioId deve ser positivo."),
  ModuloId: z
    .number({ invalid_type_error: "Selecione um módulo." })
    .int()
    .positive("Selecione um módulo válido."),
});
type EditarDesafioForm = z.infer<typeof editarDesafioSchema>;

const BACKEND_URL = "http://localhost:5017";

export default function AdminDesafiosPage() {
  const [desafios, setDesafios] = useState<DesafioCompleto[]>([]);
  const [modulos, setModulos] = useState<ModuloSimplificado[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioSimplificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTitulo, setSearchTitulo] = useState<string>("");
  const [searchModuloId, setSearchModuloId] = useState<number>(0);

  const [selectedDesafio, setSelectedDesafio] = useState<DesafioCompleto | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<EditarDesafioForm>({
    resolver: zodResolver(editarDesafioSchema),
    defaultValues: {
      id: 0,
      Titulo: "",
      Descricao: "",
      NivelDificuldade: NivelDificuldade.Desconhecido,
      DataEntrega: new Date().toISOString().substr(0, 10),
      PontuacaoMaxima: 100,
      UsuarioId: 0,
      ModuloId: 0,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const respModulos = await fetch(`${BACKEND_URL}/modulo`);
      if (!respModulos.ok && respModulos.status !== 404) {
        throw new Error(`Erro ${respModulos.status}: falha ao obter módulos.`);
      }
      let listaModulos: ModuloSimplificado[] = [];
      if (respModulos.status === 200) {
        const dataMods: Array<{ id: number; titulo: string }> = await respModulos.json();
        listaModulos = dataMods.map((m) => ({ id: m.id, titulo: m.titulo }));
      }
      setModulos(listaModulos);

      const respUsuarios = await fetch(`${BACKEND_URL}/usuario`);
      if (!respUsuarios.ok && respUsuarios.status !== 404) {
        throw new Error(`Erro ${respUsuarios.status}: falha ao obter usuários.`);
      }
      let listaUsuarios: UsuarioSimplificado[] = [];
      if (respUsuarios.status === 200) {
        const dataUsers: Array<{ id: number; nome: string }> = await respUsuarios.json();
        listaUsuarios = dataUsers.map((u) => ({ id: u.id, nome: u.nome }));
      }
      setUsuarios(listaUsuarios);

      const respDesafios = await fetch(`${BACKEND_URL}/desafio/buscar-todos-desafios`);
      if (!respDesafios.ok && respDesafios.status !== 404) {
        throw new Error(`Erro ${respDesafios.status}: falha ao obter desafios.`);
      }
      let listaDesafios: DesafioCompleto[] = [];
      if (respDesafios.status === 200) {
        const dataDes: DesafioCompleto[] = await respDesafios.json();
        listaDesafios = dataDes.sort((a, b) => {
          if (a.moduloId !== b.moduloId) return a.moduloId - b.moduloId;
          return a.titulo.localeCompare(b.titulo);
        });
      }
      setDesafios(listaDesafios);

      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar dados.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openViewModal = (desafio: DesafioCompleto) => {
    setSelectedDesafio(desafio);
    setModalMode("view");
  };

  const openEditModal = (desafio: DesafioCompleto) => {
    setSelectedDesafio(desafio);
    setModalMode("edit");
    reset({
      id: desafio.id,
      Titulo: desafio.titulo,
      Descricao: desafio.descricao,
      NivelDificuldade: desafio.nivelDificuldade,
      DataEntrega: desafio.dataEntrega.substr(0, 10), 
      PontuacaoMaxima: desafio.pontuacaoMaxima,
      UsuarioId: desafio.usuarioId,
      ModuloId: desafio.moduloId,
    });
  };

  const closeModal = () => {
    setSelectedDesafio(null);
    setModalMode("view");
    reset({
      id: 0,
      Titulo: "",
      Descricao: "",
      NivelDificuldade: NivelDificuldade.Desconhecido,
      DataEntrega: new Date().toISOString().substr(0, 10),
      PontuacaoMaxima: 100,
      UsuarioId: 0,
      ModuloId: 0,
    });
  };

  const onSubmit = async (data: EditarDesafioForm) => {
    try {
      const res = await fetch(`${BACKEND_URL}/desafio/alterar-desafio/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Titulo: data.Titulo,
          Descricao: data.Descricao,
          NivelDificuldade: data.NivelDificuldade,
          DataEntrega: data.DataEntrega,
          PontuacaoMaxima: data.PontuacaoMaxima,
          UsuarioId: data.UsuarioId,
          ModuloId: data.ModuloId,
        }),
      });
      if (!res.ok) {
        const texto = await res.text();
        throw new Error(`Erro ${res.status}: ${texto || "falha ao atualizar desafio."}`);
      }
      await fetchData();
      closeModal();
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar desafio.");
    }
  };

  const deleteDesafio = async (id: number) => {
    if (!confirm("Deseja realmente desativar este desafio?")) return;
    try {
      const res = await fetch(`${BACKEND_URL}/desafio/desativar-desafio/${id}`, {
        method: "PUT",
      });
      if (!res.ok) {
        const texto = await res.text();
        throw new Error(`Erro ${res.status}: ${texto || "falha ao desativar desafio."}`);
      }
      await fetchData();
      closeModal();
    } catch (err: any) {
      alert(err.message || "Erro ao desativar desafio.");
    }
  };

  const filteredDesafios = desafios.filter((d) => {
    const matchesTitulo = d.titulo.toLowerCase().includes(searchTitulo.toLowerCase());
    const matchesModulo = searchModuloId === 0 || d.moduloId === searchModuloId;
    return matchesTitulo && matchesModulo;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Carregando desafios...</p>
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
      {/* Cabeçalho com título e botões “Voltar ao Dashboard” / “Criar Novo Desafio” */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <Link
          href="/Pages/AdminDashboard"
          className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Voltar ao Dashboard
        </Link>
        <Link
          href="/Pages/AdminCriarDesafios"
          className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Criar Novo Desafio
        </Link>
      </div>

      {/* Título da página */}
      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h1 className="text-4xl text-purple-700 font-bold text-gray-800">Gerenciar Desafios</h1>
      </div>

      {/* Filtros de busca */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-6">
        {/* Busca por título */}
        <input
          type="text"
          placeholder="Buscar por título do desafio..."
          value={searchTitulo}
          onChange={(e) => setSearchTitulo(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none"
        />
        {/* Dropdown de módulos */}
        <select
          value={searchModuloId}
          onChange={(e) => setSearchModuloId(Number(e.target.value))}
          className="w-full sm:w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none"
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
            setSearchTitulo("");
            setSearchModuloId(0);
            fetchData();
          }}
          className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-800"
        >
          Recarregar Lista
        </button>
      </div>

      {/* Tabela de desafios filtrados */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        {filteredDesafios.length === 0 ? (
          <p className="text-gray-600">Nenhum desafio encontrado.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Módulo</th>
                <th className="border px-4 py-2 text-left">Título</th>
                <th className="border px-4 py-2 text-left">Entrega</th>
                <th className="border px-4 py-2 text-left">Nível</th>
              </tr>
            </thead>
            <tbody>
              {filteredDesafios.map((desafio) => (
                <tr
                  key={desafio.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => openViewModal(desafio)}
                >
                  <td className="border px-4 py-2">{desafio.modulo.titulo}</td>
                  <td className="border px-4 py-2">{desafio.titulo}</td>
                  <td className="border px-4 py-2">
                    {new Date(desafio.dataEntrega).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="border px-4 py-2">
                    {desafio.nivelDificuldade === 0
                      ? "Desconhecido"
                      : desafio.nivelDificuldade === 1
                      ? "Fácil"
                      : desafio.nivelDificuldade === 2
                      ? "Médio"
                      : "Difícil"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal (flutuante) de visualização / edição */}
      {selectedDesafio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
            {/* Botão de fechar (X) */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-purple-600 hover:text-purple-900"
            >
              ✕
            </button>

            {/* Conteúdo do modal, depende de view ou edit */}
            {modalMode === "view" ? (
              <div className="p-6 space-y-4">
                <h2 className="text-2xl text-purple-700 font-semibold">Detalhes do Desafio</h2>

                <p>
                  <span className="font-medium text-purple-700">Título:</span>{" "}
                  {selectedDesafio.titulo}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Descrição:</span>{" "}
                  {selectedDesafio.descricao}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Módulo:</span>{" "}
                  {selectedDesafio.modulo.titulo}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Criado por:</span>{" "}
                  {selectedDesafio.usuario.nome}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Data de Entrega:</span>{" "}
                  {new Date(selectedDesafio.dataEntrega).toLocaleDateString("pt-BR")}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Nível de Dificuldade:</span>{" "}
                  {selectedDesafio.nivelDificuldade === 0
                    ? "Desconhecido"
                    : selectedDesafio.nivelDificuldade === 1
                    ? "Fácil"
                    : selectedDesafio.nivelDificuldade === 2
                    ? "Médio"
                    : "Difícil"}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Pontuação Máxima:</span>{" "}
                  {selectedDesafio.pontuacaoMaxima}
                </p>
                <p>
                  <span className="font-medium text-purple-700">Status:</span>{" "}
                  {selectedDesafio.ativo ? "Ativo" : "Desativado"}
                </p>

                {/* Botões Editar / Excluir / Fechar */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={() => openEditModal(selectedDesafio)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteDesafio(selectedDesafio.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Desativar
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
                <h2 className="text-2xl text-purple-700 font-semibold">Editar Desafio</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Campo: Título */}
                  <div>
                    <label htmlFor="Titulo" className="block font-medium mb-1 text-purple-700">
                      Título
                    </label>
                    <input
                      type="text"
                      id="Titulo"
                      {...register("Titulo")}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.Titulo ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.Titulo && (
                      <p className="text-sm text-red-600 mt-1">{formErrors.Titulo.message}</p>
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

                  {/* Campo: Nível de Dificuldade */}
                  <div>
                    <label
                      htmlFor="NivelDificuldade"
                      className="block font-medium mb-1 text-purple-700"
                    >
                      Nível de Dificuldade
                    </label>
                    <select
                      id="NivelDificuldade"
                      {...register("NivelDificuldade", { valueAsNumber: true })}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.NivelDificuldade ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    >
                      <option value={0}>Desconhecido</option>
                      <option value={1}>Fácil</option>
                      <option value={2}>Médio</option>
                      <option value={3}>Difícil</option>
                    </select>
                    {formErrors.NivelDificuldade && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.NivelDificuldade.message}
                      </p>
                    )}
                  </div>

                  {/* Campo: DataEntrega */}
                  <div>
                    <label htmlFor="DataEntrega" className="block font-medium mb-1 text-purple-700">
                      Data de Entrega
                    </label>
                    <input
                      type="date"
                      id="DataEntrega"
                      {...register("DataEntrega")}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.DataEntrega ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.DataEntrega && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.DataEntrega.message}
                      </p>
                    )}
                  </div>

                  {/* Campo: PontuacaoMaxima */}
                  <div>
                    <label
                      htmlFor="PontuacaoMaxima"
                      className="block font-medium mb-1 text-purple-700"
                    >
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
                      disabled={isSubmitting}
                    />
                    {formErrors.PontuacaoMaxima && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.PontuacaoMaxima.message}
                      </p>
                    )}
                  </div>

                  {/* Campo: UsuarioId (dropdown) */}
                  <div>
                    <label htmlFor="UsuarioId" className="block font-medium mb-1 text-purple-700">
                      Criado por (Usuário)
                    </label>
                    <select
                      id="UsuarioId"
                      {...register("UsuarioId", { valueAsNumber: true })}
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
                        formErrors.UsuarioId ? "border-red-500" : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    >
                      <option value={0}>-- Selecione --</option>
                      {usuarios.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.nome}
                        </option>
                      ))}
                    </select>
                    {formErrors.UsuarioId && (
                      <p className="text-sm text-red-600 mt-1">
                        {formErrors.UsuarioId.message}
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
                      className={`w-full border rounded px-3 py-2 focus:outline-none ${
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
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
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
