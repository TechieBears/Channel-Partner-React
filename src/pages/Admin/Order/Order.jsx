import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table/Table';
import { ArrowSwapVertical, Box, Eye, NotificationBing, ShoppingCart, Trash, Category, UserTick, UserRemove, Timer } from 'iconsax-react';
// import { deleteStorage, getPartnerStorage, getStorages } from '../../../api';
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
import { getStorages } from '../../../api';

const Order = () => {
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

                <div className="mx-auto mt-8 sm:m-5">
                    <div className="flex">
                        <button
                            onClick={() => changeTab(1)}
                            className={`py-2 px-0 mx-5 ${activeTab === 1 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => changeTab(2)}
                            className={`py-2 px-0 mx-5 ${activeTab === 2 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
                                }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => changeTab(3)}
                            className={`py-2 px-0 mx-5 ${activeTab === 3 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
                                }`}
                        >
                            History
                        </button>
                    </div>

                    {/* =========================  fileter ======================= */}
                    <div className="p-4 bg-white sm:m-5 rounded-xl" >
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
                            <div className="grid w-full grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-2">
                                <div className="">
                                    <input
                                        type="text"
                                        placeholder='Search'
                                        autoComplete='off'
                                        className={`${inputClass} !bg-slate-100`}
                                        {...register('name')}
                                    />
                                </div>
                                <div className="">
                                    <input
                                        type="date"
                                        placeholder='Select date (YYYY-MM-DD)'
                                        autoComplete='off'
                                        className={`${inputClass} !bg-slate-100 !text-gray-400`}
                                        {...register('date')}
                                    />
                                </div>

                                <div className="">
                                    <select
                                        name="City"
                                        className={`${inputClass} !bg-slate-100`}
                                        {...register("city")}
                                    >
                                        <option value="">
                                            Payment Type
                                        </option>
                                        <option value="COD">COD</option>
                                        <option value="Phonepay">Phonepay</option>
                                        <option value="Googlepay">Googlepay</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                                <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => { reset(), toast.success("Filters clear successfully"), fetchData() }}>Clear</button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8">
                        {/* {activeTab === 1 && <p>Content for Tab 1</p>}
                        {activeTab === 2 && <p>Content for Tab 2</p>} */}
                        <div className='grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2'>
                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg " previewlistener="true">
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
                                                    <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">Butter Milk x 7 more</h2>
                                                    <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">Payment - Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300">Reject</button>
                                            <button type="submit" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg " previewlistener="true">
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
                                                    <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">Butter Milk x 7 more</h2>
                                                    <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">Payment - Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300">Reject</button>
                                            <button type="submit" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg " previewlistener="true">
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
                                                    <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">Butter Milk x 7 more</h2>
                                                    <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">Payment - Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300">Reject</button>
                                            <button type="submit" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg " previewlistener="true">
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
                                                    <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">Butter Milk x 7 more</h2>
                                                    <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">Payment - Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300">Reject</button>
                                            <button type="submit" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>

    )
}

export default Order