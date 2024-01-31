import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table/Table';
import { ArrowSwapVertical, Box, Eye, NotificationBing, ShoppingCart, Trash, Category, UserTick, UserRemove, Timer } from 'iconsax-react';
import { deleteStorage, getPartnerStorage, getStorages } from '../../../api';
import { formBtn2, inputClass } from '../../../utils/CustomClass';
import { formBtn1 } from '../../../utils/CustomClass';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { environment } from '../../../env';
import { useDispatch, useSelector } from 'react-redux';
import { setStorageList } from '../../../redux/slices/storageSlice';
import { toast } from 'react-toastify';
import AsyncSelect from 'react-select/async';
import DashboardForm from '../../../components/modals/DashboardModals/DashboardForm';
import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal';

const Dashboard = () => {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const storages = useSelector((state) => state?.storage?.list)
    const cityNames = useSelector((state) => state?.master?.city)
    const tempretureRangeList = useSelector(state => state?.master?.temperatureRange)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [delId, setDelId] = React.useState(0);


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm();

    // ======================== Data submit ===================================
    const onSubmit = async (data) => {
        if (data?.name?.value !== undefined || data?.location != '') {
            let url = `${environment.baseUrl}storage-filter/?name=${data?.name?.value == undefined ? '' : data?.name?.value}&location=${data.location == undefined ? '' : data.location}&user=${user?.role != 'admin' ? user?.userid : ''}`
            await axios.get(url).then((res) => {
                dispatch(setStorageList(res.data))
                toast.success("Filters applied successfully")
            })
        } else {
            toast.warn("No Selected Value !")
        }

    }

    // ====================== fetch data api ==================================

    const StorageList = () => {
        if (user.role == 'admin') {
            getStorages().then(res => {
                console.log(res)
                dispatch(setStorageList(res))
            }).catch(err => {
                console.error('Error', err);
            })
        } else {
            getPartnerStorage(user?.userid).then(res => {
                dispatch(setStorageList(res))
            }).catch(err => {
                console.error('Error', err);
            })
        }
    }

    // ================================ Dropdown List =========================

    const filterOptions = (options, inputValue) => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (_, callback) => {
        const uniqueNames = new Set();
        const uniqueProducts = storages?.filter(res => res.name && !uniqueNames.has(res.name) && uniqueNames.add(res.name))
            .map(res => ({ label: res.name, value: res.name }));
        callback(uniqueProducts || []);
    }



    // ================================ filter reset ============================
    const filterReset = () => {
        reset({
            'name': null,
            'location': ''
        })
        StorageList()
        toast.success("Filters clear")
    }

    // ================= delete storage data ===============
    const toggleModalBtn = (id) => {
        setOpen(!open)
        setDelId(id)
    }
    const deleteData = () => {
        deleteStorage(delId).then((form) => {
            if (form?.message === 'Data deleted successfully') {
                StorageList();
                toast.success(form?.message);
                setOpen(!open)
            }
        })
    }
    // ======================== table action =========================
    const actionBodyTemplate = (row) => <div className="flex items-center gap-2">
        <NavLink to={`/storage/${row.id}`} className="bg-green-100 px-1.5 py-2 rounded-sm"><Eye size="20" className='text-green-500' /></NavLink>
        <DashboardForm button='edit' title='Edit Stroage' data={row} StorageList={StorageList} />
        <button onClick={() => toggleModalBtn(row.id)} id={row.ID} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button>

    </div>

    // ====================== table columns ======================
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'location', header: 'City' },
        { field: 'rating', header: 'Rating' },
        { field: 'spoc_name', header: 'SPOC Name' },
        { field: 'spoc_contact', header: 'SPOC Contact' },
        { field: 'spoc_email', header: 'SPOC Email' },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
    ];

    useEffect(() => {
        StorageList()
    }, [])


    const [activeTab, setActiveTab] = useState(1);

    const changeTab = (tabNumber) => {
      setActiveTab(tabNumber);
    };

    return (
        <>
            <DeleteModal
                title='Delete Stroage'
                deleteBtn={deleteData}
                toggleModalBtn={toggleModalBtn}
                description={"Are you sure you want to delete this Stroage"} open={open}
            />
            <section className='w-full h-full'>
                {/* =====================Dashboard header===================== */}
                <div className="grid grid-cols-1 p-8 m-4 bg-white sm:m-5 rounded-xl sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-10 ">
                    <div className="flex items-center mr-8 space-x-3 border-r-0 sm:border-r border-gray-200/70 ">
                        <div className="p-3.5 rounded-xl bg-sky-50">
                            <ShoppingCart size={26} className="text-sky-400" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-sm text-gray-500 font-tb'>Delivered Orders</h6>
                            <h6 className='text-base font-semibold text-sky-400 font-tb'>980</h6>
                        </div>
                    </div>
                    <div className="flex items-center mr-8 space-x-3 border-r-0 sm:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-orange-50">
                            <Timer size={26} className="text-orange-400" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-sm text-gray-500 font-tb'>Pending Orders</h6>
                            <h6 className='text-base font-semibold text-orange-400 font-tb'>15</h6>
                        </div>
                    </div>
                    <div className="flex items-center mr-8 space-x-3 border-r-0 lg:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-purple-50">
                            <ArrowSwapVertical size={26} className="text-purple-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-sm text-gray-500 font-tb'>Active Orders</h6>
                            <h6 className='text-base font-semibold text-purple-600 font-tb'>120</h6>
                        </div>
                    </div>
                    <div className="flex items-center mr-8 space-x-3 border-r-0 border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-orange-50">
                            <UserRemove size={26} className="text-red-500" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-sm text-gray-500 font-tb'>Customer Cancelled Orders</h6>
                            <h6 className='text-base font-semibold text-red-500 font-tb'>70</h6>
                        </div>
                    </div>
                    <div className="flex items-center mr-8 space-x-3 border-r-0 sm:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-sky-50">
                            <UserTick size={26} className="text-sky-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-sm text-gray-500 font-tb'>Vendors</h6>
                            <h6 className='text-base font-semibold text-sky-400 font-tb'>55</h6>
                        </div>
                    </div>
                    <div className="flex items-center mr-8 space-x-3 border-r-0 sm:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-orange-50">
                            <Category size={26} className="text-orange-400" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-sm text-gray-500 font-tb'>Categories</h6>
                            <h6 className='text-base font-semibold text-orange-400 font-tb'>25</h6>
                        </div>
                    </div>
                    <div className="flex items-center mr-8 space-x-3 border-r-0 md:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-sky-50">
                            <Box size={26} className="text-purple-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-sm text-gray-500 font-tb'>Products</h6>
                            <h6 className='text-base font-semibold text-purple-600 font-tb'>1507</h6>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 ">
                        <div className="p-3.5 rounded-xl bg-red-50">
                            <NotificationBing size={26} className="text-red-500" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-sm text-gray-500 font-tb'>Promotions</h6>
                            <h6 className='text-base font-semibold text-red-500 font-tb'>19</h6>
                        </div>
                    </div>
                </div>



                <div className="mx-auto mt-8 sm:m-5">
                    <div className="flex">
                        <button
                        onClick={() => changeTab(1)}
                        className={`py-2 px-0 ${
                            activeTab === 1 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
                        }`}
                        >
                        Pending
                        </button>
                        <button
                        onClick={() => changeTab(2)}
                        className={`py-2 px-0 ml-4 ${
                            activeTab === 2 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
                        }`}
                        >
                        Active
                        </button>
                    </div>

                    <div className="mt-8">
                        {/* {activeTab === 1 && <p>Content for Tab 1</p>}
                        {activeTab === 2 && <p>Content for Tab 2</p>} */}
                        <div className='grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2'>
                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 " previewlistener="true">
                                <div className="items-center gap-x-3">
                                    <div className='flex flex-wrap justify-between p-4'>
                                        <p className='text-sm'>Order Id -  <span className='text-sky-400'>753</span></p>
                                        <p className='text-sm'>Order Date - <span className='text-base font-semibold text-center text-gray-800'>Jan 1, 2024 , 05:56 PM</span> </p>
                                    </div>
                                    <div className="flex-1 p-4 my-2">
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center justify-between'>
                                                <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                                                <div>
                                                <h2 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-white">Butter Milk x 7 more</h2>
                                                <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                             <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 dark:text-gray-400">Payment - Cash</p>
                                        </div> 
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block px-4 transition-colors font-tb tracking-wide duration-200 py-2 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-gray-200 hover:text-black hover:bg-gray-300 capitalize w-full">Reject</button>
                                            <button type="submit" className="relative block px-4 transition-colors font-tb tracking-wide duration-200 py-2 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize w-full">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 " previewlistener="true">
                                <div className="items-center gap-x-3">
                                    <div className='flex flex-wrap justify-between p-4'>
                                        <p className='text-sm'>Order Id -  <span className='text-sky-400'>753</span></p>
                                        <p className='text-sm'>Order Date - <span className='text-base font-semibold text-center text-gray-800'>Jan 1, 2024 , 05:56 PM</span> </p>
                                    </div>
                                    <div className="flex-1 p-4 my-2">
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center justify-between'>
                                                <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                                                <div>
                                                <h2 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-white">Butter Milk x 7 more</h2>
                                                <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                             <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 dark:text-gray-400">Payment - Cash</p>
                                        </div> 
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block px-4 transition-colors font-tb tracking-wide duration-200 py-2 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-gray-200 hover:text-black hover:bg-gray-300 capitalize w-full">Reject</button>
                                            <button type="submit" className="relative block px-4 transition-colors font-tb tracking-wide duration-200 py-2 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize w-full">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 " previewlistener="true">
                                <div className="items-center gap-x-3">
                                    <div className='flex flex-wrap justify-between p-4'>
                                        <p className='text-sm'>Order Id -  <span className='text-sky-400'>753</span></p>
                                        <p className='text-sm'>Order Date - <span className='text-base font-semibold text-center text-gray-800'>Jan 1, 2024 , 05:56 PM</span> </p>
                                    </div>
                                    <div className="flex-1 p-4 my-2">
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center justify-between'>
                                                <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                                                <div>
                                                <h2 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-white">Butter Milk x 7 more</h2>
                                                <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                             <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 dark:text-gray-400">Payment - Cash</p>
                                        </div> 
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block px-4 transition-colors font-tb tracking-wide duration-200 py-2 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-gray-200 hover:text-black hover:bg-gray-300 capitalize w-full">Reject</button>
                                            <button type="submit" className="relative block px-4 transition-colors font-tb tracking-wide duration-200 py-2 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize w-full">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 " previewlistener="true">
                                <div className="items-center gap-x-3">
                                    <div className='flex flex-wrap justify-between p-4'>
                                        <p className='text-sm'>Order Id -  <span className='text-sky-400'>753</span></p>
                                        <p className='text-sm'>Order Date - <span className='text-base font-semibold text-center text-gray-800'>Jan 1, 2024 , 05:56 PM</span> </p>
                                    </div>
                                    <div className="flex-1 p-4 my-2">
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center justify-between'>
                                                <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                                                <div>
                                                <h2 className="text-sm font-semibold tracking-wide text-gray-800 dark:text-white">Butter Milk x 7 more</h2>
                                                <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                             <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 dark:text-gray-400">Payment - Cash</p>
                                        </div> 
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block px-4 transition-colors font-tb tracking-wide duration-200 py-2 overflow-hidden text-base font-semibold text-center text-gray-800 rounded-lg bg-gray-200 hover:text-black hover:bg-gray-300 capitalize w-full">Reject</button>
                                            <button type="submit" className="relative block px-4 transition-colors font-tb tracking-wide duration-200 py-2 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize w-full">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* =====================Dashboard filters===================== */}
                <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
                        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-y-3 gap-x-2 ">
                            <div className="">
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <AsyncSelect
                                            placeholder="Search By Name"
                                            cacheOptions
                                            defaultOptions
                                            value={field.value}
                                            defaultValue={field.value ? { label: field.value, value: field.value } : null}
                                            loadOptions={loadOptions} onChange={field.onChange} />
                                    )}
                                />
                            </div>
                            {/* <div className="">
                                <select
                                    name="Product type"
                                    placeholder='Product type'
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register("type")}
                                >
                                    <option value="" >
                                        Product type
                                    </option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div> */}
                            <div className="">
                                <select
                                    name="City"
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register("location")}
                                >
                                    <option value="" >
                                        City
                                    </option>
                                    {cityNames?.map((city) => <option value={city?.name} key={city?.name}>{city?.name}</option>)}
                                </select>
                            </div>
                            {/* <div className="">
                                <select
                                    name="Temperature Range"
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register("temp_compliance")}
                                >
                                    <option value="" >
                                        Temperature
                                    </option>
                                    {tempretureRangeList?.map((temp) => <option value={temp?.name} key={temp?.name}>{temp?.name}</option>)}
                                </select>
                            </div>
                            <div className="">
                                <select
                                    name="Storage type"
                                    className={`${inputClass} !bg-slate-100 `}
                                    {...register("storage_type")}
                                >
                                    <option value="" >
                                        Storage type
                                    </option>
                                    <option value="Mezzanine">Mezzanine</option>
                                    <option value="Palletized - Racks">Palletized - Racks</option>
                                </select>
                            </div> */}

                        </div>
                        <div className="flex items-center gap-x-2">
                            <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                            <button type='button' className={`${formBtn2} w-full text-center`} onClick={filterReset}>Clear</button>
                        </div>
                    </form>
                </div >





                {/* =====================Dashboard table===================== */}
                {/* <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 sm:p-7 " >
                    <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                        <div className="">
                            <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Storages</h1>
                            <h6 className='text-base font-medium text-gray-400 font-tb'>Storages in different locations</h6>
                        </div>
                        <DashboardForm title='Add Stroage' />
                    </div>
                    {storages && <Table data={storages} columns={columns} />}
                </div> */}

            </section >
        </>

    )
}

export default Dashboard