import React from 'react'
import Image from 'next/image'

type Props = {}

const HeroSection = (props: Props) => {
  return (
    <section>
        <Image src="/images/computer.png" width={300} height={300} alt='girl with a computer' />
    </section>
  )
}

export default HeroSection