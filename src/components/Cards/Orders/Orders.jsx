import { ArrowDown2, ArrowUp2, User } from 'iconsax-react'
import { IndianRupeeIcon } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { formBtn2 } from '../../../utils/CustomClass'

function Orders({ data }) {
    const [status, setstatus] = useState('pending')
    const [details, setDetails] = useState(false)

    const changeStatus = ({ status }) => {
        console.log('status', status)
        setstatus(status)
        toast.success(`Order Statsus changes to ${status}`)
    }

    return (
        <>
            {data.map(product => (
                <div className="border-slate-200 border-2 p-2 rounded-lg bg-white ">
                    <div className=" grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 gap-4 " key={product?.orderId}>
                        <div className="space-y-1 items-center flex flex-col justify-start">
                            <div className="flex gap-2">
                                <p className="font-semibold">Order ID</p>
                                <p className="text-sky-400">#{product?.orderId}</p>
                            </div>
                            <p className="text-xs font-light">{moment(product?.order_details?.order_created_at).format('LLL')}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <User variant="Bold" size={18} />
                            <p className="font-semibold">{product?.orderedItems[0]?.user?.first_name} {product?.orderedItems[0]?.user?.last_name}</p>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <div className={`${status == 'pending' ? 'bg-red-500' : status == 'accepted' ? 'bg-yellow-500' : 'bg-green-500'} p-2 font-sans rounded-full w-1 h-1/4`} />
                            <p className={`font-semibold font-san ${status == 'pending' ? 'text-red-500' : status == 'accepted' ? 'text-yellow-500' : 'text-green-500'}`}>{status == 'pending' ? 'Pending' : status == 'accepted' ? 'Preparing' : 'Prepared'}</p>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            {status == 'pending' ?
                                <>
                                    <button className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-lg font-medium" onClick={() => changeStatus({ status: 'accepted' })}>
                                        <p className="text-white ">{product?.order_details?.order_delivery_status == 'placed' ? 'Accecpt' : 'Euuu'}</p>
                                    </button>
                                    <button className={formBtn2}>Decline</button>
                                </> : null
                            }
                            {
                                status == 'accepted' && <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg font-medium" onClick={() => changeStatus({ status: 'prepared' })}>Mark as prepared</button>
                            }
                            {
                                status == 'prepared' && <button className="bg-black py-2 px-4 rounded-lg font-medium text-white" onClick={() => changeStatus({ status: 'pending' })}>Mark as Picked-up</button>
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
                    {
                        details && <div className=" mt-4 border-t-2">
                            <div className="ml-4 mt-2">
                                <p className="text-lg font-semibold text-sky-400">Order Details</p>
                            </div>
                            <div className=" grid items-center sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {
                                    product?.orderedItems?.map(item => (
                                        <div className="flex justify-around">
                                            <img src={item?.product?.product_image_1} alt="img" className="w-20 h-20" />
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col ">
                                                    <p className="font-semibold text-lg">{item?.product?.product_name}</p>
                                                    <p className="text-xs font-medium text-gray-400">{item?.product?.product_description}</p>
                                                </div>
                                                <p className="text-base font-semibold ">Qty: {item?.product_qty}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="border-t border-slate-300 mt-2">
                                <div className="ml-4 mt-2">
                                    <p className="text-lg font-semibold text-sky-400">Order Instuction's</p>
                                    <p className="text-base font-medium p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos veritatis impedit tempore provident laudantium quasi itaque distinctio suscipit ipsam, necessitatibus ab expedita dolore qui dicta odio quo vero repudiandae reprehenderit pariatur! Facere odio fugit veniam, ab alias at vitae et voluptatibus quos voluptate assumenda officia omnis accusamus, nobis obcaecati voluptas dolore tenetur quis consequuntur sit nesciunt maxime. Suscipit, consectetur sint?</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            ))}
        </>
    )
}

export default Orders