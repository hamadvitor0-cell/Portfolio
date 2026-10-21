"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trapDialogFocus } from "@/lib/dialog";

export type CaseSlide = { src: string; title: string; caption: string };

export function CaseImageCarousel({ slides }: { slides: CaseSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const activeSlide = slides[activeIndex];
  const touchStart = useRef<number | null>(null);
  const goTo = (index: number) => setActiveIndex((index + slides.length) % slides.length);

  useEffect(() => {
    const element = dialog.current;
    if (!expanded || !element) return;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, [expanded]);

  if (!activeSlide) return null;

  const controls = <div className="gallery-controls"><button type="button" aria-label="Tela anterior" onClick={() => goTo(activeIndex - 1)}><ChevronLeft size={20} aria-hidden="true" /></button><button type="button" aria-label="Próxima tela" onClick={() => goTo(activeIndex + 1)}><ChevronRight size={20} aria-hidden="true" /></button></div>;

  return <div className="case-gallery" role="region" aria-label="Galeria de telas do projeto" tabIndex={0} onKeyDown={(event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); goTo(activeIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); goTo(activeIndex + 1); }
  }}>
    <div className="gallery-toolbar"><button type="button" className="gallery-zoom" onClick={() => setExpanded(true)}><Expand size={16} aria-hidden="true" />Ampliar tela</button>{controls}</div>
    <button type="button" className="gallery-image-button" aria-label={`Ampliar ${activeSlide.title}`} onClick={() => setExpanded(true)} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
      if (touchStart.current === null) return;
      const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
      if (Math.abs(delta) > 44) goTo(activeIndex + (delta > 0 ? -1 : 1));
      touchStart.current = null;
    }}><Image src={activeSlide.src} alt={activeSlide.title} width={1920} height={1080} sizes="(max-width: 1300px) 92vw, 1248px" /></button>
    <div className="gallery-caption" aria-live="polite" aria-atomic="true"><span>{String(activeIndex + 1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span><h3>{activeSlide.title}</h3><p>{activeSlide.caption}</p></div>
    <div className="gallery-thumbnails" aria-label="Selecionar tela">{slides.map((slide,index) => <button key={slide.src} type="button" aria-label={`Selecionar ${slide.title}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => goTo(index)}><Image src={slide.src} alt="" width={220} height={124} sizes="110px" /></button>)}</div>
    <dialog ref={dialog} className="image-dialog" aria-label={`Tela ampliada: ${activeSlide.title}`} onKeyDown={trapDialogFocus} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)}>
      <div className="gallery-toolbar"><span className="text-sm">{activeSlide.title}</span><div className="gallery-controls">{controls}<button type="button" aria-label="Fechar imagem ampliada" onClick={() => setExpanded(false)}><X size={20} aria-hidden="true" /></button></div></div>
      <Image src={activeSlide.src} alt={activeSlide.title} width={1920} height={1080} sizes="96vw" className="gallery-image-full" />
    </dialog>
  </div>;
}
