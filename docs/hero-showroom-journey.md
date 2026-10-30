# Hero → galeria de projetos

A experiência agora utiliza uma única timeline em `hero.tsx`. O antigo aumento de uma janela até 1,8× e as três apresentações longas do showroom foram substituídos pela reorganização das três prévias em uma única galeria.

## Sequência

| Progresso | Composição |
| --- | --- |
| 0–15% | Hero e seleção das prévias na composição original |
| 15–38% | Título, descrição, CTAs e detalhes desaparecem completamente |
| 40–80% | As mesmas três imagens se deslocam para colunas fixas, com escala e perspectiva convergentes |
| 76–94% | Cabeçalho e informações dos projetos aparecem |
| 92–100% | As ações passam de seleção para navegação aos cases |

A timeline é reversível. A seleção do hero permanece ao retornar, mas os destinos finais são sempre Corte 14 à esquerda, FATIA 12 ao centro e MORDIDA! à direita. O fundo varia de `#101C36` a `#080F1E`.

As imagens das três janelas permanecem montadas e carregadas durante todo o scroll cinematográfico. A animação combina posições de origem, definidas pela seleção, com posições finais medidas a partir da largura da composição. O scroll controla Motion Values; React só atualiza os modos de interação nos limites das fases.

As composições convencional e medida são isoladas na preparação inicial, evitando deslocar nós da galeria estática para o hero durante a hidratação. Depois dessa preparação, a identidade das três imagens permanece estável ao selecionar, rolar e reverter a cena.

## Camadas e acessibilidade

O conteúdo do hero é uma camada própria, com opacidade zero, `visibility: hidden` e `inert` fora da cena. A antiga regra de `focus-within` que forçava a visibilidade dos botões foi removida.

Cada prévia possui controles irmãos: um botão nativo de seleção no hero e um link para o case na galeria. Apenas um deles fica disponível por vez; não há links dentro de botões. Durante o deslocamento, os controles em movimento ficam inativos.

O foco acompanha o projeto selecionado ao trocar de camada. Tab após a última seleção conduz à galeria; Shift+Tab no primeiro link permite retornar ao hero. O fluxo continua normalmente para o Centro da Juventude após o último projeto, sem contenção de foco.

Os links dos cases usam navegação HTML nativa, mantendo o histórico e o fragmento do showroom ao usar Voltar. As URLs e páginas individuais continuam as mesmas. As demonstrações externas permanecem acessíveis nos respectivos cases.

## Âncoras e adaptação

`#cases` continua único. No modo cinematográfico, seu alvo fica no fim da área de scroll, fora da camada sticky. O hero e a navbar conduzem à galeria pronta. O acesso direto e o retorno pelo histórico são verificados no navegador. O observador da navbar acompanha a mudança do alvo sem alterar seu visual.

A cena cinematográfica usa 200svh em desktops com espaço suficiente (a partir de 1100 × 760 CSS pixels), incluindo a altura da navbar. Tablets, telas baixas, celulares e movimento reduzido recebem hero compacto e galeria em fluxo normal, com duas ou uma coluna conforme a largura. Não há scroll preso ou dependência de mouse nesses modos.

Sem JavaScript, o hero e a galeria convencional continuam renderizados no servidor, com acesso aos cases. As mesmas capturas WebP existentes são usadas em todos os modos. Não foram acrescentados assets, bibliotecas, vídeos, modelos 3D ou iframes.

## Verificação

```powershell
node scripts/verify-site.mjs
node scripts/verify-studio.mjs
node scripts/verify-project-journey.mjs
```

Defina `PLAYWRIGHT_MODULE` caso Playwright esteja fora do projeto e `QA_URL` para o servidor local. O antigo comando `verify-hero-windows.mjs` encaminha para a nova suíte de seleção e transição.

A suíte da jornada captura 0%, 20%, 40%, 60%, 80% e 100%; verifica identidade dos nós de imagem, ocultação completa do hero, seleção repetida, Enter/Espaço, transferência de foco, Tab/Shift+Tab, reversão, três rotas de case, Voltar, acesso direto a `#cases`, layouts responsivos, toque, movimento reduzido e ausência de JavaScript.

Os PNGs e relatórios ficam em `artifacts/project-journey/`. Para a publicação existente, `QA_PRODUCTION=1` e `QA_URL=https://www.vitorhamad.me` executam a conferência em desktop/mobile e geram `artifacts/project-journey-production/`. Requisições de contato são bloqueadas e analytics são interceptados durante essas verificações.

O Centro da Juventude, serviços, sobre, processo, FAQ, contato, formulário, APIs, HamadFlow, páginas individuais, SEO e configurações de publicação foram preservados. O limite de cobertura de navegador continua sendo Edge/Chromium com viewports simuladas, sem auditoria Lighthouse ou aparelhos físicos.

Validação da versão final: lint, TypeScript e build aprovados; 81 combinações de rotas/larguras, 12 verificações comerciais e 18 verificações da jornada aprovadas. Os seis progressos foram inspecionados visualmente. Em uma amostra local sem limitação de rede, o carregamento inicial mediu CLS de 0,00078 e LCP de 644 ms em 1440 × 1000; em 1440 × 780, CLS zero e LCP de 392 ms. São resultados dessas execuções, não métricas Lighthouse ou promessa de desempenho em produção.
