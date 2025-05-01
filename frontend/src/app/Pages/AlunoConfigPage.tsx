"use client";

import { useState } from "react";

var apiUrl = "http://localhost:5017";

export default function AlunoConfigPage() {
  const [configPage, setConfigPage] = useState({ page: "senha" });
  const [alteracao, setAlteracao] = useState({
    senha: "",
    novo: "",
    confirma: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAlteracao({ ...alteracao, [name]: value });
  };

  return (
    <div className="flex flex-1">
      <aside className="hidden md:inline w-64 my-12 border-r border-purple-500">
        <ul>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "senha" });
              setAlteracao({
                senha: "",
                novo: "",
                confirma: "",
              });
            }}
          >
            Alterar Senha
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "email" });
              setAlteracao({
                senha: "",
                novo: "",
                confirma: "",
              });
            }}
          >
            Alterar Email
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "estudo" });
              setAlteracao({
                senha: "",
                novo: "",
                confirma: "",
              });
            }}
          >
            Personalizar estudo
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "modulo" });
              setAlteracao({
                senha: "",
                novo: "",
                confirma: "",
              });
            }}
          >
            Refazer módulo
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8 bg-white items-center h-full">
        <h2 className="text-center text-2xl font-bold text-purple uppercase mb-10">
          Configurações
        </h2>

        <Page
          configPage={configPage}
          alteracao={alteracao}
          handleChange={handleChange}
          alterarSenha={alterarSenha}
          alterarEmail={alterarEmail}
        />
        <div
          id="Erro"
          className="mt-10 text-center text-red-600 uppercase font-bold w-50 m-auto rounded-2xl p-5"
        ></div>
      </main>
    </div>
  );

  async function alterarSenha() {
    var errorLayout = document.getElementById("Erro");
    if (alteracao.confirma === alteracao.novo) {
      var novo = alteracao.novo;
      var senha = alteracao.senha;

      try {
        const response = await fetch(`${apiUrl}/usuario/1`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ SenhaAtual: senha, Senha: novo }),
        });

        setAlteracao({
          senha: "",
          novo: "",
          confirma: "",
        });

        console.log(response);

        if (response.ok) {
          errorLayout!.innerText = "";
          errorLayout!.classList.remove("bg-red-300");
          return;
        } else if (response.status == 401) {
          errorLayout!.innerText = "Senha incorreta";
          errorLayout!.classList.add("bg-red-300");
        } else {
          errorLayout!.innerText = response.statusText;
          errorLayout!.classList.add("bg-red-300");
        }
      } catch (error) {
        return null;
      }
    } else {
      errorLayout!.innerText = "Nova senha e confirmação não coincidem";
      errorLayout!.classList.add("bg-red-300");
    }
  }

  async function alterarEmail() {
    var errorLayout = document.getElementById("Erro");
    if (alteracao.confirma === alteracao.novo) {
      var novo = alteracao.novo;
      var senha = alteracao.senha;

      try {
        const response = await fetch(`${apiUrl}/usuario/1`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ SenhaAtual: senha, Email: novo }),
        });

        setAlteracao({
          senha: "",
          novo: "",
          confirma: "",
        });

        console.log(response);

        if (response.ok) {
          errorLayout!.innerText = "";
          errorLayout!.classList.remove("bg-red-300");
          return;
        } else if (response.status == 401) {
          errorLayout!.innerText = "Senha incorreta";
          errorLayout!.classList.add("bg-red-300");
        } else {
          errorLayout!.innerText = response.statusText;
          errorLayout!.classList.add("bg-red-300");
        }
      } catch (error) {
        return null;
      }
    } else {
      errorLayout!.innerText = "Novo email e confirmação não coincidem";
      errorLayout!.classList.add("bg-red-300");
    }
  }
}

function Page({
  configPage,
  alteracao,
  handleChange,
  alterarSenha,
  alterarEmail
}: {
  configPage: { page: string };
  alteracao: { senha: string; novo: string; confirma: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  alterarSenha: () => void;
  alterarEmail: () => void;
}) {
  if (configPage.page == "senha") {
    return (
      <form
        className="mx-auto w-full max-w-md flex flex-col items-center space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alterarSenha();
        }}
      >
        <h3 className="uppercase text-purple font-bold">Alterar senha</h3>
        <div className="w-full">
          <label className="block text-center mb-2 text-sm">
            Insira a senha atual
          </label>
          <input
            type="password"
            name="senha"
            value={alteracao.senha}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>

        <div className="w-full">
          <label className="block text-center mb-2 text-sm">
            Insira a nova senha
          </label>
          <input
            type="password"
            name="novo"
            value={alteracao.novo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>

        <div className="w-full">
          <label className="block text-center mb-2 text-sm">
            Confirme a senha
          </label>
          <input
            type="password"
            name="confirma"
            value={alteracao.confirma}
            onChange={handleChange}
            required
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
      <form
        className="mx-auto w-full max-w-md flex flex-col items-center space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          alterarEmail();
        }}
      >
        <h3 className="uppercase text-purple font-bold">Alterar Email</h3>
        <div className="w-full">
          <label className="block text-center mb-2 text-sm">
            Insira a senha atual
          </label>
          <input
            type="password"
            name="senha"
            value={alteracao.senha}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>

        <div className="w-full">
          <label className="block text-center mb-2 text-sm">
            Insira o novo email
          </label>
          <input
            type="email"
            name="novo"
            value={alteracao.novo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>

        <div className="w-full">
          <label className="block text-center mb-2 text-sm">
            Confirme o email
          </label>
          <input
            type="email"
            name="confirma"
            value={alteracao.confirma}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow transition"
        >
          Alterar email
        </button>
      </form>
    );
  }
}
