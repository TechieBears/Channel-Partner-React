import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import AsyncSelect from "react-select/async";
import { toast } from 'react-toastify';
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
import { useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Table from '../../../components/Table/Table';
import { NavLink } from 'react-router-dom';
import { ArrowDown2, ArrowUp2, ClipboardTick, Eye, Trash, User } from 'iconsax-react';
import moment from 'moment';
import { IndianRupeeIcon } from 'lucide-react';
import Orders from '../../../components/Cards/Orders/Orders';

const VendorOrders = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const storages = useSelector((state) => state?.storage?.list);
    const [status, setstatus] = useState('pending')
    const [details, setDetails] = useState(false)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();
    const filterReset = () => {
        reset({
            name: null,
            location: "",
        });
        toast.success("Filters clear");
    };

    const loadOptions = (_, callback) => {
        const uniqueNames = new Set();
        const uniqueProducts = storages
            ?.filter(
                (res) =>
                    res.name && !uniqueNames.has(res.name) && uniqueNames.add(res.name)
            )
            .map((res) => ({ label: res.name, value: res.name }));
        callback(uniqueProducts || []);
    };

    const onSubmit = (data) => {
        console.log('data', data)
    }

    //================== fake data order =============================
    const data = [
        {
            "type": "order_message_echo",
            "orderId": 142,
            "orderfor": "vendor",
            "order_details": {
                "order_delivery_status": "placed",
                "order_created_at": "2024-03-14T15:18:39.976467+05:30",
                "order_instruction": null
            },
            "orderedItems": [
                {
                    "orderitem_id": 173,
                    "user": {
                        "first_name": "shubham",
                        "last_name": "Shubbb",
                        "phone_no": "7796500494",
                        "email": "shubham786@gmail.com",
                        "profile_pic": "https://s3-ap-south-1.amazonaws.com/channel-partner-media/profile%2Fshubham1708667013030.jpg",
                        "city": "",
                        "state": "",
                        "pincode": "",
                        "date_of_birth": "2024-02-23",
                        "gender": "Female"
                    },
                    "product_qty": 2,
                    "product_price": 120,
                    "product": {
                        "product_id": 7,
                        "product_name": "Faith Cole",
                        "product_description": "jhdsjadhajkd",
                        "product_brand": "Non eos sequi aut re",
                        "product_country_of_origin": "Facilis tenetur null",
                        "product_shelflife": "Ex sint quae aliquid",
                        "product_Manufacturer_Name": "Ursa Michael",
                        "product_Manufacturer_Address": null,
                        "product_nutritional_info": "Consequatur Ullam b",
                        "product_additional_details": null,
                        "product_available_qty": 762,
                        "product_msbcode": null,
                        "product_image_1": "https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/Faith Cole_MainImage_egg.png",
                        "product_image_2": "",
                        "product_image_3": "",
                        "product_image_4": "",
                        "product_image_5": "",
                        "product_video_url": "",
                        "product_isactive": true,
                        "product_actual_price": 100,
                        "product_unit_type": null,
                        "product_unit": null,
                        "product_rating": 3,
                        "product_isverified_byadmin": true,
                        "product_isverified_byfranchise": false,
                        "insta_commison_percentage": 10,
                        "markup_percentage": 10,
                        "offers": 10,
                        "featured": true,
                        "final_price": 120,
                        "vendor": 14,
                        "product_category": 15,
                        "product_subcategory": 3
                    }
                },
                {
                    "orderitem_id": 173,
                    "user": {
                        "first_name": "shubham",
                        "last_name": "Shubbb",
                        "phone_no": "7796500494",
                        "email": "shubham786@gmail.com",
                        "profile_pic": "https://s3-ap-south-1.amazonaws.com/channel-partner-media/profile%2Fshubham1708667013030.jpg",
                        "city": "",
                        "state": "",
                        "pincode": "",
                        "date_of_birth": "2024-02-23",
                        "gender": "Female"
                    },
                    "product_qty": 1,
                    "product_price": 120,
                    "product": {
                        "product_id": 7,
                        "product_name": "Faith Cole",
                        "product_description": "jhdsjadhajkd",
                        "product_brand": "Non eos sequi aut re",
                        "product_country_of_origin": "Facilis tenetur null",
                        "product_shelflife": "Ex sint quae aliquid",
                        "product_Manufacturer_Name": "Ursa Michael",
                        "product_Manufacturer_Address": null,
                        "product_nutritional_info": "Consequatur Ullam b",
                        "product_additional_details": null,
                        "product_available_qty": 762,
                        "product_msbcode": null,
                        "product_image_1": "https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/Faith Cole_MainImage_egg.png",
                        "product_image_2": "",
                        "product_image_3": "",
                        "product_image_4": "",
                        "product_image_5": "",
                        "product_video_url": "",
                        "product_isactive": true,
                        "product_actual_price": 100,
                        "product_unit_type": null,
                        "product_unit": null,
                        "product_rating": 3,
                        "product_isverified_byadmin": true,
                        "product_isverified_byfranchise": false,
                        "insta_commison_percentage": 10,
                        "markup_percentage": 10,
                        "offers": 10,
                        "featured": true,
                        "final_price": 120,
                        "vendor": 14,
                        "product_category": 15,
                        "product_subcategory": 3
                    }
                },
                {
                    "orderitem_id": 173,
                    "user": {
                        "first_name": "shubham",
                        "last_name": "Shubbb",
                        "phone_no": "7796500494",
                        "email": "shubham786@gmail.com",
                        "profile_pic": "https://s3-ap-south-1.amazonaws.com/channel-partner-media/profile%2Fshubham1708667013030.jpg",
                        "city": "",
                        "state": "",
                        "pincode": "",
                        "date_of_birth": "2024-02-23",
                        "gender": "Female"
                    },
                    "product_qty": 1,
                    "product_price": 120,
                    "product": {
                        "product_id": 7,
                        "product_name": "Faith Cole",
                        "product_description": "jhdsjadhajkd",
                        "product_brand": "Non eos sequi aut re",
                        "product_country_of_origin": "Facilis tenetur null",
                        "product_shelflife": "Ex sint quae aliquid",
                        "product_Manufacturer_Name": "Ursa Michael",
                        "product_Manufacturer_Address": null,
                        "product_nutritional_info": "Consequatur Ullam b",
                        "product_additional_details": null,
                        "product_available_qty": 762,
                        "product_msbcode": null,
                        "product_image_1": "https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/Faith Cole_MainImage_egg.png",
                        "product_image_2": "",
                        "product_image_3": "",
                        "product_image_4": "",
                        "product_image_5": "",
                        "product_video_url": "",
                        "product_isactive": true,
                        "product_actual_price": 100,
                        "product_unit_type": null,
                        "product_unit": null,
                        "product_rating": 3,
                        "product_isverified_byadmin": true,
                        "product_isverified_byfranchise": false,
                        "insta_commison_percentage": 10,
                        "markup_percentage": 10,
                        "offers": 10,
                        "featured": true,
                        "final_price": 120,
                        "vendor": 14,
                        "product_category": 15,
                        "product_subcategory": 3
                    }
                },
                {
                    "orderitem_id": 173,
                    "user": {
                        "first_name": "shubham",
                        "last_name": "Shubbb",
                        "phone_no": "7796500494",
                        "email": "shubham786@gmail.com",
                        "profile_pic": "https://s3-ap-south-1.amazonaws.com/channel-partner-media/profile%2Fshubham1708667013030.jpg",
                        "city": "",
                        "state": "",
                        "pincode": "",
                        "date_of_birth": "2024-02-23",
                        "gender": "Female"
                    },
                    "product_qty": 1,
                    "product_price": 120,
                    "product": {
                        "product_id": 7,
                        "product_name": "Faith Cole",
                        "product_description": "jhdsjadhajkd",
                        "product_brand": "Non eos sequi aut re",
                        "product_country_of_origin": "Facilis tenetur null",
                        "product_shelflife": "Ex sint quae aliquid",
                        "product_Manufacturer_Name": "Ursa Michael",
                        "product_Manufacturer_Address": null,
                        "product_nutritional_info": "Consequatur Ullam b",
                        "product_additional_details": null,
                        "product_available_qty": 762,
                        "product_msbcode": null,
                        "product_image_1": "https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/Faith Cole_MainImage_egg.png",
                        "product_image_2": "",
                        "product_image_3": "",
                        "product_image_4": "",
                        "product_image_5": "",
                        "product_video_url": "",
                        "product_isactive": true,
                        "product_actual_price": 100,
                        "product_unit_type": null,
                        "product_unit": null,
                        "product_rating": 3,
                        "product_isverified_byadmin": true,
                        "product_isverified_byfranchise": false,
                        "insta_commison_percentage": 10,
                        "markup_percentage": 10,
                        "offers": 10,
                        "featured": true,
                        "final_price": 120,
                        "vendor": 14,
                        "product_category": 15,
                        "product_subcategory": 3
                    }
                },
            ]
        }
    ]

    // ====================== table columns ======================
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
    const AcceptedAction = (row) => <div className="flex space-x-1 items-center">
        <NavLink className='bg-sky-100 p-1 rounded-xl'>
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


    const name = (row) => row?.items?.map(item => <h6 key={item?.itemName}>{item?.itemName}</h6>);
    const quantity = (row) => row?.items?.map(item => <h6 key={item?.itemQuantity}>{item?.quantity}</h6>)
    const description = (row) => row?.items?.map(item => <h6 className="w-52" key={item?.itemDescription}>{item?.itemDescription}</h6>)
    const itemPrice = (row) => row?.items?.map(item => <h6 key={item?.price}>{item?.price}</h6>)
    const category = (row) => row?.items?.map(item => <h6 key={item?.category}>{item?.category}</h6>)
    const action = (row) => <div className="flex space-x-1 items-center">
        <NavLink to={`/vendor-orders/order-detail/:${row?.id}`} className='bg-sky-100 p-1 rounded-xl'>
            <Eye size={20} className="text-sky-400" />
        </NavLink>
        <div className="bg-green-50 p-1 rounded-xl cursor-pointer">
            <ClipboardTick size={20} color="green" />
        </div>
        <div className="bg-red-50 p-1 rounded-xl cursor-pointer">
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
                            All Order's
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
                            Pending
                        </Tab>
                    </TabList>
                    {/* ================= NewPending Orders component ============== */}
                    <TabPanel className='mt-5 bg-white'>
                        {/* ===================== New Order Section ===================== */}
                        <div className="space-y-2 p-4">
                            <div>
                                <p className="font-semibold text-lg">Current Orders</p>
                            </div>
                            <Orders data={data} />
                        </div>
                    </TabPanel>
                    <TabPanel className='mt-5 bg-white'>
                        <Table data={AcceptedOrderData} columns={AcceptedOrderColumn} />
                    </TabPanel>
                    <TabPanel className='mt-5 bg-white'>
                        <Table data={AcceptedOrderData} columns={AcceptedOrderColumn} />
                    </TabPanel>
                    <TabPanel className='mt-5 bg-white'>
                        <Table data={AcceptedOrderData} columns={AcceptedOrderColumn} />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default VendorOrders