'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError, MissingIdentityError, login } from '@netlify/identity';
import { clearAdminSession, isAdminAuthenticated, setAdminSession } from '@/lib/auth';
import { removeProject, saveImageFromFile, upsertProject } from '@/lib/projects';
import type { Project } from '@/lib/types';

function adminEmailAllowed(email: string) {
  const configured = process.env.ADMIN_EMAIL;
  if (!configured) {
    return true;
  }
  return email.toLowerCase() === configured.toLowerCase();
}

function fallbackCredentialCheck(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword) {
    return false;
  }
  return email.toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword;
}

export async function authenticateAdmin(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!email || !password) {
    redirect('/admin?error=Please%20enter%20email%20and%20password');
  }

  let authenticated = false;

  try {
    await login(email, password);
    authenticated = true;
  } catch (error) {
    if (!(error instanceof AuthError) && !(error instanceof MissingIdentityError)) {
      throw error;
    }
  }

  if (!authenticated) {
    authenticated = fallbackCredentialCheck(email, password);
  }

  if (!authenticated || !adminEmailAllowed(email)) {
    redirect('/admin?error=Invalid%20credentials');
  }

  await setAdminSession(email);
  redirect('/admin');
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect('/admin');
}

function requireAuth() {
  if (!isAdminAuthenticated()) {
    redirect('/admin?error=Session%20expired');
  }
}

function normalizeLink(link: string) {
  if (!link) {
    return '#';
  }
  if (link.startsWith('http://') || link.startsWith('https://') || link === '#') {
    return link;
  }
  return `https://${link}`;
}

export async function createProject(formData: FormData) {
  requireAuth();

  const name = String(formData.get('name') ?? '').trim();
  const role = String(formData.get('role') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const link = normalizeLink(String(formData.get('link') ?? '').trim());
  const fileEntry = formData.get('image');

  if (!name || !role || !description) {
    redirect('/admin?error=Name%2C%20role%20and%20description%20are%20required');
  }

  let imageUrl: string | undefined;
  let imageKey: string | undefined;

  if (fileEntry instanceof File && fileEntry.size > 0) {
    const uploaded = await saveImageFromFile(fileEntry);
    imageUrl = uploaded?.imageUrl;
    imageKey = uploaded?.imageKey;
  }

  const project: Project = {
    id: crypto.randomUUID(),
    name,
    role,
    description,
    link,
    imageUrl,
    imageKey
  };

  await upsertProject(project);
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?success=Project%20added');
}

export async function updateProject(formData: FormData) {
  requireAuth();

  const id = String(formData.get('id') ?? '').trim();
  const name = String(formData.get('name') ?? '').trim();
  const role = String(formData.get('role') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const link = normalizeLink(String(formData.get('link') ?? '').trim());
  const currentImageKey = String(formData.get('currentImageKey') ?? '').trim() || undefined;
  const currentImageUrl = String(formData.get('currentImageUrl') ?? '').trim() || undefined;
  const fileEntry = formData.get('image');

  if (!id || !name || !role || !description) {
    redirect('/admin?error=Missing%20fields%20for%20update');
  }

  let imageUrl = currentImageUrl;
  let imageKey = currentImageKey;

  if (fileEntry instanceof File && fileEntry.size > 0) {
    const uploaded = await saveImageFromFile(fileEntry);
    imageUrl = uploaded?.imageUrl;
    imageKey = uploaded?.imageKey;
  }

  const project: Project = {
    id,
    name,
    role,
    description,
    link,
    imageUrl,
    imageKey
  };

  await upsertProject(project);
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?success=Project%20updated');
}

export async function deleteProject(formData: FormData) {
  requireAuth();

  const id = String(formData.get('id') ?? '').trim();
  if (!id) {
    redirect('/admin?error=Missing%20project%20ID');
  }

  await removeProject(id);
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?success=Project%20removed');
}
