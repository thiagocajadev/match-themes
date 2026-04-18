import { ColorDots, HarmonyDots, NeutralDots, TonalScaleBar, type TheoryEntry } from './theory-visuals';

function ColorBar603010() {
  return (
    <div className="mt-5 space-y-4">
      <div className="flex h-16 w-full overflow-hidden rounded-xl border border-stone-200 shadow-sm">
        <div
          className="flex items-center justify-center text-base font-semibold text-stone-600"
          style={{ flexBasis: '60%', background: 'oklch(0.935 0.003 107)' }}
        >
          60%
        </div>
        <div
          className="flex items-center justify-center text-base font-semibold text-white"
          style={{ flexBasis: '30%', background: 'oklch(0.55 0.18 250deg)' }}
        >
          30%
        </div>
        <div
          className="flex items-center justify-center text-base font-semibold text-white"
          style={{ flexBasis: '10%', background: 'oklch(0.65 0.20 40deg)' }}
        >
          10%
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded" style={{ background: 'oklch(0.935 0.003 107)' }} />
          <span className="text-sm text-stone-600">Neutro — fundos, textos, bordas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded" style={{ background: 'oklch(0.55 0.18 250deg)' }} />
          <span className="text-sm text-stone-600">Primário — botões, links</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded" style={{ background: 'oklch(0.65 0.20 40deg)' }} />
          <span className="text-sm text-stone-600">Destaque — badges, CTAs</span>
        </div>
      </div>
    </div>
  );
}

function TemperatureDemo() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <div
        className="rounded-xl p-5 text-center"
        style={{ background: 'oklch(0.93 0.06 40deg)' }}
      >
        <p className="text-base font-bold" style={{ color: 'oklch(0.35 0.12 40deg)' }}>
          Quente
        </p>
        <p className="mt-1 text-sm" style={{ color: 'oklch(0.48 0.10 40deg)' }}>
          H 0° a 60°
        </p>
      </div>
      <div
        className="rounded-xl p-5 text-center"
        style={{ background: 'oklch(0.93 0.05 250deg)' }}
      >
        <p className="text-base font-bold" style={{ color: 'oklch(0.35 0.10 250deg)' }}>
          Fria
        </p>
        <p className="mt-1 text-sm" style={{ color: 'oklch(0.48 0.08 250deg)' }}>
          H 180° a 280°
        </p>
      </div>
    </div>
  );
}

function SurfaceStack() {
  const layers = [
    { tag: 'S0', label: 'Background',       detail: 'L 0.985 — plano base da página', bg: '#f5f5f4', indent: 0, shadow: false },
    { tag: 'S1', label: 'Sidebar / Surface', detail: 'L 0.970 — painéis laterais',    bg: '#e7e5e4', indent: 1, shadow: false },
    { tag: 'S2', label: 'Card',              detail: 'L 1.000 + sombra suave',         bg: '#ffffff', indent: 2, shadow: true  },
    { tag: 'S3', label: 'Popover / Modal',   detail: 'L 1.000 + sombra profunda',      bg: '#ffffff', indent: 3, shadow: true  },
  ];

  return (
    <div className="mt-5 flex flex-col gap-2">
      {layers.map(({ tag, label, detail, bg, indent, shadow }) => (
        <div
          key={tag}
          className="flex items-center gap-4 rounded-xl border border-stone-200 px-4 py-3"
          style={{
            background: bg,
            marginLeft: indent * 16,
            boxShadow: shadow ? '0 2px 8px oklch(0 0 0 / 10%)' : 'none',
          }}
        >
          <span className="w-6 shrink-0 font-mono text-xs font-bold text-stone-400">{tag}</span>
          <span className="text-sm font-semibold text-stone-800 sm:text-base">{label}</span>
          <span className="ml-auto hidden text-xs text-stone-400 sm:block">{detail}</span>
        </div>
      ))}
    </div>
  );
}

function LightDarkDemo() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <div
        className="rounded-xl border border-stone-200 p-5"
        style={{ background: 'oklch(0.985 0.001 106)' }}
      >
        <p className="text-base font-semibold" style={{ color: 'oklch(0.216 0.006 106)' }}>
          Texto primário
        </p>
        <p className="mt-2 text-sm" style={{ color: 'oklch(0.553 0.013 106)' }}>
          Texto secundário
        </p>
        <span className="mt-3 block font-mono text-[10px] text-stone-400">Light — L 0.985</span>
      </div>
      <div className="rounded-xl p-5" style={{ background: 'oklch(0.165 0.006 106)' }}>
        <p className="text-base font-semibold" style={{ color: 'oklch(0.97 0.001 106)' }}>
          Texto primário
        </p>
        <p className="mt-2 text-sm" style={{ color: 'oklch(0.709 0.01 106)' }}>
          Texto secundário
        </p>
        <span
          className="mt-3 block font-mono text-[10px]"
          style={{ color: 'oklch(0.45 0.01 106)' }}
        >
          Dark — L 0.165
        </span>
      </div>
    </div>
  );
}

export const THEORY_ENTRIES_PT_BR: TheoryEntry[] = [
  {
    id: 'color-theory',
    trigger: '01. Teoria das Cores',
    body: (
      <div className="flex flex-col gap-6 text-base text-stone-700 sm:text-lg">
        <p>
          A teoria das cores estuda como os seres humanos percebem e interpretam as cores, como
          elas interagem entre si e como podem ser usadas para comunicar e criar significado. Na
          base de tudo está o <strong>círculo cromático</strong>, organizado em cores primárias
          (vermelho, amarelo, azul), secundárias (laranja, verde, violeta) e terciárias, que
          combinam um primário com um secundário adjacente.
        </p>
        <p>
          Cada cor carrega três atributos fundamentais: <strong>matiz</strong> (o nome da cor no
          círculo), <strong>croma</strong> (a intensidade ou pureza da cor) e{' '}
          <strong>luminosidade</strong> (o quão clara ou escura ela é).
        </p>
        <p>
          Ferramentas modernas como este estúdio trabalham no espaço <strong>OKLCH</strong>{' '}
          (Lightness, Chroma, Hue), que é perceptualmente uniforme. Um passo de +0.10 em
          luminosidade parece visualmente o mesmo salto independentemente do matiz. Isso é
          impossível em RGB ou HSL, onde cores de mesma "luminosidade" numérica podem parecer
          muito mais brilhantes ou escuras dependendo do matiz.
        </p>
        <p>
          O resultado prático: escalas tonais geradas em OKLCH são visualmente balanceadas, com
          contraste previsível entre paradas, qualidade essencial para temas acessíveis.
        </p>
        <ul className="flex flex-col gap-4 border-l-2 border-stone-200 pl-5">
          <li>
            <strong>Primárias:</strong> vermelho, amarelo, azul. Não podem ser obtidas por mistura.
            <ColorDots hues={[25, 95, 260]} />
          </li>
          <li>
            <strong>Secundárias:</strong> laranja, verde, violeta. Resultado da mistura de dois
            primários.
            <ColorDots hues={[55, 145, 305]} />
          </li>
          <li>
            <strong>Terciárias:</strong> amarelo-verde, azul-violeta etc. Combinação de primário
            com secundário adjacente.
            <ColorDots hues={[125, 285]} />
          </li>
          <li>
            <strong>Quentes vs. frias:</strong> vermelhos e amarelos evocam energia e ação; azuis
            e verdes remetem a calma e confiança.
            <ColorDots hues={[25, 55, 95]} />
            <ColorDots hues={[145, 200, 260]} />
          </li>
          <li>
            <strong>Temperatura de cor:</strong> influencia percepção de distância e peso visual.
            Cores quentes avançam; frias recuam.
            <ColorDots hues={[25, 55]} />
            <ColorDots hues={[200, 260]} />
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'harmonies',
    trigger: '02. Harmonias de Cor',
    body: (
      <div className="flex flex-col gap-6 text-base text-stone-700 sm:text-lg">
        <p>
          Harmonias são relações geométricas no círculo cromático que produzem paletas coesas. Cada
          harmonia tem uma personalidade distinta e serve a contextos diferentes.
        </p>
        <p className="font-mono text-sm text-stone-400">Referência: H = 250° (azul)</p>

        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Complementar (180°)
            </h3>
            <p className="mt-3">
              Duas cores opostas no círculo. Produz máximo contraste e vibração, ideal para calls
              to action e destaques. Use a cor de apoio com moderação (10 a 20% da composição) ou
              o resultado fica agressivo.
            </p>
            <HarmonyDots hues={[250, 70]} labels={['Base 250°', 'Comp. 70°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Análoga (±30°)
            </h3>
            <p className="mt-3">
              Três cores vizinhas no círculo. Produz paletas suaves, naturais e harmoniosas. São
              muito usadas em UIs para criar profundidade sem tensão visual, ideais para fundos e
              superfícies.
            </p>
            <HarmonyDots hues={[220, 250, 280]} labels={['220°', '250°', '280°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Triádica (120°)
            </h3>
            <p className="mt-3">
              Três cores equidistantes. Vibrante e equilibrada: dá variedade sem o choque da
              complementar. Funciona bem quando uma cor domina e as outras atuam como acentos.
            </p>
            <HarmonyDots hues={[250, 10, 130]} labels={['250°', '10°', '130°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Split-Complementar (150° / 210°)
            </h3>
            <p className="mt-3">
              Variação suavizada da complementar: a cor base mais as duas cores adjacentes à sua
              complementar. Mantém o contraste forte com menos tensão. Excelente ponto de partida
              para projetos que precisam de destaque sem parecer chamativo.
            </p>
            <HarmonyDots hues={[250, 40, 100]} labels={['250°', '40°', '100°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Tetrádica / Retangular (60° / 180° / 240°)
            </h3>
            <p className="mt-3">
              Quatro cores formando um retângulo no círculo. Rica em possibilidades, mas exige
              hierarquia clara: defina uma cor dominante, uma de suporte e use as outras duas
              pontualmente. Sem hierarquia, a paleta parece caótica.
            </p>
            <HarmonyDots hues={[250, 310, 70, 130]} labels={['250°', '310°', '70°', '130°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Quadrada (90°)
            </h3>
            <p className="mt-3">
              Quatro cores equidistantes (quadrado no círculo). Ainda mais variada que a tetrádica.
              Use apenas quando precisar de paletas muito ricas e sempre reduza o croma em 2 ou 3
              das 4 cores para não sobrecarregar.
            </p>
            <HarmonyDots hues={[250, 340, 70, 160]} labels={['250°', '340°', '70°', '160°']} />
          </div>

          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-display text-base font-bold text-stone-900 sm:text-xl">
              Neutros
            </h3>
            <p className="mt-3">
              Não é uma harmonia rotacional: são variações de luminosidade com croma mínimo
              derivado da cor base. Resultado são acinzentados sutilmente tonalizados, perfeitos
              para fundos, bordas e textos secundários em temas de qualidade profissional.
            </p>
            <NeutralDots />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'composition',
    trigger: '03. Composição de Cores',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          Composição de cores é a arte de distribuir cores numa interface de forma que o olhar seja
          guiado, a hierarquia fique clara e o conjunto seja agradável. Três princípios fundamentais
          sustentam uma boa composição.
        </p>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Regra 60-30-10
          </h3>
          <p className="mt-3">
            Distribua suas cores em proporções definidas: <strong>60%</strong> para a cor dominante
            (geralmente neutros ou cor primária suavizada), <strong>30%</strong> para a cor de
            suporte e <strong>10%</strong> para a cor de destaque. Essa proporção cria equilíbrio
            visual e direciona a atenção para os elementos certos.
          </p>
          <ColorBar603010 />
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Hierarquia Visual
          </h3>
          <p className="mt-3">
            Cores com maior contraste atraem o olhar primeiro. Use cores saturadas e de alto
            contraste em elementos de ação (botões primários, alertas) e cores neutras em elementos
            de suporte (bordas, fundos de seção, texto secundário).
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Contraste de Luminosidade
          </h3>
          <p className="mt-3">
            O contraste de luminosidade (L em OKLCH) é o principal fator de legibilidade. WCAG AA
            exige mínimo 4.5:1 para texto normal e 3:1 para texto grande. WCAG AAA exige 7:1 e
            4.5:1. Em OKLCH, a diferença de L entre duas paradas é um preditor direto do contraste.
            Por isso, a escala tonal de 11 paradas deste estúdio gera combinações seguras.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Contraste de Temperatura
          </h3>
          <p className="mt-3">
            Além da luminosidade, o contraste de temperatura (quente vs. fria) ajuda a separar
            planos visuais. Um fundo frio com texto quente cria separação mesmo quando as
            luminosidades são próximas, útil para estados hover e elementos interativos.
          </p>
          <TemperatureDemo />
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Espaço em Branco como Cor
          </h3>
          <p className="mt-3">
            O espaço negativo (branco ou neutro claro) é uma cor ativa na composição. Ele cria
            respiro, separa grupos e amplifica a percepção das cores adjacentes. Não tente
            preencher todos os espaços.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'wcag',
    trigger: '04. WCAG e Acessibilidade de Cor',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          WCAG (Web Content Accessibility Guidelines) é o padrão internacional de acessibilidade
          para conteúdo web, publicado pelo W3C. As diretrizes definem critérios mensuráveis para
          garantir que interfaces sejam utilizáveis por pessoas com deficiências visuais, motoras
          ou cognitivas.
        </p>
        <p>
          As guidelines se organizam em três níveis de conformidade: <strong>A</strong> (mínimo),{' '}
          <strong>AA</strong> (padrão da indústria) e <strong>AAA</strong> (excelência). A maioria
          dos produtos digitais busca AA. AAA é obrigatório apenas em contextos de alta criticidade,
          como saúde e serviços governamentais.
        </p>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Critério 1.4.3 — Contraste mínimo de texto
          </h3>
          <p className="mt-3">
            O critério mais relevante para design de paletas. Define a proporção mínima entre a
            luminância do texto e do fundo.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {(
              [
                {
                  level: 'AA',
                  normal: '4.5 : 1',
                  note: 'Texto normal (abaixo de 18pt ou 14pt bold)',
                  bg: 'oklch(0.94 0.08 145deg)',
                  border: 'oklch(0.75 0.15 145deg)',
                  color: 'oklch(0.32 0.12 145deg)',
                },
                {
                  level: 'AAA',
                  normal: '7 : 1',
                  note: 'Exigência elevada para contextos críticos',
                  bg: 'oklch(0.93 0.10 250deg)',
                  border: 'oklch(0.65 0.18 250deg)',
                  color: 'oklch(0.30 0.12 250deg)',
                },
                {
                  level: 'Texto grande',
                  normal: '3 : 1',
                  note: 'Acima de 18pt regular ou 14pt bold',
                  bg: 'oklch(0.95 0.05 80deg)',
                  border: 'oklch(0.72 0.14 80deg)',
                  color: 'oklch(0.35 0.12 80deg)',
                },
              ] as const
            ).map(({ level, normal, note, bg, border, color }) => (
              <div
                key={level}
                className="flex flex-col gap-2 rounded-xl border p-5"
                style={{ background: bg, borderColor: border }}
              >
                <span className="font-mono text-sm font-bold" style={{ color }}>
                  {level}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold" style={{ color }}>
                    {normal}
                  </span>
                </div>
                <p className="text-sm" style={{ color }}>
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            O que é proporção de contraste?
          </h3>
          <p className="mt-3">
            A proporção compara a luminância relativa de duas cores. O branco puro (#fff) tem
            luminância 1.0 e o preto puro (#000) tem luminância 0. A proporção máxima possível é
            21:1 (branco sobre preto). Uma proporção de 4.5:1 significa que a cor mais clara é 4.5
            vezes mais luminosa que a mais escura.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            WCAG e OKLCH
          </h3>
          <p className="mt-3">
            O cálculo oficial de contraste (WCAG 2.x) usa luminância em sRGB, não OKLCH. Mesmo
            assim, a uniformidade perceptual do OKLCH torna as escalas tonais geradas aqui
            altamente previsíveis: paradas afastadas por 4 ou mais posições tendem a satisfazer AA
            na maioria dos matizes. O badge de contraste em cada swatch deste estúdio faz o cálculo
            exato em sRGB para confirmar.
          </p>
          <p className="mt-4">
            O WCAG 3.0 (em desenvolvimento) deve adotar o método APCA (Advanced Perceptual Contrast
            Algorithm), que usa luminância perceptual próxima ao OKLCH. Paletas geradas em OKLCH já
            estão alinhadas com essa direção.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Além do contraste
          </h3>
          <p className="mt-3">
            WCAG cobre mais que cor: foco visível (1.4.11), espaçamento de texto (1.4.12),
            conteúdo em hover (1.4.13) e movimento (2.3.3). Para paletas, os critérios mais diretos
            são 1.4.3 (contraste de texto), 1.4.6 (contraste AAA) e 1.4.11 (contraste de
            componentes não-texto, que exige 3:1).
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Acessibilidade e temas light/dark
          </h3>
          <p className="mt-3">
            Temas têm relação direta com acessibilidade. Um tema bem construído não é apenas
            esteticamente agradável: ele garante que texto, ícones e componentes interativos
            mantenham contraste adequado em ambos os modos, para qualquer usuário, em qualquer
            condição de luz.
          </p>
          <p className="mt-4">
            O Match Themes verifica o contraste WCAG em tempo real em cada swatch da escala tonal.
            Ao exportar o tema para Tailwind v4 ou shadcn, os tokens gerados já carregam as cores
            que você validou visualmente aqui. Se os badges AA e AAA estiverem verdes nas paradas
            que você escolheu para texto e fundo, o tema exportado atende o critério 1.4.3 por
            construção, sem necessidade de auditoria posterior.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'visual-density',
    trigger: '06. Densidade Visual e Sobreposição em Temas',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          Em sistemas de design modernos, uma interface é composta por <strong>camadas</strong>{' '}
          empilhadas. Cada camada tem uma função semântica e uma cor associada. Entender essa
          estrutura é essencial para criar temas consistentes.
        </p>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Hierarquia de Superfícies
          </h3>
          <p className="mt-3">
            A arquitetura típica de um tema tem quatro níveis: <strong>background</strong> (o plano
            mais profundo), <strong>card / surface</strong> (painel elevado sobre o fundo),{' '}
            <strong>popover / overlay</strong> (flutuante sobre cards) e{' '}
            <strong>foreground</strong> (texto e ícones no topo). Cada nível deve ter luminosidade
            claramente distinguível do anterior.
          </p>
          <SurfaceStack />
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Diferença Mínima de Luminosidade
          </h3>
          <p className="mt-3">
            Para que duas superfícies adjacentes sejam percebidas como distintas, a diferença de L
            em OKLCH deve ser de pelo menos <strong>0.05 a 0.08</strong> (equivalente a 1 ou 2
            paradas na escala tonal). Diferenças menores criam névoa visual: o usuário não percebe
            a separação das camadas.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Densidade e Cansaço Visual
          </h3>
          <p className="mt-3">
            Interfaces com muitas cores saturadas em proximidade causam fadiga. A solução é reduzir
            o croma (saturação) das cores de fundo e reservar croma alto para elementos interativos
            e de destaque. Em OKLCH, manter croma abaixo de 0.05 em backgrounds garante
            neutralidade sem perder a tonalidade da paleta.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Sombras e Elevação
          </h3>
          <p className="mt-3">
            Sombras não precisam ser pretas puras. Sombras tonalizadas com a cor base da paleta (um
            azul desaturado para um tema frio, por exemplo) integram melhor com o tema e parecem
            mais naturais. No dark mode, prefira diferença de luminosidade entre superfícies a
            sombras opacas, que desaparecem em fundo escuro.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'light-dark',
    trigger: '07. Como Aproveitar ao Máximo Temas Claro e Escuro',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          Criar um tema escuro de qualidade não é simplesmente inverter as cores do tema claro. São
          estratégias distintas que exigem atenção a como o olho humano percebe a luz em cada
          contexto.
        </p>

        <LightDarkDemo />

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Fundos escuros não são pretos
          </h3>
          <p className="mt-3">
            Fundos muito escuros (L abaixo de 0.10 em OKLCH) criam alto contraste com qualquer
            conteúdo e cansam os olhos em uso prolongado. Os melhores dark themes usam L entre
            0.12 e 0.18 para o background: escuro o suficiente para parecer dark, com ar suficiente
            para o conteúdo respirar.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Nunca use branco puro em dark mode
          </h3>
          <p className="mt-3">
            Texto branco puro (#fff) sobre fundo escuro cria contraste máximo (21:1), mais que o
            necessário. Isso causa halação (glare). Use um off-white com L entre 0.92 e 0.97 para
            texto primário e L entre 0.60 e 0.75 para texto secundário.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Satura cores de destaque no escuro
          </h3>
          <p className="mt-3">
            Em fundos escuros, cores de destaque precisam de mais luminosidade e um pouco mais de
            croma para saltar da superfície. Uma cor de botão primário que funciona com L = 0.55 no
            light mode pode precisar de L = 0.65 a 0.70 no dark mode para manter o mesmo impacto
            visual.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Bordas sutis em dark mode
          </h3>
          <p className="mt-3">
            Em tema claro, bordas com opacidade de 15 a 20% funcionam bem. Em dark mode, bordas
            opacas escuras se fundem com o fundo. Use bordas claras com opacidade de 8 a 12% (como{' '}
            <code>oklch(1 0 0 / 10%)</code>) para separar cards sem criar peso visual excessivo.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Teste em condições reais
          </h3>
          <p className="mt-3">
            Dark themes devem ser testados em tela com brilho reduzido (como à noite) e light
            themes em brilho total (sob luz ambiente). Um contraste que parece adequado no monitor
            calibrado do desenvolvedor pode falhar para usuários em condições diferentes.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'tips',
    trigger: '08. Dicas Práticas de Composição com Escala Tonal',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          A escala tonal de 11 paradas (50 a 950) gerada neste estúdio é sua principal ferramenta
          de composição. Aqui estão combinações testadas e o raciocínio por trás de cada uma.
        </p>

        <TonalScaleBar />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-stone-200 text-left">
                <th className="py-3 pr-4 text-sm font-semibold text-stone-900 sm:text-base">
                  Fundo
                </th>
                <th className="py-3 pr-4 text-sm font-semibold text-stone-900 sm:text-base">
                  Texto / Elemento
                </th>
                <th className="py-3 text-sm font-semibold text-stone-900 sm:text-base">
                  Uso recomendado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {(
                [
                  ['50', '900', 'Texto primário em light mode. Contraste máximo, altamente legível.'],
                  ['50', '600 – 700', 'Texto secundário e metadados em light mode. Mantém hierarquia.'],
                  ['100', '800', 'Cards sobre fundo 50. Cria elevação sutil sem mudar a cor base.'],
                  ['900', '50', 'Texto primário em dark mode. Espelho direto do par light.'],
                  ['900', '300 – 400', 'Texto secundário em dark mode. Mais suave que 50, menos fadiga.'],
                  ['800', '100', 'Cards em dark mode sobre fundo 900. Elevação via clareamento.'],
                  ['500', '50 ou 950', 'Botão primário. 500 é o ponto de equilíbrio de croma, funciona nos dois temas.'],
                  ['200', '800', 'Badges e tags informativas em light mode. Destaque sem agressividade.'],
                ] as const
              ).map(([bg, fg, label], i) => (
                <tr key={i}>
                  <td className="py-3 pr-4 font-mono text-sm sm:text-base">{bg}</td>
                  <td className="py-3 pr-4 font-mono text-sm sm:text-base">{fg}</td>
                  <td className="py-3 text-sm sm:text-base">{label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Por que 50 sobre 900 funciona?
          </h3>
          <p className="mt-3">
            Em OKLCH, a parada 50 tem L aproximado de 0.97 e a parada 900 tem L aproximado de 0.22.
            A diferença de 0.75 produz contraste WCAG muito acima de 7:1 (AAA) independentemente
            do matiz, graças à uniformidade perceptual do espaço OKLCH.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Regra de ouro: pule pelo menos 4 paradas
          </h3>
          <p className="mt-3">
            Para garantir WCAG AA (4.5:1) em qualquer matiz, mantenha uma diferença mínima de 4
            paradas entre fundo e texto (fundo 100 com texto 500, fundo 400 com texto 800). Para
            AAA, use diferença de 6 ou mais paradas. Diferenças menores podem passar em alguns
            matizes e falhar em outros.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(
              [
                { bg: [0.98, 0.01], fg: [0.15, 0.05], bgStop: '50',  fgStop: '900', label: 'AAA',   pass: true  },
                { bg: [0.96, 0.03], fg: [0.50, 0.14], bgStop: '100', fgStop: '600', label: 'AA',    pass: true  },
                { bg: [0.82, 0.09], fg: [0.60, 0.15], bgStop: '300', fgStop: '500', label: 'Falha', pass: false },
                { bg: [0.72, 0.12], fg: [0.60, 0.15], bgStop: '400', fgStop: '500', label: 'Falha', pass: false },
              ] as const
            ).map(({ bg, fg, bgStop, fgStop, label, pass }) => (
              <div
                key={bgStop + fgStop}
                className="flex flex-col overflow-hidden rounded-xl border"
                style={{ borderColor: pass ? 'oklch(0.75 0.15 145deg)' : 'oklch(0.75 0.18 25deg)' }}
              >
                <div
                  className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-6"
                  style={{ background: `oklch(${bg[0]} ${bg[1]} 250deg)` }}
                >
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: `oklch(${fg[0]} ${fg[1]} 250deg)` }}
                  >
                    Texto
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: `oklch(${fg[0]} ${fg[1]} 250deg)` }}
                  >
                    {bgStop} / {fgStop}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between px-3 py-2 text-xs font-semibold"
                  style={{
                    background: pass ? 'oklch(0.95 0.06 145deg)' : 'oklch(0.95 0.06 25deg)',
                    color: pass ? 'oklch(0.35 0.12 145deg)' : 'oklch(0.40 0.15 25deg)',
                  }}
                >
                  <span>{label}</span>
                  <span>{pass ? '✓' : '✗'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Parada 500: a mais versátil
          </h3>
          <p className="mt-3">
            A parada 500 é o centro da escala e geralmente tem L aproximado de 0.55, o ponto onde
            croma costuma atingir seu pico. É a escolha natural para cor de destaque interativo:
            tem identidade forte e contrasta bem tanto com branco (paradas altas) quanto com preto
            (paradas baixas).
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-stone-900 sm:text-xl">
            Cuidado com matizes amarelos e azul-ciano
          </h3>
          <p className="mt-3">
            Amarelo e ciano têm luminância percebida alta mesmo com L moderado. Teste sempre o
            contraste com a ferramenta. Esses matizes podem parecer claros visualmente enquanto o
            número OKLCH indica escuridão suficiente.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col overflow-hidden rounded-xl border border-red-200">
              <div
                className="flex flex-col items-center justify-center gap-1 px-4 py-8"
                style={{ background: 'oklch(0.60 0.20 95deg)' }}
              >
                <span className="font-mono text-base font-bold" style={{ color: 'oklch(0.97 0.01 95deg)' }}>
                  Texto claro
                </span>
                <span className="font-mono text-xs" style={{ color: 'oklch(0.97 0.01 95deg)' }}>
                  Parece legível?
                </span>
              </div>
              <div className="flex items-center justify-between bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
                <span>Amarelo L 0.60 — falha AA</span>
                <span>✗</span>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-xl border border-red-200">
              <div
                className="flex flex-col items-center justify-center gap-1 px-4 py-8"
                style={{ background: 'oklch(0.60 0.18 200deg)' }}
              >
                <span className="font-mono text-base font-bold" style={{ color: 'oklch(0.97 0.01 200deg)' }}>
                  Texto claro
                </span>
                <span className="font-mono text-xs" style={{ color: 'oklch(0.97 0.01 200deg)' }}>
                  Parece legível?
                </span>
              </div>
              <div className="flex items-center justify-between bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
                <span>Ciano L 0.60 — falha AA</span>
                <span>✗</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-stone-500">
            Ambos usam L 0.60 — mesma luminosidade OKLCH do azul (H 250°) que passa AA
            confortavelmente. Amarelo e ciano têm luminância sRGB muito mais alta nesse L, o que
            reduz o contraste contra branco abaixo de 4.5:1.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'references',
    trigger: '09. Referências',
    body: (
      <div className="flex flex-col gap-8 text-base text-stone-700 sm:text-lg">
        <p>
          Recursos recomendados para aprofundar o conhecimento em cor, acessibilidade e sistemas
          de design.
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-display mb-4 text-lg font-bold text-stone-900 sm:text-xl">
              Espaços de cor e OKLCH
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://oklch.com" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  oklch.com
                </a>
                <span className="mt-1 block text-stone-500">
                  Picker interativo OKLCH com conversão em tempo real e visualização de gamut P3
                </span>
              </li>
              <li>
                <a href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Evil Martians — OKLCH in CSS: why quit RGB &amp; HSL
                </a>
                <span className="mt-1 block text-stone-500">
                  Artigo técnico detalhado sobre por que OKLCH é superior para design de sistemas
                </span>
              </li>
              <li>
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  MDN — CSS oklch()
                </a>
                <span className="mt-1 block text-stone-500">
                  Referência oficial da função oklch() em CSS
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-lg font-bold text-stone-900 sm:text-xl">
              Acessibilidade e contraste
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  WCAG 2.2 — Criterion 1.4.3: Contrast (Minimum)
                </a>
                <span className="mt-1 block text-stone-500">
                  Especificação oficial do critério AA (4.5:1)
                </span>
              </li>
              <li>
                <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  WebAIM Contrast Checker
                </a>
                <span className="mt-1 block text-stone-500">
                  Ferramenta online para verificar contraste entre duas cores
                </span>
              </li>
              <li>
                <a href="https://accessibilityinsights.io/docs/web/overview/" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Accessibility Insights for Web
                </a>
                <span className="mt-1 block text-stone-500">
                  Extensão para auditoria de acessibilidade em interfaces reais
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-lg font-bold text-stone-900 sm:text-xl">
              Teoria e ferramentas
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://color.adobe.com/pt/create/color-wheel" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Adobe Color — Roda de Cores
                </a>
                <span className="mt-1 block text-stone-500">
                  Explorador interativo de harmonias com exportação para Illustrator e Photoshop
                </span>
              </li>
              <li>
                <a href="https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1-the-meaning-of-color/" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Smashing Magazine — Color Theory for Designers
                </a>
                <span className="mt-1 block text-stone-500">
                  Série clássica em 3 partes cobrindo significado, temperatura e criação de paletas
                </span>
              </li>
              <li>
                <a href="https://m3.material.io/styles/color/system/overview" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Material Design 3 — Color System
                </a>
                <span className="mt-1 block text-stone-500">
                  Como o Google organiza seu sistema de tokens de cor para suporte a dark e light
                </span>
              </li>
              <li>
                <a href="https://www.refactoringui.com" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Refactoring UI
                </a>
                <span className="mt-1 block text-stone-500">
                  Guia prático dos criadores do Tailwind CSS com capítulo dedicado a paletas e contraste
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-lg font-bold text-stone-900 sm:text-xl">
              Tailwind v4 e shadcn
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="https://tailwindcss.com/docs/colors" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  Tailwind CSS v4 — Colors
                </a>
                <span className="mt-1 block text-stone-500">
                  Documentação oficial de cores e uso de OKLCH no Tailwind v4
                </span>
              </li>
              <li>
                <a href="https://ui.shadcn.com/themes" target="_blank" rel="noreferrer" className="font-semibold text-stone-800 underline underline-offset-4 hover:text-stone-600">
                  shadcn/ui — Themes
                </a>
                <span className="mt-1 block text-stone-500">
                  Referência de tokens de cor usados pelo shadcn e como customizar o tema
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
];
