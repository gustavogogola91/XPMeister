"use client";

import { useState } from "react";

export default function AlunoConfigPage() {
  const [configPage, setConfigPage] = useState({ page: "senha" });

  return (
    <div className="flex flex-1">
      <aside className="hidden md:inline w-64 my-12 border-r border-purple-500">
        <ul>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "senha" });
            }}
          >
            Alterar Senha
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "email" });
            }}
          >
            Alterar Email
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "estudo" });
            }}
          >
            Personalizar estudo
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "modulo" });
            }}
          >
            Refazer módulo
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8 bg-white">
        <h2 className="text-center text-2xl font-bold text-purple uppercase mb-10">
          Configurações
        </h2>

        <Formulario />
      </main>
    </div>
  );

  function Formulario() {
    if (configPage.page == "senha") {
      return (
        <form className="mx-auto w-full max-w-md flex flex-col items-center space-y-6">
          <h3 className="uppercase text-purple font-bold">Alterar senha</h3>
          <div className="w-full">
            <label className="block text-center mb-2 text-sm">
              Insira a senha atual
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
            />
          </div>

          <div className="w-full">
            <label className="block text-center mb-2 text-sm">
              Insira a nova senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
            />
          </div>

          <div className="w-full">
            <label className="block text-center mb-2 text-sm">
              Confirme a senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow transition"
          >
            Alterar senha
          </button>
        </form>
      );
    } else if (configPage.page == "email") {
      return (
        <form className="mx-auto w-full max-w-md flex flex-col items-center space-y-6">
          <h3 className="uppercase text-purple font-bold">Alterar Email</h3>
          <div className="w-full">
            <label className="block text-center mb-2 text-sm">
              Insira a senha atual
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
            />
          </div>

          <div className="w-full">
            <label className="block text-center mb-2 text-sm">
              Insira o novo email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
            />
          </div>

          <div className="w-full">
            <label className="block text-center mb-2 text-sm">
              Confirme o email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow transition"
          >
            Alterar senha
          </button>
        </form>
      );
    }
  }
}
