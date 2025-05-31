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

type FilterItem = 'À Fazer' | 'Bloqueado' | 'Concluído';

const ModulosPage = () => {
    const router = useRouter();

    const [Cards, setCards] = useState<ModuleCard[]>([]);
    const [loading, setLoading] = useState(false); // implementar carregando
    const [error, setError] = useState<string | null>(null); // mostrar erro

    const [selectedFilterItem, setSelectedFilterItem] = useState<FilterItem>('À Fazer');

    const handleFilterItemClick = (item: FilterItem) => {
        setSelectedFilterItem(item);
    }


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
                    headers: {
                        'Authorization': `Bearer ${AuthToken}`,
                    },
                });

                if (response.status === 401) {
                    router.push("LoginPage");
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

         {//TODO: Filtrar cartas que aparecem
        }
        fetchCards()
    }, [apiUrl]);

    return (
        <div className='mt-6 md:my-20 md:mx-10 flex flex-col md:flex-row md:items-baseline items-center justify-evenly md:justify-center md:gap-35'>
            <div className='w-[300px]'>
                <h1 className='text-[34px] text-purple text-center font-bold  md:mb-8'>FILTRAR</h1>
                <ul className="menu-container p-10 border-[1px] border-gray-100 rounded shadow">
                    <li
                        className={`menu-item ${selectedFilterItem === 'À Fazer' ? 'selected' : ''}`}
                        onClick={() => handleFilterItemClick('À Fazer')}
                    >
                        À Fazer
                    </li>
                    <li
                        className={`menu-item ${selectedFilterItem === 'Bloqueado' ? 'selected' : ''}`}
                        onClick={() => handleFilterItemClick('Bloqueado')}
                    >
                        Bloqueado
                    </li>
                    <li
                        className={`menu-item ${selectedFilterItem === 'Concluído' ? 'selected' : ''}`}
                        onClick={() => handleFilterItemClick('Concluído')}
                    >
                        Concluído
                    </li>
                </ul>
            </div>
            {/* <div className="border-b-2 border-gray-400 w-1/2"></div> */}

            {//TODO: Responsividade tela módulos
            }
            <div className=''>
                <h1 className='text-[34px] text-purple text-center font-bold md:mb-8'>MÓDULOS</h1>
                <div className=''>
                    <div
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:w-full gap-4 max-h-[700px] overflow-y-auto overflow-x-hidden
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:bg-gray-alpha
                            [&::-webkit-scrollbar-thumb]:bg-purple'
                    >{Cards.map((card) => (
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
        </div>
    )


}

export default ModulosPage;