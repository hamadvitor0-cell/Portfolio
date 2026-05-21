import type { LucideIcon } from "lucide-react";

export type IconName =
  | "Code2"
  | "Palette"
  | "Rocket"
  | "PenTool"
  | "Layers3"
  | "Sparkles"
  | "Github"
  | "Linkedin"
  | "Twitter"
  | "Dribbble"
  | "Mail"
  | "Globe2";

export type IconMap = Record<IconName, LucideIcon>;

export const siteConfig = {
  // Basic personal or studio identity. Replace these with your real details.
  name: "Vitor Hamad",
  role: "Desenvolvedor Web Full Stack",
  location: "Brasil",
  email: "hamadvitor0@gmail.com",
  availability: "Disponível para projetos freelance",
  headerCta: "Vamos conversar",

  // Brand and navigation. Keep labels short for mobile.
  nav: [
    { label: "Projetos", href: "#work" },
    { label: "Sobre", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "Contato", href: "#contact" }
  ],

  // SEO metadata used by Next.js in src/app/layout.tsx.
  seo: {
    title: "Vitor Hamad - Desenvolvedor Web Full Stack",
    description:
      "Portfólio moderno de Vitor Hamad, jovem desenvolvedor web full stack especializado em interfaces modernas, aplicações responsivas e experiências digitais premium.",
    siteUrl: "https://your-domain.com",
    ogImage: "/images/og-image.svg",
    keywords: [
      "portfolio desenvolvedor",
      "desenvolvedor full stack",
      "next.js",
      "react",
      "tailwind css",
      "portfolio moderno"
    ]
  },

  // Theme colors are RGB values so Tailwind can apply opacity with CSS variables.
  // Edit these to quickly rebrand the full site.
  theme: {
    light: {
      background: "248 248 245",
      foreground: "17 20 24",
      muted: "96 103 113",
      subtle: "229 231 225",
      surface: "255 255 252",
      border: "218 220 214",
      accent: "78 92 255",
      accentSoft: "226 229 255"
    },
    dark: {
      background: "10 12 16",
      foreground: "244 246 248",
      muted: "158 166 178",
      subtle: "34 38 46",
      surface: "18 21 27",
      border: "46 51 61",
      accent: "150 164 255",
      accentSoft: "37 44 86"
    }
  },

  // Hero section content. CTA buttons can point to anchors, email, calendar, or external links.
  hero: {
    headline: "Criando experiências web modernas, rápidas e impactantes.",
    description:
      "Sou Vitor Hamad, um jovem desenvolvedor web full stack apaixonado por criar sites modernos, aplicações interativas e interfaces premium com foco em performance e design.",
    primaryCta: { label: "Ver projetos", href: "#work" },
    secondaryCta: { label: "Entrar em contato", href: "mailto:contato@vitorhamad.dev" },
    floatingProjects: [
      "/images/project-atlas.svg",
      "/images/project-orbit.svg",
      "/images/project-lumen.svg"
    ]
  },

  // About section copy and image. Place replacement files in /public/images.
  about: {
    image: "/images/vitor-profile.png",
    shortBio:
      "Sou um jovem desenvolvedor web full stack focado em criar experiências modernas, interfaces elegantes e aplicações performáticas para web.",

    body:
      "Meu foco é desenvolver sites e aplicações modernas utilizando tecnologias atuais como Next.js, React, TypeScript e Tailwind CSS. Gosto de transformar ideias em experiências digitais rápidas, responsivas e visualmente impactantes.",

    approach:
      "Acredito que um bom produto precisa unir performance, design moderno e uma experiência intuitiva para realmente se destacar.",

    highlights: [
      { value: 15, suffix: "+", label: "projetos criados" },
      { value: 100, suffix: "%", label: "responsivo" },
      { value: 24, suffix: "/7", label: "aprendendo" }
    ]
  },

  // Client or publication logos. The template uses a text-based marquee so buyers can replace names quickly.
  clients: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind",
    "Prisma",
    "Docker"
  ],

  // Main section titles. Edit these to rename the visible homepage headings.
  sectionHeadings: {
    workTitle: "Projetos em destaque com apresentação premium.",
    workDescription: "",
    aboutTitle: "Desenvolvimento web com foco em design, performance e experiência.",
    servicesTitle: "Soluções para sites modernos, aplicações e interfaces profissionais.",
    processTitle: "Um processo claro para transformar ideia em projeto publicado.",
    testimonialsTitle: "Depoimentos com aparência elegante e profissional.",
    playgroundTitle: "Experimentos, estudos e projetos paralelos."
  },
  
    // Featured project cards. Use categories to group work or leave the array empty.
  projects: [
  {
    title: "Centro da Juventude Platform",
    category: "Full Stack Web Application",
    year: "2026",

    description:
      "Plataforma web full stack desenvolvida para o Centro da Juventude, incluindo autenticação, painel administrativo, gerenciamento de conteúdo, banco de dados e interface moderna responsiva.",

    image: "/images/CJ_logo_project.jpg",
    imageFit: "contain",

    href: "https://cjtamandare.vercel.app/",
    liveUrl: "https://cjtamandare.vercel.app/",
    repoUrl: "https://github.com/hamadvitor0-cell",

    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Database",
      "Authentication",
      "Admin Dashboard"
    ]
  }
],

  // Services and capabilities. Icon names map to Lucide icons in src/lib/icons.ts.
  services: [
    {
      icon: "Code2" as IconName,
      title: "Desenvolvimento Full Stack",
      description:
        "Criação de aplicações modernas, rápidas e escaláveis utilizando tecnologias atuais."
    },
    {
      icon: "Palette" as IconName,
      title: "UI/UX Moderno",
      description:
        "Interfaces modernas, minimalistas e responsivas focadas em experiência do usuário."
    },
    {
      icon: "Rocket" as IconName,
      title: "Landing Pages",
      description:
        "Landing pages otimizadas para conversão, performance e SEO."
    },
    {
      icon: "Layers3" as IconName,
      title: "Componentização",
      description:
        "Código limpo, reutilizável e organizado para facilitar manutenção e crescimento."
    }
  ],

  // Process section. Keep each step concise for the editorial layout.
  process: [
    {
      title: "Planejamento",
      description:
        "Entendimento da ideia, estrutura do projeto e objetivos principais."
    },
    {
      title: "Design & Interface",
      description:
        "Criação de uma interface moderna, intuitiva e responsiva."
    },
    {
      title: "Desenvolvimento",
      description:
        "Construção do projeto com foco em performance, organização e qualidade."
    },
    {
      title: "Deploy & Otimização",
      description:
        "Publicação online com otimizações para SEO, velocidade e experiência do usuário."
    }
  ],

  // Testimonials from clients or collaborators. Replace with real names before publishing.
  testimonials: [
    {
      quote:
        "O Vitor conseguiu transformar ideias em uma interface moderna, rápida e extremamente profissional. O resultado ficou acima do esperado.",

      name: "Lucas Andrade",
      role: "Cliente Freelance"
    },

    {
      quote:
        "Projeto muito bem organizado, visual moderno e excelente atenção aos detalhes. A experiência final ficou incrível tanto no desktop quanto no mobile.",

      name: "Mariana Costa",
      role: "UI/UX Designer"
    },

    {
      quote:
        "Além de um design moderno, o desenvolvimento foi extremamente rápido e otimizado. Recomendo para qualquer projeto web.",

      name: "Rafael Martins",
      role: "Empreendedor Digital"
    }
  ],
  // Optional creative experiments, tools, side projects, or writing.
  playground: [
    {
      title: "Motion Experiments",
      description:
        "Micro animações, transições suaves e efeitos modernos para interfaces web.",
      href: "https://example.com"
    },

    {
      title: "Creative Interfaces",
      description:
        "Exploração de layouts modernos, componentes premium e experiências digitais imersivas.",
      href: "https://example.com"
    },

    {
      title: "Side Projects",
      description:
        "Projetos paralelos, ideias experimentais e aplicações construídas por curiosidade.",
      href: "https://example.com"
    }
  ],

  contact: {
    headline: "Vamos criar algo incrível juntos?",
    description:
      "Entre em contato para projetos, freelances ou oportunidades relacionadas a desenvolvimento web.",
    buttonLabel: "Entrar em contato",
    formEnabled: true
  },

  // Social links. Use supported icon names or add more in src/lib/icons.ts.
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/hamadvitor0-cell",
      icon: "Github" as IconName
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vitor-hamad-zanelato-de-oliveira-10458426a/",
      icon: "Linkedin" as IconName
    },
    {
      label: "Email",
      href: "hamadvitor0@gmail.com",
      icon: "Mail" as IconName
    }
  ]
} as const;
