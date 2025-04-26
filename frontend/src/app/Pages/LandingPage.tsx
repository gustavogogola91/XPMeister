import PlayIconSvg from "./PlayIcon.svg"; // se for usar como <PlayIcon />

export default function LandingPage(){



    return(
        <div className="flex flex-col gap-10 items-center">
            <div className="w-full bg-purple min-h-[280px] flex flex-col justify-center items-center gap-2 md:gap-6">
                <h1 className="md:w-1/2 text-3xl lg:text-5xl font-black text-white text-center">Transforme seu conhecimento em poder</h1>
                <p className="text-[16px] md:text-xl text-white text-center">Cursos práticos para você dominar sua carreira.</p>
            </div>
            <div>
                <div className="card-landing-page">
                    <img src={PlayIconSvg} alt="playicon" />
                    <p>Aprenda no seu ritmo</p>
                </div>
            </div>
            <button className="btn-primary w-64 md:w-96 h-[80px] md:h-[90px]">Começar Agora</button>
        </div>
    )

}