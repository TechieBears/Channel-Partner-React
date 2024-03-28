import { ArrowLeft } from 'iconsax-react';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PathName from '../../../components/PathName/PathName';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ImageGallery from '../../../components/Modals/LightBox/ImageGallery';
import userImg from '../../../assets/user.jpg'

function DriverDetail() {
    const location = useLocation();
    const data = location.state;
    console.log("🚀 ~ file: DriverDetail.jsx:12 ~ DriverDetail ~ data:", data)
    let jobTypeString = data?.job_type;
    jobTypeString = jobTypeString.replace(/'/g, '"');
    const JobTypeObject = JSON.parse(jobTypeString);
    let shiftString = data?.shift;
    shiftString = shiftString.replace(/'/g, '"');
    const shiftObject = JSON.parse(shiftString);
    console.log('data = ', data)
    
    const [selectedTab, setSelectedTab] = useState(0);
    const encodedUrl = encodeURIComponent(data?.video_url);
    console.log('encodedUrl = ', encodedUrl)
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
        {
            url: data?.adhar_url,
            title: data?.adhar_url
        },
        {
            url: data?.bank_passbook,
            title: data?.bank_passbook
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
                <div className="px-10 py-4 mx-5 my-2 mt-5 space-y-3 bg-white rounded-xl ">
                    <div className='flex flex-row w-full gap-14'>
                        <div className='w-36 h-36'>
                            <img src={data?.user?.profile_pic == null || data?.user?.profile_pic == '' || data?.user?.profile_pic == undefined || data?.user?.profile_pic.includes('undefined') ? userImg : data?.user?.profile_pic} alt='img' className='object-cover w-full h-full rounded-full' />
                        </div>
                        <div className='flex flex-col justify-evenly'>
                            <div>
                                <h5 className='text-lg font-semibold capitalize font-tbMon'>{data?.user?.first_name} {data?.user?.last_name}</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.email}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>{data?.user?.phone_no}</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.address1}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-4 mx-5 my-2 space-y-3 bg-white rounded-xl'>
                    <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                        <TabList className="flex mx-6 space-x-4 border-b">
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
                                Documents <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-red-500 rounded-full font-tbPop ">{images?.length}</span>
                            </Tab>
                        </TabList>

                        {/* ================= All Details component ============== */}
                        <TabPanel className="py-4 mx-8 my-2 ">
                            <h6 className='pb-3 text-lg font-bold text-black font-tbMon'>Basic Details</h6>
                            <div className="grid grid-cols-5 pb-5 border-b gap-y-8 border-slate-300">
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>User Name</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.first_name} {data?.user?.last_name}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Phone Number</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.phone_no == "" ? '--------' : data?.user?.phone_no}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Pin code</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.pincode == "" ? '--------' : data?.user?.pincode}</h5>
                                </div>
                                {/* <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>designation</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.designation == "" ? '--------' : data?.user?.designation}</h5>
                                </div> */}
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>address</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.address == "" ? '--------' : data?.user?.address}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>address 2</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.address2 == "" ? '--------' : data?.user?.address2}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>city</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.city == "" ? '--------' : data?.user?.city}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>state</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.state == "" ? '--------' : data?.user?.state}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>pincode</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.pincode == 0 ? '--------' : data?.user?.pincode}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>active</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.isactive == true ? 'Active' : 'In-Active'}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>verify</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.isverify ? 'Verified' : 'Not Verified'}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>role</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.role == '' ? '--------' : data?.user?.role}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Driver Rating</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.driver_rating == '' || data?.driver_rating == null || data?.driver_rating == undefined ? 'No rating' : data?.driver_rating}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Driving License</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.driver_license == '' || data?.driver_license == null || data?.driver_license == undefined ? 'No rating' : data?.driver_license}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Vehicle Type</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.vehicle_type == '' || data?.vehicle_type == null || data?.vehicle_type == undefined ? 'No rating' : data?.vehicle_type}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Vehicle RC</h5>
                                    {/* <img src={data?.vehicle_rc == '' || data?.vehicle_rc == null || data?.vehicle_rc == undefined ? 'No rating' : data?.vehicle_rc} alt="" srcset="" /> */}
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.vehicle_rc == '' || data?.vehicle_rc == null || data?.vehicle_rc == undefined ? 'No rating' : data?.vehicle_rc}</h5>
                                </div>
                            </div>
                            <h6 className='pt-3 text-lg font-bold text-black font-tbMon'>Kyc Details</h6>
                            <div className="grid grid-cols-5 pb-5 my-4 border-b gap-y-5 border-slate-300">
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>pan</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.pan_card == '' ? '--------' : data?.pan_card}</h5>
                                </div>
                                {/* <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>gst</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.gst_number == '' || data?.gst_number == null ? '--------' : data?.gst_number}</h5>
                                </div> */}
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Bank</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.bank_name == '' ? '--------' : data?.bank_name}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Bank Account Number</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.account_number == '' ? '--------' : data?.account_number}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>IFSC Number</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.ifsc_code == '' || data?.ifsc_code == undefined || data?.ifsc_code == null ? '--------' : data?.ifsc_code}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Aadhar Card Number</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.adhar_card == '' ? '--------' : data?.adhar_card}</h5>
                                </div>
                            </div>
                            <h6 className='pt-3 text-lg font-bold text-black font-tbMon'>Job Details</h6>
                            <div className="grid grid-cols-5 pb-5 my-4 border-b gap-y-5 border-slate-300">
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Job type</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{JobTypeObject?.title == '' || JobTypeObject?.title == null || JobTypeObject?.title == undefined ? '--------' : JobTypeObject?.title}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Working Hours</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{JobTypeObject?.subTitle == '' || JobTypeObject?.subTitle == null || JobTypeObject?.subTitle == undefined ? '--------' : JobTypeObject?.subTitle}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Shift</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{shiftObject?.title == '' || shiftObject?.title == null || shiftObject?.title == undefined ? '--------' : shiftObject?.title}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Week-Off</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.week_off == '' || data?.week_off == null || data?.week_off == undefined ? '--------' : data?.week_off}</h5>
                                </div>
                            </div>
                            <h6 className='pt-3 text-lg font-bold text-black font-tbMon'>Driver Video</h6>
                            <div className='mt-3'>
                                <video width={500} height={300} controls>
                                    <source src={data?.video_url} type="video/mp4" />
                                    <source src={data?.video_url} type="video/x-m4v" />
                                    <source src={data?.video_url} type="video/*" />
                                </video>
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