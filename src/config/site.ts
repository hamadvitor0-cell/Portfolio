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
  | "Globe2"
  | "MessageCircle";

export type IconMap = Record<IconName, LucideIcon>;

const whatsappMessage =
  "Olá, Vitor! Vi seu portfólio e gostaria de conversar sobre um projeto.";

export const siteConfig = {
  // Identidade principal exibida no portfólio.
  name: "Vitor Hamad",
  role: "Desenvolvedor Web Full Stack",
  location: "Brasil",
  email: "hamadvitor0@gmail.com",
  availability: "Workflow acelerado por IA · Disponível para projetos freelance",
  headerCta: "Chamar no WhatsApp",

  whatsapp: {
    number: "+55 41 99141-6887",
    href: "https://wa.me/5541991416887",
    message: whatsappMessage,
    messageHref:
      "https://wa.me/5541991416887?text=Ol%C3%A1%2C%20Vitor%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
  },

  nav: [
    { label: "Projetos", href: "#work" },
    { label: "Sobre", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "Contato", href: "#contact" }
  ],

  seo: {
    title: "Vitor Hamad | Desenvolvedor Web Full Stack",
    description:
      "Portfólio de Vitor Hamad, desenvolvedor web full stack especializado em sites modernos, aplicações web, interfaces premium e desenvolvimento com workflow acelerado por IA.",
    siteUrl: "https://vitorhamad.vercel.app",
    ogImage: "/images/og-image.svg",
    keywords: [
      "Vitor Hamad",
      "desenvolvedor web full stack",
      "desenvolvimento com IA assistida",
      "sites modernos",
      "aplicações web",
      "Next.js",
      "React",
      "Tailwind CSS"
    ]
  },

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

  hero: {
    headline: "Sites e aplicações full stack com design premium e entrega ágil.",
    description:
      "Sou Vitor Hamad, um jovem desenvolvedor web full stack apaixonado por criar sites modernos, aplicações interativas e interfaces premium com foco em performance, design e velocidade de entrega usando um workflow moderno com IA.",
    primaryCta: { label: "Vamos criar seu projeto", href: "https://wa.me/5541991416887?text=Ol%C3%A1%2C%20Vitor%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto." },
    secondaryCta: { label: "Ver projetos", href: "#work" },
    floatingProjects: [
      "/images/project-atlas.svg",
      "/images/project-orbit.svg",
      "/images/project-lumen.svg"
    ]
  },

  about: {
    image: "/images/vitor-profile.png",
    shortBio:
      "Sou Vitor Hamad, desenvolvedor web full stack com foco em interfaces modernas, aplicações performáticas e experiências digitais bem construídas.",
    body:
      "Também utilizo IA como apoio no meu fluxo de desenvolvimento para acelerar protótipos, revisar código, encontrar bugs, melhorar interfaces e transformar ideias em produtos digitais reais com mais agilidade. A direção visual, validação técnica e decisões finais continuam sendo feitas por mim.",
    approach:
      "IA é uma ferramenta estratégica no meu processo, não um substituto da responsabilidade técnica. O objetivo é ganhar velocidade sem abrir mão de qualidade, clareza e validação humana.",
    highlights: [
      {
        value: "Projetos reais",
        label: "sites, sistemas e aplicações com foco em publicação"
      },
      {
        value: "Interfaces responsivas",
        label: "experiências pensadas para desktop e mobile"
      },
      {
        value: "Aprendizado constante",
        label: "evolução técnica com boas práticas e validação"
      }
    ]
  },

  clients: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind",
    "Prisma",
    "Vercel"
  ],

  sectionHeadings: {
    workTitle: "Projetos reais com foco em sistemas, interfaces e aplicações web.",
    workDescription:
      "Trabalhos que mostram desenvolvimento além de landing pages: autenticação, dashboards, banco de dados, painéis administrativos e interfaces responsivas.",
    aboutTitle: "Desenvolvimento web com direção humana e IA como apoio estratégico.",
    servicesTitle: "Soluções para transformar ideias em produtos digitais publicados.",
    processTitle: "Um workflow moderno para sair da ideia e chegar ao projeto no ar.",
    testimonialsTitle: "Como trabalho"
  },

  projects: [
    {
      title: "Centro da Juventude Almirante Tamandaré",
      category: "Sistema full stack institucional",
      year: "2026",
      description:
        "Plataforma web desenvolvida para o Centro da Juventude, incluindo autenticação, painel administrativo, gerenciamento de conteúdo, banco de dados e interface moderna responsiva.",
      image: "/images/CJ_logo_project.jpg",
      imageFit: "contain",
      href: "https://cjtamandare.vercel.app/",
      liveUrl: "https://cjtamandare.vercel.app/",
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Banco de dados",
        "Autenticação",
        "Painel administrativo"
      ]
    },
    {
      title: "NexusDesk",
      category: "SaaS / sistema interno",
      year: "2026",
      description:
        "Aplicação web com foco em operação, dashboard e fluxo de trabalho para demonstrar experiência em produto digital, estrutura full stack e interfaces profissionais.",
      image: "/images/project-atlas.svg",
      imageFit: "cover",
      href: "https://nexusdesk-app.vercel.app/",
      liveUrl: "https://nexusdesk-app.vercel.app/",
      repoUrl: "https://github.com/hamadvitor0-cell/NexusDesk",
      tags: ["Next.js", "React", "TypeScript", "SaaS", "Dashboard", "UI responsiva"]
    },
    {
      title: "Portfólio profissional",
      category: "Portfólio / presença digital",
      year: "2026",
      description:
        "Portfólio moderno com animações, design responsivo, SEO, tema claro e escuro, componentes reutilizáveis e fluxo de contato integrado ao WhatsApp.",
      image: "/images/project-lumen.svg",
      imageFit: "cover",
      href: "https://vitorhamad.vercel.app/",
      liveUrl: "https://vitorhamad.vercel.app/",
      repoUrl: "https://github.com/hamadvitor0-cell/Portfolio",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS", "SEO", "Responsivo"]
    }
  ],

  services: [
    {
      icon: "Globe2" as IconName,
      title: "Sites modernos",
      description:
        "Criação de sites institucionais, landing pages e portfólios com visual premium, responsividade e foco em conversão."
    },
    {
      icon: "Code2" as IconName,
      title: "Aplicações web",
      description:
        "Desenvolvimento de sistemas web interativos com painéis, autenticação, banco de dados e funcionalidades personalizadas."
    },
    {
      icon: "Palette" as IconName,
      title: "Interfaces premium",
      description:
        "Criação de interfaces modernas, limpas e responsivas, com atenção a detalhes visuais, microinterações e experiência do usuário."
    },
    {
      icon: "Sparkles" as IconName,
      title: "Desenvolvimento com IA assistida",
      description:
        "Uso ferramentas de IA para acelerar prototipagem, refinar interfaces, revisar código e transformar ideias em aplicações modernas com mais velocidade, sem abrir mão da qualidade técnica."
    },
    {
      icon: "Rocket" as IconName,
      title: "Deploy e publicação",
      description:
        "Configuração de deploy, domínio, hospedagem e publicação do projeto para que ele fique pronto para ser usado."
    }
  ],

  process: [
    {
      title: "Planejamento",
      description:
        "Entendo o objetivo do projeto, público, funcionalidades e identidade visual."
    },
    {
      title: "Design e experiência",
      description:
        "Crio interfaces modernas, responsivas e fáceis de usar."
    },
    {
      title: "Desenvolvimento",
      description:
        "Transformo a ideia em uma aplicação funcional, usando boas práticas de código e arquitetura."
    },
    {
      title: "IA como apoio estratégico",
      description:
        "Uso IA para explorar soluções, gerar protótipos, revisar código, identificar melhorias, testar ideias e acelerar etapas repetitivas, mantendo foco em qualidade, performance e experiência do usuário."
    },
    {
      title: "Deploy e entrega",
      description:
        "Publico o projeto, testo responsividade, performance e deixo tudo pronto para uso."
    }
  ],

  workPrinciples: [
    {
      title: "Comunicação clara",
      description:
        "Organizo o escopo, explico decisões técnicas e mantenho o projeto fácil de acompanhar."
    },
    {
      title: "Foco em resultado",
      description:
        "Priorizo funcionalidades que ajudam o projeto a ficar útil, rápido e pronto para ser publicado."
    },
    {
      title: "Visual moderno",
      description:
        "Cuido da composição visual, responsividade, microinterações e experiência de navegação."
    },
    {
      title: "Código organizado",
      description:
        "Uso componentes reutilizáveis, tipagem, estrutura clara e validação antes da entrega."
    },
    {
      title: "Entrega publicada",
      description:
        "Configuro build, deploy e testes finais para o projeto ficar acessível online."
    }
  ],

  contact: {
    headline: "Vamos transformar sua ideia em um projeto real?",
    description:
      "Tem uma ideia de site, sistema ou aplicação? Me chama no WhatsApp e vamos conversar sobre como transformar isso em um projeto real.",
    buttonLabel: "Solicitar orçamento pelo WhatsApp",
    formButtonLabel: "Enviar pelo WhatsApp",
    formEnabled: true,
    projectTypes: [
      "Site institucional",
      "Landing page",
      "Aplicação web",
      "Sistema com login",
      "Dashboard ou painel",
      "Outro"
    ],
    budgetOptions: [
      "Ainda não definido",
      "Até R$ 1.000",
      "R$ 1.000 a R$ 3.000",
      "R$ 3.000 a R$ 6.000",
      "Acima de R$ 6.000"
    ]
  },

  socialLinks: [
    {
      label: "WhatsApp",
      href: "https://wa.me/5541991416887?text=Ol%C3%A1%2C%20Vitor%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.",
      icon: "MessageCircle" as IconName
    },
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
      href: "mailto:hamadvitor0@gmail.com",
      icon: "Mail" as IconName
    }
  ]
} as const;
