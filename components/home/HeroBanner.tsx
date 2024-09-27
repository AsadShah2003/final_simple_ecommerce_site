import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const HeroBanner = () => {
    return (
        <div className='rounded-lg bg-[#ffddba] w-full h-[300px] flex gap-6'>
            <div className='flex-[1] p-12'>
                <h1 className='text-4xl font-extrabold leading-normal'>Enjoy up to 50% off on select headphones</h1>
                <span className='text-sm'>Taxes and additional fees calculated at checkout.</span>
                <Button className='mt-10 w-2/4 p-6 rounded-full'>Buy now</Button>
            </div>
            <div className='flex-[1] flex justify-center items-center overflow-hidden'>
                <Image
                    draggable={false}
                    width={250}
                    height={250}
                    alt='hero-banner'
                    src="/assets/herobanner.png"
                    className='overflow-hidden relative top-5 object-cover bg-center'
                />
            </div>
        </div>
    )
}

export default HeroBanner