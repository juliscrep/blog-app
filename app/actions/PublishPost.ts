"use server"

import { Prisma } from "@prisma/client"
import { prisma } from '@/lib/prisma'

export async function createPost(postInfo: Prisma.PostUncheckedCreateInput) {
  
  const user = await prisma.user.findUnique({
    where: {
      id: postInfo.authorId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const newPost = await prisma.post.create({
    data: {
      ...postInfo,
    },
  });

  

  return newPost;
}
