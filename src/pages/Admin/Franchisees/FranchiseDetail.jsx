import { ArrowLeft } from 'iconsax-react'
import { useState } from 'react';
import PathName from '../../../components/PathName/PathName'
import { useLocation } from 'react-router-dom'
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs'
import userImg from '../../../assets/user.jpg';
import ImageGallery from '../../../components/Modals/LightBox/ImageGallery'

export default function FranchiseDetail() {
    const location = useLocation();
    const data = location.state;
    console.log('state', data)
    const [selectedTab, setSelectedTab] = useState(0);
    const images = [
        {
            url: data?.adhar_url,
            title: 'Adhar Card'
        },
        {
            url: data?.pan_url,
            title: 'PAN Card'
        },
        {
            url: data?.gst_url,
            title: 'GST Certificate'
        },
        // {
        //     url: data?.fssai_url,
        //     title: data?.fssai
        // },
        // {
        //     url: data?.odoc_url,
        //     title: data?.odoc
        // },
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
                            <img src={data?.user?.profile_pic == null || data?.user?.profile_pic == '' || data?.user?.profile_pic == undefined ? userImg : data?.user?.profile_pic} alt='img' className='object-cover w-full h-full rounded-full' />
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
                            <h6 className='pb-3 text-lg font-bold text-black font-tbMon'>All Details</h6>
                            <div className="grid grid-cols-5 pb-5 border-b gap-y-8 border-slate-300">
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>address</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.address == "" ? '--------' : data?.user?.address}</h5>
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
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.isverified_byadmin == true ? 'Verified' : 'Not Verified'}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>role</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.role == '' ? '--------' : data?.user?.role}</h5>
                                </div>
                            </div>
                            <h6 className='pt-3 text-lg font-bold text-black font-tbMon'>Kyc Details</h6>
                            <div className="grid grid-cols-5 my-4 gap-y-5">
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>pan</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.pan_card == '' ? '--------' : data?.pan_card}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>gst</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.gst_number == '' || data?.gst_number == null ? '--------' : data?.gst_number}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Bank</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.bank_name == '' ? '--------' : data?.bank_name}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Bank Account Number</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.account_number == '' ? '--------' : data?.account_number}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Aadhar Card Number</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.adhar_card == '' ? '--------' : data?.adhar_card}</h5>
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
