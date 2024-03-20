import { ArrowDown2, ArrowUp2, User } from 'iconsax-react'
import moment from 'moment'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { environment } from '../../../env'
import { formBtn2 } from '../../../utils/CustomClass'

function Orders({ data }) {
    const [status, setstatus] = useState('pending')
    const [details, setDetails] = useState(false)
    const user = useSelector(state => state?.user?.loggedUserDetails)
    // =============== Orders Web Socket =============================
    const wsFunction = (status) => {
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

    //===================== accept order api web socker =================
    const changeStatus = ({ status }) => {
        console.log("🚀 ~ file: Orders.jsx:29 ~ changeStatus ~ status:", status)
        setstatus(status)
        wsFunction(status);
        toast.success(`Order Statsus changes to ${status}`)
    }
    return (
        <>
            <div className="border-slate-200 border-2 p-2 rounded-lg bg-white" >
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                    <div className="space-y-1 items-center flex flex-col justify-start">
                        <div className="flex gap-2">
                            <p className="font-semibold">Order ID</p>
                            <p className="text-sky-400">#{data?.orderId}</p>
                        </div>
                        <p className="text-xs font-light">{moment(data?.orderDetails?.order_created_at).format('LLL')}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <User variant="Bold" size={18} />
                        <p className="font-semibold">{data?.orderedItems?.user?.first_name} {data?.orderedItems?.user?.last_name}</p>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <div className={`${status === 'pending' ? 'bg-red-500' : 'bg-green-500'} p-2 font-sans rounded-full w-1 h-1/4`} />
                        <p className={`font-semibold font-sans capitalize ${status === 'pending' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        {status == 'pending' ?
                            <>
                                <button className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-lg font-medium" onClick={() => changeStatus({ status: 'accepted' })}>
                                    <p className="text-white">{status == 'pending' ? 'Accept' : 'Euuu'}</p>
                                </button>
                                <button className={formBtn2}>Decline</button>
                            </> : null
                        }
                        {
                            status === 'accepted' && <button className="bg-gray-400 py-2 px-4 rounded-lg font-medium text-black" onClick={() => changeStatus({ status: 'prepared' })}>Mark as Prepared</button>
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
                    <div className="ml-4 mt-2">
                        <p className="text-lg font-semibold text-sky-400">Order Details</p>
                    </div>
                    <div className="grid items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data?.orderedItems.map(item => (
                            <div className="flex justify-around" key={item?.orderitem_id}>
                                <img src={item?.product?.product_image_1} alt="img" className="w-20 h-20" />
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-lg">{item?.product?.product_name}</p>
                                        <p className="text-xs font-medium text-gray-400">{item?.product?.product_description}</p>
                                    </div>
                                    <p className="text-base font-semibold">Qty: {item?.product_qty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-300 mt-2">
                        <div className="ml-4 mt-2">
                            <p className="text-lg font-semibold text-sky-400">Order Instructions</p>
                            <p className="text-base font-medium p-2">{data?.orderDetails?.order_instruction == null ? 'No Instructions given' : order_instruction}</p>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Orders