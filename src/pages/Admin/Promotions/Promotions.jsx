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
import AddPromoCode from '../../../components/Modals/PromoCode/AddPromoCode';

const Promotions = () => {
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
            {/* ========================= user fileter ======================= */}
            <div className="bg-white p-4 sm:m-5 rounded-xl" >
                <form onSubmit={handleSubmit(onSubmit)} className='flex md:items-center flex-col lg:flex-row gap-2'>
                    <div className="grid grid-cols-1 sm:grid-cols-4 w-full  gap-y-3 gap-x-2">
                        <div className="">
                            <input
                                type="text"
                                placeholder='Search'
                                autoComplete='off'
                                className={`${inputClass} !bg-slate-100`}
                                {...register('promo')}
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
                                <option value="" >
                                    User Type
                                </option>

                            </select>
                        </div>
                    </div>

                    <AddPromoCode className={`${formBtn1} w-full text-center`} />

                </form>
            </div>
        </>

    )
}

export default Promotions