# Viham Dev 2.0 — Interactive Digital Studio

Redesign da homepage no repositório e na publicação existentes, em 30/10/2026.

## Direção e conteúdo

A abertura usa tipografia grande, azul-marinho `#101C36`, profundidade `#0B1529`, verde-lima `#D5F662` e off-white `#F7F8F5`. Manrope, logotipo original, fotografia de Vitor Hamad, contatos e metadados foram preservados. A comunicação apresenta o trabalho de um desenvolvedor independente.

O hero substitui a ilustração por três capturas reais já presentes no repositório. As janelas têm barra de navegador, planos distintos e MORDIDA! em primeiro plano. O showroom segue MORDIDA! → FATIA 12 → Corte 14. Cada apresentação mantém os acessos ao case e à demonstração, identifica o caráter conceitual e utiliza funcionalidades já verificadas nos projetos.

O Centro da Juventude ocupa uma seção editorial própria em contraste com o showroom. Descrição, capturas reais, funcionalidades e links foram mantidos, sem acrescentar métricas de resultados.

Serviços passam a ser uma lista editorial. A seção sobre usa a fotografia existente e contato direto com o autor. O processo mantém as quatro etapas comerciais. O encerramento dá destaque ao convite para contato e conserva todos os campos e estados do formulário.

## Movimento e comportamento

- Entrada por máscaras de linhas: 950 ms, com atrasos de 100/200 ms; sem digitação ou preloader.
- Janelas entram em sequência, terminando em aproximadamente 1,6 s. Os links permanecem disponíveis durante a entrada.
- Parallax de desktop usa Motion Values e springs, com rotação interativa de até 4°/3°, retorno ao repouso e velocidades distintas por plano.
- No scroll, a headline recua e a janela principal cresce até 1,8×. A cena sticky acrescenta cerca de 380 px ao fluxo; a rolagem continua nativa.
- No showroom, MORDIDA! usa rotação mais expressiva; FATIA 12 explora perspectiva no eixo Y; Corte 14 possui revelação por máscara nos navegadores que suportam scroll-driven CSS animations.
- A etiqueta “EXPLORAR” acompanha o ponteiro somente dentro da imagem, limitada às suas bordas. Ela não altera o cursor dos formulários ou da página.
- Botão magnético reutilizado com intensidade reduzida e setas direcionais.
- Marquee único, lento, com pausa manual acessível, pausa ao passar o mouse e interrupção fora da viewport.
- Processo com progressão sequencial dos indicadores, acompanhando a rolagem sem atualizações React a cada frame.
- Navbar sticky, compactação discreta e indicação da seção atual; menu mobile preserva dialog nativo, contenção de foco, Escape e retorno ao botão de abertura.
- Mobile usa composição própria, sem dependência de mouse, sensores ou sticky complexo. O formulário usa largura integral no celular e reorganiza a composição no tablet.

`prefers-reduced-motion` remove a sequência sticky, parallax e marquee. A preferência pode mudar com a página aberta. O primeiro render do cliente corresponde à composição estática do servidor para evitar divergências na hidratação. O conteúdo e os links continuam disponíveis sem JavaScript; o menu interativo e o envio do formulário mantêm seus requisitos anteriores de JavaScript.

## Componentes e arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `src/sections/hero.tsx` | Hero e transição por scroll |
| `src/components/floating-project-windows.tsx` | Composição das três janelas, entrada e parallax |
| `src/components/project-window.tsx` | Janela de navegador com Next/Image e dimensões reais |
| `src/components/project-showcase.tsx` | Showroom, apresentações e etiqueta localizada |
| `src/components/studio-motion.tsx` | Preferências de movimento, progresso, marquee e processo |
| `src/sections/commercial-home.tsx` | Projeto real, serviços, sobre, processo, FAQ e contato |
| `src/components/magnetic-button.tsx` | Reutilização do botão com a identidade atual e movimento opcional |
| `src/components/site-header.tsx` | Navbar compacta e estado da navegação; menu acessível preservado |
| `src/app/page.tsx` | Ordem narrativa das seções |
| `src/app/studio.css` | Sistema visual do redesign e breakpoints |
| `src/app/layout.tsx` | Carregamento do stylesheet do estúdio |
| `src/config/site.ts` | Nova mensagem e CTAs do hero |
| `scripts/verify-site.mjs` | Regressão dos fluxos existentes, atualizada para o showroom |
| `scripts/verify-studio.mjs` | Movimento real, responsividade, fallbacks e capturas |
| `docs/viham-dev-2.md` | Decisões e reprodução da validação |

Não foram alterados o formulário operacional, API de contato, integração HamadFlow, eventos de analytics, variáveis privadas, sitemap, robots, currículo, privacidade ou páginas individuais dos cases. A demonstração HamadFlow continua removida da apresentação.

## Bibliotecas e performance

Next.js, React, TypeScript, Tailwind, Framer Motion, Lucide e Next/Image já faziam parte do projeto. Não foram acrescentadas dependências, Three.js, GSAP, iframes ou vídeos. A perspectiva é construída com CSS 3D; animações contínuas usam transform/opacity e Motion Values, sem renderizações React por frame.

As três capas WebP originais somam aproximadamente 220 KB antes da otimização de Next/Image. Apenas as imagens do hero são eager; a principal recebe prioridade alta. As demais capturas usam lazy loading e `sizes` responsivos. Nenhuma imagem nova foi gerada. A medição local de carregamento inicial, incluindo LCP, CLS e bytes observados, fica em `artifacts/studio/verification.json`; ela não representa um benchmark de rede móvel ou nota Lighthouse.

## Verificação reproduzível

Execute os scripts existentes de lint, typecheck e build (`npm run lint`, `npm run typecheck`, `npm run build`), inicie o build de produção e execute:

```powershell
$env:QA_URL='http://127.0.0.1:3010'
# Se Playwright estiver fora do projeto, defina PLAYWRIGHT_MODULE para sua instalação.
node scripts/verify-contact.mjs
node scripts/verify-site.mjs
node scripts/verify-studio.mjs
```

Neste ambiente, os CLIs de ESLint, TypeScript e Next foram executados diretamente com Node, equivalentes aos scripts npm. O navegador utilizado foi Edge/Chromium em modo headless.

- `verify-site.mjs`: nove rotas × nove larguras (320, 360, 375, 390, 430, 768, 1024, 1440 e 1920), além de foco, menu, âncoras, formulário, quatro galerias, links, SEO, PDF, páginas 404 e retirada do antigo demo.
- `verify-contact.mjs`: contrato de encaminhamento da API, validação, antispam, configuração, sucesso e falhas com upstream simulado.
- `verify-studio.mjs`: parallax e retorno, transição por scroll, etiqueta, marquee e pausa, nove larguras com movimento normal, troca desktop/mobile, mudança de movimento reduzido e renderização sem JavaScript. Também captura hero, showroom, projeto real, serviços, sobre, processo e contato.

As requisições de leads são simuladas ou bloqueadas nos testes. Analytics próprios e o script de analytics hospedado pela Vercel são interceptados durante QA local; nenhum lead fictício é enviado à operação. Os relatórios e PNGs ficam em `artifacts/`, ignorado pelo Git.

Resultado da versão final: lint, TypeScript e build aprovados; 81 combinações de rotas/larguras e 12 verificações do estúdio aprovadas; contrato da API de contato aprovado. Nenhum erro de execução ou hidratação na suíte do estúdio. Na execução local de desktop (1440 × 1000, sem limitação de rede), foram observados LCP de 848 ms, CLS de 0,00066 e 393.170 bytes de recursos iniciais. São medições dessa execução, não uma promessa de desempenho em outros ambientes.

O fluxo de publicação continua sendo commit/push na `main` do repositório existente e deploy automático do mesmo projeto Vercel. Sem novo projeto, domínio ou alteração de DNS.

Limites da verificação: testes de navegador em Edge/Chromium e em viewports simuladas, sem dispositivos físicos, Safari/Firefox ou avaliação Lighthouse. O formulário é validado com respostas simuladas, sem criar pedidos reais em produção.

## Seleção das janelas do hero

O texto decorativo junto à prévia foi removido. As três posições originais agora são papéis (`primary`, `left`, `right`): clicar em uma prévia troca sua posição com a principal, mantendo a terceira janela no lugar. MORDIDA! continua sendo a seleção inicial. Imagens e componentes permanecem montados durante as trocas.

A transição de 650 ms usa Framer Motion. Layout, perspectiva da seleção, scroll, drift do ponteiro e hover têm camadas distintas. O scroll mistura o papel principal com o secundário, incluindo seleções feitas com a cena já avançada; as secundárias mantêm visibilidade. Cada janela forma uma camada de empilhamento própria, e os wrappers transparentes não capturam cliques.

As prévias são botões nativos com nomes acessíveis, `aria-pressed`, foco visível e ativação por Enter/Espaço. A seleção funciona por toque e com movimento reduzido e não navega para os sites. Os acessos às demonstrações continuam no showroom.

`node scripts/verify-hero-windows.mjs` verifica cliques expostos sem forçar alvos cobertos, transição intermediária, repetição, nove trocas rápidas, teclado, parallax/scroll por seleção, nove larguras, toque em áreas expostas e movimento reduzido. O relatório fica em `artifacts/hero-windows/verification.json`. Para conferir a publicação sem enviar leads, use `QA_URL=https://www.vitorhamad.me` e `QA_PRODUCTION=1`; esse modo restringe a matriz de larguras a 390/1440 px. Analytics e contato são interceptados nos dois modos.
