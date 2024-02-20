import { Add, Refresh, SearchNormal } from 'iconsax-react';
import React, { useState } from 'react'
import Table from '../../../components/Table/Table';
import AddRestaurant from '../../../components/Modals/Resturant/AddRestaurant';
import { NavLink } from 'react-router-dom';
import Switch from 'react-js-switch'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useForm } from 'react-hook-form';
import { formBtn1, formBtn2, inputClass, tableBtn } from '../../../utils/CustomClass';
import { useSelector } from 'react-redux';



export default function FranchiseRestaurent() {
    const data = [
        {
            "id": 1,
            "name": "Delicious Bites",
            "address": "123 Main Street, Cityville",
            "email": "info@deliciousbites.com",
            "dl_commission": 0.15,
            "pick_commission": 0.1,
            "revenue": 50000
        },
        {
            "id": 2,
            "name": "Tasty Treats",
            "address": "456 Oak Avenue, Townsville",
            "email": "hello@tastytreats.net",
            "dl_commission": 0.12,
            "pick_commission": 0.08,
            "revenue": 75000
        },
        {
            "id": 3,
            "name": "Gourmet Haven",
            "address": "789 Pine Road, Villageland",
            "email": "contact@gourmethaven.org",
            "dl_commission": 0.18,
            "pick_commission": 0.15,
            "revenue": 60000
        }
    ]

    const [activeTab, setActiveTab] = useState(true);
    const [rstatus, setStatus] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const user = useSelector(state => state?.user?.loggedUserDetails);



    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    /*================================     column    ========================= */

    // =================== filter data ========================
    const onSubmit = async (data) => {
        if (data?.name != '' || data?.email != '' || data?.city != '' || data?.role != '') {
            let url = `${environment.baseUrl}user-filter/?first_name=${data?.name}&email=${data?.email}&city=${data?.city}&role=${data?.role}`
            await axios.get(url).then((res) => {
                dispatch(setUserList(res.data))
                toast.success("Filters applied successfully")
            })
        } else {
            toast.warn("No Selected Value !")
        }
    }
    // =================== table user active column ========================

    const status = (row) => <Switch checked={rstatus} onChange={() => setStatus(!rstatus)} />
    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>
    const columns = [
        { field: 'id', header: 'ID', body: (row) => <h6>{row?.id}</h6>, sortable: false },
        { field: 'name', header: 'Restaurants Name', body: (row) => <NavLink to={`/resturants/restaurant-detail/${row?.id}`}><h6 className='underline text-sky-400'>{row?.name}</h6> </NavLink>, sortable: false },
        { field: 'address', header: 'Address', body: (row) => <h6>{row?.address}</h6>, sortable: false },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.email}</h6>, sortable: false },
        { field: 'dl_commission', header: 'Delivery Commission', body: (row) => <h6>{row?.dl_commission}</h6>, sortable: false },
        { field: 'pick_commission', header: 'Pickup Commission', body: (row) => <h6 className='content-center'>{row?.pick_commission}</h6>, sortable: false },
        { field: 'revenue', header: 'Renevue', body: (row) => <h6>{row?.revenue}</h6>, sortable: true },
        { field: 'status', header: 'Status', body: status, sortable: false },
        { field: 'action', header: 'Action', body: action, sortable: false },
    ]
    return (
        <>
                {/* ========================= user filter ======================= */}
                <div className="p-4 bg-white sm:m-5 rounded-xl" >
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
                        <div className="grid w-full grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-2">
                            <div className="">
                                <input
                                    type="text"
                                    placeholder='Search by name'
                                    autoComplete='off'
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register('name')}
                                />
                            </div>
                            <div className="">
                                <input
                                    type="text"
                                    placeholder='Search by email'
                                    autoComplete='off'
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register('email')}
                                />
                            </div>
                            <div className="">
                                <select
                                    name="City"
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register("role")}
                                >
                                    <option value="" >
                                        Select by Role
                                    </option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="provider">Provider</option>
                                </select>
                            </div>
                            <div className="">
                                <select
                                    name="City"
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register("city")}
                                >
                                    <option value="" >
                                        Select by city name
                                    </option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Delhi">Delhi</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                            <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => { reset(), toast.success("Filters clear successfully"), fetchData() }}>Clear</button>
                        </div>
                    </form>
                </div>
            {/* ========================= user filter ======================= */}

            
            {/*====================== User Table ================================*/}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>  Restaurent Details</h1>
                    </div>
                    <AddRestaurant title='Add Restaurant' id={user?.userid} />
                </div>
                {
                    <Table columns={columns} data={data} />
                }
            </div>
            {/*====================== User Table ================================*/}
        </>

        
        // <div className='p-4 space-y-4'>
         
        //     <div className='grid grid-cols-3 gap-10 mt-4'>
        //         <div className='flex gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg '>
        //             <SearchNormal className='text-gray-400' />
        //             <input placeholder='Search..' className='w-4/5 h-full' />
        //         </div>
        //         <input className={inputClass} placeholder='Filter By Pincode' />
        //         <div className='grid grid-cols-3 gap-2'>
        //             <button className='flex gap-2 p-3 bg-white border-2 rounded-lg '>
        //                 <Refresh className='text-gray-400' />
        //                 <p>Refresh</p>
        //             </button>
        //             <div className='col-span-2'>
        //                 <AddRestaurant title='Add Restaurant' />
        //             </div>
        //         </div>
        //     </div>
        //     <Table columns={columns} data={data} />
        // </div>
    )
}
