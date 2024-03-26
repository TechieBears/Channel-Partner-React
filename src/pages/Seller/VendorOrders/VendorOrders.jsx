import { ClipboardTick, Eye, Trash } from 'iconsax-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { toast } from 'react-toastify';
import OrdersCard from '../../../components/Cards/Orders/OrdersCard';
import Table from '../../../components/table/Table';
import { environment } from '../../../env';
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';

const VendorOrders = () => {
    const user = useSelector((state) => state.user.loggedUserDetails);
    const webSocketUrl = `${environment.webSocketUrl}user_to_seller/${user?.msb_code}`
    const ws = new WebSocket(webSocketUrl)
    const [selectedTab, setSelectedTab] = useState(0);
    const orders = useSelector(state => state?.orders?.newOrders);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();


    // =============== Orders Web Socket =============================
    const wsFunction = ({ status, data }) => {
        const WebSocketUrl = `${environment.webSocketUrl}user_to_seller/${user?.msb_code}${data?.orderId != null ? data?.orderId : ''}`;
        const ws = new WebSocket(WebSocketUrl);

        ws.onopen = () => {
            ws.send(JSON.stringify({ orderdetails: data?.orderId, orderstatus: status, orderfor: user?.vendor_type == 'restaurant' ? 'restaurant' : 'vendor', messagefor: 'user' }));
        };

        ws.onclose = (event) => {
            console.log("WebSocket connection closed:", event);
        };

        ws.onerror = (error) => {
            console.error("WebSocket encountered error:", error);
        };
    }

    // ============================= seller to driver web socket =============================
    const wsFunction2 = () => {
        const WebSocketUrl = `${environment.webSocketUrl}seller_to_deliveryboy/${user?.msb_code}${user?.pincode}`;
        const ws = new WebSocket(WebSocketUrl);

        ws.onopen = () => {
            ws.send(data)
        }
    }

    const filterReset = () => {
        reset({
            name: null,
            location: "",
        });
        toast.success("Filters clear");
    };


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
        // console.log('data', data)
    }

    useEffect(() => {
        ws.open = () => {
            console.log('WebSocket Client Connected');
        };
        ws.onerror = (e) => {
            console.log(e.message);
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("🚀 ~ file: VendorOrders.jsx:63 ~ useEffect ~ data:", data?.orderId)
            window.alert(data?.orderId)

        };
        return () => {
            // ws.close()
        }
    }, [ws])


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
    useEffect(() => { }, [orders])
    return (
        <>
            <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 md:items-center lg:flex-row"
                >
                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-y-3 gap-x-2 ">
                        <div className="">
                            <select
                                className={`${inputClass} !bg-slate-100`}
                                {...register('order_id')}
                            >
                                <option value='' className="text-slate-100">Select Status</option>
                                <option value='pending'>Pending</option>
                                <option value='accepted'>Accepted</option>
                                <option value='rejected'>Rejected</option>
                                <option value='prepering'>Prepering</option>
                            </select>
                        </div>
                        <div className="">
                            <input className={`${inputClass} !bg-slate-100`}
                                {...register('order_id')}
                                placeholder="Search By Order ID"
                            />
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
                        // onClick={filterReset}
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
                            {`New Order's (${orders?.length})`}
                        </Tab>
                        <Tab
                            className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1
                                ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                : "text-gray-500 border-b"
                                }`}
                        >
                            Accepted Order's
                        </Tab>
                        <Tab
                            className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 2
                                ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                : "text-gray-500 border-b"
                                }`}
                        >
                            Rejected Order's
                        </Tab>
                    </TabList>
                    {/* ================= NewPending Orders component ============== */}
                    <TabPanel className='mt-5 bg-white'>
                        {/* ===================== New Order Section ===================== */}
                        <div className="space-y-2 p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold">Current Orders</p>
                                <form className="grid grid-cols-3 gap-4 ">
                                    <input
                                        className={`${inputClass} !bg-slate-100`}
                                        placeholder="Enter OTP"
                                    />
                                    <button
                                        type='button'
                                        className={formBtn1}
                                    >Submit</button>
                                    <button
                                        className={formBtn2}
                                        type='button'
                                    >Clear</button>
                                </form>
                            </div>
                            {
                                orders?.length != 0 ? orders?.map(data => (
                                    <OrdersCard data={data} />
                                )) : 'No Orders For Today'
                            }
                        </div>
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