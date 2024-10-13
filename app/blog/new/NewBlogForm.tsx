"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { createPost } from '@/app/actions/PublishPost'; 
import { UploadButton } from "../../utils/uploadthing";
import Image from 'next/image';  
import { getCategories } from '@/app/actions/getCategories'; 
import Link from 'next/link'

const NewBlogForm = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories(); 
      setCategories(categories);
    };
    
    fetchCategories();
  }, []);

  if (!session && status !== "loading") return <div>You must be signed in to post!</div>;

  const handleCategorySelection = (categoryId: number) => {
    setSelectedCategories((prevSelected) => 
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = session?.user;
    const userId = typeof user === 'object' && 'id' in user ? (user as { id: number }).id : null;

    if (!userId) {
      console.log('User ID is not available');
      return;
    }

    try {
      const post = await createPost({ 
        title, 
        content, 
        authorId: userId, 
        imgUrl: thumbnail, 
        categories: {
          connect: selectedCategories.map((categoryId) => ({ id: categoryId }))
        }
      });
      setSubmitted(true);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  if (submitted) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-130px)]'>
        <div className='text-7xl mb-12 text-center'>The post was created!</div> 
        <div className='text-5xl mb-10 text-center'>You can check it in the All Articles section</div> 
        <Link 
          href="/blog/all" 
          className='text-white block w-fit bg-indigo-500 px-4 py-2 sm:px-6 sm:py-4 mt-3 border-2 rounded shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)]'
        >
          Browse Articles
        </Link>
      </div>
    );
  }

  return (
    <div className='min-h-[calc(100vh-130px)] py-2 container flex flex-col mt-12'>
      <form className='flex flex-col flex-1 items-stretch justify-center h-full text-left' onSubmit={handleSubmit}>
        <input 
          className='text-4xl focus-visible:outline-none border-2 shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] p-2 rounded'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name='title'
          placeholder='Title'
        />
        <textarea 
          className='flex-1 focus-visible:outline-none text-2xl mt-4 border-2 shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)] p-2 rounded' 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name='content'
          placeholder='Content' 
        />

        <label className='text-slate-600 mb-6 mt-10 text-2xl text-center'>Select categories</label>
        <div className='flex flex-wrap justify-center gap-2'> 
          {categories.map(category => (
            <button 
              type="button"
              key={category.id}
              onClick={() => handleCategorySelection(category.id)}
              className={`px-4 py-2 rounded-full shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)]  ${selectedCategories.includes(category.id) ? 'bg-indigo-400 shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)]' : 'bg-gray-300'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <label className='text-slate-600 mb-3 mt-10 text-2xl text-center'>Add thumbnail image (optional)</label>   
        <div>
          <UploadButton
            endpoint="imageUploader" 
            appearance={{
              button:"text-white bg-indigo-400 rounded-r-none sm:px-6 sm:py-4 mt-6 border-2 rounded shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)]",
              container: " text-black ",
              allowedContent:"flex h-6 flex-col items-center justify-center px-2 text-white",
            }}
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              if (res) {
                setThumbnail(res[0].url); 
              }
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />        
        </div>

        {thumbnail && (
          <div className="mt-4 flex flex-col items-center">
            <Image
              src={thumbnail}
              alt="Thumbnail preview"
              width={400}  
              height={450}
              className="object-cover rounded-lg border border-gray-100 shadow-md"
            />
            <button 
              type="button"
              onClick={() => setThumbnail(null)} 
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Remove Image
            </button>
          </div>
        )}

        <button className='text-white bg-indigo-400 px-4 py-2 sm:px-6 sm:py-4 mt-6 mb-10 border-2 rounded shadow-[0.25rem_0.25rem_0px_0px_rgba(0,0,0,1)]' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
