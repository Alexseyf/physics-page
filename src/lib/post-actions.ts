'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string(), // Markdown
  published: z.boolean().optional(),
});

export async function savePost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    content: formData.get('content'),
    published: formData.get('published') === 'on',
  };

  const data = PostSchema.parse(rawData);
  const id = formData.get('id') as string | null;

  if (id && id !== 'new') {
    // Update
    await prisma.post.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  } else {
    // Create
    await prisma.post.create({
      data: {
        ...data,
        authorId: session.user.id,
      },
    });
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/');
  redirect('/admin/dashboard');
}

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.post.delete({ where: { id } });
  revalidatePath('/admin/dashboard');
}
