import { PortfolioPage } from '@/components/portfolio-page';
import { getProjects } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const projects = await getProjects();
  return <PortfolioPage projects={projects} />;
}
