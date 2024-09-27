"use client"
import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useProduct } from '@/store/product-context'
const Filter = () => {
    const filterProducts = useProduct((state: any) => state.filterProducts)

    return (
        <div className='mt-8 w-full flex justify-end'>
            <Select onValueChange={(val) => filterProducts(val)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel className='font-bold'>Arrival</SelectLabel>
                        <SelectItem value="latest-products">Latest Products</SelectItem>
                        <SelectLabel className='font-bold'>Price</SelectLabel>
                        <SelectItem value="high-to-low">High to Low</SelectItem>
                        <SelectItem value="low-to-high">Low to High</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Filter