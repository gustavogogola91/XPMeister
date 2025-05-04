"use client"

import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:5017"
interface ModuleCard {
    id: number,
    titulo: string,
    dificuldade: string,
    descricao: string
}

const ModulosPage = () => {
    const router = useRouter();

    const [Cards, setCards] = useState<ModuleCard[]>([]);
    const [loading, setLoading] = useState(false); // implementar carregando
    const [error, setError] = useState<string | null>(null); // mostrar erro


    const { 'auth-token': AuthToken } = parseCookies();

    useEffect(() => {
        if (typeof window !== 'undefined') {

            if (!AuthToken) {
                router.push('/Pages/LoginPage');
            }
        }
    }, [router]);

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${apiUrl}/modulo`, {
                    method: "GET",
                    // headers: {
                    //   'Authorization': 'Bearer YOUR_TOKEN',
                    // },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                
                setCards(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
            } finally {
                setLoading(false);
            }
        }

        fetchCards()
    }, [apiUrl]);

    return (
        <>
            <div>
                <h1 className='text-[36px] text-purple font-bold'>FILTRAR</h1>
                <li>
                    <ul className='selected'>À Fazer</ul>
                    <ul>Bloqueado</ul>
                    <ul>Concluído</ul>
                </li>
                {/* <div className="absolute inset-x-0 h-px bg-gray-300 top-1/2 -translate-y-1/2 z-0"></div> */}
            </div>
            <div>
                <h1 className='text-[36px] text-purple font-bold'>MÓDULOS</h1>
                {/* <div className="absolute inset-x-0 h-px bg-gray-300 top-1/2 -translate-y-1/2 z-0"></div> */}
                <div>
                    <div>{Cards.map((card) => (
                        <div 
                        key={card.id}
                        className='module-card module-card-completed'>
                            <h2>{card.titulo}</h2>
                            <div className='module-card-icon'>
                                <img src="/DifficultyIcon.png" alt="DifficultyIcon" />
                                <p>{card.dificuldade}</p>
                            </div>
                            <div className='module-card-status completed'>
                                <p>Concluído</p>
                            </div>
                        </div>
                    ))}
                        <div className='module-card module-card-completed'>
                            <h2>Introdução às metodologias ágeis</h2>
                            <div className='module-card-icon'>
                                <img src="/DifficultyIcon.png" alt="DifficultyIcon" />
                                <p>Iniciante</p>
                            </div>
                            <div className='module-card-status completed'>
                                <p>Concluído</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )


}

export default ModulosPage;