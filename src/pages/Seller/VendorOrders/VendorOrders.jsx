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
    let acceptedOrder;
    let rejectedOrder;
    if (orderData?.length > 0) {
        acceptedOrder = orderData?.filter(order => order?.order_status == "accepted")
        rejectedOrder = orderData?.filter(order => order?.order_status == "rejected")
    }
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

    const orderedItems = (row) => {
        const data = JSON.parse(row?.ordered_items);
        return (
            <h6>
                {data?.length}
            </h6>
        )
    }

    const OrderColumn = [
        { field: "order_id", header: "Order ID", style: true },
        { field: "order_revenue", header: "Order Revenue(₹)", style: true },
        { field: "order_status", header: "Order Status", body: (row) => <h6 className='capitalize'>{row?.order_status}</h6>, sortable: true, style: true },
        { field: "order_date", header: "Order Date", body: (row) => <h6>{moment(row?.orderDate).format('MMM Do YY')}</h6>, sortable: true, style: true },
        { field: "ordered_items", header: "Ordered Quantity", body: orderedItems, sortable: true, style: true },
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
                            className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0
                                ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                : "text-gray-500 border-b"
                                }`}
                        >
                            Accepted Order's
                        </Tab>
                        <Tab
                            className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1
                                ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                : "text-gray-500 border-b"
                                }`}
                        >
                            Rejected Order's
                        </Tab>
                    </TabList>
                    {/* ================= NewPending Orders component ============== */}
                    <TabPanel className='mt-5 bg-white'>
                        <Table data={acceptedOrder} columns={OrderColumn} />
                    </TabPanel>
                    <TabPanel className='mt-5 bg-white'>
                        <Table data={rejectedOrder} columns={OrderColumn} />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default VendorOrders