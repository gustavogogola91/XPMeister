"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SignInData } from "../../contexts/AuthContext";
import { useRouter } from 'next/navigation'; // correct hook for App Router
import { parseCookies } from "nookies";

export default function Login() {
    return (
        <div className="flex flex-col gap-10 items-center mb-20">
            <div className="flex flex-col items-center justify-center flex-1 p-6">
                <h2 className="text-4xl text-purple font-black underline mb-4">BEM-VINDO</h2>
                <p className="text-center mb-8 text-base">Faça o login para continuar sua <span className="font-bold text-purple">jornada de aprendizado!!</span></p>
                <FormLogin />
                <p className="mt-6 text-sm">Não tem conta? <a href="#" className="font-bold hover:underline">Cadastre-se</a></p>
            </div>
        </div>
    );
}


function FormLogin() {
    const router = useRouter();

    const { 'auth-token': AuthToken } = parseCookies();

    useEffect(() => {
        if (typeof window !== 'undefined') {

            if (AuthToken) {
                router.push('/Pages/AulasPage');
            }
        }
    }, [router]);


    const { loginUsuario } = useContext(AuthContext);

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

        const loginRequestData: SignInData = {
            email: loginData.email,
            senha: loginData.senha
        }

        const success = await loginUsuario(loginRequestData)

        if (success) {
            console.log(localStorage.getItem('AuthToken'));
            router.push('/Pages/AulasPage');

        } else {
            alert("Email ou senha inválidos!");
        }

        // var usuario = await loginUsuario(loginData.email, loginData.senha);
        // if (usuario !== null) {
        //     alert("Parabens, você lembrou seu login (aqui n temos opção de recuperação, Guarde bem)!");
        //     // Redirecionar para a página inicial ou outra página desejada
        //     return;
        // }

    };

    return (
        <>
            <form className="base-form flex flex-col w-full max-w-xs gap-4" onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" className="" value={loginData.email} onChange={handleChange} required />
                <input name="senha" type="password" placeholder="Senha" className="" value={loginData.senha} onChange={handleChange} required />
                <button type="submit" className="btn-primary py-2 text-[16px] font-bold"> Entrar </button>
            </form>
        </>
    );
}
