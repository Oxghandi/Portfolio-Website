import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types';

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass group flex h-full flex-col rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/30">
      <div className="mb-5 flex items-center gap-4">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={`${project.name} logo`}
            className="h-12 w-12 rounded-xl border border-cream/10 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/15 bg-muted/40 text-sm font-semibold text-cream">
            {initials(project.name)}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold tracking-wide text-cream">{project.name}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-accent/80">{project.role}</p>
        </div>
      </div>

      <p className="section-copy flex-1">{project.description}</p>

      <Link
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm text-accent transition hover:text-accent/80"
      >
        Visit project <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
