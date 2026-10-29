# Viham Dev — implementação e validação

Redesign local realizado em 21/10/2026. Não houve publicação, mudança de domínio, DNS, credenciais ou integração de produção.

## Diagnóstico e direção

O projeto existente usa Next.js 16.2.6, React 19, TypeScript e Tailwind 3, com App Router e deploy configurado para Vercel. A árvore de trabalho estava limpa. Não foi encontrado `AGENTS.md` aplicável ao diretório `Portfolio`.

A home anterior concentrava a oferta em sistemas, usava acentos laranja/vermelho e repetia números e blocos de conteúdo. A nova composição apresenta sites e sistemas logo no início: abertura tipográfica ampla, trabalhos reais, serviços em lista editorial, quatro etapas, apresentação pessoal, cinco dúvidas e contato.

## Arquivos principais

- `src/app/globals.css`: tokens, tipografia, superfícies, layout, responsividade e redução de movimento.
- `src/app/layout.tsx` e `src/config/site.ts`: marca, SEO, contatos, projetos, fonte local, favicon e dados estruturados.
- `src/sections/hero.tsx` e `src/sections/commercial-home.tsx`: nova home.
- `src/components/site-header.tsx` e `site-footer.tsx`: navegação e fechamento com a logo aprovada.
- `src/components/case-image-carousel.tsx` e `src/lib/dialog.ts`: galeria, ampliação, teclado, foco e Escape.
- `src/components/contact-budget-form.tsx`: apresentação, erros associados aos campos, foco no primeiro erro e bloqueio de envio duplicado.
- Páginas de Centro da Juventude, currículo, privacidade e 404: identidade compartilhada.

O endpoint `/api/contact` e o contrato com o HamadFlow foram preservados, incluindo valores internos dos selects, consentimento, honeypot, tempo mínimo, identificador de envio e eventos de analytics. Os testes não enviam leads ou eventos para produção.

## Assets

- A logo PNG anexada foi somente recortada nas margens, preservando o desenho. A versão compacta está em `public/images/brand/viham-dev.webp`, sem vetorização ou reconstrução tipográfica.
- O fundo azul da logo raster é integrado à superfície com composição `lighten`. Os tokens mantêm o azul `#101C36` e o verde-lima `#D5F662`; as cores originais da marca não foram recoloridas.
- O favicon PNG usa um fragmento da marca aprovada. A capa de Facebook foi adaptada por enquadramento para `public/og.png`; não é usada como hero.
- Screenshots reais de Centro da Juventude e a foto existente de Vitor foram reaproveitados. Nenhuma imagem de produto, pessoa ou equipe foi inventada.
- Manrope variável é servida localmente, com licença OFL em `src/app/fonts/OFL.txt`. Não há requisição a Google Fonts na navegação ou durante a build.
- `scripts/prepare-brand.mjs` documenta a preparação dos assets. Ele recebe os caminhos da logo e da capa originais como argumentos; não faz parte da build.

## Validação

Os comandos executados correspondem aos scripts existentes de lint, typecheck e build:

```text
node node_modules/eslint/bin/eslint.js .
node node_modules/typescript/bin/tsc --noEmit
node node_modules/next/dist/bin/next build
node scripts/verify-contact.mjs
```

O contrato de contato foi exercitado diretamente no handler real, com `fetch` simulado e variáveis isoladas no processo do teste. Foram conferidos JSON inválido, validação, honeypot, tempo mínimo, configuração ausente/inválida, encaminhamento, sucesso, rejeição e falha de rede.

`scripts/verify-site.mjs` utiliza Playwright disponível no runtime de QA, sem adicionar dependências ao site. É restrito a um servidor local e intercepta contato e analytics. `PLAYWRIGHT_MODULE` pode indicar o módulo instalado no ambiente; `QA_URL` seleciona a porta e `QA_BROWSER` o canal do navegador.

Verificações de navegador:

- Home, os dois cases, currículo, privacidade e 404 em 320, 360, 390, 768, 1024 e 1440 px.
- Sem rolagem horizontal, IDs duplicados, imagens quebradas ou erros de execução no navegador.
- Um H1 em cada página; âncoras antigas preservadas.
- Menu mobile, foco contido, Escape, retorno de foco e posição da âncora.
- FAQ e galerias, incluindo navegação por teclado e ampliação de telas.
- Formulário vazio, inválido, enviando, falha de servidor, falha de rede, prevenção de duplicidade e sucesso, com respostas simuladas. Dados preservados após falha e limpos após sucesso.
- Zoom de 200%, preferência por redução de movimento, currículo PDF, sitemap e robots.

As capturas e o relatório completo são gravados em `artifacts/`, diretório ignorado pelo Git. `home-1440.png` e `home-390.png` mostram as páginas completas; `hero-*.png` documentam a abertura nas seis larguras. As capturas dos cases também estão nessa pasta.

Os endereços públicos do site e do Centro da Juventude responderam HTTP 200 na checagem de links. Isso confirma a resposta dos endereços, sem auditar as aplicações externas.

## Limites e configuração

As credenciais locais `HAMADFLOW_LEADS_ENDPOINT` e `HAMADFLOW_LEAD_SECRET` não foram fornecidas. O envio efetivo não foi testado contra a operação privada. O comportamento existente de indisponibilidade permanece honesto, com alternativa por WhatsApp. As variáveis esperadas continuam documentadas em `.env.example`.

Não havia Lighthouse instalado; nenhuma pontuação de desempenho ou auditoria WCAG completa foi presumida. A inspeção visual e os testes funcionais descritos acima são a evidência de validação disponível.

## Ajustes após a publicação

- Removidas a assinatura pequena do hero, as microlegendas decorativas, as categorias repetidas e outros rótulos secundários. Informações úteis permanecem com tamanho mínimo de 14 px na home, incluindo ações, avisos e formulário.
- Adicionadas entradas suaves no hero, revelação discreta durante a rolagem quando suportada e movimentos mínimos nos projetos ao passar o mouse. Os efeitos usam CSS, sem nova biblioteca; `prefers-reduced-motion` desativa as animações e deslocamentos decorativos. O conteúdo continua visível durante toda a animação.
- O PDF enviado pelo proprietário substitui o currículo em `/VitorHamad_Curriculo.pdf`, preservando os links existentes. Arquivo de uma página, conferido visualmente e publicado sem alteração dos bytes; SHA-256 `e744a444766b69e90fa03c1ac0fbcfcdf6596297074dfe9d16d8f4cfdc6b0813`.
- Validados efeitos normais, preferência por movimento reduzido, tamanho dos textos nas seis larguras e igualdade entre o anexo e o PDF servido localmente. As verificações funcionais de navegação, formulário, galerias e rotas também passaram.

## Hero com arte e foco no empreendedor

A abertura passou a usar a mensagem “Seu negócio merece um site à altura”, uma área maior e uma ilustração original em destaque. O CTA principal é “Quero meu site profissional”; o secundário leva aos projetos reais. Os textos continuam selecionáveis, com contexto sobre sites e sistemas sob medida, sem promessa de resultado comercial garantido.

A arte de computador e celular foi criada com ImageGen integrado, preserva transparência e é carregada como WebP otimizado de aproximadamente 169 kB. O arquivo e o prompt completo estão documentados em `docs/hero-art.md`. A logo não foi alterada e a arte ilustrativa não substitui os cases reais.

O hero foi verificado em 320, 360, 390, 768, 1024, 1440 e 1773 px: título em três linhas, arte carregada, ausência de rolagem horizontal e CTA acessível cedo no celular. Foram conferidos os dois destinos de navegação, movimento reduzido e leitura sem JavaScript. Lint, TypeScript, build e os testes funcionais existentes passaram.
