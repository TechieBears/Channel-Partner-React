import { ArrowLeft } from 'iconsax-react';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PathName from '../../../components/PathName/PathName';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ImageGallery from '../../../components/Modals/LightBox/ImageGallery';

function DriverDetail() {
    const location = useLocation();
    const data = location.state;
    console.log('state', data)
    const [selectedTab, setSelectedTab] = useState(0);
    const images = [
        {
            url: data?.fssai_url,
            title: data?.fssai
        },
        {
            url: data?.gst_url,
            title: data?.gst
        },
        {
            url: data?.odoc_url,
            title: data?.odoc
        },
        {
            url: data?.pan_url,
            title: data?.pan
        },
    ].filter(image => image?.url !== undefined && image?.url !== '' && image?.url !== 'No Document Uploaded');
    return (
        <>
            <div className="flex items-center justify-between px-6">
                <button className="flex items-center space-x-1 bg-transparent " onClick={() => window.history.back()}>
                    <ArrowLeft size={25} className='text-black' />
                    <span className='fs-3 base-font-600'>Back</span> </button>
                <div className="">
                    <PathName />
                </div>
            </div>
            <div className='grid xl:grid-cols-1 '>
                <div className="bg-white px-10 py-4 mx-5 my-2 mt-5 rounded-xl space-y-3 ">
                    <div className='flex flex-row gap-14 w-full'>
                        <div className='w-36 h-36'>
                            <img src={data?.user?.profile_pic == null || data?.user?.profile_pic == '' || data?.user?.profile_pic == undefined ? userImg : data?.user?.profile_pic} alt='img' className='w-full h-full rounded-full object-cover' />
                        </div>
                        <div className='flex justify-evenly flex-col'>
                            <div>
                                <h5 className='text-lg font-semibold font-tbMon capitalize'>{data?.user?.first_name} {data?.user?.last_name}</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.email}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>{data?.user?.phone_no}</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.address1}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white  py-4 mx-5 my-2 rounded-xl space-y-3'>
                    <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                        <TabList className="flex space-x-4 border-b mx-6">
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0 ? 'text-sky-400  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                                    }`}
                            >
                                All
                            </Tab>
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1 ? 'text-sky-400  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                                    }`}
                            >
                                Documents <span className="inline-flex items-center justify-center w-6 h-6 font-tbPop text-sm font-semibold text-white bg-red-500  rounded-full  ">{images?.length}</span>
                            </Tab>
                        </TabList>

                        {/* ================= All Details component ============== */}
                        <TabPanel className="mx-8 my-2 py-4 ">
                            <h6 className='text-black font-tbMon text-lg font-bold pb-3'>All Details</h6>
                            <div className="grid grid-cols-5 gap-y-8 border-b border-slate-300 pb-5">
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>Company Name</h5>
                                    {/* <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.comp_name == "" ? '--------' : data?.user?.comp_name}</h5> */}
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>Techie Bears</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>Company Type</h5>
                                    {/* <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.comp_type == "" ? '--------' : data?.user?.comp_type}</h5> */}
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>Developement</h5>
                                </div>
                                {/* <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>designation</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.designation == "" ? '--------' : data?.user?.designation}</h5>
                                </div> */}
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>address</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.address == "" ? '--------' : data?.user?.address}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>address 2</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.address2 == "" ? '--------' : data?.user?.address2}</h5>
                                </div>
                                {/* <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>alternative phone no</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.alt_phone == "" ? '--------' : data?.user?.alt_phone}</h5>
                                </div> */}
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>city</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.city == "" ? '--------' : data?.user?.city}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>state</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.state == "" ? '--------' : data?.user?.state}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>pincode</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.pincode == 0 ? '--------' : data?.user?.pincode}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>landmark</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.landmark == 0 ? '--------' : data?.user?.landmark}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>active</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.isactive == true ? 'Active' : 'In-Active'}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>verify</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.isverify ? 'Verified' : 'Not Verified'}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>role</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.role == '' ? '--------' : data?.user?.role}</h5>
                                </div>
                            </div>
                            <h6 className='text-black font-tbMon text-lg font-bold pt-3'>Kyc Details</h6>
                            <div className="grid grid-cols-5 gap-y-5 my-4">
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>pan</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.pan_card == '' ? '--------' : data?.pan_card}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>gst</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.gst_number == '' || data?.gst_number == null ? '--------' : data?.gst_number}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>fssai</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.fssai == '' ? '--------' : data?.fssai}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>odoc</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.odoc == '' ? '--------' : data?.odoc}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>Bank</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.bank_name == '' ? '--------' : data?.bank_name}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>Bank Account Number</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.account_number == '' ? '--------' : data?.account_number}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>Aadhar Card Number</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.adhar_card == '' ? '--------' : data?.adhar_card}</h5>
                                </div>
                            </div>
                        </TabPanel>
                        {/* ================= Image Gallery component ============== */}
                        <TabPanel className="mx-8 my-2">
                            <ImageGallery images={images} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default DriverDetail