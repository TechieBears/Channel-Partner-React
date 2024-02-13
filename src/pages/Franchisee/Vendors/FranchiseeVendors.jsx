import React, { useState, useEffect } from 'react'
import { Add, Refresh, SearchNormal } from 'iconsax-react';
import Table from '../../../components/Table/Table';
import { formBtn1, inputClass, tableBtn } from '../../../utils/CustomClass';
import AddRestaurant from '../../../components/Modals/Resturant/AddRestaurant';
import { NavLink } from 'react-router-dom';
import Switch from 'react-switch'
import AddVendors from '../../../components/Modals/Vendors/AddVendors/AddVendors';
import AddVendorShops from '../../../components/Modals/Vendors/AddVendors/AddVendorShops';
import { CreateFranchisee, GetFranchisee } from "../../../api";
import { setFranchiseVendors } from "../../../redux/Slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";

function FranchiseeVendors() {
    
    const FranchiseVendors = useSelector((state) => state?.master?.FranchiseVendors);
    const [activeTab, setActiveTab] = useState(true);
    const [rstatus, setStatus] = useState();
    const dispatch = useDispatch()


    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };


     // // ========================= fetch data from api ==============================
    const FranchiseeVendors = () => {
        try {
          GetFranchisee().then((res) => {
            console.log(res);
            dispatch(setFranchiseVendors(res));
          });
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        FranchiseeVendors()
    }, [])

    // const status = (row) => <Switch checked={row?.id == rstatus ? true : false} onChange={() => setStatus(row?.id)} />
    const status = (row) => <Switch checked={row?.id == rstatus ? true : false} onChange={() => setStatus(row?.id)} />
    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>
    const columns = [
        { field: 'id', header: 'ID', body: (row) => <h6>{row?.id}</h6>, sortable: false },
        { field: 'name', header: 'Vendor Name', sortable: false },
        // body: (row) => <NavLink to={`/vendors/vendors-detail/${row?.id}`}><h6 className='underline text-sky-400'>{row?.name}</h6> </NavLink>, sortable: false },

        { field: 'address', header: 'Address', body: (row) => <h6>{row?.address}</h6>, sortable: false },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.email}</h6>, sortable: false },
        { field: 'revenue', header: 'Renevue', body: (row) => <h6>{row?.revenue}</h6>, sortable: true },
        { field: 'total_product', header: 'Total Product', body: (row) => <h6>{row?.total_product}</h6>, sortable: true },
        { field: 'login_id', header: 'Login ID', body: (row) => <h6>{row?.login_id}</h6>, sortable: true },
        { field: 'status', header: 'Status', body: status, sortable: false },
        { field: 'action', header: 'Action', body: action, sortable: false },
    ]
    return (
        <div className='p-4 space-y-4'>
            <div className="flex">
                <button
                    onClick={() => changeTab(1)}
                    className={`py-2 px-0 ${activeTab === 1 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
                        }`}
                >
                    Vendors
                </button>
                <button
                    onClick={() => changeTab(2)}
                    className={`py-2 px-0 ml-4 ${activeTab === 2 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
                        }`}
                >
                    Vendor Shops
                </button>
            </div>
            <div className='grid grid-cols-3 gap-10 mt-4'>
                <div className='flex gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg '>
                    <SearchNormal className='text-gray-400' />
                    <input placeholder='Search..' className='w-full h-full' />
                </div>
                <input className={inputClass} placeholder='Filter By Pincode' />
                <div className='grid items-center grid-cols-3 gap-2'>
                    <button className='flex gap-2 p-3 bg-white border-2 rounded-lg '>
                        <Refresh className='text-gray-400' />
                        <p>Refresh</p>
                    </button>
                    {activeTab == 1 && <div className='col-span-2'>
                        <AddVendors title='Add Vendors' />
                    </div>}
                    {activeTab == 2 && <div className='col-span-2'>
                        <AddVendorShops title='Add Shops' />
                    </div>}
                </div>
            </div>
            {activeTab == 1 && <Table columns={columns} data={FranchiseVendors} />}
            {/* {activeTab == 2 && <Table columns={columns} data={blockedData} />} */}
        </div>
    )
}

export default FranchiseeVendors