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
    content: `1. Introdução ao XP (eXtreme Programming)
Metodologia ágil focada em qualidade, flexibilidade e colaboração.
Objetivo: Entregar software funcional de forma iterativa e adaptativa.

2. Papéis no XP
Cliente: Define requisitos e prioridades (Histórias de Usuário).
Programadores: Desenvolvem o código em pares (Programação em Pares).
Testadores: Garantem a qualidade através de testes.
Coach: Facilita a adoção das práticas do XP.

3. Ciclo de Vida do XP
Planejamento:
Definição de Histórias de Usuário (requisitos em linguagem simples).
Jogo de Planejamento: Priorização colaborativa de tarefas.
Projeto:
Foco em simplicidade (KISS - Keep It Simple, Stupid).
Codificação:
Programação em Pares (dois desenvolvedores trabalhando juntos).
Desenvolvimento Dirigido a Testes (TDD): Criar testes antes do código.
Testes:
Testes Unitários: Validar componentes individuais.
Testes de Integração: Garantir funcionamento entre módulos.
Testes de Aceitação: Aprovação final pelo cliente.

4. Valores do XP
Comunicação: Transparência entre equipe e cliente.
Simplicidade: Evitar complexidade desnecessária.
Feedback Contínuo: Ajustes rápidos baseados em resultados.
Coragem: Para refatorar e adaptar o código.
Respeito: Colaboração e valorização de todos os papéis.

5. Princípios Básicos
Entrega frequente de versões funcionais.
Adaptação a mudanças de requisitos.
Refatoração constante para melhorar o código.

6. Práticas do XP
Test-Driven Development (TDD): Desenvolver com base em testes pré-definidos.
Integração Contínua: Mesclar código diariamente para evitar conflitos.
Metáfora do Sistema: Linguagem comum para descrever o projeto.
Cliente no Time: Participação ativa do cliente no processo.

7. Regras do XP
Planejamento:
Estimativas realistas e priorização colaborativa.
Gerenciamento:
Ritmo sustentável (sem horas extras excessivas).
Projeto:
Foco em design incremental e emergente.
Codificação:
Padrões de codificação compartilhados.
Testes:
Automação de testes em todas as etapas.

8. Vantagens do XP
Redução de riscos com entregas frequentes.
Código mais limpo e mantível (graças à refatoração e TDD).
Alta adaptabilidade a mudanças.
Melhoria na colaboração entre equipe e cliente.

9. Desvantagens do XP
Dependência da participação ativa do cliente.
Desafio em escalar para projetos muito grandes.
Requer disciplina e experiência da equipe.`
  },
  { 
    title: 'Conclusão', 
    videoId: 'H30oAN1QsPA',
    content: `1. Introdução
Scrum:
Framework de organização de trabalho.
Utiliza backlog e sprints (ciclos de 1 a 4 semanas).

XP:
Metodologia focada em práticas técnicas como testes, revisão e integração contínua.
Prioriza soluções simples e eficientes.

2. Qual dos 2 é melhor?
Depende do contexto:
Scrum é mais alinhado com gestão de processos e pode ser aplicado em equipes multidisciplinares.
XP é focado em desenvolvimento de software, com ênfase em qualidade técnica.

Uso combinado:
É possível usar Scrum para gestão do projeto e XP para práticas de codificação.

3. Recapitulando as diferenças
Scrum	XP
Organiza trabalho em sprints.	Foco em práticas técnicas contínuas.
Backlog priorizado pelo Product Owner.	Desenvolve soluções simples (KISS).
Ideal para equipes multidisciplinares.	Voltado para times de desenvolvimento.

4. Boas práticas para escolher
Use Scrum se:
Precisa de estrutura clara para gerenciar prazos e prioridades.
Trabalha com equipes diversas (não apenas desenvolvedores).

Use XP se:
Quer melhorar qualidade técnica (ex: testes automatizados, programação em pares).
Busca flexibilidade para mudanças rápidas no código.
Combine ambos se:
Deseja alinhar gestão de processos (Scrum) com excelência técnica (XP).

5. Qual é melhor?
Não há resposta universal:
Scrum é melhor para gestão ágil de projetos.
XP é melhor para desenvolvimento técnico eficiente.

Dica final:
Avalie as necessidades da equipe:
Se o problema é organização, escolha Scrum.
Se o desafio é qualidade do código, opte por XP.
Combinação dos dois pode ser a solução ideal para times de software.`
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
          className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50"
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