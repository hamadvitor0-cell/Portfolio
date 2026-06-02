import { Cloud, Database, KeyRound, LayoutDashboard, ShieldCheck } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";

const items = [
  {
    icon: KeyRound,
    title: "Autenticação",
    description: "Login, proteção de rotas e controle de acesso."
  },
  {
    icon: Database,
    title: "Banco de dados",
    description: "Modelagem para usuários, turmas, oficinas, inscrições e frequência."
  },
  {
    icon: LayoutDashboard,
    title: "Painel administrativo",
    description: "CRUDs, permissões, filtros, relatórios e exportação de dados."
  },
  {
    icon: Cloud,
    title: "Deploy em produção",
    description: "Ambiente online, seguro, responsivo e pronto para acesso real."
  },
  {
    icon: ShieldCheck,
    title: "Boas práticas",
    description: "Código organizado, componentização, tipagem e padrões modernos."
  }
];

export function TechnicalBackstageSection() {
  return (
    <section id="technical" className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[76rem] rounded-[1.6rem] border border-white/10 bg-[#07101d]/72 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-7">
        <SectionReveal>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7c6cff]/25 bg-[#7c6cff]/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
            Bastidores técnicos
          </div>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <SectionReveal key={item.title} delay={index * 0.04}>
                <article className="h-full rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#7c6cff]/45 hover:bg-white/[0.055]">
                  <span className="mb-5 grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-[#a99cff]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
