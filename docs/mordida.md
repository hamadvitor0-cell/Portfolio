# MORDIDA! — Smash House

Projeto conceitual adicionado em primeiro lugar nos trabalhos selecionados,
seguido por Corte 14, Centro da Juventude e HamadFlow. Todos os projetos
anteriores permanecem cadastrados. A página de detalhes fica em `/cases/mordida`.

## Fontes verificadas

- Site: https://mordida-smash-house.vercel.app/
- Código local consultado, sem modificações: `../../hamburguer`.
- `package.json`, README e componentes confirmam Next.js, React, TypeScript,
  Tailwind CSS e GSAP com ScrollTrigger. O projeto não usa Three.js.
- Filtros de categorias, personalização com adicionais e remoções permitidas,
  ajuste de quantidades, cálculo de totais e persistência no localStorage foram
  confirmados no código e exercitados na versão pública.
- O checkout demonstrativo permite escolher retirada/entrega e copiar um resumo.
  Não há restaurante real, recebimento de pedidos ou processamento de pagamentos.
- As imagens gastronômicas presentes no projeto são geradas por IA. Os assets
  adicionados ao portfólio são capturas reais do website publicado.

## Capturas reais

Capturadas em 29/10/2026 com Playwright e Microsoft Edge. Fontes e imagens
visíveis foram aguardadas; a entrada do hero foi concluída antes de usar o
controle de pausa do próprio site. Nenhum conteúdo visual foi montado ou
substituído. Exportação WebP com Sharp, qualidade 85.

| Arquivo em `public/projects/mordida/` | Dimensões | Bytes |
| --- | --- | --- |
| `cover.webp` | 1440 × 960 | 101982 |
| `menu.webp` | 1440 × 960 | 72834 |
| `mobile.webp` | 390 × 844 | 39552 |
| `cart.webp` | 1440 × 960 | 42882 |

O carrinho capturado contém Mordida Original, bacon extra e remoção de picles,
totalizando R$ 34,90 fictícios. A finalização foi inspecionada sem fornecer
dados pessoais, enviar pedido ou abrir WhatsApp.

`scripts/capture-mordida.mjs` permite repetir as capturas. O relatório da
execução fica em `artifacts/mordida-captures.json`, ignorado pelo Git.

## Integração

- Dados em `mordidaProject`, em `src/config/site.ts`, registrados no array
  existente. A ordem dos projetos antigos usados por índice foi preservada.
- `ConceptProjectCard` é compartilhado por MORDIDA! e Corte 14. Os estilos
  anteriores passaram a usar nomes comuns `concept-*`, sem alterar a paleta,
  tipografia, navbar, hero ou as informações do Corte 14.
- As imagens usam imports estáticos e `next/image`, dimensões reais e
  carregamento lazy na home. A galeria reutiliza `CaseImageCarousel`.
- O CTA leva ao formulário existente em `/#contato`, com navegação nativa para
  substituir corretamente o fragmento de URL após visitar um estudo de caso.
- Metadados próprios, canonical, Open Graph, Twitter, CreativeWork e sitemap.

## Verificação

TypeScript, lint e build seguem os scripts existentes. `scripts/verify-site.mjs`
abrange as oito rotas em seis larguras (320, 360, 390, 768, 1024 e 1440 px),
além das quatro galerias, teclado/foco, imagens, metadados, ordem dos projetos,
links externos, CTAs, layout equivalente a zoom de navegador a 200% e preferência
por movimento reduzido. A simulação de zoom usa viewport de 720 CSS px e DPR 2,
permitindo que as media queries se adaptem como no zoom do navegador; não usa
`style.zoom`, que mantém indevidamente os breakpoints de desktop.

Os testes do formulário usam respostas simuladas, sem criar leads reais.
Capturas de revisão e o relatório final ficam em `artifacts/`.

Revisão de 29/10/2026: TypeScript, lint e build aprovados; 48 combinações de
rota/largura passaram, além dos fluxos de galeria, contato e navegação. Nenhuma
imagem otimizada falhou e nenhum erro de JavaScript foi registrado.
