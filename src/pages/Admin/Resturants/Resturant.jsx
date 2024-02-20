import { Add, Eye, Refresh, SearchNormal } from 'iconsax-react';
import React, { useEffect, useState } from 'react'
import Table from '../../../components/Table/Table';
import { formBtn1, inputClass, tableBtn } from '../../../utils/CustomClass';
import AddRestaurant from '../../../components/Modals/Resturant/AddRestaurant';
// import { NavLink } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useSelector } from 'react-redux';
import { getRestarant } from '../../../api';
import { NavLink } from 'react-router-dom';

export default function Restaurant() {
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [rstatus, setStatus] = useState(false);
    const user = useSelector(state => state?.user?.loggedUserDetails);
    const Vendors = useSelector((state) => state?.master?.FranchiseVendors);
    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const getAllRestaurant = () => {
        getRestarant().then((res) => {
            const restaurantVendors = res.filter(item => item?.vendor_type === "restaurant");
            console.log('restaurantVendors:', restaurantVendors);
            setData(restaurantVendors);
        });
    }
    /*================================     column    ========================= */

    const action = row => <div className="flex items-center gap-2">
        <NavLink to={`/resturants/restaurant-detail/${row?.vendor_id}`} state={row} className="bg-green-100 px-1.5 py-1 rounded-lg">
            <Eye size="20" className='text-green-500' />
        </NavLink>
        <AddRestaurant button='edit' title='Edit User' id={row?.user?.id} data={row} getAllRestaurant={getAllRestaurant} />
    </div>

    const columns = [
        { field: 'vendor_id', header: 'ID', sortable: false },
        { field: 'isb_code', header: 'ISB Code', sortable: false },
        { field: 'shop_name', header: 'Restaurant Name', sortable: true },
        { field: 'veg_or_nonveg', header: 'Type', body: (row) => <h6>{row?.veg_or_nonveg == '' || row?.veg_or_nonveg == null || row?.veg_or_nonveg == undefined ? '-------' : row?.veg_or_nonveg}</h6>, sortable: true },
        { field: 'address', header: 'Address', body: (row) => <h6>{row?.user?.address}</h6>, sortable: true },
        { field: 'city', header: 'City', body: (row) => <h6>{row?.user?.city}</h6>, sortable: true },
        { field: 'state', header: 'State', body: (row) => <h6>{row?.user?.state}</h6>, sortable: true },
        { field: 'pincode', header: 'PINCODE', body: (row) => <h6>{row?.user?.pincode}</h6>, sortable: true },
        { field: 'is_verified', header: 'Verification Status', body: (row) => <h6>{row?.is_verified == false ? 'Pending' : 'Verified'}</h6>, sortable: true },
        { field: 'is_activated', header: 'Activation Status', body: (row) => <h6>{row?.is_activated == false ? 'Pending' : 'Verified'}</h6>, sortable: true },
        { field: 'action', header: 'Action', body: action, sortable: true },
    ]

    useEffect(() => {
        getAllRestaurant()
    }, []);

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
                        <AddRestaurant title='Add Restaurant' id={user?.userid} />
                    </div>
                </div>
            </div>
            <Table columns={columns} data={data} />
        </div>
    )
}
