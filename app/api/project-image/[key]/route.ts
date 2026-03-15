import { getProjectImageBytes } from '@/lib/projects';

const typeByExtension: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml'
};

export async function GET(_: Request, { params }: { params: { key: string } }) {
  const key = decodeURIComponent(params.key);
  const bytes = await getProjectImageBytes(key);

  if (!bytes) {
    return new Response('Not found', { status: 404 });
  }

  const ext = key.split('.').pop()?.toLowerCase() ?? '';
  const contentType = typeByExtension[ext] ?? 'application/octet-stream';

  return new Response(bytes, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}
