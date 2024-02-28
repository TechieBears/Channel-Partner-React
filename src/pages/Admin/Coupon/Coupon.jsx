import React from 'react'
import AddCoupon from './Assest/AddCoupon'
import Table from '../../../components/Table/Table'
import { Trash } from 'iconsax-react'

export default function Coupon() {
    const couponData = [
        {
            "coupon_name": "First Coupon",
            "coupon_percentage": 10,
            "expiry_date": "2024-03-15",
            "coupon_type": "Seller"
        },
        {
            "coupon_name": "Second Coupon",
            "coupon_percentage": 20,
            "expiry_date": "2024-04-10",
            "coupon_type": "Vendor"
        },
        {
            "coupon_name": "Third Coupon",
            "coupon_percentage": 15,
            "expiry_date": "2024-03-30",
            "coupon_type": "Seller"
        }
    ]

    const action = (row) =>
        <div className='flex items-center space-x-2'>
            <AddCoupon title='Edit Coupon' button='edit' data={row} />
            <div className='bg-red-100 p-1 cursor-pointer '>
                <Trash className='text-red-500' />
            </div>
        </div>


    const columns = [
        { field: 'coupon_name', header: 'Coupon Name', sortable: true },
        { field: 'coupon_percentage', header: 'Coupon Percentage', sortable: true },
        { field: 'expiry_date', header: 'Expiry Date', },
        { field: 'coupon_type', header: 'Coupon Type', sortable: true },
        { field: 'action', header: 'Action', body: action, sortable: true },
    ]
    return (
        <>
            <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5  " >
                <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                    <div className="">
                        <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Promotions</h1>
                    </div>
                    <AddCoupon title='Add New Coupom' />
                </div>
                {<Table data={couponData} columns={columns} />}
            </div>
        </>
    )
}
