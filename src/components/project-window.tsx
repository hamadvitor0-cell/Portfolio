import Image from "next/image";
import type { ConceptProject } from "@/config/site";

export function ProjectWindow({ project, hero = false, primary = false }: { project: ConceptProject; hero?: boolean; primary?: boolean }) {
  return <div className="project-window">
    <div className="window-chrome" aria-hidden="true"><span className="window-dots"><i /><i /><i /></span><span>{new URL(project.liveUrl).hostname}</span><span className="window-corner">↗</span></div>
    <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
      sizes={hero ? "(max-width: 767px) 72vw, (max-width: 1023px) 60vw, 46vw" : "(max-width: 767px) 90vw, (max-width: 1440px) 85vw, 1320px"}
      loading={hero ? "eager" : "lazy"} fetchPriority={primary ? "high" : undefined} className="window-capture" />
  </div>;
}
