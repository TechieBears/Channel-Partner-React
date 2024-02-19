import { Refresh, SearchNormal } from 'iconsax-react'
import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { Eye  } from 'iconsax-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../components/Table/Table'
import AddDriverFrom from '../../components/Modals/DriverModals/AddDriverForm'
import { getDeliveryBoys, verifyDeliveryBoy } from '../../api';
import { setDeliveryList } from '../../redux/Slices/deliverySlice';
import { useDispatch, useSelector } from 'react-redux';
import { formBtn1, formBtn2, inputClass ,tableBtn } from '../../utils/CustomClass';
import Switch from 'react-js-switch';
import { toast } from 'react-toastify';






function DeliveryBoy() {
    const dispatch = useDispatch()
    const deliveryList = useSelector((state) => state?.delivery?.deliveryList)
    console.log('delivery Table data = ', deliveryList?.data)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


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
        


            // // ========================= fetch data from api ==============================
    const DeliveryBoyDetails = () => {
        try {
            getDeliveryBoys().then((res) => {
                dispatch(setDeliveryList(res));
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        DeliveryBoyDetails()
    }, [])


    // ============================= fetching data api ==================================
    const fetchData = () => {
        try {
            getDeliveryBoys().then((res) => {
                dispatch(setDeliveryList(res));
            })
        } catch (err) {
            console.log('error', err);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const verifyActions = (row) => {
        const payload = { userId: row?.user?.id, isverifiedbyadmin: row?.user?.isverified_byadmin, isverifiedbyfranchise: !row?.isverifiedbyfranchise }
        try {
            verifyDeliveryBoy(payload).then((form) => {
                console.log(payload)
                if (form.message == "delivery boy verified successfully") {
                    toast.success('Driver Verification Changed !');
                    DeliveryBoyDetails()
                }
                else {
                    console.log("err");
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    // =============================== verify user switch =============================
    const switchVerify = (row) => {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.isverifiedbyfranchise}
                    onChange={() => verifyActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }
    // =============================== active user switch =============================
    const switchActive = (row) => {
        return (
            <div className="flex items-center justify-center gap-2">
                <Switch
                    value={row?.user?.isverified_byadmin}
                    disabled={true}
                    // onChange={() => activeActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }
    

    // =================== table action ========================
    const actionBodyTemplate = (row) => (
        <div className="flex items-center gap-2">
            <Link to={`/user/${row.id}`} state={row} className="bg-green-100 px-1.5 py-2 rounded-sm">
                <Eye size="20" className='text-green-500' />
            </Link>
            <AddDriverFrom button='edit' title='Edit User' data={row} />
        </div>
    );


    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.user?.profile_pic == null || row?.user?.profile_pic == '' || row?.user?.profile_pic == undefined ? userImg : row?.user?.profile_pic} className="object-cover w-full h-full rounded-full" alt={row.user?.first_name} />
            </div>
        );
    };


    // =================== table user verify column  ========================
    const activeActionsRole = (rowData) => (
    <h6 className={`${rowData?.user?.isactive !== "false" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} py-2 px-5 text-center capitalize rounded-full`}>
        {rowData?.user?.isactive !== "false" ? "Active" : "Inactive"}
    </h6>
    );
    
    const action = (row) => <button className={`${tableBtn}`} >
    View Analysis
    </button>

    // const columns = [
    //     // { field: 'id', header: 'ID', sortable: false },
    //     { field: 'profile_pic', header: 'Profile', body: representativeBodyTemplate, sortable: false, style: true },
    //     { field: 'first_name', body: (row) => <div className="capitalize">{row?.user?.first_name + " " + row?.user?.last_name}</div>, header: 'Name' },
    //     { field: 'email', header: 'Email', body: (row) => <h6>{row?.user?.email}</h6>, sortable: false },
    //     { field: 'gender', header: 'Gender', body: (row) => <h6>{row?.user?.gender}</h6>, sortable: false },
    //     { field: 'phone_no', header: 'Phone No', body: (row) => <h6>{row?.user?.phone_no}</h6>, sortable: false },
    //     { field: 'pincode', header: 'Pincode', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: false },
    //     { field: 'address', header: 'Address', body: (row) => <h6>{row?.user?.address}</h6>, sortable: false },
    //     { field: 'state', header: 'state', body: (row) => <h6>{row?.user?.state}</h6>, sortable: false },
    //     { field: 'city', header: 'city', body: (row) => <h6>{row?.user?.city}</h6>, sortable: false },
    //     { field: 'registration_date', header: 'Registration Date', body: (row) => <h6>{row?.user?.registration_date}</h6>, sortable: false },
    //     { field: 'status', header: 'Status', body: activeActionsRole, sortable: false },
    //     { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
    //     {  header: 'Analyse', body: action, sortable: false },
    // ]
    
    const columns = [
        // { field: 'id', header: 'ID', sortable: false },
        { field: 'profile_pic', header: 'Profile', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'first_name', body: (row) => <div className="capitalize">{row?.user?.first_name + " " + row?.user?.last_name}</div>, header: 'Name' },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.user?.email}</h6>, sortable: false },
        { field: 'gender', header: 'Gender', body: (row) => <h6>{row?.user?.gender}</h6>, sortable: false },
        { field: 'phone_no', header: 'Phone No', body: (row) => <h6>{row?.user?.phone_no}</h6>, sortable: false },
        { field: 'pincode', header: 'Pincode', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: false },
        { field: 'address', header: 'Address', body: (row) => <h6>{row?.user?.address}</h6>, sortable: false },
        { field: 'state', header: 'state', body: (row) => <h6>{row?.user?.state}</h6>, sortable: false },
        { field: 'city', header: 'city', body: (row) => <h6>{row?.user?.city}</h6>, sortable: false },
        { field: 'registration_date', header: 'Registration Date', body: (row) => <h6>{row?.user?.registration_date}</h6>, sortable: false },
        { field: 'status', header: 'Status', body: activeActionsRole, sortable: false },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchActive, sortable: true },
        { field: 'isactive', header: 'Franchise Verify', body: switchVerify, sortable: true },
        // { header: 'Analyse', body: action, sortable: false },
    ]



    return (
        <>
              {/* ========================= user fileter ======================= */}
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
                        <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => { reset(), toast.success("Filters clear successfully"), DeliveryBoyDetails() }}>Clear</button>
                    </div>
                </form>
            </div>

            {/* <div className='grid grid-cols-4 gap-10 m-4'>
                <div className='flex gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg '>
                    <SearchNormal className='text-gray-400' />
                    <input placeholder='Search..' className='w-full h-full' />
                </div>
                <input className={inputClass} placeholder='Filter By Pincode' />
                <select
                    className={inputClass}
                    onChange={(e) => console.log('e.target.value', e.target.value)}
                >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select>
                <div className='items-center gap-2'>
                    <button className='flex gap-2 p-3 bg-white border-2 rounded-lg '>
                        <Refresh className='text-gray-400' />
                        <p>Refresh</p>
                    </button>
                </div>
            </div> */}

                 {/*====================== User Table ================================*/}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
            <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                <div className="">
                    <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>Drivers</h1>
                </div>
                <div className='flex gap-4'>
                    {/* <DriverTipForm title='Driver Tip'/> */}
                    <AddDriverFrom title='Add Driver' DeliveryBoyDetails={DeliveryBoyDetails}/>
                </div>
            </div>
                <Table data={deliveryList?.data} columns={columns} />
            </div>



            {/* <div className='m-4'>
                <div className='flex justify-between p-2'>
                    <p className='text-xl font-semibold'>Delivery Partner List</p>
                    <AddDriverFrom />
                </div>
                <div className='p-2 bg-white rounded-xl'>
                    <Table data={deliveryList?.data} columns={columns} />
                </div>
            </div> */}
        </>
    )
}

export default DeliveryBoy