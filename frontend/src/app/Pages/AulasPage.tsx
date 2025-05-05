'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const aulasRoutes = [
  { title: 'Introdução', path: '' },
  { title: 'Desenvolvimento', path: '/desenvolvimento' },
  { title: 'Conclusão', path: '/conclusao' }
];

const AulasPage = () => {
  const pathname = usePathname();
  const currentAulaIndex = aulasRoutes.findIndex(aula => 
    pathname === `/aulas${aula.path}`
  );

  const handleDownloadResumo = () => {
        const confirmacao = window.confirm("Você deseja baixar o resumo do vídeo?");
        
        if (confirmacao) {
            const resumoContent = `1. Contextualização (0:00)
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
O XP é ideal para ambientes dinâmicos e equipes coesas, mas exige comprometimento com práticas colaborativas e disciplina técnica. Não é "bala de prata": adapte-o conforme o contexto do projeto.`;

            const blob = new Blob([resumoContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Resumo-XP-Programming.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

  return (
    <div className="flex flex-col my-10 md:my-0 md:flex-row items-center justify-between">
      {/* Sidebar */}
      <aside className="hidden md:inline w-77 border-2 border-purple-500 rounded h-[250px] p-4">
        <h2 className="text-center text-2xl text-purple font-black mb-2">AULAS</h2>
        <ul className="space-y-1">
          {aulasRoutes.map((aula, index) => (
            <Link href={`/aulas${aula.path}`} key={aula.path}>
              <li className={`px-2 py-1 hover:bg-gray-100 rounded cursor-pointer ${
                pathname === `/aulas${aula.path}` ? 'bg-purple-100 text-purple-600' : ''
              }`}>
                Aula {index + 1} – {aula.title}
              </li>
            </Link>
          ))}
          <li className="text-purple-600 font-semibold px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
            DESAFIO – <span className="text-black">CRIE UM PROJETO</span>
          </li>
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex flex-col w-full items-center rounded p-4 md:ml-6">
        <h1 className="text-purple-600 text-xl font-bold mb-5 text-center">
          {aulasRoutes[currentAulaIndex]?.title || 'Introdução'}
        </h1>
        
        {/* Player de vídeo */}
        <div className="relative w-full aspect-video bg-white rounded border border-purple-300 overflow-hidden">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/GmZhlZaonFY?si=dcRfGxuUwhIg3OYZ" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <button 
          onClick={handleDownloadResumo}
          className="px-8 py-2 bg-purple-200 rounded-b-sm text-purple-600 font-semibold mt-4 cursor-pointer hover:bg-purple-300 transition-colors">
          Resumo
        </button>

        {/* Navegação entre aulas */}
        <div className="w-full mt-6 flex justify-between items-center">
          {currentAulaIndex > 0 && (
            <Link
              href={`/aulas${aulasRoutes[currentAulaIndex - 1].path}`}
              className="px-4 py-2 bg-purple-200 text-purple-600 rounded font-semibold cursor-pointer hover:bg-purple-300 transition-colors"
            >
              ← Aula anterior
            </Link>
          )}
          
          {currentAulaIndex < aulasRoutes.length - 1 && (
            <Link
              href={`/aulas${aulasRoutes[currentAulaIndex + 1].path}`}
              className="px-4 py-2 bg-purple-200 text-purple-600 rounded font-semibold cursor-pointer hover:bg-purple-300 transition-colors"
            >
              Próxima aula →
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}

export default AulasPage;