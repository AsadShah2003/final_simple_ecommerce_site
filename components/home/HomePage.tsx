import React from 'react'
import HeroBanner from './HeroBanner'
import Filter from './Filter'
import ProductsGrid from './ProductsGrid'

const HomePage = () => {
    return (
        <div className='min-h-screen w-full'>
            <main className='max-w-[1200px] mx-auto p-2'>
                <HeroBanner />
                <Filter />
                <ProductsGrid />
            </main>
        </div>
    )
}

export default HomePage