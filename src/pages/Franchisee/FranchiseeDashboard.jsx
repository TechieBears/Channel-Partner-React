import { ArrowSwapVertical, ClipboardTick, ShoppingCart, Trash, UserRemove } from 'iconsax-react'
import { Line } from 'rc-progress'
import React, { useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Table from '../../components/Table/Table'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import moment from 'moment'
import ViewProduct from '../../components/Modals/Vendors/ViewProduct'

function FranchiseeDashboard() {
    const [selectedTab, setSelectedTab] = useState(0);
    const barData = [
        {
            "year": "24",
            "hot dog": 44,
        },
        {
            "year": "23",
            "hot dog": 170,
        },
        {
            "year": "22",
            "hot dog": 41,
        },
        {
            "year": "21",
            "hot dog": 113,
        },
        {
            "year": "20",
            "hot dog": 144,
        },
        {
            "year": "19",
            "hot dog": 157,
        },
        {
            "year": "18",
            "hot dog": 102,
        }
    ]


    // ====================== table columns ======================

    const data = [
        {
            "orderId": 753,
            "orderDate": "Jan 1, 2024 , 05:56 PM",
            "items": [
                {
                    "itemName": "Butter Milk",
                    "itemDescription": "Lorem ipsum dolor, sit amet",
                    "imageSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU",
                    "quantity": 2,
                    'price': 50,
                    'category': 'dairy'
                }
            ],
            "orderPrice": "$1,000",
            "paymentMethod": "Cash",
            "location": 'Parel',

        },
        {
            "orderId": 754,
            "orderDate": "Jan 2, 2024 , 10:30 AM",
            "items": [
                {
                    "itemName": "Coffee",
                    "itemDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "imageSrc": "https://example.com/coffee.jpg",
                    "quantity": 2,
                    'price': 20,
                    'category': 'grocery'
                },
                {
                    "itemName": "Croissant",
                    "itemDescription": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                    "imageSrc": "https://example.com/croissant.jpg",
                    "quantity": 2,
                    'price': 200,
                    'category': 'food'
                }
            ],
            "orderPrice": "$25",
            "paymentMethod": "UPI",
            "location": 'Thane',
        }
    ]

    const name = (row) => row?.items?.map(item => <h6 key={item?.itemName}>{item?.itemName}</h6>);
    const quantity = (row) => row?.items?.map(item => <h6 key={item?.itemQuantity}>{item?.quantity}</h6>)
    const description = (row) => row?.items?.map(item => <h6 className="w-52" key={item?.itemDescription}>{item?.itemDescription}</h6>)
    const itemPrice = (row) => row?.items?.map(item => <h6 key={item?.price}>{item?.price}</h6>)
    const category = (row) => row?.items?.map(item => <h6 key={item?.category}>{item?.category}</h6>)
    const action = (row) => <div className="flex space-x-1 items-center">
        <ViewProduct product={row} title='Order Details' />
        <div className="bg-green-50 p-1 rounded-xl cursor-pointer">
            <ClipboardTick size={20} color="green" />
        </div>
        <div className="bg-red-50 p-1 rounded-xl cursor-pointer">
            <Trash size={20} color="red" />
        </div>
    </div>


    const columns = [
        { field: "orderId", header: "Order ID" },
        { field: "OrderDate", header: "Order Date", body: (row) => <h6>{moment(row?.orderDate).format('MMM Do YY')}</h6>, sortable: true },
        { field: "name", header: "Name", body: name, sortable: true },
        { field: "quantity", header: "Quantity", body: quantity, sortable: true },
        { field: "description", header: "Description", body: description, sortable: true },
        { field: "paymentMethod", header: "Payment Method", sortable: true },
        { field: "price", header: "Price", body: itemPrice, sortable: true },
        { field: "category", header: "Category", body: category, sortable: true },
        { field: "location", header: "Location", sortable: true },
        { field: "orderPrice", header: "Total Price", sortable: true },
        { field: "action", header: "Action", body: action, sortable: true },
    ];


    return (
        <>
            <div className='bg-white m-4 rounded-xl'>
                {/* ======================= Headers =========================== */}
                <div className="grid grid-cols-1 p-4 sm:m-5 rounded-xl sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-4 ">
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70 ">
                        <div className="p-3.5 rounded-xl bg-sky-50">
                            <ShoppingCart size={26} className="text-sky-400" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">
                                Total Orders
                            </h6>
                            <h6 className="text-base font-semibold text-sky-400 font-tb">
                                980
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl lg:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-purple-50">
                            <ArrowSwapVertical size={26} className="text-purple-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">Active Orders</h6>
                            <h6 className="text-base font-semibold text-purple-600 font-tb">
                                120
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-green-50">
                            <ClipboardTick size={26} className="text-green-500" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">
                                Approved Orders
                            </h6>
                            <h6 className="text-base font-semibold text-green-500 font-tb">
                                70
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-red-50">
                            <UserRemove size={26} className="text-red-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">Cancelled Vendors</h6>
                            <h6 className="text-base font-semibold text-red-400 font-tb">
                                5
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white m-4 rounded-xl p-4 grid grid-cols-3 gap-2'>
                <div className='col-span-2 grid grid-cols-3 gap-2'>
                    <p className='col-span-3 text-xl font-semibold'>Sales Report</p>
                    <div className='space-y-1 border-2 border-slate-200 p-4 rounded-xl'>
                        <h4 className='text-sm font-medium'>Today</h4>
                        <h3 className='text-xl font-semibold'>$ 2,000</h3>
                        <Line percent={10} strokeWidth={4} trailWidth={4} trailColor='#D3D3D3' strokeColor='rgb(239 68 68)' />
                    </div>
                    <div className='space-y-1 border-2 border-slate-200 p-4 rounded-xl'>
                        <h4 className='text-sm font-medium'>This Week</h4>
                        <h3 className='text-xl font-semibold'>$ 10,000</h3>
                        <Line percent={40} strokeWidth={4} trailWidth={4} trailColor='#D3D3D3' strokeColor='rgb(56 189 248)' />
                    </div>
                    <div className='space-y-1 border-2 border-slate-200 p-4 rounded-xl'>
                        <h4 className='text-sm font-medium'>This Month</h4>
                        <h3 className='text-xl font-semibold'>$ 12,0000</h3>
                        <Line percent={60} strokeWidth={4} trailWidth={4} trailColor='#D3D3D3' strokeColor='rgb(74 222 128)' />
                    </div>
                </div>
                <div className=''>
                    <p className='col-span-3 text-xl font-semibold'>Sales Statistics</p>
                    <div className=' w-full h-60'>
                        <ResponsiveBar
                            data={barData}
                            keys={[
                                'hot dog',
                            ]}
                            indexBy="year"
                            margin={{ top: 20, right: 10, bottom: 50, left: 50 }}
                            padding={0.5}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                legend: 'year',
                                legendPosition: 'middle',
                                legendOffset: 32,
                            }}
                            axisLeft={{
                                legend: 'revenue',
                                legendPosition: 'middle',
                                legendOffset: -40,
                            }}
                            // role="application"
                            ariaLabel=""
                            barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
                        />
                    </div>
                </div>
            </div>
            <div className='bg-white m-4 rounded-xl p-4'>
                <Tabs
                    selectedIndex={selectedTab}
                    onSelect={(index) => setSelectedTab(index)}
                >
                    <TabList className="flex mx-6 space-x-4 border-b">
                        <Tab
                            className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0
                                ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                : "text-gray-500 border-b"
                                }`}
                        >
                            New Order's
                        </Tab>
                    </TabList>
                    {/* ================= NewPending Orders component ============== */}
                    <TabPanel className='mt-5'>
                        <Table data={data} columns={columns} />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default FranchiseeDashboard