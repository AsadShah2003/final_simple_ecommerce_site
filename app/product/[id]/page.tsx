'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { FaArrowLeft } from "react-icons/fa";
import { useCartStore } from '@/store/cart-context'
import { inter, lora } from '@/utils/Fonts'
import { useToast } from '@/components/custom/CustomToast'
import { products } from '@/utils/mock-data'
import { useState } from 'react'
import { LuLoader2 } from 'react-icons/lu'

export default function ProductPage() {
    const { showToast } = useToast()
    const { id } = useParams()
    const { addToCart, cart } = useCartStore()

    const product = products.find((p) => p.id === Number(id))

    console.log(product)

    if (!product) {
        return <div className="container mx-auto p-4">Product not found</div>
    }

    const handleAddToCart = () => {
        setIsOrderProcessing(true)

        setTimeout(() => {
            addToCart({ ...product, quantity: 1 })
            showToast("Product successfully added to cart", "success", 3000)
            setIsOrderProcessing(false)
        }, 1000)

    }

    const [isOrderProcessing, setIsOrderProcessing] = useState(false)

    return (
        <div className={inter.className + " max-w-[1200px] mx-auto p-4 mt-8"}>
            <Link href="/" className="inline-flex items-center mb-4">
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>
            <Card className="overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <Image
                            src={product.img}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <CardContent className='flex flex-col gap-1'>
                            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                            <p className="mt-2 text-gray-600 mb-2 text-sm">{product.description}</p>

                            <h1 className='font-bold '>Description</h1>
                            <p className='text-sm text-gray-500'>
                                {product.description}
                            </p>
                            <h1 className='mt-2 font-bold'>Product Specification </h1>
                            <p className='text-sm text-gray-500'>{product.specification}</p>
                            <p className="mt-3 text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
                            <div className='relative'>

                                <Button className='px-10 w-64 py-6' onClick={handleAddToCart} disabled={isOrderProcessing}>
                                    Add to Cart
                                </Button>
                                {
                                    isOrderProcessing && <LuLoader2 color='lightgray' className='animate-spin absolute duration-[1500] top-2.5 left-6' size={27} />
                                }

                            </div>

                        </CardContent>

                    </div>
                </div>
            </Card>
        </div>
    )
}