import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import AsyncSelect from "react-select/async";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { formBtn1, formBtn2, inputClass } from '../../utils/CustomClass';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Table from '../../components/Table/Table';
import { NavLink } from 'react-router-dom';
import { ClipboardTick, Eye, Trash } from 'iconsax-react';
import moment from 'moment';

function FranchiseeOrder() {
    const [selectedTab, setSelectedTab] = useState(0);
    // const storages = useSelector((state) => state?.storage?.list);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();
    const loadOptions = (_, callback) => {
        // const uniqueNames = new Set();
        // const uniqueProducts = storages
        //     ?.filter(
        //         (res) =>
        //             res.name && !uniqueNames.has(res.name) && uniqueNames.add(res.name)
        //     )
        //     .map((res) => ({ label: res.name, value: res.name }));
        // callback(uniqueProducts || []);
    };

    const onSubmit = (data) => {
    }
    const filterReset = () => {
        reset({
            name: null,
            location: "",
        });
        toast.success("Filters clear");
    };

    //=========== Table ===========


    // ================ Accepted Order ================

    // ====================== Accepted Order =====================
    const AcceptedOrderData = [
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
            "status": "Accepted"

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
            "status": "Accepted"
        }
    ]


    const AcceptedName = (row) => row?.items?.map(item => <h6 key={item?.itemName}>{item?.itemName}</h6>);
    const AcceptedQuantity = (row) => row?.items?.map(item => <h6 key={item?.itemQuantity}>{item?.quantity}</h6>)
    const AcceptedDescription = (row) => row?.items?.map(item => <h6 className="w-52" key={item?.itemDescription}>{item?.itemDescription}</h6>)
    const AcceptedItemPrice = (row) => row?.items?.map(item => <h6 key={item?.price}>{item?.price}</h6>)
    const AcceptedCategory = (row) => row?.items?.map(item => <h6 key={item?.category}>{item?.category}</h6>)
    const AcceptedAction = (row) => <div className="flex items-center space-x-1">
        <NavLink className='p-1 bg-sky-100 rounded-xl'>
            <Eye size={20} className="text-sky-400" />
        </NavLink>
    </div>

    const AcceptedOrderColumn = [
        { field: "orderId", header: "Order ID" },
        { field: "OrderDate", header: "Order Date", body: (row) => <h6>{moment(row?.orderDate).format('MMM Do YY')}</h6>, sortable: true },
        { field: "name", header: "Name", body: AcceptedName, sortable: true },
        { field: "quantity", header: "Quantity", body: AcceptedQuantity, sortable: true },
        { field: "description", header: "Description", body: AcceptedDescription, sortable: true },
        { field: "paymentMethod", header: "Payment Method", sortable: true },
        { field: "price", header: "Price", body: AcceptedItemPrice, sortable: true },
        { field: "category", header: "Category", body: AcceptedCategory, sortable: true },
        { field: "location", header: "Location", sortable: true },
        { field: "orderPrice", header: "Total Price", sortable: true },
        { field: "action", header: "Action", body: AcceptedAction, sortable: true },
        { field: "status", header: "Status", sortable: true },
    ];

    // ============= New Order ==========
    const NewOrderData = [
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
    const action = (row) => <div className="flex items-center space-x-1">
        <NavLink className='p-1 bg-sky-100 rounded-xl'>
            <Eye size={20} className="text-sky-400" />
        </NavLink>
        <div className="p-1 cursor-pointer bg-green-50 rounded-xl">
            <ClipboardTick size={20} color="green" />
        </div>
        <div className="p-1 cursor-pointer bg-red-50 rounded-xl">
            <Trash size={20} color="red" />
        </div>
    </div>

    const NewOrdercolumns = [
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
            <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 md:items-center lg:flex-row"
                >
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-y-3 gap-x-2 ">
                        <div className="">
                            <Controller
                                control={control}
                                name="name"
                                render={({ field }) => (
                                    <AsyncSelect
                                        placeholder="Search By Name"
                                        cacheOptions
                                        defaultOptions
                                        value={field.value}
                                        defaultValue={
                                            field.value
                                                ? { label: field.value, value: field.value }
                                                : null
                                        }
                                        loadOptions={loadOptions}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <select
                                name="City"
                                className={`${inputClass} !bg-slate-100`}
                                {...register("location")}
                            >
                                <option value="">City</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <button
                            type="submit"
                            className={`${formBtn1} w-full text-center`}
                        >
                            Filter
                        </button>
                        <button
                            type="button"
                            className={`${formBtn2} w-full text-center`}
                            onClick={filterReset}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
            <div className="mx-auto mt-8 sm:m-5">
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
                        <Tab
                            className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1
                                ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                : "text-gray-500 border-b"
                                }`}
                        >
                            Accepted
                        </Tab>
                        <Tab
                            className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 2
                                ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                : "text-gray-500 border-b"
                                }`}
                        >
                            Rejected
                        </Tab>
                        <Tab
                            className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 3
                                ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                : "text-gray-500 border-b"
                                }`}
                        >
                            History
                        </Tab>
                    </TabList>
                    {/* ================= NewPending Orders component ============== */}
                    <TabPanel className='mt-5 bg-white'>
                        <Table data={NewOrderData} columns={NewOrdercolumns} />
                    </TabPanel>
                    <TabPanel className='mt-5 bg-white'>
                        <Table data={AcceptedOrderData} columns={AcceptedOrderColumn} />
                    </TabPanel>
                    <TabPanel className='mt-5 bg-white'>
                        {/* <Table data={AcceptedOrderData} columns={AcceptedOrderColumn} /> */}
                    </TabPanel>
                    <TabPanel className='mt-5 bg-white'>
                        {/* <Table data={AcceptedOrderData} columns={AcceptedOrderColumn} /> */}
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default FranchiseeOrder