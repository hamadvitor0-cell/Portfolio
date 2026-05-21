# Template Premium de Portfólio

Um template moderno e animado de portfólio para desenvolvedores, designers, freelancers e agências criativas. Ele foi feito para compradores que querem um site bonito e profissional, mas fácil de editar em apenas um arquivo.

## Tecnologias Usadas

- Next.js com App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- SEO e imagem Open Graph
- Configuração pronta para Vercel

## Como Instalar

```bash
npm install
```

## Como Rodar Localmente

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Build de Produção

```bash
npm run build
npm run start
```

## Como Trocar Textos

Edite apenas este arquivo:

```txt
src/config/site.ts
```

Nele você troca nome, cargo, headline, bio, textos do about, projetos, links, serviços, processo, clientes, depoimentos, redes sociais, email, SEO e cores do tema.

## Como Trocar Imagens

Coloque suas imagens em:

```txt
public/images/
```

Depois atualize os caminhos em `src/config/site.ts`, por exemplo:

```ts
image: "/images/meu-projeto.jpg"
```

As imagens locais usam `next/image` para melhor carregamento responsivo.

## Como Editar Projetos

No arquivo `src/config/site.ts`, edite a lista `projects`. Cada projeto tem:

- `title`
- `category`
- `year`
- `description`
- `image`
- `href`
- `liveUrl`
- `repoUrl`
- `tags`

## Como Mudar Cores

No arquivo `src/config/site.ts`, edite `theme.light` e `theme.dark`. As cores usam valores RGB:

```ts
accent: "78 92 255"
```

## Como Publicar na Vercel

1. Envie o projeto para o GitHub.
2. Acesse [Vercel](https://vercel.com).
3. Clique em **Add New Project**.
4. Importe o repositório do GitHub.
5. Mantenha as configurações padrão do Next.js.
6. Clique em deploy.

O arquivo `vercel.json` já está configurado com:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

## Como Enviar para o GitHub

```bash
git add .
git commit -m "Initial portfolio template"
git branch -M main
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git push -u origin main
```

## Estrutura de Pastas

```txt
src/
  app/          Páginas, layout, metadata e CSS global do Next.js
  components/   Componentes reutilizáveis
  config/       Arquivo único para editar o conteúdo do portfólio
  lib/          Funções auxiliares e mapa de ícones
  sections/     Seções da homepage
public/
  images/       Imagens de perfil, projetos e preview social
README.md
README-PTBR.md
vercel.json
```

## Erros Comuns

- Se o visual não atualizar, reinicie o servidor local.
- Se uma imagem não aparecer, confira se ela está em `public/images` e se o caminho começa com `/images/`.
- Se a Vercel falhar no build, rode `npm run build` localmente e corrija o primeiro erro de TypeScript ou importação.
- Se os links sociais estiverem errados, edite `socialLinks` em `src/config/site.ts`.
- Se quiser que o formulário envie email de verdade, conecte um provedor de formulário ou crie uma API route. O formulário incluído é apenas a interface acessível.
