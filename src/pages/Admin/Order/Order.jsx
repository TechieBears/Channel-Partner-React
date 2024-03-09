import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DeleteModal from '../../../components/Modals/DeleteModal/DeleteModal';
import { environment } from '../../../env';
import { setStorageList } from '../../../redux/slices/storageSlice';
import { formBtn1, formBtn2, inputClass } from '../../../utils/CustomClass';

const Order = () => {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [delId, setDelId] = React.useState(0);


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm();

    // ======================== Data submit ===================================
    const onSubmit = async (data) => {
        if (data?.name?.value !== undefined || data?.location != '') {
            let url = `${environment.baseUrl}storage-filter/?name=${data?.name?.value == undefined ? '' : data?.name?.value}&location=${data.location == undefined ? '' : data.location}&user=${user?.role != 'admin' ? user?.userid : ''}`
            await axios.get(url).then((res) => {
                dispatch(setStorageList(res.data))
                toast.success("Filters applied successfully")
            })
        } else {
            toast.warn("No Selected Value !")
        }

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

                    <div className="mt-8">
                        {/* {activeTab === 1 && <p>Content for Tab 1</p>}
                        {activeTab === 2 && <p>Content for Tab 2</p>} */}
                        <div className='grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2'>
                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg " previewlistener="true">
                                <div className="items-center gap-x-3">
                                    <div className='flex flex-wrap justify-between p-4'>
                                        <p className='text-sm'>Order Id -  <span className='text-sky-400'>753</span></p>
                                        <p className='text-sm'>Order Date - <span className='text-base font-semibold text-center text-gray-800'>Jan 1, 2024 , 05:56 PM</span> </p>
                                    </div>
                                    <div className="flex-1 p-4 my-2">
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center justify-between'>
                                                <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                                                <div>
                                                    <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">Butter Milk x 7 more</h2>
                                                    <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">Payment - Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300">Reject</button>
                                            <button type="submit" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg " previewlistener="true">
                                <div className="items-center gap-x-3">
                                    <div className='flex flex-wrap justify-between p-4'>
                                        <p className='text-sm'>Order Id -  <span className='text-sky-400'>753</span></p>
                                        <p className='text-sm'>Order Date - <span className='text-base font-semibold text-center text-gray-800'>Jan 1, 2024 , 05:56 PM</span> </p>
                                    </div>
                                    <div className="flex-1 p-4 my-2">
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center justify-between'>
                                                <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                                                <div>
                                                    <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">Butter Milk x 7 more</h2>
                                                    <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">Payment - Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300">Reject</button>
                                            <button type="submit" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg " previewlistener="true">
                                <div className="items-center gap-x-3">
                                    <div className='flex flex-wrap justify-between p-4'>
                                        <p className='text-sm'>Order Id -  <span className='text-sky-400'>753</span></p>
                                        <p className='text-sm'>Order Date - <span className='text-base font-semibold text-center text-gray-800'>Jan 1, 2024 , 05:56 PM</span> </p>
                                    </div>
                                    <div className="flex-1 p-4 my-2">
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center justify-between'>
                                                <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                                                <div>
                                                    <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">Butter Milk x 7 more</h2>
                                                    <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">Payment - Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300">Reject</button>
                                            <button type="submit" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg " previewlistener="true">
                                <div className="items-center gap-x-3">
                                    <div className='flex flex-wrap justify-between p-4'>
                                        <p className='text-sm'>Order Id -  <span className='text-sky-400'>753</span></p>
                                        <p className='text-sm'>Order Date - <span className='text-base font-semibold text-center text-gray-800'>Jan 1, 2024 , 05:56 PM</span> </p>
                                    </div>
                                    <div className="flex-1 p-4 my-2">
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center justify-between'>
                                                <img className='w-16' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                                                <div>
                                                    <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">Butter Milk x 7 more</h2>
                                                    <p>Lorem ipsum dolor, sit amet </p>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">Payment - Cash</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                        <p className='text-base font-medium'>Order Price - $ 1,000</p>
                                        <div className="flex items-center gap-x-2">
                                            <button type="button" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-gray-800 capitalize transition-colors duration-200 bg-gray-200 rounded-lg font-tb hover:text-black hover:bg-gray-300">Reject</button>
                                            <button type="submit" className="relative block w-full px-4 py-2 overflow-hidden text-base font-semibold tracking-wide text-center text-white capitalize transition-colors duration-200 rounded-lg font-tb bg-sky-400 hover:bg-sky-400">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>

    )
}

export default Order