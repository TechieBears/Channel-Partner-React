import React, { useState, useEffect } from 'react'
import { Eye  } from 'iconsax-react';
import Table from '../../../components/Table/Table';
import { Link } from 'react-router-dom';
import Switch from 'react-switch'
import AddFranchisee from '../../../components/Modals/Franchisee/Franchisee';
import CreateUserForm from '../../../components/Modals/UserModals/CreateUserForm';
import { useDispatch, useSelector } from "react-redux";
import { GetFranchisee } from "../../../api";
import { setFranchise } from "../../../redux/Slices/masterSlice";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import userImg from '../../../assets/user.jpg';
import { formBtn1, formBtn2, inputClass ,tableBtn } from '../../../utils/CustomClass';




function Franchisees() {
  const dispatch = useDispatch()
  const Franchisee = useSelector((state) => state?.master?.Franchise);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const [delId, setDelId] = React.useState(0);
    

    const [activeTab, setActiveTab] = useState(true);
    const [rstatus, setStatus] = useState();

    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    // // ========================= fetch data from api ==============================
    const FranchiseeDetails = () => {
        try {
          GetFranchisee().then((res) => {
            console.log(res);
            dispatch(setFranchise(res));
          });
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        FranchiseeDetails()
    }, [])



    
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



    // =================== fetching data ========================
    const fetchData = () => {
        try {
            getUser().then((res) => {
                dispatch(setUserList(res))
            })
        } catch (err) {
            console.log('error', err);
        }
    }
    

    // =============================== verify user switch =============================
    const switchVerify = (row) => {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.isverify}
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
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.isactive}
                    onChange={() => activeActions(row)}
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
            <CreateUserForm button='edit' title='Edit User' data={row} />
        </div>
    );


    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.profile_pic == null || row?.profile_pic == '' || row?.profile_pic == undefined ? userImg : row?.profile_pic} className="object-cover w-full h-full rounded-full" alt={row.first_name} />
            </div>
        );
    };


    // =================== table user verify column  ========================
    const activeActionsRole = (rowData) => (
    <h6 className={`${rowData?.isactive !== "false" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} py-2 px-5 text-center capitalize rounded-full`}>
        {rowData?.isactive !== "false" ? "Active" : "Inactive"}
    </h6>
    );
 

    const status = (row) => <Switch checked={row?.id == rstatus ? true : false} onChange={() => setStatus(row?.id)} />
    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>
    const columns = [
        // { field: 'id', header: 'ID', sortable: false },
        { field: 'profile_pic', header: 'Profile', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'first_name', body: (row) => <div className="capitalize">{row.first_name + " " + row.last_name}</div>, header: 'Name' },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.email}</h6>, sortable: false },
        { field: 'phone_no', header: 'Phone No' },
        { field: 'pincode', header: 'Pincode', sortable: false },
        { field: 'address', header: 'Address', sortable: false },
        { field: 'state', header: 'state', sortable: false },
        { field: 'registration_date', header: 'Registration Date', sortable: false },
        { field: 'status', header: 'Status', body: activeActionsRole, sortable: false },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
        {  header: 'Analyse', body: action, sortable: false },
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
            {/*====================== User Table ================================*/}
            <div className="p-4 bg-white sm:m-5 rounded-xl" >
                <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>  Franchisee Details</h1>
                    </div>
                    <AddFranchisee title='Add Franchisee' />
                </div>
                <Table data={Franchisee} columns={columns} />
            </div>
        </>

        // <div className='p-4 space-y-4'>
        //     <div className="flex">
        //         <button
        //             onClick={() => changeTab(1)}
        //             className={`py-2 px-0 ${activeTab === 1 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
        //                 }`}
        //         >
        //             Franchisee Details
        //         </button>
           
        //     </div>
        //     <div className='grid grid-cols-3 gap-10 mt-4'>
        //         <div className='flex gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg '>
        //             <SearchNormal className='text-gray-400' />
        //             <input placeholder='Search by Name / email' className='w-full h-full' />
        //         </div>
        //         <input className={inputClass} placeholder='Search By Pincode' />
        //         <div className='grid items-center grid-cols-3 gap-2'>
        //             <button className='flex gap-2 p-3 bg-white border-2 rounded-lg '>
        //                 <Refresh className='text-gray-400' />
        //                 <p>Refresh</p>
        //             </button>
        //             {activeTab == 1 && <div className='col-span-2'>
        //                 <AddFranchisee title='Add Franchisee' />
        //             </div>}
        //         </div>
        //     </div>
        //     { Franchisee?.length > 0 && <Table data={Franchisee} columns={columns} />}
        // </div>
    )
}

export default Franchisees