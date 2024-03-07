import { ArrowLeft } from 'iconsax-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ViewOrder() {
    const navigate = useNavigate()
    return (
        <div className='m-4 space-y-2'>
            <div className='flex gap-3'>
                <button onClick={() => navigate(-1)} >
                    <ArrowLeft />
                </button>

            </div>
            <div className='bg-white p-4 rounded-xl '>
                <p className='font-bold text-2xl'>Order Summary</p>
                <div className='mt-2'>
                    <p className='text-sm text-slate-600'>Ordered At 12:00 PM On 12-02-2024</p>
                    <p className='text-lg font-semibold'>2 items in this order</p>
                </div>
                <div className='grid grid-cols-3 '>
                    <div className='grid grid-cols-8 mt-10 items-center'>
                        <img
                            className='w-28'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU'
                            alt=''
                        />
                        <div className='col-span-7 space-y-1'>
                            <p>Amul Butter Milk Masala Flavour</p>
                            <p className='text-base text-gray-500'>150ml X 1</p>
                            <p className='font-semibold text-sm'>₹ 15</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-8 mt-10 items-center'>
                        <img
                            className='w-28'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU'
                            alt=''
                        />
                        <div className='col-span-7 space-y-1'>
                            <p>Amul Butter Milk Masala Flavour</p>
                            <p className='text-base text-gray-500'>150ml X 1</p>
                            <p className='font-semibold text-sm'>₹ 15</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-8 mt-10 items-center'>
                        <img
                            className='w-28'
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU'
                            alt=''
                        />
                        <div className='col-span-7 space-y-1'>
                            <p>Amul Butter Milk Masala Flavour</p>
                            <p className='text-base text-gray-500'>150ml X 1</p>
                            <p className='font-semibold text-sm'>₹ 15</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white p-4 rounded-xl'>
                <p className='font-bold text-2xl'>Bill details</p>
                <div className='grid grid-cols-2 border-t mt-4 pt-4'>
                    <div className='space-y-1'>
                        <p>MRP</p>
                        <p className='text-blue-400'>Product Discount</p>
                        <p>Item Total</p>
                        <p>Handeling charges</p>
                        <p>Delivery charges</p>
                        <p className='font-semibold'>Bill total</p>
                    </div>
                    <div className='space-y-1'>
                        <p>₹75</p>
                        <p className='text-blue-400'>₹1</p>
                        <p>₹74</p>
                        <p>+₹2</p>
                        <p>free</p>
                        <p className='font-semibold'>₹75</p>
                    </div>
                </div>
            </div>
            <div className='bg-white p-4 rounded-xl'>
                <p className='font-bold text-2xl'>Order details</p>
                <div className='border-t mt-4 pt-4 space-y-2'>
                    <div className=''>
                        <p className='text-sm text-gray-600 '>Order id</p>
                        <p>ORD235673456723</p>
                    </div>
                    <div className=''>
                        <p className='text-sm text-gray-600'>Payment</p>
                        <p>Paid Online</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
