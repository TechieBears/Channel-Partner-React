import { Eye } from 'iconsax-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { toast } from 'react-toastify';
import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal';
import Table from '../../../components/Table/Table';
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';

const Order = () => {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [delId, setDelId] = React.useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
    const orders = useSelector((state) => { state?.orders?.orders })
    const data = [{
        "order_id": "123456789",
        "customer_name": "John Doe",
        "customer_phone": "+1234567890",
        "customer_address": "123 Main St, City, Country",
        "restaurant_name": "Delicious Bites",
        "restaurant_address": "456 Elm St, City, Country",
        "items_ordered": [
            {
                "item_name": "Cheeseburger",
                "item_quantity": 2,
                "item_price": 9.99
            },
            {
                "item_name": "French Fries",
                "item_quantity": 1,
                "item_price": 3.99
            },
            {
                "item_name": "Cola",
                "item_quantity": 3,
                "item_price": 1.99
            }
        ],
        "order_total": 33.94,
        "order_status": "Placed",
        "delivery_time": "ASAP",
        "payment_method": "Credit Card"
    },
    ]


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm();

    // ======================== Data submit ===================================
    const onSubmit = async (data) => {
        console.log('data', data);
    }

    // ================= delete storage data ===============
    const toggleModalBtn = (id) => {
        setOpen(!open)
        setDelId(id)
    }
    const deleteData = () => {
        deleteStorage(delId).then((form) => {
            if (form?.message === 'Data deleted successfully') {
                toast.success(form?.message);
                setOpen(!open)
            }
        })
    }

    // ================= Restaurant Table Columns =================

    const restaurantAction = (row) => (
        <div className='w-full'>
            <Link className=''>
                <Eye className='text-sky-400' />
            </Link>
        </div>
    )

    const columns = [
        { field: "order_id", header: "Order Id", style: true },
        { field: "restaurant_name", header: "Restaurant Name", style: true, sortable: true },
        { field: "restaurant_address", header: "Restaurant Address", style: true, sortable: true },
        { field: "items_ordered", header: "Items Ordered", body: (row) => <h6>{row?.items_ordered?.length}</h6>, style: true, sortable: true },
        { field: "order_total", header: "Order Total", style: true, sortable: true },
        { field: "order_status", header: "Order Status", style: true, sortable: true },
        { field: "payment_method", header: "Payment Method", style: true, sortable: true },
        { field: "action", header: "Action", body: restaurantAction, style: true, sortable: true },
    ]

    // const webSocketUrl = environment.WEB_SOCKET_API_URL;
    // const ws = useRef(new WebSocket(webSocketUrl)).current;
    // useEffect(() => {
    //     // Function to send a general message
    //     const sendMessage = (message) => {
    //         if (ws.readyState === WebSocket.OPEN) {
    //             ws.send(message);
    //         } else {
    //             console.log("WebSocket connection not open.");
    //         }
    //     };

    //     // Function to send a specific type of message
    //     const sendHelloMessage = () => {
    //         sendMessage("Hello!");
    //     };

    //     const sendCustomMessage = (customMessage) => {
    //         sendMessage(customMessage);
    //     };

    //     // Event listener for WebSocket open
    //     ws.onopen = () => {
    //         console.log('WebSocket Client Connected');
    //         // Example: Sending a specific type of message when the WebSocket connection is open
    //         sendHelloMessage();
    //     };

    //     // Event listener for incoming messages
    //     ws.onmessage = (event) => {
    //         console.log('Received message:', event);
    //         // Handle incoming messages as needed
    //     };

    //     // Event listener for WebSocket close
    //     ws.onclose = () => {
    //         console.log('WebSocket Client Closed');
    //     };

    //     // Event listener for WebSocket errors
    //     ws.onerror = (e) => {
    //         console.log('WebSocket Error:', e.message);
    //     };

    //     // Cleanup function for useEffect
    //     return () => {
    //         ws.close(); // Close the WebSocket connection when component unmounts
    //     };
    // }, []);

    return (
        <>
            <DeleteModal
                title='Delete Stroage'
                deleteBtn={deleteData}
                toggleModalBtn={toggleModalBtn}
                description={"Are you sure you want to delete this Stroage"} open={open}
            />
            <section className='w-full h-full'>

                <div className="mx-auto mt-8 sm:m-5">
                    {/* =========================  fileter ======================= */}
                    <div className="p-4 bg-white sm:m-5 rounded-xl" >
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 md:items-center lg:flex-row'>
                            <div className="grid w-full grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-2">
                                <div className="">
                                    <input
                                        type="text"
                                        placeholder='Search'
                                        autoComplete='off'
                                        className={`${inputClass} !bg-slate-100`}
                                        {...register('name')}
                                    />
                                </div>
                                <div className="">
                                    <input
                                        type="date"
                                        placeholder='Select date (YYYY-MM-DD)'
                                        autoComplete='off'
                                        className={`${inputClass} !bg-slate-100 !text-gray-400`}
                                        {...register('date')}
                                    />
                                </div>

                                <div className="">
                                    <select
                                        name="City"
                                        className={`${inputClass} !bg-slate-100`}
                                        {...register("city")}
                                    >
                                        <option value="">
                                            Payment Type
                                        </option>
                                        <option value="COD">COD</option>
                                        <option value="Phonepay">Phonepay</option>
                                        <option value="Googlepay">Googlepay</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <button type='submit' className={`${formBtn1} w-full text-center`}>Filter</button>
                                <button type='button' className={`${formBtn2} w-full text-center`} onClick={() => { reset(), toast.success("Filters clear successfully"), fetchData() }}>Clear</button>
                            </div>
                        </form>
                    </div>
                    <div className="mx-5 mt-2" >
                        <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)} >
                            <TabList className="flex mx-6 space-x-4 border-b">
                                <Tab
                                    className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                                        }`}
                                >
                                    Restaurant
                                </Tab>
                                <Tab
                                    className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                                        }`}
                                >
                                    Shops
                                </Tab>
                            </TabList>
                            {/* ================= Restaurant Order component ============== */}
                            <TabPanel >
                                <div className='mt-4'>
                                    <Table data={data} columns={columns} />
                                </div>
                            </TabPanel>
                            {/* ================= Shop Order component ============== */}
                            <TabPanel >
                                <div className='mt-4'>
                                    <Table data={data} columns={columns} />
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section >
        </>

    )
}

export default Order