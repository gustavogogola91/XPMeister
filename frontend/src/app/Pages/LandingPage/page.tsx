"use client"

import { useRouter } from 'next/navigation';

export default function LandingPage(){
    const router = useRouter();


    return(
        <div className="flex flex-col gap-10 items-center mb-20">
            <div className="w-full bg-purple min-h-[280px] flex flex-col justify-center items-center gap-2 md:gap-6">
                <h1 className="md:w-1/2 text-3xl lg:text-5xl font-black text-white text-center">Transforme seu conhecimento em poder</h1>
                <p className="text-[16px] md:text-xl text-white text-center">Cursos práticos para você dominar sua carreira.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="card-landing-page">
                    <img 
                    src="/PlayIcon.png"
                    alt="Descrição da imagem" 
                    className=""
                    />
                    <p>Aprenda no seu ritmo</p>
                </div>
                <div className="card-landing-page">
                    <img 
                    src="/WrenchIcon.png"
                    alt="Descrição da imagem" 
                    className=""
                    />
                    <p>Projetos Práticos</p>
                </div>
                <div className="card-landing-page">
                    <img 
                    src="/DollarIcon.png"
                    alt="Descrição da imagem" 
                    className=""
                    />
                    <p>Nenhum custo inicial</p>
                </div>
            </div>
            <button onClick={() => router.push('/Pages/LoginPage')}  className="btn-primary w-64 md:w-96 h-[80px] md:h-[90px]">Começar Agora</button>
        </div>
    )

}