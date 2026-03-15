import Link from 'next/link';
import { isAdminAuthenticated } from '@/lib/auth';
import { getProjects } from '@/lib/projects';
import { createProject, deleteProject, logoutAdmin, updateProject, authenticateAdmin } from './actions';

type AdminPageProps = {
  searchParams?: {
    error?: string;
    success?: string;
  };
};

function StatusNotice({ error, success }: { error?: string; success?: string }) {
  if (!error && !success) {
    return null;
  }

  const isError = Boolean(error);
  const text = decodeURIComponent(error ?? success ?? '');

  return (
    <p className={`mb-4 rounded-xl border px-4 py-2 text-sm ${isError ? 'border-red-300/25 bg-red-500/10 text-red-200' : 'border-accent/25 bg-accent/10 text-accent'}`}>
      {text}
    </p>
  );
}

function LoginForm({ error }: { error?: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-5">
      <div className="glass w-full rounded-2xl p-6">
        <h1 className="text-xl font-semibold tracking-wide text-cream">Admin Login</h1>
        <p className="mt-2 text-sm text-cream/75">Use Netlify Identity credentials or configured admin environment credentials.</p>
        <StatusNotice error={error} />
        <form action={authenticateAdmin} className="mt-4 space-y-3">
          <label className="block text-sm text-cream/80">Email
            <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 outline-none focus:border-accent/45" />
          </label>
          <label className="block text-sm text-cream/80">Password
            <input name="password" type="password" required className="mt-2 w-full rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 outline-none focus:border-accent/45" />
          </label>
          <button className="mt-2 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg shadow-glow transition hover:bg-accent/90">Sign In</button>
        </form>
        <Link href="/" className="mt-4 inline-block text-sm text-cream/75 hover:text-accent">Back to portfolio</Link>
      </div>
    </main>
  );
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return <LoginForm error={searchParams?.error} />;
  }

  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-wide text-cream">Project Admin Dashboard</h1>
        <form action={logoutAdmin}>
          <button className="rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/85 transition hover:border-accent/40 hover:text-accent">Logout</button>
        </form>
      </div>

      <StatusNotice error={searchParams?.error} success={searchParams?.success} />

      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-cream">Add New Project</h2>
        <form action={createProject} className="mt-4 grid gap-3 md:grid-cols-2" encType="multipart/form-data">
          <input name="name" required placeholder="Project Name" className="rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none focus:border-accent/45" />
          <input name="role" required placeholder="Role" className="rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none focus:border-accent/45" />
          <input name="link" placeholder="https://example.com" className="rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none focus:border-accent/45" />
          <input name="image" type="file" accept="image/*" className="rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-1 file:text-xs file:font-semibold file:text-bg" />
          <textarea name="description" required placeholder="Description" rows={3} className="md:col-span-2 rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none focus:border-accent/45" />
          <button className="md:col-span-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg shadow-glow transition hover:bg-accent/90">Add Project</button>
        </form>
      </section>

      <section className="mt-6 space-y-4">
        {projects.map((project) => (
          <article key={project.id} className="glass rounded-2xl p-5">
            <h3 className="mb-3 text-base font-semibold text-cream">{project.name}</h3>
            <form action={updateProject} className="grid gap-3 md:grid-cols-2" encType="multipart/form-data">
              <input type="hidden" name="id" value={project.id} />
              <input type="hidden" name="currentImageKey" value={project.imageKey ?? ''} />
              <input type="hidden" name="currentImageUrl" value={project.imageUrl ?? ''} />
              <input name="name" defaultValue={project.name} required className="rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none focus:border-accent/45" />
              <input name="role" defaultValue={project.role} required className="rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none focus:border-accent/45" />
              <input name="link" defaultValue={project.link} className="rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none focus:border-accent/45" />
              <input name="image" type="file" accept="image/*" className="rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-1 file:text-xs file:font-semibold file:text-bg" />
              <textarea name="description" defaultValue={project.description} required rows={3} className="md:col-span-2 rounded-xl border border-cream/15 bg-bg/40 px-3 py-2 text-sm outline-none focus:border-accent/45" />
              <button className="rounded-full border border-accent/40 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent/10">Save Changes</button>
            </form>
            <form action={deleteProject} className="mt-3">
              <input type="hidden" name="id" value={project.id} />
              <button className="rounded-full border border-red-300/25 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/10">Delete Project</button>
            </form>
          </article>
        ))}
      </section>
    </main>
  );
}
