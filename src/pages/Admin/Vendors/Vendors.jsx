import React, { useState, useEffect } from 'react'
import { Eye } from 'iconsax-react';
import { Add, Refresh, SearchNormal } from 'iconsax-react';
import Table from '../../../components/Table/Table';
import AddRestaurant from '../../../components/Modals/Resturant/AddRestaurant';
import { NavLink, Link } from 'react-router-dom';
import Switch from 'react-js-switch';
import AddVendors from '../../../components/Modals/Vendors/AddVendors/AddVendors';
import AddVendorShops from '../../../components/Modals/Vendors/AddVendors/AddVendorShops';
import { useForm } from 'react-hook-form';
import { formBtn1, formBtn2, inputClass, tableBtn } from '../../../utils/CustomClass';
import { useDispatch, useSelector } from "react-redux";
import userImg from '../../../assets/user.jpg';
import { setFranchiseVendors } from "../../../redux/Slices/masterSlice";
import { GetFranchiseeVendors, verifyVendors } from "../../../api";
import axios from 'axios';
import { toast } from 'react-toastify';



function Vendors() {
    const [activeTab, setActiveTab] = useState(true);
    const [rstatus, setStatus] = useState();
    const [Vendors, SetVendors] = useState();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()
    // const Vendors = useSelector((state) => state?.master?.FranchiseVendors);
    // console.log('Admin Vendors = ', Vendors);




    // // ========================= fetch data from api ==============================
    const FranchiseeVendors = () => {
        try {
            GetFranchiseeVendors().then((res) => {
                SetVendors(res);
                dispatch(setFranchiseVendors(res));
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FranchiseeVendors()
    }, [])


    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };

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

    const activeActions = (row) => {
        const payload = { isactive: !row.isactive, email: row?.email }
        try {
            editUser(row?.id, payload).then((form) => {
                if (form.code == 2002) {
                    toast.success('User Active Changed !');
                    FranchiseeVendors()
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

    const verifyActions = (row) => {
        const payload = { userId: row?.user?.id, isverifiedbyadmin: !row?.user?.isverified_byadmin, isverifiedbyfranchise: row?.isverifiedbyfranchise }
        try {
            verifyVendors(payload).then((form) => {
                console.log(payload)
                if (form.status == "success") {
                    toast.success('Vendor Verification Changed !');
                    FranchiseeVendors()
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


    // =============================== active user switch =============================
    const switchActive = (row) => {
        return (
            <div className="flex items-center justify-center gap-2">
                <Switch
                    value={row?.isverifiedbyfranchise}
                    disabled={true}
                    // onChange={() => activeActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }

    // =============================== verify user switch =============================
    const switchVerify = (row) => {
        return (
            <div className="flex items-center justify-center gap-2 ">
                <Switch
                    value={row?.user?.isverified_byadmin}
                    onChange={() => verifyActions(row)}
                    size={50}
                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                    borderColor={{ on: '#86d993', off: '#c6c6c6' }} />
            </div>
        )
    }


    // =================== table action ========================
    const actionBodyTemplate = (row) => (
        <div className="flex items-center gap-2">
            <Link to={`/vendors/vendors-detail/${row?.vendor_id}`} state={row} className="bg-green-100 px-1.5 py-2 rounded-sm">
                <Eye size="20" className='text-green-500' />
            </Link>
            <AddVendors button='edit' title='Edit User' data={row} FranchiseeVendors={FranchiseeVendors} />
        </div>
    );


    // =================== table user profile column ========================
    const representativeBodyTemplate = (row) => {
        return (
            <div className="rounded-full w-11 h-11">
                <img src={row?.user?.profile_pic == null || row?.user?.profile_pic == '' || row?.user?.profile_pic == undefined ? userImg : row?.user?.profile_pic} className="object-cover w-full h-full rounded-full" alt={row?.user?.first_name} />
            </div>
        );
    };


    // =================== table user verify column  ========================
    const activeActionsRole = (rowData) => (
        <h6 className={`${rowData?.isactive !== "false" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"} py-2 px-5 text-center capitalize rounded-full`}>
            {rowData?.isactive !== "false" ? "Active" : "Inactive"}
        </h6>
    );




    /*================================     column    ========================= */

    const verifyByAdmin = (row) => <Switch checked={row?.is_verified} onChange={() => setStatus(row?.id)} />
    const ActiveStatus = (row) => <Switch checked={row?.is_active} onChange={() => setStatus(row?.id)} />
    const status = (row) => <Switch checked={row?.id == rstatus ? true : false} onChange={() => setStatus(row?.id)} />
    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>

    const columns = [
        { field: 'profile_pic', header: 'Profile', body: representativeBodyTemplate, sortable: false, style: true },
        { field: 'msb_code', header: 'MSB Code', sortable: false },
        { field: 'first_name', body: (row) => <div className="capitalize">{row?.user?.first_name + " " + row?.user?.last_name}</div>, header: 'Name' },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.user?.email}</h6>, sortable: false },
        { field: 'insta_commison_percentage', header: 'Comission(%)', body: (row) => <h6>{row?.insta_commison_percentage}%</h6>, sortable: false },
        { field: 'phone_no', header: 'Phone No', body: (row) => <h6>{row?.user?.phone_no}</h6>, sortable: false },
        { field: 'pincode', header: 'Pincode', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: false },
        { field: 'state', header: 'state', body: (row) => <h6>{row?.user?.state}</h6>, sortable: false },
        { field: 'city', header: 'city', body: (row) => <h6>{row?.user?.city}</h6>, sortable: false },
        { field: 'registration_date', header: 'Registration Date', body: (row) => <h6>{row?.user?.registration_date}</h6>, sortable: false },
        { field: 'status', header: 'Status', body: activeActionsRole, sortable: false },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
        { field: 'isactive', header: 'Franchise Verify', body: switchActive, sortable: true },
        { field: 'isverify', header: 'Admin Verify', body: switchVerify, sortable: true },
        // { header: 'Analyse', body: action, sortable: false },
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
                                    Select by Status
                                </option>
                                <option value="active">Active</option>
                                <option value="inactive">InActive</option>
                            </select>
                        </div>
                        <div className="">
                            <select
                                name="City"
                                className={`${inputClass} !bg-slate-100`}
                                {...register("city")}
                            >
                                <option value="" >
                                    Select by pincode
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
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>  Vendor Details</h1>
                    </div>
                    <AddVendors title='Add Vendors' FranchiseeVendors={FranchiseeVendors} />
                </div>
                {/* {
                    Vendors?.legth > 0 && <Table data={Vendors} columns={columns} />
                } */}
                {
                    <Table data={Vendors} columns={columns} />
                }

            </div>
            {/*====================== User Table ================================*/}
        </>
    )
}

export default Vendors