# Premium Portfolio Template

A modern, animated portfolio template for developers, designers, freelancers, and creative agencies. It is built for buyers who want a polished portfolio they can customize from one file without editing complex component code.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- SEO metadata and Open Graph image
- Vercel-ready configuration

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## HamadFlow Contact Integration

The budget form posts to the portfolio server route `POST /api/contact`. This route validates and sanitizes the payload, then forwards it server-side to HamadFlow. The HamadFlow secret is never exposed to browser code.

Configure these variables in Vercel for the portfolio project:

```env
HAMADFLOW_LEADS_ENDPOINT=https://SEU-HAMADFLOW.vercel.app/api/public/portfolio-request
HAMADFLOW_LEAD_SECRET=mesmo-valor-de-PORTFOLIO_LEAD_SECRET-no-HamadFlow
```

Frontend form -> `/api/contact` -> HamadFlow `/api/public/portfolio-request`.

## Customize Content

Edit one file:

```txt
src/config/site.ts
```

This file controls the name, role, headline, bio, about text, profile image, projects, project links, services, process, clients, testimonials, playground items, social links, email, SEO metadata, and theme colors.

## Replace Images

Place new files in:

```txt
public/images/
```

Then update image paths in `src/config/site.ts`, for example:

```ts
image: "/images/my-project.jpg"
```

Local images are loaded with `next/image` for responsive rendering.

## Edit Projects

In `src/config/site.ts`, update the `projects` array. Each project supports:

- `title`
- `category`
- `year`
- `description`
- `image`
- `href`
- `liveUrl`
- `repoUrl`
- `tags`

## Change Colors

In `src/config/site.ts`, edit `theme.light` and `theme.dark`. Colors use RGB values so opacity works correctly with Tailwind:

```ts
accent: "78 92 255"
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Go to [Vercel](https://vercel.com).
3. Click **Add New Project**.
4. Import the GitHub repository.
5. Keep the default Next.js settings.
6. Deploy.

The included `vercel.json` uses:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

## Upload to GitHub

```bash
git add .
git commit -m "Initial portfolio template"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

## Folder Structure

```txt
src/
  app/          Next.js App Router pages, layout, metadata, global CSS
  components/   Shared UI components
  config/       Single editable portfolio configuration file
  lib/          Utilities and icon mapping
  sections/     Homepage sections
public/
  images/       Replaceable profile, project, and social preview images
README.md
README-PTBR.md
vercel.json
```

## Troubleshooting

- If styles do not update, restart the dev server.
- If an image does not show, confirm the file exists in `public/images` and the path starts with `/images/`.
- If Vercel fails to build, run `npm run build` locally and fix the first reported TypeScript or import error.
- If social links open the wrong page, update `socialLinks` in `src/config/site.ts`.
- If the contact form does not send, confirm `HAMADFLOW_LEADS_ENDPOINT` and `HAMADFLOW_LEAD_SECRET` are configured in Vercel and match the HamadFlow project.
