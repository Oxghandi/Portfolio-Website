import { getStore } from '@netlify/blobs';
import { defaultProjects } from '@/lib/default-projects';
import type { Project } from '@/lib/types';

const PROJECTS_KEY = 'projects';
const PROJECTS_STORE = 'portfolio-projects';
const IMAGES_STORE = 'portfolio-project-images';

function projectsStore() {
  return getStore(PROJECTS_STORE);
}

function imagesStore() {
  return getStore(IMAGES_STORE);
}

function imageUrlFromKey(key: string) {
  return `/api/project-image/${encodeURIComponent(key)}`;
}

async function readProjectsFromStore() {
  try {
    const projects = await projectsStore().get(PROJECTS_KEY, { type: 'json' });
    if (Array.isArray(projects)) {
      return projects as Project[];
    }

    await projectsStore().setJSON(PROJECTS_KEY, defaultProjects);
    return defaultProjects;
  } catch {
    return defaultProjects;
  }
}

async function writeProjects(projects: Project[]) {
  try {
    await projectsStore().setJSON(PROJECTS_KEY, projects);
  } catch {
    // Silent fallback keeps the site operational during local non-Netlify runs.
  }
}

export async function getProjects() {
  return readProjectsFromStore();
}

export async function saveImageFromFile(file: File) {
  if (!file || file.size === 0) {
    return null;
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
  const key = `${crypto.randomUUID()}.${extension}`;
  const bytes = await file.arrayBuffer();
  await imagesStore().set(key, bytes);

  return {
    imageKey: key,
    imageUrl: imageUrlFromKey(key)
  };
}

export async function getProjectImageBytes(key: string) {
  try {
    return await imagesStore().get(key, { type: 'arrayBuffer' });
  } catch {
    return null;
  }
}

export async function upsertProject(project: Project) {
  const existing = await readProjectsFromStore();
  const idx = existing.findIndex((item) => item.id === project.id);

  if (idx >= 0) {
    existing[idx] = project;
  } else {
    existing.unshift(project);
  }

  await writeProjects(existing);
}

export async function removeProject(id: string) {
  const existing = await readProjectsFromStore();
  const target = existing.find((item) => item.id === id);
  const filtered = existing.filter((item) => item.id !== id);
  await writeProjects(filtered);

  if (target?.imageKey) {
    try {
      await imagesStore().delete(target.imageKey);
    } catch {
      // No-op if image store is unavailable.
    }
  }
}
