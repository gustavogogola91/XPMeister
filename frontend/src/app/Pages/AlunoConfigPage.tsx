"use client";

import { useState } from "react";

const apiUrl = "http://localhost:5017";

type DiaSemana =
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado"
  | "domingo";

type DiasSelecionados = {
  [key in DiaSemana]: boolean;
};

export default function AlunoConfigPage() {
  const [configPage, setConfigPage] = useState({ page: "senha" });
  const [alteracao, setAlteracao] = useState({
    senha: "",
    novo: "",
    confirma: "",
  });
  const [diasSelecionados, setDiasSelecionados] = useState({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
    sabado: false,
    domingo: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAlteracao({ ...alteracao, [name]: value });
  };

  const handleChangeCheckbox = (dia: DiaSemana) => {
    setDiasSelecionados((prev) => ({
      ...prev,
      [dia]: !prev[dia],
    }));
  };

  return (
    <div className="flex flex-1">
      <aside className="hidden md:inline w-64 my-12 border-r border-purple-500">
        <ul>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "senha" });
              setAlteracao({ senha: "", novo: "", confirma: "" });
            }}
          >
            Alterar Senha
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "email" });
              setAlteracao({ senha: "", novo: "", confirma: "" });
            }}
          >
            Alterar Email
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setConfigPage({ page: "estudo" });
              setAlteracao({ senha: "", novo: "", confirma: "" });
            }}
          >
            Personalizar estudo
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
          diaSelecionado={diasSelecionados}
          handleChange={handleChange}
          handleChangeCheckbox={handleChangeCheckbox}
          alterarSenha={alterarSenha}
          alterarEmail={alterarEmail}
          alterarEstudo={alterarEstudo}
        />

        <div
          id="Erro"
          className="mt-10 text-center text-red-600 uppercase font-bold w-50 m-auto rounded-2xl p-5"
        ></div>
      </main>
    </div>
  );

  async function alterarSenha() {
    const errorLayout = document.getElementById("Erro");

    if (alteracao.confirma === alteracao.novo) {
      try {
        const response = await fetch(`${apiUrl}/usuario/1`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            SenhaAtual: alteracao.senha,
            Senha: alteracao.novo,
          }),
        });

        setAlteracao({ senha: "", novo: "", confirma: "" });
        console.log(response);

        if (response.ok) {
          errorLayout!.innerText = "";
          errorLayout!.classList.remove("bg-red-300");
        } else if (response.status === 401) {
          errorLayout!.innerText = "Senha incorreta";
          errorLayout!.classList.add("bg-red-300");
        } else {
          errorLayout!.innerText = response.statusText;
          errorLayout!.classList.add("bg-red-300");
        }
      } catch {
        return null;
      }
    } else {
      errorLayout!.innerText = "Nova senha e confirmação não coincidem";
      errorLayout!.classList.add("bg-red-300");
    }
  }

  async function alterarEstudo() {
    //TODO: Criar requisição
  }

  async function alterarEmail() {
    const errorLayout = document.getElementById("Erro");

    if (alteracao.confirma === alteracao.novo) {
      try {
        const response = await fetch(`${apiUrl}/usuario/1`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            SenhaAtual: alteracao.senha,
            Email: alteracao.novo,
          }),
        });

        setAlteracao({ senha: "", novo: "", confirma: "" });
        console.log(response);

        if (response.ok) {
          errorLayout!.innerText = "";
          errorLayout!.classList.remove("bg-red-300");
        } else if (response.status === 401) {
          errorLayout!.innerText = "Senha incorreta";
          errorLayout!.classList.add("bg-red-300");
        } else {
          errorLayout!.innerText = response.statusText;
          errorLayout!.classList.add("bg-red-300");
        }
      } catch {
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
  diaSelecionado,
  handleChangeCheckbox,
  handleChange,
  alterarSenha,
  alterarEmail,
  alterarEstudo,
}: {
  configPage: { page: string };
  alteracao: { senha: string; novo: string; confirma: string };
  diaSelecionado: {
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
    domingo: boolean;
  };
  handleChangeCheckbox: (dia: DiaSemana) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  alterarSenha: () => void;
  alterarEmail: () => void;
  alterarEstudo: () => void;
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
  } else if (configPage.page == "estudo") {
    return (
      <form
        className="flex flex-1 flex-col items-center"
        onSubmit={(e) => {
          e.preventDefault();
          alterarEstudo();
        }}
      >
        <h3 className="uppercase text-purple font-bold">
          Personalizar tempo de estudo
        </h3>
        <div className="flex flex-1 m-16">
          <ul className="flex flex-1 flex-col space-y-3 md:flex-row md:space-x-6">
            {(Object.keys(diaSelecionado) as DiaSemana[]).map((dia) => (
              <li key={dia}>
                <input
                  type="checkbox"
                  id={dia}
                  checked={diaSelecionado[dia]}
                  onChange={() => handleChangeCheckbox(dia)}
                />
                <label htmlFor={dia} className="ml-2 capitalize">
                  {dia}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center no">
          <label htmlFor="horas">Quantas horas deseja estudar (por dia)</label>
          <input
            type="number"
            id="horas"
            required
            className="no-spinner border-1 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple p-1 mt-4"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow transition mt-12"
        >
          Salvar
        </button>
      </form>
    );
  }
}
