import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formBtn1, formBtn2, inputClass } from '../../utils/CustomClass';
import Table from '../../components/table/Table';
import { Link } from 'react-router-dom';
import { Eye } from 'iconsax-react';
import { environment } from '../../env';
import axios from 'axios';
import { useSelector } from 'react-redux';


export const Wallet = () => {
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm();
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    console.log("🚀 ~ file: Wallet.jsx:15 ~ Wal ~ LoggedUserDetails:", LoggedUserDetails)


    const [walletData, setWalletData] = useState();

    const onSubmit = async (data) => {
        console.log("🚀 ~ file: Wallet.jsx:5 ~ onSubmit ~ data:", data)
    }

    const data = [{
        "user_name": "John Doe",
        "user_email": "John@gmail.com",
        "user_phone": "+1234567890",
        "user_address": "123 Main St, City, Country",
        "user_amount": 33.94,
        "transaction_status": "Profit",
    },
    ]


    const amountData = (rowData) => {
        return (
            <h6 className={`${Math.sign(rowData?.amount) === 1 ? "text-green-500" : "text-red-500"}`}>
                {/* {<PriceFormater price={rowData?.amount}/>} */}
                {rowData?.amount}
            </h6>
        )
    }

    const columns = [
        { field: "trans_id", header: "Transaction Id", style: true },
        { field: "trans_time", header: "Date & Time", style: true },
        // { field: "user", header: "User", style: true, sortable: true },
        // { field: "transaction_log", header: "Transaction Log", style: true, sortable: true },
        { field: "amount", header: "Amount", style: true, sortable: true, body: amountData },
        { field: "transaction_status", header: "Status", style: true, sortable: true },
    ]

    const getWalletDetails = async () => {
        try {
            const url = `${environment.baseUrl}app/list_wallet_transaction?user=${LoggedUserDetails?.userid}`;
            await axios.get(url).then((res) => {
                setWalletData(res?.data)
            }).catch((err) => {
                console.log("🚀 ~ file: Wallet.jsx:56 ~ awaitaxios.get ~ err:", err)
            })
        } catch (err) {
            console.log("🚀 ~ file: Wallet.jsx:68 ~ getWalletDetails ~ err:", err)
        }
    }

    useEffect(() => {
        getWalletDetails()

    }, [])

    return (

        <>
            {/* <div className="p-4 bg-white sm:m-5 rounded-xl" >
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
            </div> */}

            <div className="p-8 bg-white sm:m-5 rounded-xl" >
                <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>Wallet Details</h1>
                    </div>
                    {/* <AddVendors title='Add Vendors' FranchiseeVendors={FranchiseeVendors} /> */}
                </div>
                {
                    <Table data={walletData?.transaction_log} columns={columns} />
                }
            </div>
        </>
    )
}
