import { ArrowDown2, ArrowUp2, User } from 'iconsax-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { allOrderTracking, updateOrder } from '../../../api'
import { environment } from '../../../env'
import { removeOrder, setAcceptedOrders } from '../../../redux/Slices/orderSlice'
import { formBtn2 } from '../../../utils/CustomClass'

function OrdersCard({ data, accepted }) {
    const [status, setstatus] = useState('pending')
    const [details, setDetails] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.loggedUserDetails);
    const vendorDetails = useSelector(state => state?.user?.vendorDetails);
    // =============== Orders Web Socket =============================
    const userTosellerws = (status) => {
        if (data?.orderId != null || data?.orderId != '') {
            const WebSocketUrl = `${environment.webSocketUrl}user_to_seller/${user?.msb_code}${data?.orderId}`;
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
    }

    const restaurantToDriverws = () => {
        const WebSocketUrl = `${environment.webSocketUrl}seller_to_deliveryboy/${user?.franchise_msbcode}${user?.pincode}`;
        const ws = new WebSocket(WebSocketUrl);
        ws.onopen = () => {
            ws.send(JSON.stringify({
                pickup_location: {
                    latitude: vendorDetails?.latitude,
                    longitude: vendorDetails?.longitude,
                    shop_address: vendorDetails?.shop_address,
                    shop_name: vendorDetails?.shop_name,
                },
                orderId: data?.orderId,
                order_created_at: data?.orderDetails?.order_created_at,
                vendor_id: user?.sellerId,
                msb_code: user?.msb_code,
                pincode: user?.pincode,
                franchise_msbcode: user?.franchise_msbcode,
                message_from: user?.vendor_type == 'restaurant' ? user?.vendor_type : 'vendor',
            }))
        };

        ws.onclose = (event) => {
            console.log("WebSocket connection closed: seller to deliveryboy", event);
        }

        ws.onerror = (error) => {
            console.error("WebSocket encountered error:", error);
        };
    }

    // ================== update order API =================
    const orderUpdate = (status) => {
        const orderData = {
            orderstatus: status,
            order_id: data?.orderId,
            vendor_id: user?.sellerId,
            pincode: user?.pincode,
            user_id: user.userid,
            order_for: user?.vendor_type == 'restaurant' ? 'restaurant' : 'vendor'
        }
        try {
            updateOrder(orderData).then(res => {
                if (res?.status == "success") {
                    toast.success('Order Status updated successfully')
                } else {
                    toast.error('Error updating order')
                }
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const updateOrderDetails = () => {
        // ========================== Revenue Calculations =========================
        let totalRevenue = 0;
        data?.orderedItems?.forEach(item => {
            const productPrice = item?.product?.product_actual_price;
            const instaCommissionPercentage = item?.product?.insta_commison_percentage;
            const productQty = item?.product_qty;

            const revenuePerProduct = (productPrice * (100 - instaCommissionPercentage) / 100) * productQty;
            totalRevenue += revenuePerProduct
        });
        const tempData = {
            vendor: user?.sellerId,
            order_id: data?.orderId,
            ordered_items: JSON.stringify(data?.orderedItems),
            order_status: status,
            order_for: user?.vendor_type == 'restaurant' ? 'restaurant' : 'vendor',
            order_revenue: totalRevenue,
        }
        try {
            if (status == 'accepted' || status == 'rejected') {
                allOrderTracking(tempData).then(res => {
                    console.log('res all orders ====================', res)
                })
            }
        } catch (error) {
            console.log('error:', error)
        }
    }

    //===================== accept order api web socker =================
    const changeStatus = ({ status }) => {
        console.log("🚀 ~ file: Orders.jsx:29 ~ changeStatus ~ status:", status)
        setstatus(status)
        userTosellerws(status);
        if (status == 'accepted') {
            restaurantToDriverws();
            const updatedData = {
                orderId: data?.orderId,
                orderstatus: status,
            }
            dispatch(removeOrder(updatedData))
            dispatch(setAcceptedOrders(data))
        }
        orderUpdate(status);
        updateOrderDetails();
    }

    const autoAcceptOrder = () => {
        setTimeout(() => {
            changeStatus({ status: 'accepted' })
            toast.success('Order auto Accepted')
        }, 30000); // 30 sec 
    }

    useEffect(() => {
        if (accepted) {
            setstatus('accepted')
        }
        if (data && data.orderDetails && data.orderDetails && data.orderDetails?.order_created_at) {
            const orderCreatedAt = moment(data.orderDetails?.order_created_at);
            const currentDateTime = moment();
            if (orderCreatedAt.format('DD-MM-YYYY hh:mm a') === currentDateTime.format('DD-MM-YYYY hh:mm a')) {
                autoAcceptOrder();
                console.log('inside if ')
            }
        }
    }, [])

    return (
        <>
            <div className="p-2 bg-white border-2 rounded-lg border-slate-200" >
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-5">
                    <div className="flex flex-col sm:items-center lg:items-start md:justify-start xl:justify-start md:ml-8 space-y-1">
                        <div className="flex gap-2">
                            <p className="font-semibold">Order ID</p>
                            <p className="text-sky-400">#{data?.orderId}</p>
                        </div>
                        <p className="text-xs font-light">{moment(data?.orderDetails?.order_created_at).format('LLL')}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className='items-center'>
                            <div className='flex items-center gap-2'>
                                <User variant="Bold" size={18} />
                                <p className="font-semibold">Mayur Mane</p>
                            </div>
                            <div className='flex gap-2'>
                                <p className='text-xs '>Total Items</p>
                                <p className="text-xs ">{data?.orderedItems?.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className='flex items-center justify-center gap-2'>
                            <div className={`${status === 'pending' ? 'bg-red-500' : status === 'accepted' ? 'bg-green-500' : status === 'prepared' ? 'bg-yellow-500' : 'bg-green-500'} p-2 font-sans rounded-full w-1 h-1/4`} />
                            <p className={`font-semibold font-sans capitalize ${status === 'pending' ? 'text-red-500' : status === 'accepted' ? 'text-green-500' : status === 'prepared' ? 'text-yellow-500' : 'text-green-500'}`}>{status}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        {status == 'pending' ?
                            <>
                                <button className="px-4 py-2 font-medium bg-green-500 rounded-lg hover:bg-green-700" onClick={() => changeStatus({ status: 'accepted' })}>
                                    <p className="text-white">{status == 'pending' ? 'Accept' : 'Accept'}</p>
                                </button>
                                <button className={formBtn2}>Decline</button>
                            </> : null
                        }
                        {
                            status === 'accepted' && <button className="bg-green-500 py-2 px-4 rounded-lg font-medium text-white hover:bg-green-700" onClick={() => changeStatus({ status: 'prepared' })}>Mark as Prepared</button>
                        }
                        {
                            status === 'prepared' && <button className="bg-yellow-400 py-2 px-4 rounded-lg font-medium text-white hover:bg-yellow-700" onClick={() => changeStatus({ status: 'done' })}>Mark as Picked</button>
                        }
                    </div>
                    <div className="flex items-center justify-center">
                        {!details && <button onClick={() => setDetails(true)}>
                            <ArrowDown2 />
                        </button>}
                        {
                            details && <div className="flex items-center justify-center">
                                <button onClick={() => setDetails(false)}>
                                    <ArrowUp2 />
                                </button>
                            </div>
                        }
                    </div>
                </div>
                {details && <div className="mt-4 border-t-2">
                    <div className="mt-2 ml-4">
                        <p className="text-lg font-semibold text-sky-400">Order Details</p>
                    </div>
                    <div className="grid items-center gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        {data?.orderedItems?.map(item => (
                            <div className="flex justify-around" key={item?.orderitem_id}>
                                <img src={item?.product?.product_image_1} alt="img" className="w-20 h-20" />
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <p className="text-lg font-semibold">{item?.product?.product_name}</p>
                                        <p className="text-xs font-medium text-gray-400">{item?.product?.product_description}</p>
                                    </div>
                                    <p className="text-base font-semibold">Qty: {item?.product_qty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 border-t border-slate-300">
                        <div className="mt-2 ml-4">
                            <p className="text-lg font-semibold text-sky-400">Order Instructions</p>
                            <p className="p-2 text-base font-medium">{data?.orderDetails?.order_instruction == null ? 'No Instructions given' : order_instruction}</p>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default OrdersCard