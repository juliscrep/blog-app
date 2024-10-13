import React from 'react';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import AllPosts from '../all/AllPosts';

type PostWithCategories = Prisma.PostGetPayload<{
  include: { categories: true }
}>;

type Category = Prisma.CategoryGetPayload<object>;  


const Page = async () => {
  const posts: PostWithCategories[] = await prisma.post.findMany({
    include: {
      categories: true,
    },
  });

  console.log(posts);
  
  const categories: Category[] = await prisma.category.findMany();

  
  return (
    <div className="my-24 container">
      <h2 className="text-4xl text-center my-6">All Articles</h2>
      <AllPosts categories={categories} posts={posts} />
    </div>
  );
};

export default Page;

