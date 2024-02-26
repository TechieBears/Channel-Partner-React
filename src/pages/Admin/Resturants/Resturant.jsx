import { Add, Eye, Refresh, SearchNormal } from 'iconsax-react';
import React, { useEffect, useState } from 'react'
import Table from '../../../components/Table/Table';
import AddRestaurant from '../../../components/Modals/Resturant/AddRestaurant';
import { NavLink } from 'react-router-dom';
import Switch from 'react-js-switch'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useSelector } from 'react-redux';
import { getRestarant } from '../../../api';
import { useForm } from 'react-hook-form';
import { formBtn1, formBtn2, inputClass, tableBtn } from '../../../utils/CustomClass';
import axios from 'axios';
import AddItem from '../../../components/Modals/Resturant/AddItem';



export default function Restaurant() {
    const [data, setData] = useState([]);
    const user = useSelector(state => state?.user?.loggedUserDetails);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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

    const getAllRestaurant = () => {
        getRestarant().then((res) => {
            const restaurantVendors = res.filter(item => item?.vendor_type == "restaurant");
            setData(restaurantVendors);
        });
    }
    /*================================     column    ========================= */

    const action = row => <div className="flex items-center gap-2">
        <NavLink to={`/resturants/restaurant-detail/${row?.vendor_id}`} state={row} className="bg-green-100 px-1.5 py-1 rounded-lg">
            <Eye size="20" className='text-green-500' />
        </NavLink>
        <AddRestaurant button='edit' title='Edit User' id={row?.user?.id} data={row} getAllRestaurant={getAllRestaurant} />
    </div>

    const columns = [
        { field: 'vendor_id', header: 'ID', sortable: false },
        { field: 'isb_code', header: 'ISB Code', sortable: false },
        { field: 'shop_name', header: 'Restaurant Name', sortable: true },
        { field: 'veg_or_nonveg', header: 'Type', body: (row) => <h6>{row?.veg_or_nonveg == '' || row?.veg_or_nonveg == null || row?.veg_or_nonveg == undefined ? '-------' : row?.veg_or_nonveg}</h6>, sortable: true },
        { field: 'address', header: 'Address', body: (row) => <h6>{row?.user?.address}</h6>, sortable: true },
        { field: 'city', header: 'City', body: (row) => <h6>{row?.user?.city}</h6>, sortable: true },
        { field: 'state', header: 'State', body: (row) => <h6>{row?.user?.state}</h6>, sortable: true },
        { field: 'pincode', header: 'PINCODE', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: true },
        { field: 'is_verified', header: 'Verification Status', body: (row) => <h6>{row?.is_verified == false ? 'Pending' : 'Verified'}</h6>, sortable: true },
        { field: 'is_activated', header: 'Activation Status', body: (row) => <h6>{row?.is_activated == false ? 'Pending' : 'Verified'}</h6>, sortable: true },
        { field: 'action', header: 'Action', body: action, sortable: true },
    ]

    useEffect(() => {
        console.log('called restaurant')
        getAllRestaurant()
    }, []);

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
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>  Restaurant Details</h1>
                    </div>
                    <AddRestaurant title='Add Restaurant' getAllRestaurant={getAllRestaurant} id={user?.userid} />

                    {/* <AddItem title='Add Item' /> */}
                </div>
                {
                    <Table columns={columns} data={data} />
                }
            </div>
            {/*====================== User Table ================================*/}
        </>
    )
}
