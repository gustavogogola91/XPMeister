"use client";

import { useState } from "react";

var apiUrl = "http://localhost:5017"

export default function RegisterPage() {
    return (
      <div className="flex flex-col gap-10 items-center mb-20">
        <div className="flex flex-col items-center justify-center flex-1 p-6">
            <h2 className="text-4xl text-purple font-black underline mb-4">CADASTRE-SE</h2>
            <p className="text-center mb-8 text-base">Crie sua conta e comece sua <span className="font-bold text-purple">jornada de aprendizado!!</span></p>
            <FormRegister/>
            <p className="mt-6 text-sm">Já tem uma conta? <a href="#" className="font-bold hover:underline">Faça Login</a></p>
        </div>
      </div>
    );
  }

  async function postUsuario(nome: string, email: string, senha: string) {
    try {
        const response = await fetch(`${apiUrl}/usuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (!response.ok) {
            console.log("Erro ao cadastrar usuário, problema de algum fudido que fez tua API!");
        }
        else {
            console.log("De alguma forma essa poha funcionou, parabéns Isaac por fazer o minimo!");
        }
    }
    catch (error) {
        console.error("Erro:", error);
        console.log("Aconteceu alguma pica ai, se vira!");
    }
  }

  async function getUsuarios(email: string) {
    try {
        const response = await fetch(`${apiUrl}/usuario/email/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.log("Nenhum Usuário está usando esse email, Fé!");
            return null;
        }
        else {
            const data = await response.json();
            console.log("Já tem um conta criada com esse teu email aí parça, lute!", data);
            return data;
        }
    }
    catch (error) {
        console.error("Erro:", error);
        console.log("Aconteceu alguma pica ai, se vira!");
    }
    }

  function FormRegister() {
    const [registerData, setRegisterData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (registerData.senha !== registerData.confirmarSenha) {
            alert("As senhas não coincidem seu símio burro!");
            return;
        }
    
        var usuario = await getUsuarios(registerData.email);
        if (usuario !== null) {
            alert("Esse email já está cadastrado, seu símio burro!");
            return;
        }
        await postUsuario(registerData.nome, registerData.email, registerData.senha);
    
    };

    return (
        <>
        <form className="base-form flex flex-col w-full max-w-xs gap-4" onSubmit={handleSubmit}>
            <input name="nome" type="text" placeholder="Nome Completo" className="" value={registerData.nome} onChange={handleChange} required/>
            <input name="email" type="email" placeholder="Email" className="" value={registerData.email} onChange={handleChange} required/>
            <input name="senha" type="password" placeholder="Senha" className="" value={registerData.senha} onChange={handleChange} required/>
            <input name="confirmarSenha" type="password" placeholder="Confirmar Senha" value={registerData.confirmarSenha} onChange={handleChange} className="" required/>
            <button type="submit" className="btn-primary py-2 text-[16px] font-bold"> Criar Conta </button>
        </form>
        </>
    );
  }



  // Continuar parte da autenticacao