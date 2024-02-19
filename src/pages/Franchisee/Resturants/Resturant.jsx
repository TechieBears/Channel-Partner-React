import { Add, Refresh, SearchNormal } from 'iconsax-react';
import React, { useState } from 'react'
import Table from '../../../components/Table/Table';
import { formBtn1, inputClass, tableBtn } from '../../../utils/CustomClass';
import AddRestaurant from '../../../components/Modals/Resturant/AddRestaurant';
import { NavLink } from 'react-router-dom';
import Switch from 'react-switch'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

export default function FranchiseRestaurent() {
    const data = [
        {
            "id": 1,
            "name": "Delicious Bites",
            "address": "123 Main Street, Cityville",
            "email": "info@deliciousbites.com",
            "dl_commission": 0.15,
            "pick_commission": 0.1,
            "revenue": 50000
        },
        {
            "id": 2,
            "name": "Tasty Treats",
            "address": "456 Oak Avenue, Townsville",
            "email": "hello@tastytreats.net",
            "dl_commission": 0.12,
            "pick_commission": 0.08,
            "revenue": 75000
        },
        {
            "id": 3,
            "name": "Gourmet Haven",
            "address": "789 Pine Road, Villageland",
            "email": "contact@gourmethaven.org",
            "dl_commission": 0.18,
            "pick_commission": 0.15,
            "revenue": 60000
        }
    ]

    const [activeTab, setActiveTab] = useState(true);
    const [rstatus, setStatus] = useState(false);

    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    /*================================     column    ========================= */

    const status = (row) => <Switch checked={rstatus} onChange={() => setStatus(!rstatus)} />
    const action = (row) => <button className={`${tableBtn}`} >
        View Analysis
    </button>
    const columns = [
        { field: 'id', header: 'ID', body: (row) => <h6>{row?.id}</h6>, sortable: false },
        { field: 'name', header: 'Restaurants Name', body: (row) => <NavLink to={`/resturants/restaurant-detail/${row?.id}`}><h6 className='underline text-sky-400'>{row?.name}</h6> </NavLink>, sortable: false },
        { field: 'address', header: 'Address', body: (row) => <h6>{row?.address}</h6>, sortable: false },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.email}</h6>, sortable: false },
        { field: 'dl_commission', header: 'Delivery Commission', body: (row) => <h6>{row?.dl_commission}</h6>, sortable: false },
        { field: 'pick_commission', header: 'Pickup Commission', body: (row) => <h6 className='content-center'>{row?.pick_commission}</h6>, sortable: false },
        { field: 'revenue', header: 'Renevue', body: (row) => <h6>{row?.revenue}</h6>, sortable: true },
        { field: 'status', header: 'Status', body: status, sortable: false },
        { field: 'action', header: 'Action', body: action, sortable: false },
    ]
    return (
        <div className='p-4 space-y-4'>
            <Tabs
                selectedIndex={activeTab}
                onSelect={(index) => changeTab(index)}
            >
                <TabList className="flex mx-6 space-x-4 border-b">
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${activeTab === 0
                            ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                            : "text-gray-500 border-b"
                            }`}
                    >
                        Registered Restaurants
                    </Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${activeTab === 1
                            ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                            : "text-gray-500 border-b"
                            }`}
                    >
                        Blocked Restaurants
                    </Tab>
                </TabList>
                {/* ================= Vendor Details component ============== */}
                <TabPanel>
                </TabPanel>
                <TabPanel>
                </TabPanel>
            </Tabs>
            <div className='grid grid-cols-3 gap-10 mt-4'>
                <div className='flex gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg '>
                    <SearchNormal className='text-gray-400' />
                    <input placeholder='Search..' className='w-4/5 h-full' />
                </div>
                <input className={inputClass} placeholder='Filter By Pincode' />
                <div className='grid grid-cols-3 gap-2'>
                    <button className='flex gap-2 p-3 bg-white border-2 rounded-lg '>
                        <Refresh className='text-gray-400' />
                        <p>Refresh</p>
                    </button>
                    <div className='col-span-2'>
                        <AddRestaurant title='Add Restaurant' />
                    </div>
                </div>
            </div>
            <Table columns={columns} data={data} />
        </div>
    )
}
