import React, { useEffect } from 'react';
import Table from '../../../components/Table/Table';
import { ArrowSwapVertical, Box, Eye, NotificationBing, ShoppingCart, Trash } from 'iconsax-react';
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

    return (
        <>
            <DeleteModal
                title='Delete Stroage'
                deleteBtn={deleteData}
                toggleModalBtn={toggleModalBtn}
                description={"Are you sure you want to delete this Stroage"} open={open}
            />
            <section className='h-full w-full'>
                {/* =====================Dashboard header===================== */}
                <div className="bg-white p-8 m-4 sm:m-5 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-10 ">
                    <div className="flex items-center space-x-3 border-r-0 sm:border-r mr-8 border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-orange-50">
                            <ShoppingCart size={26} className="text-orange-400" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-gray-500 font-tb text-sm'>Order Completed</h6>
                            <h6 className='text-orange-400 font-tb font-semibold text-base'>1.237k</h6>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 border-r-0 lg:border-r  mr-8 border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-purple-50">
                            <ArrowSwapVertical size={26} className="text-purple-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-gray-500 font-tb text-sm'>Total Number</h6>
                            <h6 className='text-purple-600 font-tb font-semibold text-base'>12.37k</h6>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 border-r-0 md:border-r mr-8 border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-sky-50">
                            <Box size={26} className="text-sky-400" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-gray-500 font-tb text-sm'>Order Completed</h6>
                            <h6 className='text-sky-400 font-tb font-semibold text-base'>1.237k</h6>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 ">
                        <div className="p-3.5 rounded-xl bg-red-50">
                            <NotificationBing size={26} className="text-red-500" />
                        </div>
                        <div className="space-y-1">
                            <h6 className='text-gray-500 font-tb text-sm'>Total Notification's</h6>
                            <h6 className='text-red-500 font-tb font-semibold text-base'>1.237k</h6>
                        </div>
                    </div>
                </div>

                {/* =====================Dashboard filters===================== */}
                <div className="bg-white p-4 m-4 sm:m-5 rounded-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className='flex md:items-center flex-col lg:flex-row  gap-2'>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-y-3 gap-x-2 ">
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
                        <div className="flex gap-x-2 items-center">
                            <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                            <button type='button' className={`${formBtn2} w-full text-center`} onClick={filterReset}>Clear</button>
                        </div>
                    </form>
                </div >

                {/* =====================Dashboard table===================== */}
                {/* <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5 sm:p-7 " >
                    <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                        <div className="">
                            <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Storages</h1>
                            <h6 className='text-gray-400 font-tb font-medium text-base'>Storages in different locations</h6>
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