import React, { useState } from 'react'
import { Add, Refresh, SearchNormal } from 'iconsax-react';
import Table from '../../../components/Table/Table';
import { formBtn1, inputClass, tableBtn } from '../../../utils/CustomClass';
import AddRestaurant from '../../../components/Modals/Resturant/AddRestaurant';
import { NavLink } from 'react-router-dom';
import Switch from 'react-switch'
import AddVendors from '../../../components/Modals/Vendors/AddVendors/AddVendors';

function Vendors() {
    const data = [
        {
            "id": 1,
            "name": "Delicious Bites",
            "address": "123 Main Street, Cityville",
            "email": "info@deliciousbites.com",
            "dl_commission": 0.15,
            "pick_commission": 0.1,
            "revenue": 50000,
            "total_product": 10,
            "login_id": '5ed40',
        },
        {
            "id": 2,
            "name": "Tasty Treats",
            "address": "456 Oak Avenue, Townsville",
            "email": "hello@tastytreats.net",
            "dl_commission": 0.12,
            "pick_commission": 0.08,
            "revenue": 75000,
            "total_product": 10,
            "login_id": '5eC10',
        },
        {
            "id": 3,
            "name": "Gourmet Haven",
            "address": "789 Pine Road, Villageland",
            "email": "contact@gourmethaven.org",
            "dl_commission": 0.18,
            "pick_commission": 0.15,
            "revenue": 60000,
            "total_product": 10,
            "login_id": 'T3d40',
        }
    ]

    const blockedData = [
        {
            "id": 1,
            "name": "Delicious Bites",
            "address": "123 Main Street, Cityville",
            "email": "info@deliciousbites.com",
            "dl_commission": 0.15,
            "pick_commission": 0.1,
            "revenue": 50000,
            "total_product": 10,
            "login_id": '5ed40',
        },
        {
            "id": 2,
            "name": "Tasty Treats",
            "address": "456 Oak Avenue, Townsville",
            "email": "hello@tastytreats.net",
            "dl_commission": 0.12,
            "pick_commission": 0.08,
            "revenue": 75000,
            "total_product": 10,
            "login_id": '5eC10',
        },
        {
            "id": 3,
            "name": "Gourmet Haven",
            "address": "789 Pine Road, Villageland",
            "email": "contact@gourmethaven.org",
            "dl_commission": 0.18,
            "pick_commission": 0.15,
            "revenue": 60000,
            "total_product": 10,
            "login_id": 'T3d40',
        }
    ]

    const [activeTab, setActiveTab] = useState(true);
    const [rstatus, setStatus] = useState();

    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    /*================================     column    ========================= */

    // const status = (row) => <Switch checked={row?.id == rstatus ? true : false} onChange={() => setStatus(row?.id)} />
    const status = (row) => <Switch checked={row?.id == rstatus ? true : false} onChange={() => setStatus(row?.id)} />
    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>
    const columns = [
        { field: 'id', header: 'ID', body: (row) => <h6>{row?.id}</h6>, sortable: false },
        { field: 'name', header: 'Vendor Name', body: (row) => <NavLink to={`/vendors/vendors-detail/${row?.id}`}><h6 className='text-sky-400 underline'>{row?.name}</h6> </NavLink>, sortable: false },
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
                    Registered Vendors
                </button>
                <button
                    onClick={() => changeTab(2)}
                    className={`py-2 px-0 ml-4 ${activeTab === 2 ? 'border-b-2 border-blue-400 text-black' : 'bg-transparent'
                        }`}
                >
                    Blocked Vendors
                </button>
            </div>
            <div className='grid grid-cols-6 mt-4'>
                <div className='flex w-1/4 col-span-4 gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg '>
                    <SearchNormal className='text-gray-400' />
                    <input placeholder='Search..' className='w-4/5 h-full' />
                </div>
                <div className='grid grid-cols-3 col-span-2 gap-2 items-center'>
                    <button className='flex gap-2 p-3 bg-white border-2 rounded-lg '>
                        <Refresh className='text-gray-400' />
                        <p>Refresh</p>
                    </button>
                    {activeTab == 1 && <div className='col-span-2'>
                        <AddVendors title='Add Vendors' />
                    </div>}
                </div>
            </div>
            {activeTab == 1 && <Table columns={columns} data={data} />}
            {activeTab == 2 && <Table columns={columns} data={blockedData} />}
        </div>
    )
}

export default Vendors