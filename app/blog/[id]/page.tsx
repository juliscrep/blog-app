import React from 'react'
import { prisma } from '@/lib/prisma'

const page = async ({ params }: { params: { id: string } }) => {
  const postId = Number(params.id);

  if (isNaN(postId)) {
    return <div>Invalid post ID</div>;
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center mt-6 px-6 lg:px-24">
      {post && (
        <>
          {post.imgUrl && (
            <div
              className="w-full h-80 md:h-96 my-8 bg-cover bg-center rounded-lg shadow-lg"
              style={{ backgroundImage: `url(${post.imgUrl})` }}
            ></div>
          )}
          <h1 className="text-5xl font-bold mb-8 text-center max-w-4xl">{post.title}</h1>

          <div className="flex items-center mb-6">
            <p className="text-xl text-gray-500 mr-2">By</p>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center mr-3"
              style={{ backgroundImage: `url(${post.author.image})` }}
            ></div>
            <p className="text-xl text-gray-500">{post.author.name}</p>
          </div>

          <div className="max-w-4xl text-lg leading-relaxed text-justify mb-20">
            <p>{post.content}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
