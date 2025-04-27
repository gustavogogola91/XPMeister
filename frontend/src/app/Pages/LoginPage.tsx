"use client";

import { useState } from "react";

var apiUrl = "http://localhost:5017"

export default function Login() {
    return (
      <div className="flex flex-col gap-10 items-center mb-20">
        <div className="flex flex-col items-center justify-center flex-1 p-6">
            <h2 className="text-4xl text-purple font-black underline mb-4">BEM-VINDO</h2>
            <p className="text-center mb-8 text-base">Faça o login para continuar sua <span className="font-bold text-purple">jornada de aprendizado!!</span></p>
            <FormLogin/>
            <p className="mt-6 text-sm">Não tem conta? <a href="#" className="font-bold hover:underline">Cadastre-se</a></p>
        </div>
      </div>
    );
  }

  async function loginUsuario(email: string, senha: string) {
    var nome = "dumpOne";
    try {
        const response = await fetch(`${apiUrl}/usuario/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (!response.ok) {
            console.log("Erro ao autenticar usuário!");
            return null;
        }

        const data = await response.json();
        sessionStorage.setItem("usuarioId", data.id);
        sessionStorage.setItem("usuarioNome", data.nome);
        console.log("Usuário autenticado:", data.id, data.nome);
        return data;
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
    }

  function FormLogin() {
    const [loginData, setLoginData] = useState({
        email: "",
        senha: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        var usuario = await loginUsuario(loginData.email, loginData.senha);
        if (usuario !== null) {
            alert("Parabens, você lembrou seu login (aqui n temos opção de recuperação, Guarde bem)!");
            // Redirecionar para a página inicial ou outra página desejada
            return;
        }
    
        };

    return (
        <>
        <form className="base-form flex flex-col w-full max-w-xs gap-4" onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" className="" value={loginData.email} onChange={handleChange} required/>
            <input name="senha" type="password" placeholder="Senha" className="" value={loginData.senha} onChange={handleChange} required/>
            <button type="submit" className="btn-primary py-2 text-[16px] font-bold"> Entrar </button>
        </form>
        </>
    );
  }
  