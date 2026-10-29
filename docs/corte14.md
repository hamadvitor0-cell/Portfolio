# Corte 14 — Barber Club

Projeto conceitual adicionado aos trabalhos selecionados e à rota `/cases/corte14`.
Os projetos anteriores e seus links foram preservados. Os dados ficam em
`corte14Project`, em `src/config/site.ts`.

## Evidências de conteúdo

- Demonstração: https://corte14-barber-club.vercel.app/
- Código local consultado, sem alterações: `../../barbearia`.
- Stack confirmada no `package.json`, no README e nos componentes: Next.js,
  React, TypeScript, Tailwind CSS e GSAP com ScrollTrigger.
- Recursos confirmados no código e na versão publicada: apresentação interativa
  de serviços, galeria ampliável, menu mobile, animações de entrada/rolagem e
  simulação de agendamento. A simulação não cria reservas, envia dados ou cobra.
- Marca, estabelecimento e profissionais fictícios. As imagens utilizadas no
  website foram geradas por IA; as imagens do portfólio são capturas reais desse
  website, sem montagem ou substituição por fotografias genéricas.

## Capturas

Capturadas do site publicado em 29/10/2026, após o carregamento das fontes,
imagens e animações. Conversão local com Sharp, WebP qualidade 85, com remoção
apenas da faixa de 15 px da barra de rolagem à direita.

| Arquivo em `public/projects/` | Captura | Dimensões | Bytes |
| --- | --- | --- | --- |
| `corte14-cover.webp` | Hero desktop | 1250 × 712 | 46644 |
| `corte14-services.webp` | Seção de serviços | 1250 × 712 | 27414 |
| `corte14-mobile.webp` | Hero mobile, viewport de 390 px | 360 × 812 | 18660 |

O navegador exporta screenshots em dimensões ligeiramente inferiores ao
viewport. As dimensões dos arquivos foram verificadas antes da implementação.
A capa usa `next/image`, carregamento lazy na home e dimensões reservadas.
As capturas usam imports estáticos do Next.js, que gera URLs com hash do arquivo
para renovar o cache quando o conteúdo mudar, sem apagar caches existentes.
A galeria reutiliza `CaseImageCarousel`, com dimensões específicas para a
captura vertical. O CTA da página de detalhes leva ao formulário já existente
em `/#contato`.

## Validação

- Lint: `node node_modules/eslint/bin/eslint.js .`
- TypeScript: `node node_modules/typescript/bin/tsc --noEmit`
- Build: `node node_modules/next/dist/bin/next build`
- Verificação em navegador: `scripts/verify-site.mjs`, incluindo a nova rota,
  card em destaque, identificação conceitual, metadados, link externo seguro,
  galeria mobile, navegação e fluxo de contato existente.
- Larguras cobertas pela verificação: 320, 360, 390, 768, 1024 e 1440 px.

Os testes do formulário usam respostas simuladas, sem enviar leads à operação.
Capturas de QA e o relatório gerado ficam em `artifacts/`, ignorado pelo Git.
