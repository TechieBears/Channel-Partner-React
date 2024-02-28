import React, { useEffect, useState } from 'react'
import AddCoupon from './Assest/AddCoupon'
import Table from '../../../components/Table/Table'
import { Trash } from 'iconsax-react'
import { deleteRow, getCoupon } from '../../../api';
import { toast } from 'react-toastify';

export default function Coupon() {
    const [couponData, setCouponData] = useState([]);

    const fetchCoupon = () => {
        getCoupon().then(res => {
            setCouponData(res)
        })
    }

    const deleteRowFunc = (row) => {
        deleteRow(row?.coupon_id).then(res => {
            if (res?.status == 'success') {
                toast?.success('Coupon Deleted Successfully');
                fetchCoupon();
            }
        })
    }

    const action = (row) =>
        <div className='flex items-center space-x-2'>
            <AddCoupon title='Edit Coupon' fetchCoupon={fetchCoupon} button='edit' data={row} />
            <button className='bg-red-100 p-1 ' onClick={() => deleteRowFunc(row)}>
                <Trash className='text-red-500' />
            </button>
        </div>


    const columns = [
        { field: 'coupon_name', header: 'Coupon Name', sortable: true },
        { field: 'discount_percent', header: 'Coupon Percentage', sortable: true },
        { field: 'expiry_date', header: 'Expiry Date', },
        { field: 'coupon_type', header: 'Coupon Type', sortable: true },
        { field: 'action', header: 'Action', body: action, sortable: true },
    ]

    useEffect(() => {
        fetchCoupon()
    }, [])
    return (
        <>
            <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5  " >
                <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                    <div className="">
                        <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Promotions</h1>
                    </div>
                    <AddCoupon fetchCoupon={fetchCoupon} title='Add New Coupom' />
                </div>
                {<Table data={couponData} columns={columns} />}
            </div>
        </>
    )
}
