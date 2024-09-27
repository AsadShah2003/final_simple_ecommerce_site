"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoHeart } from 'react-icons/io5';
import { Skeleton } from '../ui/skeleton';
import { useState } from 'react';

interface ProductCardProps {
    id: number;
    img: string;
    title: string;
    desc: string;
    price: number;
    isLoading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    img,
    title,
    desc,
    price,
    isLoading
}) => {
    const [isLiked, setIsLiked] = useState(false)

    if (isLoading) {
        return (
            <div className='mt-12 w-full h-[350px] flex flex-col relative'>
                <Skeleton className='h-[200px] w-full  bg-gray-300' />
                <div className='flex flex-col gap-2 mt-4'>
                    <Skeleton className='h-[1.2rem] w-[70%] bg-gray-300' />
                    <Skeleton className='h-[1rem] w-[50%]  bg-gray-300' />
                    <Skeleton className='h-[1.2rem] w-[30%]  bg-gray-300' />
                    <Skeleton className='h-[2rem] w-[100%]  bg-gray-300' />
                </div>
            </div>
        );
    }

    return (
        <div key={id} className='rounded-md mt-12 w-full h-[350px] flex flex-col relative'>
            <div className='h-fit overflow-hidden'>
                <Image
                    priority
                    width={400}
                    height={400}
                    alt='product-image'
                    src={img}
                    className='rounded-t-md'
                />
                {
                    !isLiked ? (
                        <IoMdHeartEmpty
                            size={25}
                            onClick={() => setIsLiked(!isLiked)}
                            className='text-gray-500 cursor-pointer hover:text-red-600 absolute top-2 right-2'
                        />
                    ) : (
                        <IoHeart
                            size={25}
                            onClick={() => setIsLiked(!isLiked)}
                            className='text-red-500 cursor-pointer absolute top-2 right-2'
                        />
                    )
                }
            </div>
            <div className='flex flex-col gap-2'>
                <div className='relative top-2 flex flex-col'>
                    <h1 className='font-medium text-[1.2rem]'>{title}</h1>
                    <p className='text-sm text-gray-500 mt-2'>{desc}</p>

                </div>
                <h1 className='font-bold mt-2 text-[1.2rem]'>${price.toFixed(2)}</h1>
                <Link href={`/product/${id}`} className="w-full">
                    <Button className='hover:bg-zinc-900 hover:text-gray-200 duration-75 mt-2 p-5 rounded-full bg-transparent text-black border border-gray-400 w-full'>
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
