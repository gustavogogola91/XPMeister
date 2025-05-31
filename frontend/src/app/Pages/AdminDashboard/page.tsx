"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
// Importa todo o módulo jwt-decode como “jwt_decode”
import * as jwt_decode from "jwt-decode";

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  /*useEffect(() => {
    const { "auth-token": token } = parseCookies();
    if (!token) {
      router.replace("/Pages/LoginPage");
      return;
    }

    let payload: JwtPayload | null = null;
    try {
      // Dependendo de como o pacote estiver empacotado, a função de decodificar pode estar em default
      // Use (jwt_decode as any)(token) se jwt_decode ser a função diretamente
      payload = (jwt_decode as any)(token);
      // Ou, se for necessário:
      // payload = (jwt_decode as any).default(token);
    } catch (err) {
      setError("Token de autenticação inválido ou expirado. Faça login novamente.");
      setLoading(false);
      return;
    }

    if (!payload || payload.role !== "Admin") {
      setError("Acesso negado. Você não possui permissão de administrador.");
      setLoading(false);
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Carregando painel administrativo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4">
        <p className="text-xl font-semibold text-red-700 mb-4">Erro:</p>
        <p className="text-red-600 mb-6">{error}</p>
        <button
          onClick={() => router.replace("/Pages/LoginPage")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Ir para Login
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600">Verificando permissões...</p>
      </div>
    );
  }*/

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Painel Administrativo</h1>
        <p className="text-gray-600 mb-6">
          Seja bem-vindo(a), Administrador! Escolha uma das áreas abaixo para gerenciar:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">Módulos</h2>
            <div className="flex flex-col space-y-2">
              <Link
                href="/Pages/AdminModulos"
                className="px-4 py-2 bg-green-600 text-white rounded text-center hover:bg-green-700"
              >
                Listar / Editar Módulos
              </Link>
              <Link
                href="/Pages/AdminCriarModulos"
                className="px-4 py-2 bg-blue-600 text-white rounded text-center hover:bg-blue-700"
              >
                Criar Novo Módulo
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">Aulas</h2>
            <div className="flex flex-col space-y-2">
              <Link
                href="/Pages/AdminAulas"
                className="px-4 py-2 bg-green-600 text-white rounded text-center hover:bg-green-700"
              >
                Listar / Editar Aulas
              </Link>
              <Link
                href="/Pages/AdminCriarAulas/"
                className="px-4 py-2 bg-blue-600 text-white rounded text-center hover:bg-blue-700"
              >
                Criar Nova Aula
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">Desafios</h2>
            <div className="flex flex-col space-y-2">
              <Link
                href="/Pages/AdminDesafios"
                className="px-4 py-2 bg-green-600 text-white rounded text-center hover:bg-green-700"
              >
                Listar / Editar Desafios
              </Link>
              <Link
                href="/Pages/AdminCriarDesafios"
                className="px-4 py-2 bg-blue-600 text-white rounded text-center hover:bg-blue-700"
              >
                Criar Novo Desafio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
