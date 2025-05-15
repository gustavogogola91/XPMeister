"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

var apiUrl = "http://localhost:5017"

export default function RegisterPage() {
    //  const router = useRouter();
    
    //     const { 'auth-token': AuthToken } = parseCookies();
    
    //     useEffect(() => {
    //         if (typeof window !== 'undefined') {
    
    //             if (AuthToken) {
    //                 router.push('/Pages/AulasPage');
    //             }
    //         }
    //     }, [router]);



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
            console.log("Erro ao cadastrar usuário");
        }
        else {
            console.log("Usuário cadastrado");
            
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
            console.log("Nenhum Usuário está usando esse email");
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
            alert("As senhas não coincidem");  //TODO: colocar no input o erro
            return;
        }
    
        var usuario = await getUsuarios(registerData.email);
        if (usuario !== null) {
            alert("Esse email já está cadastrado"); //TODO: colocar no input o erro
            return;
        }
        await postUsuario(registerData.nome, registerData.email, registerData.senha);
    
    };

    return (
        <>
        <form className="base-form flex flex-col w-full max-w-xs gap-4" onSubmit={handleSubmit}>
            <input name="nome" type="text" minLength={4} maxLength={60} placeholder="Nome Completo" className="focus:border-purple focus:outline-0" value={registerData.nome} onChange={handleChange} required/>
            <input name="email" type="email" minLength={8} maxLength={60} placeholder="Email" className="focus:border-purple focus:outline-0" value={registerData.email} onChange={handleChange} required/>
            <input name="senha" type="password" minLength={8} maxLength={60} placeholder="Senha" className="focus:border-purple focus:outline-0" value={registerData.senha} onChange={handleChange} required/>
            <input name="confirmarSenha" type="password" minLength={8} maxLength={60} placeholder="Confirmar Senha" value={registerData.confirmarSenha} onChange={handleChange} className="focus:border-purple focus:outline-0" required/>
            <button type="submit" className="btn-primary py-2 text-[16px] font-bold"> Criar Conta </button>
        </form>
        </>
    );
  }



  // Continuar parte da autenticacao