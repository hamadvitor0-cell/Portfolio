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
  headerCta: "Quero tirar minha ideia do papel",

  whatsapp: {
    number: "+55 41 99141-6887",
    href: "https://wa.me/5541991416887",
    message: whatsappMessage,
    messageHref:
      "https://wa.me/5541991416887?text=Ol%C3%A1%2C%20Vitor%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
  },

  nav: [
    { label: "Início", href: "#home" },
    { label: "Projetos", href: "#work" },
    { label: "Sobre", href: "#why" },
    { label: "Serviços", href: "#technical" },
    { label: "Processo", href: "#process" },
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
      background: "5 10 18",
      foreground: "247 249 255",
      muted: "151 164 188",
      subtle: "17 24 37",
      surface: "10 17 29",
      border: "38 49 69",
      accent: "132 105 255",
      accentSoft: "35 27 82"
    },
    dark: {
      background: "5 10 18",
      foreground: "247 249 255",
      muted: "151 164 188",
      subtle: "17 24 37",
      surface: "10 17 29",
      border: "38 49 69",
      accent: "132 105 255",
      accentSoft: "35 27 82"
    }
  },

  hero: {
    headline: "Crio sites e sistemas web premium, funcionam de verdade e saem do papel rápido.",
    description:
      "Desenvolvo interfaces modernas, painéis administrativos, autenticação, banco de dados e experiências digitais publicadas usando IA como apoio para acelerar o processo, sem perder direção técnica humana.",
    art: {
      src: "/images/hero-dashboard-art.png",
      alt: "Arte premium com notebook e celular mostrando dashboard de sistema web publicado"
    },
    primaryCta: { label: "Ver projetos", href: "#work" },
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

  education: {
    title: "Formação",
    subtitle:
      "Base técnica em desenvolvimento de sistemas, combinando estudo formal, prática em projetos reais e aprendizado contínuo.",
    items: [
      {
        title: "Ensino Médio Técnico em Análise e Desenvolvimento de Sistemas",
        period: "Base técnica",
        description:
          "Minha jornada começou no Ensino Médio Técnico em Análise e Desenvolvimento de Sistemas, onde tive meus primeiros contatos com lógica, programação, banco de dados e desenvolvimento web."
      },
      {
        title: "Análise e Desenvolvimento de Sistemas na PUCPR EAD",
        period: "Graduação atual",
        description:
          "Atualmente curso Análise e Desenvolvimento de Sistemas na PUCPR EAD, aprofundando meus conhecimentos em desenvolvimento de software, arquitetura de sistemas, banco de dados e aplicações web."
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
    investmentTitle: "Investimento",
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
      image: "/images/cj-logo-premium.png",
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
      title: "Desenvolvimento com IA Assistida",
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
        "Uso IA para explorar soluções, gerar protótipos, revisar código, identificar melhorias e acelerar etapas repetitivas, mantendo foco em qualidade, performance e experiência do usuário."
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

  investment: {
    plans: [
      {
        title: "Portfólio / Landing Page",
        price: "A partir de R$ 1.000",
        description:
          "Página premium, responsiva e otimizada para apresentar serviços, projetos ou uma oferta específica."
      },
      {
        title: "Site Institucional",
        price: "A partir de R$ 1.500",
        description:
          "Site completo para empresas, profissionais ou negócios locais, com seções estratégicas e contato integrado."
      },
      {
        title: "Sistema Web Full Stack",
        price: "A partir de R$ 3.000",
        description:
          "Aplicações com login, painéis, banco de dados, dashboards e funcionalidades personalizadas."
      },
      {
        title: "Manutenção mensal",
        price: "A partir de R$ 150/mês",
        description:
          "Ajustes, melhorias, atualizações e suporte contínuo para manter o projeto evoluindo."
      }
    ],
    note:
      "Projetos mais complexos, SaaS, e-commerces, sistemas com pagamentos, múltiplos usuários, integrações externas ou regras avançadas recebem orçamento personalizado.",
    ctaLabel: "Pedir orçamento no WhatsApp"
  },

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
