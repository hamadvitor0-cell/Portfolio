import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ConceptProject } from "@/config/site";

export function ConceptProjectCard({ project }: { project: ConceptProject }) {
  const liveLabel = project.liveLabel ?? "Visualizar site";
  return (
    <article className={`featured-project concept-project ${project.slug}-project`} aria-labelledby={`${project.slug}-title`}>
      <Link
        href={project.href}
        className="concept-visual"
        aria-label={`Explorar o projeto conceitual ${project.title}`}
        data-analytics-event="project_click"
        data-analytics-project={project.slug}
        data-analytics-location="featured-image"
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          sizes="(max-width: 767px) 90vw, (max-width: 1440px) 92vw, 1248px"
          style={{ aspectRatio: `${project.imageWidth} / ${project.imageHeight}` }}
        />
        <span className="concept-image-link" aria-hidden="true"><ArrowUpRight size={22} /></span>
      </Link>
      <div className="project-caption">
        <div>
          <p className="concept-meta">{project.year} <span aria-hidden="true">/</span> {project.kind}</p>
          <h3 id={`${project.slug}-title`}>{project.title}</h3>
          <p className="concept-category">{project.category}</p>
          <ul className="concept-tech" aria-label={`Tecnologias utilizadas no ${project.linkName}`}>
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
        <div>
          <p>{project.description}</p>
          {project.highlights ? <ul className="concept-project-highlights" aria-label={`Destaques do ${project.linkName}`}>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul> : null}
          <div className="project-links">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-primary" aria-label={`${liveLabel} ${project.linkName} (abre em nova aba)`} data-analytics-event="demo_click" data-analytics-project={project.slug} data-analytics-location="main-case">{liveLabel} <ArrowUpRight size={17} aria-hidden="true" /></a>
            <Link href={project.href} className="text-link" data-analytics-event="case_view" data-analytics-project={project.slug} data-analytics-location="main-case">Explorar projeto <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
