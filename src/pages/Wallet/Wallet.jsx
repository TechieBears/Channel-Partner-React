import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formBtn1, formBtn2, inputClass } from '../../utils/CustomClass';
import Table from '../../components/table/Table';
import { Link } from 'react-router-dom';
import { Eye } from 'iconsax-react';


export const Wallet = () => {
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        console.log("🚀 ~ file: Wallet.jsx:5 ~ onSubmit ~ data:", data)
    }
    // trans_time
    // user
    // amount
    // transaction_log
    // transaction_status
    const data = [{
        "user_name": "John Doe",
        "user_email": "John@gmail.com",
        "user_phone": "+1234567890",
        "user_address": "123 Main St, City, Country",
        "user_amount": 33.94,
        "transaction_status": "Profit",
    },
    ]

    const UserAction = (row) => (
        <div className='w-full'>
            <Link className=''>
                <Eye className='text-sky-400' />
            </Link>
        </div>
    )

    const columns = [
        { field: "user_name", header: "Name", style: true },
        { field: "user_email", header: "Email", style: true },
        { field: "user_phone", header: "Phone No", style: true, sortable: true },
        { field: "user_address", header: "Address", style: true, sortable: true },
        { field: "user_amount", header: "Amount", style: true, sortable: true },
        { field: "transaction_status", header: "Status", style: true, sortable: true },
        { field: "action", header: "Action", body: UserAction, style: true, sortable: true },
    ]

    return (

        <>
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
                    <div className="grid w-full grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search By Name'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('name')}
                            />
                        </div>
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search By Email'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('email')}
                            />
                        </div>

                    </div>
                    <div className="flex items-center gap-x-2">
                        <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                        <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => handleClear()}>Clear</button>
                    </div>
                </form>
            </div>

            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>Wallet Details</h1>
                    </div>
                    {/* <AddVendors title='Add Vendors' FranchiseeVendors={FranchiseeVendors} /> */}
                </div>
                {
                    <Table data={data} columns={columns} />
                }
            </div>
        </>
    )
}
