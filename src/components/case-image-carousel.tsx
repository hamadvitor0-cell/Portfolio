"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type CaseSlide = {
  src: string;
  title: string;
  caption: string;
};

export function CaseImageCarousel({ slides }: { slides: CaseSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = slides[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = (index + slides.length) % slides.length;
      setActiveIndex(nextIndex);
    },
    [slides.length]
  );

  const goPrevious = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious]);

  if (!activeSlide) return null;

  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-[#07101d]/78 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-5">
      <div
        className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#050b14]"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;

          const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
          const deltaX = touchEndX - touchStartX.current;

          if (Math.abs(deltaX) > 44) {
            if (deltaX > 0) goPrevious();
            else goNext();
          }

          touchStartX.current = null;
        }}
      >
        <div className="grid min-h-[18rem] place-items-center p-2 sm:min-h-[25rem] lg:min-h-[34rem]">
          <Image
            key={activeSlide.src}
            src={activeSlide.src}
            alt={activeSlide.title}
            width={1920}
            height={900}
            priority={activeIndex === 0}
            sizes="(max-width: 1024px) 100vw, 86rem"
            unoptimized
            className="max-h-[18rem] w-full rounded-[1rem] object-contain opacity-100 shadow-[0_28px_80px_rgba(0,0,0,0.24)] transition duration-500 hover:scale-[1.01] sm:max-h-[25rem] lg:max-h-[34rem]"
          />
        </div>

        <button
          type="button"
          onClick={goPrevious}
          aria-label="Print anterior"
          className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-[#07101d]/86 text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-[#7c6cff]/60 hover:bg-[#7c6cff]/20 focus:outline-none focus:ring-2 focus:ring-[#8b7cff]"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Próximo print"
          className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-[#07101d]/86 text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-[#7c6cff]/60 hover:bg-[#7c6cff]/20 focus:outline-none focus:ring-2 focus:ring-[#8b7cff]"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a89cff]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{activeSlide.title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{activeSlide.caption}</p>
        </div>
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Ir para o print ${index + 1}: ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goTo(index)}
              className={[
                "h-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-[#8b7cff]",
                index === activeIndex ? "w-8 bg-[#8b7cff]" : "w-2.5 bg-white/20 hover:bg-white/45"
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(index)}
            className={[
              "group overflow-hidden rounded-xl border bg-white/[0.035] p-1 text-left transition focus:outline-none focus:ring-2 focus:ring-[#8b7cff]",
              index === activeIndex ? "border-[#7c6cff]/70" : "border-white/10 hover:border-[#7c6cff]/45"
            ].join(" ")}
            aria-label={`Selecionar ${slide.title}`}
          >
            <Image
              src={slide.src}
              alt=""
              width={360}
              height={210}
              unoptimized
              className="aspect-[16/10] w-full rounded-lg object-cover opacity-75 transition group-hover:scale-[1.03] group-hover:opacity-100"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
