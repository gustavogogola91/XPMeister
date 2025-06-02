"use client";
import React from "react";

const HomePage = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Cabeçalho */}
      <section className="bg-[#af52de] rounded-2xl shadow-lg text-white p-10 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Sobre a XPMeister</h1>
        <p className="text-lg md:text-xl">
          Aprenda <span className="font-semibold">Extreme Programming</span> com a metodologia mais radical do desenvolvimento ágil. 🚀
        </p>
      </section>

      {/* Missão e história */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-[#af52de] mb-3">💡 Nossa Missão</h2>
          <p className="text-gray-700 leading-relaxed">
            Capacitar desenvolvedores com as melhores práticas do XP de forma prática, interativa e divertida.
            Acreditamos que o aprendizado deve ser feito com código real e desafios do mundo real.
          </p>
        </div>
        <div className="bg-[#af52de] text-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-3">📜 Como começamos</h2>
          <p className="leading-relaxed">
            A XPMeister nasceu em 2025, quando um grupo de devs percebeu que o ensino tradicional
            não preparava as pessoas para ambientes ágeis reais. Criamos uma experiência 100% XP.
          </p>
        </div>
      </section>

      {/* O que oferecemos */}
      <section className="bg-[#f4ecfa] p-8 rounded-2xl shadow-md space-y-4">
        <h2 className="text-3xl font-bold text-[#af52de]">🚀 O que oferecemos</h2>
        <ul className="list-disc list-inside text-gray-800 text-lg space-y-1">
          <li>Trilhas gamificadas com desafios XP reais</li>
          <li>Projetos práticos com feedback de mentores</li>
          <li>Certificação de desenvolvedor XPMeister</li>
          <li>Ambiente de simulação de empresas ágeis</li>
        </ul>
      </section>

      {/* Comunidade */}
      <section className="bg-[#af52de] text-white p-8 rounded-2xl shadow-md space-y-3">
        <h2 className="text-3xl font-bold">🌍 Comunidade XPMeister</h2>
        <p className="text-lg leading-relaxed">
          Somos uma rede de +10 mil devs que compartilham conhecimento, colaboram em projetos e crescem juntos!
          Participe dos nossos eventos, hackathons e lives semanais no Discord.
        </p>
        <blockquote className="italic border-l-4 border-white pl-4">
          “XP é mais que código. É cultura, é colaboração, é evolução constante.”
        </blockquote>
      </section>
    </main>
  );
};

export default HomePage;
