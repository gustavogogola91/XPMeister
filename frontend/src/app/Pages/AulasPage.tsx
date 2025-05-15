'use client';

import { useState } from 'react';

const aulasData = [
  { 
    title: 'Introdução', 
    videoId: 'GmZhlZaonFY',
    content: `1. Contextualização (0:00)...` // Seu conteúdo completo aqui
  },
  { 
    title: 'Desenvolvimento', 
    videoId: 'X1ksx_pVpVQ',
    content: `Conteúdo desenvolvimento...`
  },
  { 
    title: 'Conclusão', 
    videoId: 'H30oAN1QsPA',
    content: `Conteúdo conclusão...`
  }
];

const AulasPage = () => {
  const [currentAulaIndex, setCurrentAulaIndex] = useState(0);
  const currentAula = aulasData[currentAulaIndex];



  return (
    <div className="flex flex-col my-10 md:my-0 md:flex-row items-center justify-between">
      {/* Sidebar */}
      <aside className="hidden md:inline w-77 border-2 border-purple-500 rounded h-[250px] p-4">
        <h2 className="text-center text-2xl text-purple font-black mb-2">AULAS</h2>
        <ul className="space-y-1">
          {aulasData.map((aula, index) => (
            <li
              key={index}
              onClick={() => setCurrentAulaIndex(index)}
              className={`px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ${
                currentAulaIndex === index ? 'bg-purple-100 text-purple-600' : ''
              }`}
            >
              Aula {index + 1} – {aula.title}
            </li>
          ))}
          <li className="text-purple-600 font-semibold px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
            DESAFIO – <span className="text-black">CRIE UM PROJETO</span>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex flex-col w-full items-center rounded p-4 md:ml-6">
        <h1 className="text-purple-600 text-xl font-bold mb-5 text-center">
          {currentAula.title}
        </h1>
        
        {/* Player de vídeo */}
        <div className="relative w-full aspect-video bg-white rounded border border-purple-300 overflow-hidden">
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${currentAula.videoId}`} 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <button 
          className="px-8 py-2 bg-purple-200 rounded-b-sm text-purple-600 font-semibold mt-4 cursor-pointer hover:bg-purple-300 transition-colors">
          Resumo
        </button>

        {/* Navegação entre aulas */}
        <div className="w-full mt-6 flex justify-between items-center">
          {currentAulaIndex > 0 && (
            <button
              onClick={() => setCurrentAulaIndex(prev => prev - 1)}
              className="px-4 py-2 bg-purple-200 text-purple-600 rounded font-semibold cursor-pointer hover:bg-purple-300 transition-colors"
            >
              ← Aula anterior
            </button>
          )}
          
          {currentAulaIndex < aulasData.length - 1 && (
            <button
              onClick={() => setCurrentAulaIndex(prev => prev + 1)}
              className="px-4 py-2 bg-purple-200 text-purple-600 rounded font-semibold cursor-pointer hover:bg-purple-300 transition-colors"
            >
              Próxima aula →
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default AulasPage;