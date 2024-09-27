'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { FiMinus } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { FaArrowLeft } from "react-icons/fa";
import { useCartStore } from '@/store/cart-context'
import { useToast } from '@/components/custom/CustomToast'
import Image from 'next/image'

export default function MyCartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [address, setAddress] = useState('')
    const { showToast } = useToast()
    const [isOrderProcessing, setIsOrderProcessing] = useState(false)

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    const handleQuantityChange = (id: number, newQuantity: number) => {
        updateQuantity(id, newQuantity)
    }

    const handleRemoveItem = (id: number) => {
        removeFromCart(id)
        showToast("Product removed from cart", "success", 3000)
    }

    const handleConfirmPurchase = () => {
        //custom delay
        setIsOrderProcessing(true)

        setTimeout(() => {
            setIsOrderProcessing(false)

            setIsModalOpen(true)
        }, 2000)

    }

    const handleConfirmOrder = () => {
        clearCart()
        setIsModalOpen(false)
        showToast("Your order is successfully verified and placed", "success", 3000)
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="inline-flex items-center mb-4">
                <FaArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>
            <Card>
                <CardHeader>
                    <CardTitle>Your Cart</CardTitle>
                </CardHeader>
                <CardContent>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id} className="flex justify-between items-center mb-4">
                                    <div className='w-fit flex gap-5 items-center'>
                                        <Image
                                            alt='product-image'
                                            width={60}
                                            height={0}
                                            className='object-cover rounded-md'
                                            src={item.img}
                                            priority
                                        />
                                        <span className='mt-1 font-medium'>{item.name} x {item.quantity}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        >
                                            <FiMinus className="h-4 w-4" />
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        >
                                            <LuPlus className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="ml-2 hover:opacity-[1] opacity-[0.8]"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <FaTrash className=" h-4 w-4" />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className='text-2xl '>Total: <span className='font-bold'>${totalPrice.toFixed(2)}</span></div>
                    <div className='relative'>

                        <Button className='px-10' onClick={handleConfirmPurchase} disabled={isOrderProcessing || cart.length === 0}>
                            Place this Order
                        </Button>
                        {
                            isOrderProcessing && <LuLoader2 color='lightgray' className='animate-spin absolute duration-[1500] top-2 left-3' size={20} />
                        }

                    </div>
                </CardFooter>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Delivery Address</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                                Address
                            </Label>
                            <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter className='relative'>

                        <Button className='px-10' onClick={handleConfirmOrder} disabled={isOrderProcessing || cart.length === 0}>
                            Confirm Order
                        </Button>


                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}