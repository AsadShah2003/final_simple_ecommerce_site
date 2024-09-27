"use client"
import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import { Button } from '../ui/button';
import { useCartStore } from '@/store/cart-context';
import Link from 'next/link';
import Image from 'next/image';
const Navbar = () => {

    const { cart } = useCartStore()

    return (
        <header className='z-[10] w-full h-fit bg-white sticky top-0'>
            <nav className='max-w-[1200px] mx-auto p-3 flex items-center justify-between'>
                <Image
                    width={60}
                    height={60}
                    alt='brand-image'
                    src="/assets/logo.png"
                    className='object-cover bg-center'
                />
                <div className='rounded-full border flex justify-center items-center w-10 h-10 shadow-sm'>
                    <Link href={"/cart"}>
                        <Button variant="outline" className='flex items-center gap-5'>
                            <IoCartOutline size={25} color='gray' />
                            View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                        </Button>
                    </Link>

                </div>
            </nav>
        </header>
    )
}

export default Navbar