import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { formBtn1, formBtn2, inputClass, tableBtn } from '../../../utils/CustomClass';
import { Add, Refresh, SearchNormal } from 'iconsax-react';
import Table from '../../../components/Table/Table';
import AddRestaurant from '../../../components/Modals/Resturant/AddRestaurant';
import { NavLink } from 'react-router-dom';
import Switch from 'react-switch'
import AddVendors from '../../../components/Modals/Vendors/AddVendors/AddVendors';
import AddVendorShops from '../../../components/Modals/Vendors/AddVendors/AddVendorShops';
import { GetFranchiseeVendors } from "../../../api";
import { setFranchiseVendors } from "../../../redux/Slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

function FranchiseeVendors() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    // const FranchiseVendors = useSelector((state) => state?.master?.FranchiseVendors);
    const FranchiseVendors = [
        {
            id: 1,
            first_name: "John Doe",
            address: "123 Main St",
            pincode: "12345",
            phone_no: "555-123-4567",
            email: "john@example.com",
            status: true,
        },
        {
            id: 2,
            first_name: "Jane Smith",
            address: "456 Elm St",
            pincode: "67890",
            phone_no: "555-987-6543",
            email: "jane@example.com",
            status: false,
        },
        {
            id: 3,
            first_name: "Alice Johnson",
            address: "789 Oak St",
            pincode: "54321",
            phone_no: "555-555-5555",
            email: "alice@example.com",
            status: true,
        }
        // Add more fake data objects as needed
    ];
    const [activeTab, setActiveTab] = useState(0);
    const [rstatus, setStatus] = useState();
    const dispatch = useDispatch()


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


    // ========================= fetch data from api ==============================
    const FranchiseeVendors = () => {
        try {
            GetFranchiseeVendors().then((res) => {
                console.log('vendors data = ', res.data);
                dispatch(setFranchiseVendors(res.data));
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FranchiseeVendors()
    }, [])


    // =================== table user profile column ========================
    // const representativeBodyTemplate = (row) => {
    //     return (
    //         <div className="rounded-full w-11 h-11">
    //             <img src={row?.profile == null || row?.profile == '' || row?.profile == undefined ? userImg : row?.profile} className="object-cover w-full h-full rounded-full" alt={row.first_name} />
    //         </div>
    //     );
    // };

    //=============== Table Columns =============================
    // const status = (row) => <Switch checked={row?.id == rstatus ? true : false} onChange={() => setStatus(row?.id)} />
    const status = (row) => <Switch checked={row?.status} onChange={() => setStatus(row?.id)} />
    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>
    const columns = [
        { field: 'id', header: 'ID', sortable: false },
        // { field: 'profile', header: 'Profile', body: representativeBodyTemplate, sortable: true, style: true },
        { field: 'profile_pic', header: 'Image', sortable: false },
        { field: 'first_name', body: (row) => <div className="capitalize">{row.first_name + " " + row.last_name}</div>, header: 'Name' },
        { field: 'email', header: 'Email', sortable: false },
        { field: 'phone_no', header: 'Phone No', sortable: false },
        { field: 'pincode', header: 'Pincode', sortable: false },
        { field: 'address', header: 'Address', sortable: false },
        { field: 'status', header: 'Status', body: status, sortable: false },
        { field: 'action', header: 'Action', body: action, sortable: false },
    ]
    return (
        <div className='p-4 space-y-4'>
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

            <Tabs
                selectedIndex={activeTab}
                onSelect={(index) => changeTab(index)}
            >
                <TabList className="flex justify-between space-x-4 border-b">
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${activeTab === 0
                            ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                            : "text-gray-500 border-b"
                            }`}
                    >
                        Registered
                    </Tab>
                    {activeTab == 0 && <div className='col-span-2'>
                        <AddVendors title='Add Vendors' />
                    </div>}
                </TabList>
                {/* ================= Vendor Details component ============== */}
                <TabPanel className='mt-5'>
                    <div className='bg-white p-2 rounded-xl space-y-4'>
                        <div className='flex items-center justify-between p-2'>
                            <p className='font-semibold ml-2 text-xl '>Vendors List</p>
                            {/* <AddVendors title='Add Vendor' /> */}
                        </div>
                        <Table columns={columns} data={FranchiseVendors} />
                    </div>
                </TabPanel>

            </Tabs>
        </div>
    )
}

export default FranchiseeVendors