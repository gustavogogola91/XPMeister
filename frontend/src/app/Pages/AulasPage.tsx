'use client';

import { useState } from 'react';

const aulasData = [
  { 
    title: 'Introdução', 
    videoId: 'GmZhlZaonFY',
    content: `	1. Contextualização (0:00)
O XP Programming é uma metodologia ágil focada em desenvolvimento de software, criada para melhorar a qualidade do código e a adaptação a mudanças. Surgiu como resposta a projetos complexos e burocráticos, priorizando eficiência e colaboração.

2. XP Programming (1:08)
Objetivo principal: Entregar software funcional de forma rápida e iterativa, garantindo alta qualidade.
Foco: Práticas técnicas rigorosas, comunicação próxima com o cliente e feedback constante.

3. Desafios na Evolução dos Desenvolvedores (1:35)
Resistência a mudanças culturais (ex: pair programming).
Adaptação a feedback contínuo e iterações curtas.
Manter disciplina em práticas como TDD (Test-Driven Development) e refatoração.

4. Criador do XP (2:40)
Kent Beck, na década de 1990, formalizou o XP no livro "Extreme Programming Explained".
Inspirado em projetos da Chrysler, onde buscou simplificar processos e aumentar a eficiência.

5. Os 5 Valores do XP (3:11)
Comunicação: Evitar ambiguidades e silos de informação.
Simplicidade: Fazer apenas o necessário, sem complexidade desnecessária.
Feedback: Constante (clientes, testes, equipe).
Coragem: Tomar decisões difíceis (ex: descartar código).
Respeito: Valorizar contribuições de todos no time.

6. Princípios do XP (4:34)
Humanidade: Respeitar limites e necessidades da equipe.
Economia: Foco no que traz valor imediato.
Melhoria contínua: Buscar evolução constante.
Aceitar mudanças: Requisitos podem (e vão) mudar.
Trabalho em pequenos passos: Iterações curtas e entregas incrementais.

7. 12 Práticas do XP (6:16)
Testes Automatizados (TDD): Escrever testes antes do código.
Integração Contínua: Integrar código várias vezes ao dia.
Refatoração: Melhorar código sem alterar funcionalidades.
Pair Programming: Dois desenvolvedores trabalhando juntos.
Design Simples: Evitar over-engineering.
Propriedade Coletiva do Código: Todos podem modificar qualquer parte.
Padrões de Codificação: Estilo consistente no código.
Ritmo Sustentável: Evitar horas extras excessivas.
Pequenas Entregas (Small Releases): Lançar funcionalidades em ciclos curtos.
Metáfora do Sistema: Visão compartilhada da arquitetura.
Cliente no Time (On-site Customer): Acesso direto ao cliente.
Jogo do Planejamento (Planning Game): Priorizar tarefas com o cliente.

8. Ciclo de Vida de Projetos no XP (14:03)
Exploração: Entender requisitos iniciais.
Planejamento: Definir iterações e prioridades.
Iterações: Ciclos de 1-2 semanas com entregas funcionais.
Produção: Estabilizar e otimizar o código.
Manutenção: Ajustes pós-entrega.
Encerramento: Revisão final e lições aprendidas.

9. Quando Não Usar XP? (16:57)
Projetos com requisitos fixos e imutáveis.
Equipes distribuídas (dificulta comunicação próxima).
Clientes indisponíveis para feedback constante.
Projetos de alta escala sem divisão clara em módulos.

10. Conclusão (18:26)
O XP é ideal para ambientes dinâmicos e equipes coesas, mas exige comprometimento com práticas colaborativas e disciplina técnica. Não é "bala de prata": adapte-o conforme o contexto do projeto.`
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
  const [showResumo, setShowResumo] = useState(false);
  const currentAula = aulasData[currentAulaIndex];

  return (
    <div className="flex flex-col my-10 md:my-0 md:flex-row items-center justify-between">
      {/* Modal do Resumo */}
      {showResumo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setShowResumo(false)}
        >
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-600">Resumo da Aula</h2>
              <button 
                onClick={() => setShowResumo(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="whitespace-pre-line text-gray-700">
              {currentAula.content}
            </div>
          </div>
        </div>
      )}

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
          onClick={() => setShowResumo(true)}
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