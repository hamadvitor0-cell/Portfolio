import type { LucideIcon } from "lucide-react";
import corte14Cover from "../../public/projects/corte14-cover.webp";
import mordidaCover from "../../public/projects/mordida/cover.webp";
import fatia12Cover from "../../public/projects/fatia12/cover.webp";

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
  "Olá! Conheci a Viham Dev e gostaria de conversar sobre um projeto.";

const whatsappHref = `https://wa.me/5541991416887?text=${encodeURIComponent(whatsappMessage)}`;

export type ConceptProject = {
  slug: string;
  linkName: string;
  title: string;
  category: string;
  kind: string;
  year: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  href: string;
  liveUrl: string;
  liveLabel?: string;
  tags: readonly string[];
  highlights?: readonly string[];
};

export const corte14Project = {
  slug: "corte14",
  linkName: "Corte 14",
  title: "Corte 14 — Barber Club",
  category: "Website institucional",
  kind: "Projeto conceitual",
  year: "2026",
  description:
    "Uma experiência digital criada para uma barbearia fictícia, combinando identidade visual marcante, fotografia, animações e navegação intuitiva.",
  overview:
    "Um projeto conceitual desenvolvido para explorar uma abordagem mais criativa de sites institucionais. O Corte 14 une estética contemporânea, apresentação de serviços e uma experiência visual pensada para diferentes dispositivos.",
  image: corte14Cover.src,
  imageWidth: corte14Cover.width,
  imageHeight: corte14Cover.height,
  imageAlt:
    "Página inicial do Corte 14 com o título Não é só um corte, fotografia em preto e branco e botão Reservar horário",
  imageFit: "cover",
  href: "/cases/corte14",
  liveUrl: "https://corte14-barber-club.vercel.app/",
  liveLabel: "Visualizar site",
  caseLabel: "Explorar projeto",
  tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
};

export const mordidaProject = {
  slug: "mordida",
  linkName: "MORDIDA!",
  title: "MORDIDA! — Smash House",
  category: "Website interativo / Experiência digital",
  kind: "Projeto conceitual",
  year: "2026",
  description:
    "Uma experiência digital para uma hamburgueria fictícia, combinando animações, identidade visual marcante e um cardápio interativo.",
  overview:
    "O MORDIDA! é um projeto conceitual de hamburgueria desenvolvido para explorar o equilíbrio entre design, animação e funcionalidade. A experiência combina uma apresentação visual envolvente com recursos interativos que permitem explorar produtos e simular pedidos.",
  image: mordidaCover.src,
  imageWidth: mordidaCover.width,
  imageHeight: mordidaCover.height,
  imageAlt:
    "Hero real do MORDIDA! com hambúrguer central, ingredientes em movimento, fundo vermelho e o título A fome não espera",
  imageFit: "cover",
  href: "/cases/mordida",
  liveUrl: "https://mordida-smash-house.vercel.app/",
  liveLabel: "Visualizar site",
  caseLabel: "Explorar projeto",
  highlights: ["Cardápio com filtros", "Produtos personalizáveis", "Carrinho e pedidos demonstrativos"],
  tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
};

export const fatia12Project = {
  slug: "fatia12",
  linkName: "FATIA 12",
  title: "FATIA 12 — Pizza Studio",
  category: "Website interativo / Experiência 3D",
  kind: "Projeto conceitual",
  year: "2026",
  description:
    "Uma experiência interativa de pizzaria, onde o visitante explora 12 sabores em uma pizza digital, com animações e uma forma criativa de escolher seu pedido.",
  overview:
    "O FATIA 12 é um projeto conceitual desenvolvido para explorar novas possibilidades de interação em websites comerciais. A experiência apresenta uma pizza interativa com 12 sabores diferentes, permitindo ao visitante selecionar uma fatia e visualizar a pizza completa daquele sabor, com ingredientes, preço e recursos de pedido.",
  image: fatia12Cover.src,
  imageWidth: fatia12Cover.width,
  imageHeight: fatia12Cover.height,
  imageAlt:
    "Hero real do FATIA 12, com o título Qual é a sua fatia, marca Pizza Studio e pizza 3D dividida em 12 sabores sobre fundo creme",
  imageFit: "cover",
  href: "/cases/fatia12",
  liveUrl: "https://fatia12-pizza-studio.vercel.app/",
  liveLabel: "Visualizar projeto",
  caseLabel: "Explorar projeto",
  highlights: ["Seleção visual de 12 sabores", "Transformação da pizza inteira", "Embalagem 3D e carrinho demonstrativo"],
  tags: ["Next.js", "React", "TypeScript", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS"],
};

export const siteConfig = {
  // Identidade principal exibida no portfólio.
  name: "Viham Dev",
  role: "Desenvolvedor Web",
  location: "Curitiba · Atendimento remoto",
  email: "hamadvitor0@gmail.com",
  availability: "Sites e sistemas sob medida · Curitiba e atendimento remoto",
  headerCta: "Conversar sobre um projeto",

  whatsapp: {
    number: "+55 41 99141-6887",
    href: "https://wa.me/5541991416887",
    message: whatsappMessage,
    messageHref: whatsappHref
  },

  nav: [
    { label: "Projetos", href: "/#cases" },
    { label: "Serviços", href: "/#solucoes" },
    { label: "Processo", href: "/#processo" },
    { label: "Sobre", href: "/#sobre" }
  ],

  seo: {
    title: "Viham Dev | Sites e sistemas sob medida",
    description:
      "Sites profissionais, painéis e sistemas web sob medida para o seu negócio. Desenvolvimento por Vitor Hamad, de Curitiba para todo o Brasil.",
    siteUrl: "https://www.vitorhamad.me",
    ogImage: "/og.png",
    keywords: [
      "Viham Dev",
      "Vitor Hamad",
      "desenvolvedor web full stack",
      "sistemas web sob medida",
      "painel administrativo",
      "MVP web",
      "sites profissionais Curitiba",
      "Next.js",
      "React",
      "Tailwind CSS"
    ]
  },

  theme: {
    light: {
      background: "16 28 54",
      foreground: "247 248 245",
      muted: "185 194 208",
      subtle: "11 21 41",
      surface: "20 34 60",
      border: "42 56 80",
      accent: "213 246 98",
      accentSoft: "39 51 47"
    },
    dark: {
      background: "16 28 54",
      foreground: "247 248 245",
      muted: "185 194 208",
      subtle: "11 21 41",
      surface: "20 34 60",
      border: "42 56 80",
      accent: "213 246 98",
      accentSoft: "39 51 47"
    }
  },

  hero: {
    headline: "Sites que não passam despercebidos.",
    headlineLines: ["Sites que não", "passam", "despercebidos."],
    description:
      "Design, código e interatividade para transformar ideias em experiências digitais que fazem a diferença.",
    art: {
      src: "/images/hero/viham-web-studio.webp",
      alt: "Ilustração de um site profissional em computador e celular, com elementos na identidade da Viham Dev"
    },
    primaryCta: { label: "Explorar projetos", href: "#cases" },
    secondaryCta: { label: "Criar meu site", href: "#contato" },
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
      title: "Centro da Juventude de Almirante Tamandaré",
      category: "Plataforma institucional",
      year: "2026",
      description:
        "Inscrições, oficinas, alunos, chamadas e frequência em uma plataforma que dá à equipe uma visão organizada da operação.",
      image: "/images/cases/cj/admin-dashboard.png",
      imageFit: "contain",
      href: "/cases/centro-da-juventude",
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
      ...fatia12Project
    },
    {
      ...mordidaProject
    },
    {
      ...corte14Project
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
      href: whatsappHref,
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
