"use client";

import { useEffect, useState } from "react";

type SummaryItem = {
  href: string;
  label: string;
};

export function CaseSummaryNav({ items }: { items: SummaryItem[] }) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.08, 0.2, 0.38]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sumário do estudo de caso"
      className="mx-auto max-w-[86rem] rounded-xl border border-white/10 bg-[#0B1529]/78 p-5   sm:p-6"
    >
      <div className="grid gap-4 lg:grid-cols-[0.28fr_1fr] lg:items-center">
        <div>
          <p className="mb-2 inline-flex rounded-lg border border-[#D5F662]/25 bg-[#D5F662]/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.16em] text-[#D5F662]">
            Sumário
          </p>
          <h2 className="text-xl font-semibold text-white">Navegue pelo case</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                className={[
                  "rounded-2xl border px-4 py-3 text-sm font-semibold leading-5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#D5F662] focus:ring-offset-2 focus:ring-offset-[#0B1529]",
                  isActive
                    ? "border-[#D5F662]/70 bg-[#D5F662]/18 text-white "
                    : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-[#D5F662]/45 hover:bg-white/[0.065] hover:text-white"
                ].join(" ")}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
