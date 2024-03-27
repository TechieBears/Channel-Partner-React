import { ClipboardTick, Eye, Trash } from 'iconsax-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Table from '../../../components/table/Table';
import { environment } from '../../../env';
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';
import { vendorOrders } from '../../../api';

const VendorOrders = () => {
    const [orderData, setOrderData] = useState([]);
    console.log('orderData', orderData)
    const acceptedOrder = orderData?.filter(order => order?.order_status == "accepted")
    const rejectedOrder = orderData?.filter(order => order?.order_status == "rejected")
    const user = useSelector((state) => state.user.loggedUserDetails);
    const webSocketUrl = `${environment.webSocketUrl}user_to_seller/${user?.msb_code}`
    const ws = new WebSocket(webSocketUrl)
    const [selectedTab, setSelectedTab] = useState(0);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const getOrders = () => {
        try {
            vendorOrders(user?.sellerId).then(res => {
                setOrderData(res);
            })
        } catch (error) {
            console.log('error: ', error)
        }
    }

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
    // ========================= Accepted Order =================

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
        { field: "order_id", header: "Order ID" },
        { field: "order_revenue", header: "Order Revenue(₹)" },
        { field: "order_status", header: "Order Status", body: (row) => <h6 className='capitalize'>{row?.order_status}</h6>, sortable: true },
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
    ];

    useEffect(() => { getOrders() }, [])
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
                        <Table data={acceptedOrder} columns={AcceptedOrderColumn} />
                    </TabPanel>
                    <TabPanel className='mt-5 bg-white'>
                        <Table data={rejectedOrder} columns={AcceptedOrderColumn} />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default VendorOrders