"use client"
import React, { useEffect, useState } from 'react'
import Product from './Product'
import { useProduct } from '@/store/product-context'

type prod = {
    id: number,
    name: string,
    price: number,
    description: string
    img: string
    spec: string
}

const ProductsGrid = () => {
    const [loading, setLoading] = useState(true)
    const products = useProduct((state: any) => state.ourProdcuts)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 400)

    }, [products])

    return (
        <div className='w-full mt-8 pb-32'>
            <h1 className='font-bold text-3xl'>Headphones For You!</h1>
            <main className='grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {
                    products.map((prod: prod, idx: any) => (
                        <div key={idx}>
                            <Product isLoading={loading} id={prod.id} desc={prod.description} price={prod.price} title={prod.name} img={prod.img} />
                        </div>
                    ))
                }
            </main>
        </div>
    )
}

export default ProductsGrid