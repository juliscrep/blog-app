import React from 'react'
import githubIcon from '../../public/github-icon.svg'
import twitterIcon from '../../public/twitter-icon.svg'
import Image from 'next/image'


const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-8 px-4'><div className='flex container justify-between'>
      <div className='flex flex-row items-center'>
        <div>
          <div className='text-2xl mb-3'>Neo Blog</div>
          <div className='text-sm'>©  2024 Neo Blog</div>
        </div>
      </div>
      <div className='flex'>
        <a href='https://github.com' target="_blank" className='mr-3'>
          <Image src={githubIcon} alt="github" width={40} height={40} />
        </a>
        <a href='https://twitter.com' target="_blank">
          <Image src={twitterIcon} alt="twitter" width={40} height={40} />
        </a>
      </div>
    </div></div>
  )
}

export default Footer