# Match Themes

**Demo ao vivo → [thiagocajadev.github.io/match-themes](https://thiagocajadev.github.io/match-themes/)**

> Lendo em português. [Read in English](README.en.md)

![Version](https://img.shields.io/github/package-json/v/thiagocajadev/match-themes)
![Deploy](https://github.com/thiagocajadev/match-themes/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-ISC-green)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white)

Estúdio de paletas centrado em OKLCH que exporta direto para Tailwind v4 e shadcn.

Escolha uma cor base, selecione uma harmonia e gere uma escala tonal com luminância equilibrada e temas claro/escuro validados por contraste — pronto para colar no seu stylesheet.

---

## Formatos de cor

| Formato | Nome completo | O que descreve |
| :--- | :--- | :--- |
| **HEX** | Hexadecimal | RGB codificado em base 16. `#ff6b35` = vermelho 255, verde 107, azul 53. Aceito universalmente por browsers, CSS e ferramentas de design — mas não carrega informação sobre percepção humana. |
| **RGB** | Vermelho, Verde, Azul | Os três canais de luz que os monitores emitem. Intuitivo para devs, mas matematicamente não-uniforme: adicionar 10 ao canal `G` num tom escuro parece mais do que o mesmo incremento num tom claro. |
| **OKLCH** | Optical Lightness, Chroma, Hue | Espaço de cor perceptualmente uniforme. Seus três eixos mapeiam o que o olho humano realmente percebe. |

Eixos OKLCH:

| Eixo | O que controla | Faixa |
| :--- | :--- | :--- |
| `L` Luminosidade | Quão claro parece ao olho | `0` = preto · `1` = branco |
| `C` Croma | Intensidade / saturação | `0` = cinza · `0.4` = vívido |
| `H` Matiz | Ângulo na roda de cores | `0°` = vermelho · `270°` = roxo |

---

## Por que OKLCH

O HSL produz deriva de luminância entre matizes: um `slate-500` e um `yellow-500` parecem ter brilhos diferentes mesmo com valor `L` idêntico. O OKLCH resolve isso ao operar em espaço de cor perceptualmente uniforme, mantendo contraste consistente conforme o matiz gira.

O Match Themes trabalha em OKLCH de ponta a ponta. Hex e RGB aparecem apenas na camada de renderização.

---

## Teoria das cores

A página `/teoria` traz uma referência educacional completa integrada ao estúdio. Cada tópico é um accordion interativo com explicações e visuais:

| # | Tópico | O que cobre |
| :--- | :--- | :--- |
| 01 | **Teoria das Cores** | Círculo cromático, matiz, croma, luminosidade e OKLCH como espaço perceptual |
| 02 | **Harmonias de Cor** | Complementar, análoga, triádica, tetrádica, split-complementar e monocromática |
| 03 | **Composição de Cores** | Regra 60-30-10, temperatura de cor, proporção e equilíbrio visual |
| 04 | **WCAG e Acessibilidade** | Níveis AA e AAA, razão de contraste mínima, padrões para UI inclusiva |
| 06 | **Densidade Visual** | Superfícies e sobreposições em temas — elevation, camadas e sombras |
| 07 | **Temas Claro e Escuro** | Estratégias para aproveitar ao máximo os dois modos |
| 08 | **Dicas Práticas** | Composição com escala tonal — como montar paletas coesas na prática |
| 09 | **Referências** | Links e fontes utilizadas |

A roda de cores é renderizada em OKLCH ao vivo, refletindo a cor base ativa do estúdio.

---

## Funcionalidades

| Funcionalidade | Detalhe |
| :--- | :--- |
| **7 harmonias** | Complementar · split-complementar · triádica · tetrádica · análoga · monocromática · quadrada |
| **Escala tonal de 11 stops** | Stops 50 → 950 por cor de harmonia, gerados a partir da base via curva de luminosidade OKLCH |
| **Badges de contraste WCAG** | Nível AA / AAA por swatch — avaliado contra branco e preto, melhor par vence |
| **Controle `--radius`** | 6 presets (sharp → pill); ao vivo nos painéis showcase e no CSS exportado |
| **Showcase lado a lado** | Componentes shadcn renderizados em claro e escuro com variáveis CSS escopadas por painel |
| **Export Tailwind v4** | Bloco `@theme` · tokens de role `:root` · overrides `.dark` · copiar ou baixar como `match-themes.css` |
| **Internacionalização** | Interface completa em EN e pt-BR; toggle 🇧🇷🇺🇸 no navbar, persistido no localStorage |
| **Página de teoria** | 9 accordions educacionais com visuais interativos sobre teoria das cores e acessibilidade |

---

## Design Thinking

### Inspiração

O layout é inspirado no [tweakcn](https://tweakcn.com) — navbar sticky que mantém os controles de paleta sempre acessíveis, showcase recolhível para o grid de cores ficar em foco, e export como modal para o fluxo terminar onde começou.

### O produto demonstra a si mesmo

O headline do hero — *Match colors. Ship themes.* — não é estático. A palavra **Match** é pintada com a cor base ativa e **themes** com a segunda cor de harmonia. Trocar o seletor de harmonia repinta o headline ao vivo. O app é seu próprio pitch.

### Loop fechado

A maioria das ferramentas de paleta para na geração de swatches. O Match Themes fecha o loop escolheu → testou → aplicou de forma nativa: escolha uma cor, valide o contraste em componentes shadcn reais, copie um bloco `@theme` pronto para colar. Nenhuma etapa de conversão intermediária, nenhum mapeamento manual de variáveis.

---

## Tipografia

| Papel | Família | Uso |
| :--- | :--- | :--- |
| Display | Libre Baskerville | `h1`–`h6`, `.font-display` — peso editorial para headings |
| Body | Rosario | `html, body` — sans legível para prosa e copy de UI |
| Mono | JetBrains Mono | `code`, `pre`, `kbd`, readouts, labels de nav, eyebrows |

As três são carregadas do Google Fonts e mapeadas para tokens de tema Tailwind v4: `--font-display`, `--font-sans` e `--font-mono`.

---

## Stack

| Camada | Tecnologia |
| :--- | :--- |
| Build | Vite 6 · TypeScript 5 (strict) |
| UI | React 19 · Tailwind v4 · shadcn/ui · Radix UI |
| Matemática | `/src/core` — funções puras, sem DOM, sem React |
| Testes | Vitest 3 · Testing Library (jsdom) · 121 testes |
| Deploy | GitHub Actions → branch `gh-pages` |

A pasta `/src/core` cobre conversão OKLCH, harmonias, escalas tonais, contraste, emissão de CSS e tokens de radius. Feature folders em `/src/features` consomem o `core` via hooks e componentes.

---

## Dev local

| Comando | Efeito |
| :--- | :--- |
| `npm install` | Instala dependências |
| `npm run dev` | Servidor de dev Vite → `http://localhost:5173/match-themes/` |
| `npm test` | Suite completa Vitest (121 testes) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Build de produção em `dist/` |

---

## Deploy (GitHub Pages)

O `base` do Vite é `/match-themes/` por padrão e pode ser sobrescrito via env var `BASE_PATH` no build.

```yaml
- run: npm ci
- run: npm test
- run: npm run build
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

A Action publica `dist/` na branch `gh-pages`; o Pages serve em `https://<owner>.github.io/match-themes/`.

---

## Estrutura do projeto

```
src/
  core/           matemática OKLCH · harmonia · escala · contraste · theme-css · theme-radius
  features/
    colors/        entrada de cor base · seletor de harmonia · toggle de formato · grid tonal
    showcase/      painéis shadcn claro + escuro · controle de radius · card de notificações
    navbar/        nav sticky · dialog de export (copiar + baixar)
    hero/          headline colorido pela paleta · CTA "Criar uma paleta"
    footer/        licença · GitHub · créditos
    theory/        página /teoria · roda de cores OKLCH · 9 accordions educacionais
  components/ui/   primitivos shadcn
```

---

## Licença

[ISC](LICENSE) © 2026 thiagocajadev.
