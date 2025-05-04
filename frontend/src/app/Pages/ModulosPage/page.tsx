"use client"

import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies";
import { SetStateAction, useEffect, useState } from "react";

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
        <div className='mt-6 flex flex-col md:flex-row md:items-baseline items-center justify-evenly md:justify-normal md:mb-8'>
            <div className='w-1/4'>
                <h1 className='text-[36px] text-purple text-center font-bold'>FILTRAR</h1>
                <ul className="menu-container">
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
                <div className="hidden inset-x-0 h-px bg-gray-300 top-1/2 -translate-y-1/2 z-0"></div>
            </div>
            <div className='w-3/4'>
                <h1 className='text-[36px] text-purple text-center font-bold md:mb-6'>MÓDULOS</h1>
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