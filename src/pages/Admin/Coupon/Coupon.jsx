import React, { useEffect, useState } from 'react'
import AddCoupon from './Assest/AddCoupon'
import moment from 'moment';
import Table from '../../../components/Table/Table'
import { Trash } from 'iconsax-react'
import { deleteCoupon, getCoupon } from '../../../api';
import { toast } from 'react-toastify';

export default function Coupon() {
    const [couponData, setCouponData] = useState([]);

    const fetchCoupon = () => {
        getCoupon().then(res => {
            setCouponData(res)
        })
    }

    const deleteRowFunc = (row) => {
        deleteCoupon(row?.coupon_id).then(res => {
            console.log(res)
            if (res?.status == 'success') {
                toast?.success('Coupon Deleted Successfully');
                fetchCoupon();
            }
        })
    }

    const action = (row) =>
        <div className='flex items-center space-x-2'>
            <AddCoupon title='Edit Coupon' fetchCoupon={fetchCoupon} button='edit' data={row} />
            <button className='p-1 bg-red-100 ' onClick={() => deleteRowFunc(row)}>
                <Trash className='text-red-500' />
            </button>
        </div>

   // =============================== active user switch =============================
   const expiryStatus = (row) => {
    console.log('row', row)

    const isCouponExpired = expiryDate => moment().isAfter(moment(expiryDate));
    const couponExpired = isCouponExpired(row?.expiry_date);
        return <h6 className={`${!couponExpired ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} py-2 px-5 text-center capitalize rounded-full`}>
        {couponExpired ? "Expired" : "Active"}
        {/* {rowData?.role} */}
            </h6>

  
}


    const columns = [
        { field: 'coupon_name', header: 'Coupon Name', sortable: true },
        { field: 'discount_percent', header: 'Coupon Percentage', sortable: true },
        { field: 'expiry_date', header: 'Expiry Date', },
        { field: 'coupon_type', header: 'Coupon Type', sortable: true },
        { field: 'status', header: 'Expiry Status', body: expiryStatus,  sortable: true },
        { field: 'action', header: 'Action', body: action, sortable: true },
    ]

    useEffect(() => {
        fetchCoupon()
    }, [])
    return (
        <>
            <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 " >
                <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Coupons</h1>
                    </div>
                    <AddCoupon fetchCoupon={fetchCoupon} title='Add New Coupom' />
                </div>
                {<Table data={couponData} columns={columns} />}
            </div>
        </>
    )
}
