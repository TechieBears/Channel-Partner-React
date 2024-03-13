import React, { useState } from 'react'
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs'
import Category from './MenuList/Category';
import SubCategory from './MenuList/SubCategory';
import Product from './MenuList/Product';
import AdminProduct from './AdminProduct/AdminProducts';
import { useSelector } from 'react-redux';


const Menu = (props) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    return (
        <div className="mx-5 mt-2" >
            <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)} >
                <TabList className="flex sm:flex-col md:flex-row lg:flex-row mx-6 space-x-4 border-b">
                    {LoggedUserDetails?.role != 'seller' && <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >
                        Category
                    </Tab>}
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >
                        SubCategory
                    </Tab>
                    {LoggedUserDetails?.role != 'seller' && <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 2 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >
                        {props?.isrestaurant ? "Food Items" : "Products"}
                    </Tab>}
                </TabList>
                {/* ================= Category component ============== */}
                {LoggedUserDetails?.role != 'seller' && <TabPanel >
                    <Category isrestaurant={props?.isrestaurant} />
                </TabPanel>}
                {/* ================= SubCategory component ============== */}
                <TabPanel >
                    <SubCategory isrestaurant={props?.isrestaurant} />
                </TabPanel>
                {/* ================= Product component ============== */}
                {LoggedUserDetails?.role != 'seller' && <TabPanel>
                    <AdminProduct isrestaurant={props?.isrestaurant} />
                </TabPanel>}
            </Tabs>
        </div>
    )
}

export default Menu