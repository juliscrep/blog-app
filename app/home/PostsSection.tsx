import React from 'react'
import { PrismaClient } from '@prisma/client'
import PostCard from './PostCard'

const prisma = new PrismaClient()

type Props = {}

const PostsSection = async (props: Props) => {
  
    const posts = await prisma.post.findMany()
    
    const bgClasses = [
        'bg-pink-500',
        'bg-blue-500',
        'bg-green-500',
    ]
  return (
    <div>
        <h1 className='text-5xl text-center mt-6'>Trending</h1>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-16'>
            {
                posts.map((post, index) => (
                    <PostCard key={post.id} post={post} className={bgClasses[index]}/>
                ))
            }

        </div>
    </div>
  )
}

export default PostsSection