import React from 'react'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='border-b flex justify-between'>
        <Link href="/" className='text-4xl'>LOGO</Link>
        <button className='text-white bg-black px-4 py-4'>Sign In</button>
    </div>
  )
}

export default Header