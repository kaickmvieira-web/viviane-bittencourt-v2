"use client";

import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
const WHATSAPP = "5521974353069";

const catalogo = [
  {
    numero: "01",
    intencao: "Quero entender os próximos seis meses",
    nome: "Mandala Semestral",
    modalidade: "OFFLINE",
    descricao:
      "Uma leitura completa para compreender as principais tendências, movimentos e energias dos seus próximos seis meses.\n\nA Mandala Semestral oferece uma visão ampla do semestre, com 12 áreas da vida analisadas em uma única mesa.\n\nAlém da análise do semestre e do seu Arcano Anual, você ainda pode fazer 3 perguntas ao final.",
    preco: "R$ 522",
    mensagem:
      "Olá! Vim pelo site da Viviane Bittencourt e tenho interesse na Mandala Semestral (R$ 522). Gostaria de saber como funciona e quais são as próximas datas disponíveis. ✨",
  },

  {
    numero: "02",
    intencao: "Quero compreender melhor minha vida amorosa",
    nome: "Jardim de Vênus",
    modalidade: "OFFLINE",
    descricao:
      "Uma leitura dedicada exclusivamente à sua vida amorosa, para compreender os principais aspectos da sua situação afetiva.\n\nO Jardim de Vênus traz seis análises nas cartas, adaptadas ao seu momento atual.\n\nÉ ideal para quem deseja uma leitura totalmente voltada para o amor.",
    preco: "R$ 287",
    mensagem:
      "Olá! Vim pelo site da Viviane Bittencourt e tenho interesse na consulta Jardim de Vênus (R$ 287). Gostaria de saber como funciona e quais são as próximas datas disponíveis. ❤️",
  },

  {
    numero: "03",
    intencao: "Já sei exatamente o que quero perguntar",
    nome: "Seis Chaves",
    modalidade: "OFFLINE",
    descricao:
      "Uma leitura para quem já sabe exatamente o que quer perguntar.\n\nNo Seis Chaves, você pode trazer seis perguntas suas, distribuídas em até duas áreas da sua vida.\n\nAmor, trabalho, dinheiro, família, espiritualidade ou aquilo que é pessoal demais para caber em uma categoria.",
    preco: "R$ 287",
    mensagem:
      "Olá! Vim pelo site da Viviane Bittencourt e tenho interesse na consulta Seis Chaves (R$ 287). Gostaria de saber como funciona e quais são as próximas datas disponíveis. 🔑",
  },

  {
    numero: "04",
    intencao: "Quero entender as energias do meu próximo ciclo",
    nome: "Mapa do Ciclo",
    modalidade: "OFFLINE",
    descricao:
      "Uma leitura para compreender as principais tendências e energias do seu próximo ciclo.\n\nVocê pode escolher entre olhar para os próximos 30 dias ou os próximos 3 meses, passando por energia geral, amor, trabalho, dinheiro, saúde e espiritualidade.",
    preco: "R$ 287",
    mensagem:
      "Olá! Vim pelo site da Viviane Bittencourt e tenho interesse no Mapa do Ciclo (R$ 287). Gostaria de saber como funciona e quais são as próximas datas disponíveis. 🔮",
  },

  {
    numero: "05",
    intencao: "Quero uma experiência completa e ao vivo",
    nome: 'Consulta "O Mundo"',
    modalidade: "ONLINE • AO VIVO",
    descricao:
      'Uma consulta de 1 hora com a Vivi, ao vivo, para você conversar, explicar o que está acontecendo e direcionar a leitura de acordo com aquilo que mais importa para você.\n\nA Consulta "O Mundo" é a experiência mais completa do catálogo e a única em que a Vivi está ao seu lado enquanto as cartas abrem.\n\nInclui seu Arcano Anual, aprofundamento, perguntas durante o atendimento e gravação enviada por e-mail.',
    preco: "R$ 622",
    mensagem:
      'Olá! Vim pelo site da Viviane Bittencourt e tenho interesse na Consulta "O Mundo" (R$ 622). Gostaria de saber como funciona e quais são os próximos horários disponíveis. 🔮',
  },
];

export default function Home() {
  const [pessoasOnline, setPessoasOnline] = useState<number | null>(null);
  const [pulso, setPulso] = useState(false);
  const [arrastando, setArrastando] = useState(false);

  // Modal / zoom
  const [depoimentoAberto, setDepoimentoAberto] =
    useState<number | null>(null);

  // =========================================
  // ESTEIRA
  // =========================================

  const containerRef = useRef<HTMLDivElement | null>(null);

  const arrastandoRef = useRef(false);
  const inicioXRef = useRef(0);
  const scrollInicialRef = useRef(0);

  // Diferencia clique de arraste
  const moveuRef = useRef(false);
  const inicioCliqueXRef = useRef(0);

  // Guarda qual card recebeu o pointerDown
  const cardPressionadoRef = useRef<number | null>(null);

  // Controle dedicado para toque em celular/tablet
  const toqueInicioXRef = useRef(0);
  const toqueScrollInicialRef = useRef(0);
  const toqueMoveuRef = useRef(false);

  // =========================================
  // PESSOAS ONLINE
  // =========================================

  useEffect(() => {
    setPessoasOnline(8 + Math.floor(Math.random() * 10));

    const intervalo = setInterval(() => {
      setPessoasOnline((numeroAtual) => {
        if (numeroAtual === null) return numeroAtual;

        const novoNumero =
          numeroAtual + (Math.random() > 0.5 ? 1 : -1);

        return Math.min(25, Math.max(5, novoNumero));
      });
    }, 9000);

    const intervaloPulso = setInterval(() => {
      setPulso((estadoAtual) => !estadoAtual);
    }, 600);

    return () => {
      clearInterval(intervalo);
      clearInterval(intervaloPulso);
    };
  }, []);

  useEffect(() => {
  let animacao: number;
  let ultimoTempo = performance.now();

  // Posição virtual da esteira.
  // Mantemos esse valor separado do scrollLeft para não perder
  // os valores fracionários no build de produção.
  let posicaoAutomatica = containerRef.current?.scrollLeft ?? 0;

  const velocidade = 25;

  function moverAutomaticamente(tempo: number) {
    const container = containerRef.current;

    const delta = Math.min(
      (tempo - ultimoTempo) / 1000,
      0.1
    );

    ultimoTempo = tempo;

    if (container) {
      const metade = container.scrollWidth / 2;

      if (arrastandoRef.current) {
        // Enquanto o usuário arrasta, apenas acompanha
        // a posição escolhida por ele.
        posicaoAutomatica = container.scrollLeft;
      } else if (metade > 0) {
        // Fora do arraste, movimenta usando a posição virtual.
        posicaoAutomatica += velocidade * delta;

        if (posicaoAutomatica >= metade) {
          posicaoAutomatica -= metade;
        }

        container.scrollLeft = posicaoAutomatica;
      }
    }

    animacao = requestAnimationFrame(
      moverAutomaticamente
    );
  }

  animacao = requestAnimationFrame(
    moverAutomaticamente
  );

  return () => {
    cancelAnimationFrame(animacao);
  };
}, []);

  // =========================================
  // ARRASTE DOS DEPOIMENTOS — MOUSE
  // =========================================

  function iniciarArraste(
    evento: React.PointerEvent<HTMLDivElement>
  ) {
    if (evento.pointerType !== "mouse") return;

    const container = containerRef.current;
    if (!container) return;

    arrastandoRef.current = true;
    setArrastando(true);

    inicioXRef.current = evento.clientX;
    inicioCliqueXRef.current = evento.clientX;
    scrollInicialRef.current = container.scrollLeft;
    moveuRef.current = false;

    evento.currentTarget.setPointerCapture(evento.pointerId);
  }

  function moverArraste(
    evento: React.PointerEvent<HTMLDivElement>
  ) {
    if (evento.pointerType !== "mouse") return;
    if (!arrastandoRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const distancia = evento.clientX - inicioXRef.current;

    if (
      Math.abs(evento.clientX - inicioCliqueXRef.current) > 7
    ) {
      moveuRef.current = true;
    }

    container.scrollLeft = scrollInicialRef.current - distancia;

    const metade = container.scrollWidth / 2;

    if (metade > 0) {
      if (container.scrollLeft >= metade) {
        container.scrollLeft -= metade;
        scrollInicialRef.current -= metade;
      }

      if (container.scrollLeft <= 0 && distancia > 0) {
        container.scrollLeft += metade;
        scrollInicialRef.current += metade;
      }
    }
  }

  function finalizarArraste(
    evento: React.PointerEvent<HTMLDivElement>
  ) {
    if (evento.pointerType !== "mouse") return;
    if (!arrastandoRef.current) return;

    arrastandoRef.current = false;
    setArrastando(false);

    if (evento.currentTarget.hasPointerCapture(evento.pointerId)) {
      evento.currentTarget.releasePointerCapture(evento.pointerId);
    }

    if (
      !moveuRef.current &&
      cardPressionadoRef.current !== null
    ) {
      setDepoimentoAberto(cardPressionadoRef.current);
    }

    moveuRef.current = false;
    cardPressionadoRef.current = null;
  }

  // =========================================
  // ARRASTE DOS DEPOIMENTOS — TOQUE REAL
  // =========================================

  function iniciarToque(
    evento: React.TouchEvent<HTMLDivElement>
  ) {
    const container = containerRef.current;
    const toque = evento.touches[0];

    if (!container || !toque) return;

    arrastandoRef.current = true;
    toqueInicioXRef.current = toque.clientX;
    toqueScrollInicialRef.current = container.scrollLeft;
    toqueMoveuRef.current = false;
  }

  function moverToque(
    evento: React.TouchEvent<HTMLDivElement>
  ) {
    const container = containerRef.current;
    const toque = evento.touches[0];

    if (!container || !toque || !arrastandoRef.current) return;

    const distancia = toque.clientX - toqueInicioXRef.current;

    if (Math.abs(distancia) > 7) {
      toqueMoveuRef.current = true;
    }

    container.scrollLeft =
      toqueScrollInicialRef.current - distancia;

    const metade = container.scrollWidth / 2;

    if (metade > 0) {
      if (container.scrollLeft >= metade) {
        container.scrollLeft -= metade;
        toqueScrollInicialRef.current -= metade;
      }

      if (container.scrollLeft <= 0 && distancia > 0) {
        container.scrollLeft += metade;
        toqueScrollInicialRef.current += metade;
      }
    }
  }

  function finalizarToque() {
    if (!arrastandoRef.current) return;

    arrastandoRef.current = false;

    if (
      !toqueMoveuRef.current &&
      cardPressionadoRef.current !== null
    ) {
      setDepoimentoAberto(cardPressionadoRef.current);
    }

    toqueMoveuRef.current = false;
    cardPressionadoRef.current = null;
  }

  function pressionarCard(numero: number) {
    cardPressionadoRef.current = numero;
  }

  // =========================================
  // FECHAR MODAL
  // =========================================

  function fecharDepoimento() {
    setDepoimentoAberto(null);
  }

  return (
    <main className="min-h-screen bg-creme text-vinho-escuro">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="px-6 md:px-16">

        {/* LINHA PRINCIPAL */}
        <div className="mx-auto flex max-w-[1400px] items-center justify-between border-b border-vinho-escuro/60 py-6">

          {/* NOME */}
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.28em]">
            ✧ Viviane Bittencourt
          </div>

          {/* MENU */}
          <nav className="hidden items-center gap-8 font-sans text-[10px] uppercase tracking-[0.22em] lg:flex">

            <a
              href="#consultas"
              className="transition-opacity hover:opacity-50"
            >
              Consultas
            </a>

            <a
              href="#depoimentos"
              className="transition-opacity hover:opacity-50"
            >
              Relatos
            </a>

            <a
              href="#sobre"
              className="transition-opacity hover:opacity-50"
            >
              Sobre mim
            </a>

            <a
              href="#curso"
              className="transition-opacity hover:opacity-50"
            >
              Curso
            </a>

            <a
              href="#politicas"
              className="transition-opacity hover:opacity-50"
            >
              Políticas
            </a>

            <a
              href="#pagamento"
              className="transition-opacity hover:opacity-50"
            >
              Pagamento
            </a>

            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="bg-vinho px-5 py-4 text-creme transition-opacity hover:opacity-85"
            >
              WhatsApp
            </a>

          </nav>

        </div>


        {/* LINHA INFERIOR */}
        <div className="mx-auto flex max-w-[1400px] items-center justify-between py-5">

          {/* INSTAGRAM + TIKTOK */}
          <div className="flex items-center gap-4 text-vinho">

            <a
              href="https://www.instagram.com/vivianebit/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Viviane Bittencourt"
              className="transition hover:opacity-50"
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="https://www.tiktok.com/@vivianebit"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok da Viviane Bittencourt"
              className="transition hover:opacity-50"
            >
              <FaTiktok size={15} />
            </a>

          </div>


          {/* PESSOAS ONLINE */}
          <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.14em]">

            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                minWidth: "10px",
                minHeight: "10px",
                backgroundColor: "#6f2436",
                borderRadius: "50%",
                opacity: pulso ? 0.25 : 1,
                transform: pulso
                  ? "scale(1.8)"
                  : "scale(1)",
                transition:
                  "transform 0.6s ease-in-out, opacity 0.6s ease-in-out",
              }}
            />

            {pessoasOnline !== null && (
              <span>
                {pessoasOnline} pessoas online agora
              </span>
            )}

          </div>

        </div>


        {/* ESPAÇO ANTES DO CONTEÚDO */}
        <div className="h-32 md:h-44" />

      </header>


      {/* =========================================
    DEPOIMENTOS
========================================= */}

<section
  id="depoimentos"
  className="px-6 pb-32 md:px-16 md:pb-40"
>
  <div className="mx-auto max-w-[1400px]">

    {/* TÍTULO */}
    <div className="mb-12 flex items-end justify-between gap-10">

      <h2 className="max-w-[760px] font-serif text-[46px] font-normal leading-[0.95] tracking-[-0.02em] md:text-[64px]">
        relatos de quem
        <br />

        <em className="font-normal italic text-vinho">
          viveu essa experiência
        </em>
      </h2>

      <p className="hidden pb-2 font-sans text-[9px] uppercase tracking-[0.22em] md:block">
        Arraste ou clique para ampliar
      </p>

    </div>


    {/* =========================================
        ESTEIRA
    ========================================= */}

    <div
      ref={containerRef}
      onPointerDown={iniciarArraste}
      onPointerMove={moverArraste}
      onPointerUp={finalizarArraste}
      onPointerCancel={finalizarArraste}
      onTouchStart={iniciarToque}
      onTouchMove={moverToque}
      onTouchEnd={finalizarToque}
      onTouchCancel={finalizarToque}
      className={
        arrastando
          ? "cursor-grabbing select-none overflow-x-auto"
          : "cursor-grab select-none overflow-x-auto"
      }
      style={{
        touchAction: "none",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >

      <div className="flex w-max">

        {/* PRIMEIRA SEQUÊNCIA */}

        <div className="flex shrink-0 gap-5 pr-5">

          <div
            onPointerDown={() => pressionarCard(0)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

          <div
            onPointerDown={() => pressionarCard(1)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

          <div
            onPointerDown={() => pressionarCard(2)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

          <div
            onPointerDown={() => pressionarCard(3)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

          <div
            onPointerDown={() => pressionarCard(4)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

        </div>


        {/* SEGUNDA SEQUÊNCIA — CÓPIA PARA LOOP INFINITO */}

        <div
          className="flex shrink-0 gap-5 pr-5"
          aria-hidden="true"
        >

          <div
            onPointerDown={() => pressionarCard(0)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

          <div
            onPointerDown={() => pressionarCard(1)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

          <div
            onPointerDown={() => pressionarCard(2)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

          <div
            onPointerDown={() => pressionarCard(3)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

          <div
            onPointerDown={() => pressionarCard(4)}
            className="h-[360px] w-[260px] shrink-0 border border-vinho-escuro/30 bg-vinho/5 md:h-[420px] md:w-[300px]"
          />

        </div>

      </div>

    </div>


    {/* BOTÃO */}

    <div className="mt-12 flex justify-center">

      <button
        type="button"
        className="border border-vinho-escuro px-8 py-4 font-sans text-[10px] uppercase tracking-[0.25em] transition hover:bg-vinho hover:text-creme"
      >
        Ver mais
      </button>

    </div>

  </div>
</section>
      {/* =========================================
    INTRODUÇÃO DAS CONSULTAS
========================================= */}

<section
  id="consultas"
  className="px-6 pb-32 pt-10 md:px-16 md:pb-44 md:pt-20"
>
  <div className="mx-auto max-w-[1400px]">

    <div className="grid items-start gap-12 lg:grid-cols-[1.6fr_0.7fr] lg:gap-24">

      {/* TÍTULO */}

      {/* TÍTULO */}

<div>
  <h2 className="font-serif text-[64px] font-normal leading-[0.95] tracking-[-0.035em] text-vinho-escuro sm:text-[76px] md:text-[88px] lg:text-[100px]">
    meu{" "}
    <em className="font-normal italic text-vinho">
      catálogo
    </em>
  </h2>
</div>

      {/* TEXTO LATERAL */}

      <div className="max-w-[360px] pt-2 lg:pt-5">

        <p className="font-sans text-[11px] uppercase leading-[1.8] tracking-[0.18em] text-vinho-escuro/70">
          Cada momento pede um olhar diferente.
          Conheça as consultas e encontre aquela
          que mais conversa com o que você está
          vivendo agora.
        </p>

        <div className="mt-8 h-px w-full bg-vinho-escuro/30" />

        <p className="mt-5 font-sans text-[9px] uppercase tracking-[0.22em] text-vinho">
          Escolha sua consulta ↓
        </p>

      </div>

    </div>

  </div>
</section>
{/* =========================================
    CATÁLOGO DE CONSULTAS
========================================= */}

<section className="px-6 pb-32 md:px-16 md:pb-44">

  <div className="mx-auto max-w-[1400px]">

    <ol className="grid border-t border-vinho-escuro md:grid-cols-2">

      {catalogo.map((consulta) => (

        <li
          key={consulta.numero}
          className="border-b border-vinho-escuro py-10 md:px-8 md:py-12 md:odd:pl-0 md:even:border-l md:even:pr-0"
        >

          {/* NÚMERO + INTENÇÃO */}

          <div className="flex items-start gap-5">

            <span className="shrink-0 font-serif text-[64px] font-normal leading-none text-vinho md:text-[72px]">
              {consulta.numero}
            </span>

            <h3 className="pt-2 font-serif text-[28px] font-normal italic leading-[1.05] text-vinho-escuro md:text-[32px]">
              “{consulta.intencao}”
            </h3>

          </div>


          {/* CONTEÚDO */}

          <div className="mt-7 border-l-2 border-vinho pl-5">

            {/* MODALIDADE + NOME */}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">

              <span className="text-[15px] text-vinho">
                ✦
              </span>

              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-vinho">
                {consulta.modalidade}
              </span>

              <span className="text-vinho-escuro/30">
                •
              </span>

              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.25em] text-vinho-escuro">
                {consulta.nome}
              </span>

            </div>


            {/* DESCRIÇÃO */}

            <p className="mt-5 whitespace-pre-line font-sans text-[14px] leading-[1.8] text-vinho-escuro/80 md:text-[15px]">
              {consulta.descricao}
            </p>


            {/* INVESTIMENTO */}

            <div className="mt-8">

              <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-vinho-escuro/60">
                Investimento
              </p>

              <p className="mt-1 font-serif text-[40px] font-normal leading-none text-vinho">
                {consulta.preco}
              </p>

            </div>


            {/* WHATSAPP */}

            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                consulta.mensagem
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-block bg-vinho px-6 py-4 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-creme transition hover:opacity-85"
            >
              Contratar pelo WhatsApp
            </a>

          </div>

        </li>

      ))}

    </ol>

  </div>

</section>
{/* =========================================
    SOBRE MIM
========================================= */}

<section
  id="sobre"
  className="border-t border-vinho-escuro bg-vinho px-6 py-24 md:px-16 md:py-36"
>
  <div className="mx-auto max-w-[1400px]">

    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">

      {/* FOTO */}

      <div className="relative mx-auto w-full max-w-[560px]">

        <div className="aspect-[4/5] w-full overflow-hidden bg-creme/10">
          <img
            src="/images/viviane-sobre.png"
            alt="Viviane Bittencourt"
            className="h-full w-full object-cover"
          />
        </div>

        {/* DETALHE SOBREPOSTO */}

        <div className="absolute -bottom-5 -right-3 border border-creme/60 bg-vinho px-5 py-3 md:-right-7">
          <span className="font-serif text-[22px] italic text-creme">
            Viviane Bittencourt
          </span>
        </div>

      </div>


      {/* TEXTO */}

      <div className="lg:max-w-[570px]">

        <p className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-creme">
          um pouco sobre mim
        </p>

        <h2 className="mt-5 font-serif text-[58px] font-normal leading-[0.9] tracking-[-0.035em] text-creme sm:text-[68px] md:text-[78px]">

          prazer,
          <br />

          <em className="font-normal italic text-creme">
            sou a Viviane
          </em>

        </h2>


        <div className="mt-10 h-px w-20 bg-creme/60" />


        <div className="mt-10 space-y-6 font-sans text-[14px] leading-[1.9] text-creme/80 md:text-[15px]">

          <p>
            Sou Viviane Bittencourt, cartomante e taróloga, e trabalho
            com as cartas há mais de cinco anos. Nesse caminho, já
            acolhi pessoas de diferentes lugares do Brasil e do mundo,
            em atendimentos que respeitam a história, o momento e as
            perguntas de cada pessoa.
          </p>

          <p>
            Trabalho com Tarot, Baralho Cigano e Sibila Italiana,
            entre outros oráculos. Cada leitura é feita com cuidado,
            escuta e sensibilidade, para ajudar você a olhar com mais
            clareza para os caminhos e possibilidades à sua frente.
          </p>

          <p>
            Também sou umbandista e apaixonada pela minha fé. A
            espiritualidade faz parte de quem sou e da forma como
            conduzo meu trabalho, sempre com respeito às crenças e à
            jornada de quem chega até mim.
          </p>

        </div>

      </div>

    </div>

  </div>
</section>
{/* =========================================
    CURSO
========================================= */}

<section
  id="curso"
  className="border-t border-vinho-escuro px-6 py-24 md:px-16 md:py-36"
>
  <div className="mx-auto max-w-[1400px]">

    <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-28">

      {/* LADO ESQUERDO */}

      <div>

        <p className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-vinho">
          para quem quer ir além das consultas
        </p>

        <h2 className="mt-5 font-serif text-[60px] font-normal leading-[0.9] tracking-[-0.035em] text-vinho-escuro sm:text-[72px] md:text-[86px]">

          do zero ao
          <br />

          <em className="font-normal italic text-vinho">
            baralho cigano
          </em>

        </h2>

      </div>


      {/* LADO DIREITO */}

      <div className="max-w-[460px]">

        <p className="font-sans text-[14px] leading-[1.9] text-vinho-escuro/75 md:text-[15px]">
          Aprenda o Baralho Cigano de forma prática e desenvolva
          a confiança para interpretar as cartas por conta própria.
        </p>

        <div className="my-8 h-px w-full bg-vinho-escuro/40" />

        <p className="font-sans text-[9px] uppercase leading-[1.8] tracking-[0.22em] text-vinho-escuro/60">
          Curso por Viviane Bittencourt
        </p>

        <a
          href="https://dozeroaobaralhocigano.my.canva.site/"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center border border-vinho bg-vinho px-7 py-5 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-creme transition hover:bg-transparent hover:text-vinho"
        >
          Quero conhecer o curso →
        </a>

      </div>

    </div>


    {/* FRASE INFERIOR */}

    <div className="mt-20 border-t border-vinho-escuro/40 pt-7">

      <p className="font-serif text-[27px] font-normal italic leading-[1.15] text-vinho-escuro/75 md:max-w-[700px] md:text-[34px]">
        Um novo caminho para quem deseja aprender a
        conversar com as cartas.
      </p>

    </div>

  </div>
</section>
{/* =========================================
    POLÍTICAS DE AGENDAMENTO
========================================= */}

<section
  id="politicas"
  className="border-t border-creme/40 bg-vinho px-6 py-24 md:px-16 md:py-36"
>
  <div className="mx-auto max-w-[1400px]">

    <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-28">

      {/* LADO ESQUERDO */}

      <div>
        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-creme">
          antes de agendar, confira nossas:
        </p>

        <h2 className="mt-5 font-serif text-[58px] font-normal leading-[0.9] tracking-[-0.035em] text-creme sm:text-[68px] md:text-[78px]">
          políticas de
          <br />

          <em className="font-normal italic text-creme">
            agendamento
          </em>
        </h2>

        <p className="mt-9 max-w-[380px] font-sans text-[13px] leading-[1.9] text-creme/70 md:text-[14px]">
          Para garantir um atendimento organizado e transparente,
          peço que todos os clientes leiam atentamente as regras
          antes de realizar o agendamento.
        </p>
      </div>


      {/* LADO DIREITO / ACORDEÃO */}

      <div className="border-t border-creme/40">

        {/* 01 */}

        <details className="group border-b border-creme/40">

          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7">

            <div className="flex items-center gap-5">
              <span className="font-serif text-[24px] italic text-creme">
                01
              </span>

              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] md:text-[11px]">
                Cancelamentos e reagendamentos
              </span>
            </div>

            <span className="text-[26px] font-light text-creme transition-transform duration-300 group-open:rotate-45">
              +
            </span>

          </summary>

          <div className="max-w-[700px] space-y-4 pb-9 pl-[49px] font-sans text-[13px] leading-[1.9] text-creme/75 md:text-[14px]">

            <p className="font-medium text-creme">
              Perguntas objetivas
            </p>

            <p>
              As perguntas objetivas possuem um prazo de entrega informado
              no momento da contratação.
            </p>

            <p>
              O reembolso integral somente será realizado caso esse prazo
              seja ultrapassado sem que a resposta tenha sido entregue.
            </p>

            <p>
              Enquanto o prazo informado estiver vigente, não realizo
              cancelamentos nem reembolsos.
            </p>

            <p className="pt-3 font-medium text-creme">
              Consultas agendadas
            </p>

            <p>
              Consultas com data e horário marcados reservam um espaço
              exclusivo na agenda.
            </p>

            <p>
              • Cancelamentos solicitados com mais de 7 dias de antecedência
              terão devolução de 50% do valor pago.
            </p>

            <p>
              • Cancelamentos realizados na semana da consulta não dão
              direito a reembolso.
            </p>

            <p>
              • Nesses casos, a consulta poderá apenas ser reagendada,
              conforme disponibilidade da agenda.
            </p>

          </div>

        </details>


        {/* 02 */}

        <details className="group border-b border-creme/40">

          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7">

            <div className="flex items-center gap-5">
              <span className="font-serif text-[24px] italic text-creme">
                02
              </span>

              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] md:text-[11px]">
                Atrasos
              </span>
            </div>

            <span className="text-[26px] font-light text-creme transition-transform duration-300 group-open:rotate-45">
              +
            </span>

          </summary>

          <div className="max-w-[700px] space-y-4 pb-9 pl-[49px] font-sans text-[13px] leading-[1.9] text-creme/75 md:text-[14px]">

            <p>
              O horário agendado é reservado exclusivamente para o cliente.
            </p>

            <p>
              • Em caso de atraso de até 15 minutos, o atendimento será
              realizado normalmente, porém o tempo de atraso será descontado
              da duração da consulta.
            </p>

            <p>
              • Em caso de atraso superior a 15 minutos, a consulta deverá
              ser reagendada, conforme disponibilidade da agenda.
            </p>

          </div>

        </details>


        {/* 03 */}

        <details className="group border-b border-creme/40">

          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7">

            <div className="flex items-center gap-5">
              <span className="font-serif text-[24px] italic text-creme">
                03
              </span>

              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] md:text-[11px]">
                Duração das consultas
              </span>
            </div>

            <span className="text-[26px] font-light text-creme transition-transform duration-300 group-open:rotate-45">
              +
            </span>

          </summary>

          <div className="max-w-[700px] space-y-4 pb-9 pl-[49px] font-sans text-[13px] leading-[1.9] text-creme/75 md:text-[14px]">

            <p>
              O tempo contratado corresponde ao período reservado
              exclusivamente para o seu atendimento, e não à soma dos
              minutos de áudios enviados ou recebidos.
            </p>

            <p>
              Esse período inclui toda a dinâmica do atendimento, como ouvir
              seus áudios, realizar a leitura das cartas, interpretar as
              mensagens, responder às dúvidas e fornecer as orientações
              durante a consulta.
            </p>

            <p>
              Nos atendimentos realizados por fotos e áudios, a duração da
              consulta não deve ser medida pela quantidade ou pelo tempo
              total dos áudios enviados e recebidos, mas sim pelo tempo
              efetivamente reservado para a realização do atendimento.
            </p>

          </div>

        </details>


        {/* 04 */}

        <details className="group border-b border-creme/40">

          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7">

            <div className="flex items-center gap-5">
              <span className="font-serif text-[24px] italic text-creme">
                04
              </span>

              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] md:text-[11px]">
                Modalidade dos atendimentos
              </span>
            </div>

            <span className="text-[26px] font-light text-creme transition-transform duration-300 group-open:rotate-45">
              +
            </span>

          </summary>

          <div className="max-w-[700px] space-y-4 pb-9 pl-[49px] font-sans text-[13px] leading-[1.9] text-creme/75 md:text-[14px]">

            <p>
              • Consulta de 1 hora: pode ser realizada por videochamada
              ou por fotos e áudios.
            </p>

            <p>
              • Consulta de 30 minutos: é realizada exclusivamente por
              fotos e áudios.
            </p>

          </div>

        </details>


        {/* 05 */}

        <details className="group border-b border-creme/40">

          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7">

            <div className="flex items-center gap-5">
              <span className="font-serif text-[24px] italic text-creme">
                05
              </span>

              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] md:text-[11px]">
                Limites do atendimento
              </span>
            </div>

            <span className="text-[26px] font-light text-creme transition-transform duration-300 group-open:rotate-45">
              +
            </span>

          </summary>

          <div className="max-w-[700px] space-y-4 pb-9 pl-[49px] font-sans text-[13px] leading-[1.9] text-creme/75 md:text-[14px]">

            <p>
              As leituras têm como objetivo oferecer orientação por meio
              das cartas.
            </p>

            <p>
              Por esse motivo, não realizo atendimentos relacionados a:
            </p>

            <p>• Jogos de azar ou apostas;</p>

            <p>
              • Orientação ou incentivo à prática de crimes ou atos ilícitos;
            </p>

            <p>
              • Pedidos destinados a causar prejuízo deliberado a terceiros.
            </p>

            <p>
              Além disso, as leituras apresentam tendências energéticas e
              probabilidades, e não decretos ou acontecimentos imutáveis.
              O livre-arbítrio e as escolhas de cada pessoa podem modificar
              os caminhos ao longo do tempo.
            </p>

          </div>

        </details>


        {/* 06 */}

        <details className="group border-b border-creme/40">

          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7">

            <div className="flex items-center gap-5">
              <span className="font-serif text-[24px] italic text-creme">
                06
              </span>

              <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] md:text-[11px]">
                Concordância
              </span>
            </div>

            <span className="text-[26px] font-light text-creme transition-transform duration-300 group-open:rotate-45">
              +
            </span>

          </summary>

          <div className="max-w-[700px] pb-9 pl-[49px] font-sans text-[13px] leading-[1.9] text-creme/75 md:text-[14px]">

            <p>
              Ao realizar o pagamento e confirmar o agendamento, o cliente
              declara estar ciente e de acordo com todas as regras desta
              política.
            </p>

          </div>

        </details>

      </div>

    </div>

  </div>
</section>
{/* =========================================
    FORMAS DE PAGAMENTO + RODAPÉ
========================================= */}

<section
  id="pagamento"
  className="border-t border-vinho-escuro bg-creme px-6 pb-8 pt-24 md:px-16 md:pt-32"
>
  <div className="mx-auto max-w-[1400px]">

    {/* PAGAMENTO */}

    <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-28">

      {/* TÍTULO */}

      <div>
        <h2 className="font-serif text-[64px] font-normal leading-[0.92] tracking-[-0.035em] text-vinho-escuro sm:text-[76px] md:text-[88px]">

          formas de
          <br />

          <em className="font-normal italic text-vinho">
            pagamento
          </em>

        </h2>
      </div>


      {/* FORMAS DE PAGAMENTO */}

      <div className="font-sans text-vinho-escuro">

        {/* PIX */}

        <div className="border-b border-vinho-escuro py-6 first:pt-0">

          <p className="text-[14px] font-semibold">
            Pix
          </p>

          <p className="mt-1 text-[13px] text-vinho-escuro/70">
            Pagamento via Pix
          </p>

        </div>


        {/* CARTÃO */}

        <div className="border-b border-vinho-escuro py-6">

          <p className="text-[14px] font-semibold">
            Cartão de crédito
          </p>

          <p className="mt-1 text-[13px] text-vinho-escuro/70">
            Pagamento por cartão de crédito
          </p>

        </div>


        {/* EXTERIOR */}

        <div className="border-b border-vinho-escuro py-6">

          <p className="text-[14px] font-semibold">
            Clientes no exterior
          </p>

          <p className="mt-1 text-[13px] text-vinho-escuro/70">
            PayPal ou Wise
          </p>

        </div>


        {/* OBSERVAÇÃO */}

        <p className="mt-6 max-w-[560px] text-[11px] leading-[1.8] tracking-[0.03em] text-vinho-escuro/70">
          Para informações sobre pagamento e confirmação do
          atendimento, entre em contato pelo WhatsApp.
        </p>

      </div>

    </div>


    {/* RODAPÉ */}

    <footer className="mt-24 border-t border-vinho-escuro py-7">

      <div className="flex flex-col gap-5 font-sans text-[8px] font-medium uppercase tracking-[0.28em] text-vinho-escuro md:flex-row md:items-center md:justify-between">

        <p>
          Viviane Bittencourt · Cartomancia
        </p>

        <p>
          Consultas 100% online
        </p>

        <p>
          © 2026 Viviane Bittencourt · Todos os direitos reservados
        </p>

      </div>

    </footer>

  </div>
</section>
      {/* =========================================
          MODAL / ZOOM
      ========================================= */}

      {depoimentoAberto !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm md:p-8"
          onClick={fecharDepoimento}
        >

          {/* FECHAR */}

          <button
            type="button"
            onClick={fecharDepoimento}
            className="absolute right-6 top-5 z-[10000] cursor-pointer font-sans text-[42px] font-light leading-none text-white md:right-10 md:top-8"
            aria-label="Fechar depoimento"
          >
            ×
          </button>


          {/* CARD AMPLIADO */}

          <div
            className="relative flex h-[78vh] w-full max-w-[540px] items-center justify-center overflow-hidden border border-white/20 bg-creme shadow-2xl"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >

            <div className="px-8 text-center">

              <p className="font-serif text-[48px] italic leading-none text-vinho">
                Depoimento
              </p>

              <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.25em] text-vinho-escuro/70">
                {depoimentoAberto + 1}
              </p>

              <div className="mx-auto my-8 h-px w-16 bg-vinho/30" />

              <p className="font-sans text-[10px] uppercase leading-6 tracking-[0.16em] text-vinho-escuro/50">
                O print do depoimento será exibido aqui
              </p>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}