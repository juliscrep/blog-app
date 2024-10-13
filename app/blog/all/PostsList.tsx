import React from 'react'
import { Prisma } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type Post = Prisma.PostGetPayload<{
  include: { categories: true }
}>

export type PostListProps = {
  posts: Post[]
}

export const PostsList = (props: PostListProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
      {props.posts.map((post: Post) => (
        <div key={post.id} className='bg-white rounded shadow-lg h-full flex flex-col'>
          <Link href={`/blog/${post.id}`} className='block cursor-pointer rounded border-2 shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] hover:shadow-[0.5rem_0.5rem_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transform transition-shadow duration-150'>
            <article className='w-full h-full flex flex-col'>
              <figure className='relative w-full h-40 md:h-48 lg:h-56'>
                {post.imgUrl 
                  ? <Image src={post.imgUrl} alt="Post thumbnail" layout='fill' objectFit='cover' /> 
                  : <Image src="/images/article-placeholder.png" alt="Placeholder thumbnail" layout='fill' objectFit='cover' className='rounded-t-md' />
                }
              </figure>
              <div className='px-6 py-4 text-left flex-1 flex flex-col'>
                <p className='text-gray-500 text-sm mb-2'>{format(new Date(post.createdAt), 'dd/MM/yyyy, hh:mm:ss a', { locale: es })}</p>
                <h1 className='text-lg font-semibold mb-2'>{post.title}</h1>
                <p className='text-sm text-gray-700 line-clamp-3 mb-4 flex-grow'>{post.content}</p>
                <span className='text-indigo-600 font-semibold hover:text-indigo-800'>Read More</span>
              </div>
            </article>
          </Link>
        </div>
      ))}
    </div>
  )
}
