"use client";

import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";

var apiUrl = "http://localhost:5017"
var idModulo = 1; // localStorage.getItem("IdModulo") <- alterar quando implementar 100%

export default function DesafiosPage() {

    const router = useRouter();
    
    const { 'auth-token': AuthToken } = parseCookies();

    useEffect(() => {
        if (typeof window !== 'undefined') {

            if (AuthToken) {
                router.push('/Pages/AulasPage');
            }
        }
    }, [router]);

    return (
      <div className="flex flex-col my-10 md:my-0 md:flex-row items-center justify-between">
        <DesafiosAside />
        <DesafiosMain />
      </div>
    );
  }

function DesafiosAside() {
    return (
        <>
        <aside className="hidden md:inline w-77 border-2 border-purple-500 rounded h-[250px] p-4">
            <h2 className="text-center text-2xl text-purple font-black mb-2">AULAS</h2>
            <ul className="space-y-1">
                <li className="px-2 py-1 hover:bg-gray-100 rounded">Aula 1 – Introdução</li>
                <li className="px-2 py-1 hover:bg-gray-100 rounded">Aula 2 – Desenvolvimento</li>
                <li className="px-2 py-1 hover:bg-gray-100 rounded">Aula 3 – Conclusão</li>
                <li className="text-purple-600 font-semibold px-2 py-1 bg-gray-200 rounded border-1 border-purple-600">DESAFIO –<span className="text-black"> CRIE UM PROJETO</span></li>
            </ul>
        </aside>
        </>
    );
}

function DesafiosMain() {
    const [desafios, setDesafios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDesafios() {
            try {
                const response = await fetch(`${apiUrl}/desafio/buscar-desafios-modulo/${idModulo}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Desafios recebidos:", data);
                    setDesafios(data);
                } else {
                    setDesafios([]);
                }
            } catch (error) {
                setDesafios([]);
            } finally {
                setLoading(false);
            }
        }

        getDesafios();
    }, []);

    if (loading) return <div>Carregando...</div>;

    return(
        <>
        <div className="flex flex-col w-full items-center rounded p-4 md:ml-6">
            <h1 className="text-purple-600 text-xl font-bold mb-5 text-center">QUIZ</h1>
            <p className="text-center mb-8 text-base">Responda as perguntas abaixo e mostre seu conhecimento!</p>
            {desafios.map((desafio, i) => (
            <div key={desafio.id || i} className="mb-8 w-full">
                <h2 className="text-lg font-bold mb-2">{desafio.titulo}</h2>
                <p className="mb-4">{desafio.descricao}</p>
                {desafio.questoes && desafio.questoes.length > 0 ? (
                    <ul className="space-y-2">
                        {desafio.questoes.map((questao: any, idx: number) => (
                            <li key={questao.id || idx}>
                                <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-purple-100 rounded">
                                    {questao.texto}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma questão cadastrada.</p>
                    )}
            </div>
            ))}
            <button className="mt-4 px-8 py-2 bg-purple-200 rounded-b-sm text-purple-600 font-semibold">Enviar Resposta</button>
            <a href="*" className="text-[12px] font-bold text-purple mt-2">Problemas?</a>
            <DesafiosFooter />
        </div>
        </>
    );
}

function DesafiosFooter() {
    return(
        <>
        <div className="w-full mt-6 flex justify-between items-center">
            <button className="px-4 py-2 bg-purple-200 text-purple-600 rounded font-semibold">← Aula anterior</button>

            <button className="px-4 py-2 bg-purple-200 text-purple-600 rounded font-semibold">Próxima aula →</button>
        </div>
        </>
    );
}

function Questao({ questao } : { questao: any }) {
    return (
        <>
        <div className="h-auto md:h-auto w-full bg-white rounded border border-purple-300 p-4 mb-4">
            <p className="text-lg font-semibold mb-4">{questao.texto || "Pergunta"}</p>
        </div>
        </>
    );
    
}