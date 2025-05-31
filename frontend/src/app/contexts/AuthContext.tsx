"use client"

import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";


const apiUrl = "http://localhost:5017"

type AuthContextType = {
    IsAuthenticated: boolean;
    loginUsuario: (data: SignInData) => Promise<boolean>
    logoutUsuario: () => Promise<void>
}

type SignInRequestData = {
    email: string,
    senha: string
}

export type SignInData = {
    // username: string,
    email: string,
    senha: string
}

type User = {
    email: string,
    username: string,
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [IsAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const { 'auth-token': token } = parseCookies();
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    
    async function loginUsuarioRequest(SignInRequestData: SignInRequestData) {
        
        try {
            const response = await fetch(`${apiUrl}/usuario/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(SignInRequestData),
            });

            if (!response.ok) {
                console.log("Erro ao autenticar usuário!");
                return null;
            }

            const data = await response.json();
            // sessionStorage.setItem("usuarioId", data.id);
            // sessionStorage.setItem("usuarioNome", data.nome);
            // console.log("Usuário autenticado:", data.id, data.nome);
            console.log(response.json); //tirar apos debug

            return data;
        } catch (error) {
            console.error("Erro:", error);
            return null;
        }
    }

    async function loginUsuario({ email, senha }: SignInData) {
        // const [user, setUser] = useState<User | null>(null)

        const { token = null } = (await loginUsuarioRequest({ email, senha })) || {};

        if (token) {
            setCookie(undefined, 'auth-token', token, {
                maxAge: 60 * 60 * 1, //1 hora para expirar
            })

            // localStorage.setItem('AuthToken', token);
            setIsAuthenticated(true);
            return true;
        }

        return false;
        //TODO: salvar nome usuario
        // setUser(username);
    }

    async function logoutUsuario() {
        destroyCookie(null, 'auth-token');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ IsAuthenticated, loginUsuario, logoutUsuario }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
