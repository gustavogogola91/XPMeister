const AulasPage = () => {
    return (
        <div className="flex flex-col my-10 md:my-0 md:flex-row items-center justify-between">
            <aside className="hidden md:inline w-77 border-2 border-purple-500 rounded h-[250px] p-4">
                <h2 className="text-center text-2xl text-purple font-black mb-2">AULAS</h2>
                <ul className="space-y-1">
                    <li className="px-2 py-1 hover:bg-gray-100 rounded">Aula 1 – Introdução</li>
                    <li className="px-2 py-1 hover:bg-gray-100 rounded">Aula 2 – Desenvolvimento</li>
                    <li className="px-2 py-1 hover:bg-gray-100 rounded">Aula 3 – Conclusão</li>
                    <li className="text-purple-600 font-semibold px-2 py-1 hover:bg-gray-100 rounded">DESAFIO –
                        <span className="text-black"> CRIE UM PROJETO</span>
                    </li>
                </ul>
            </aside>

            <main className="flex flex-col w-full items-center rounded p-4 md:ml-6">
                <h1 className="text-purple-600 text-xl font-bold mb-5 text-center">
                    NOME DA AULA
                </h1>
                <div className="h-60 md:h-150 w-full bg-white rounded border border-purple-300">
                    {/* conteúdo principal */}
                </div>
                <button className="px-8 py-2 bg-purple-200 rounded-b-sm text-purple-600 font-semibold">
                    Resumo
                </button>
                <a 
                href="*"
                className="text-[12px] font-bold text-purple">
                    Problemas?
                </a>
                <div className="w-full mt-6 flex justify-between items-center">
                    <button className="px-4 py-2 bg-purple-200 text-purple-600 rounded font-semibold">
                        ← Aula anterior
                    </button>



                    <button className="px-4 py-2 bg-purple-200 text-purple-600 rounded font-semibold">
                        Próxima aula →
                    </button>
                </div>
            </main>
        </div>
    )
}

export default AulasPage;
