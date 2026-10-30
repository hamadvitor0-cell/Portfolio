# FATIA 12 — Pizza Studio

Projeto conceitual integrado ao portfólio em 30/10/2026. A ordem dos destaques
é FATIA 12, MORDIDA!, Corte 14 e Centro da Juventude. Os projetos anteriores
permanecem cadastrados. A apresentação individual fica em `/cases/fatia12`.

## Evidências

- Demonstração: https://fatia12-pizza-studio.vercel.app/
- Código local consultado sem alterações: `../../pizzaria`.
- Stack confirmada no `package.json` e componentes: Next.js, React, TypeScript,
  Three.js, React Three Fiber, Drei, GSAP/ScrollTrigger e Tailwind CSS.
- A inspeção visual e o script de captura confirmaram WebGL no desktop e mobile,
  seleção na superfície 3D por raycasting, 12 botões de sabores, transformação
  da pizza inteira, painel de ingredientes/preços, caixa articulada, borda
  recheada, cálculo de totais e persistência do carrinho.
- O checkout demonstrativo foi inspecionado sem enviar dados pessoais, pedidos
  ou mensagens. Não há restaurante real ou processamento de pagamento.
- A composição inicial com 12 sabores é um seletor. Cada item no carrinho
  representa uma pizza inteira de um sabor.
- As imagens gastronômicas da demonstração são geradas por IA. Os arquivos
  adicionados ao portfólio são capturas reais do website, sem montagem visual.

## Capturas

`scripts/capture-fatia12.mjs` usa Playwright e Microsoft Edge para capturar a
versão publicada. Aguarda fontes, texturas WebGL, entrada da cena, transformação
do sabor e abertura completa do carrinho. Confirma que o modo capturado é 3D,
sem usar o fallback 2D. A exportação usa Sharp e WebP com qualidade 85.

| Arquivo em `public/projects/fatia12/` | Dimensões | Bytes |
| --- | --- | --- |
| `cover.webp` | 1440 × 1000 | 71724 |
| `pizza-selected.webp` | 1440 × 1000 | 74850 |
| `cart.webp` | 1440 × 1000 | 22046 |
| `hero-mobile.webp` | 390 × 844 | 31796 |

A captura selecionada mostra Pepperoni. No carrinho, a borda recheada foi
adicionada: R$ 69,90 + R$ 9,00 = R$ 78,90 demonstrativos. A caixa virtual já
está fechada ao fundo do drawer. A sequência de embalagem também foi capturada
para QA em `artifacts/fatia12-boxing.png`.

O relatório de origem e verificação fica em `artifacts/fatia12-captures.json`.

## Integração e performance

- Dados adicionados ao array existente em `src/config/site.ts`.
- Mesmo `ConceptProjectCard`, estilos, hover, entrada e galeria dos projetos
  anteriores. O botão externo aceita o rótulo “Visualizar projeto”; os rótulos
  e links dos projetos anteriores foram preservados.
- Página individual segue o padrão `concept-case`, com metadados, canonical,
  Open Graph, Twitter, CreativeWork, breadcrumbs e entrada no sitemap.
- Capturas com imports estáticos, `next/image`, dimensões reais e lazy loading
  na home. A capa tem aproximadamente 72 kB; as quatro imagens somam cerca de 200 kB.
- Nenhuma dependência adicionada. O portfólio não carrega Three.js, WebGL,
  iframe ou vídeo para apresentar o projeto.
- CTA reutiliza `/#contato`, com a mesma navegação nativa dos outros cases.
- Hero, navbar, logotipo, cores, fontes e informações de contato preservados.

## Validação

`scripts/verify-site.mjs` cobre 320, 360, 375, 390, 430, 768, 1024 e 1440 px,
incluindo todas as larguras solicitadas. Verifica rotas, imagens, overflow,
headings, teclado/foco, as quatro galerias, metadados, ordem dos projetos,
links externos e CTAs. A ausência do projeto removido anteriormente continua
verificada. Formulário e analytics são simulados nos testes locais.

O relatório final e as capturas de revisão ficam em `artifacts/`, ignorado pelo
Git. TypeScript, lint e build usam as ferramentas já instaladas no projeto.

Revisão de 30/10/2026: TypeScript, lint e build aprovados; 72 combinações de
rota e largura passaram. Navegação, quatro galerias, foco, links, metadados e
fluxo de contato foram validados. Nenhuma imagem otimizada falhou e nenhum
erro de JavaScript foi registrado. A cena 3D não é carregada pelo portfólio.
