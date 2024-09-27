import { create } from "zustand"
import { products } from "@/utils/mock-data"

export const useProduct = create((set: any) => ({
    ourProdcuts: products,
    filterProducts: (filterType: string) => {
        let sortedProducts = [...products]; // Create a new array to avoid mutation

        set((state: any) => ({
            ourProdcuts: filterType === "high-to-low" ? sortedProducts.sort((a: any, b: any) => b.price - a.price)
                : filterType === "low-to-high" ? sortedProducts.sort((a: any, b: any) => a.price - b.price) :
                    products
        }))
    }
}))