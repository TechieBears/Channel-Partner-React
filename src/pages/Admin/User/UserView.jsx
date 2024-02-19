import { ArrowLeft } from 'iconsax-react'
import { useState } from 'react';
import PathName from '../../../components/PathName/PathName'
import { useLocation } from 'react-router-dom'
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs'
import userImg from '../../../assets/user.jpg';
import ImageGallery from '../../../components/Modals/LightBox/ImageGallery'


function UserView() {
    const location = useLocation();
    const data = location.state;
    console.log('data', data);
    const [selectedTab, setSelectedTab] = useState(0);

    // ==================== images array =======================
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
                            <img src={data?.profile == null || data?.profile == '' || data?.profile == undefined ? userImg : data?.profile} alt='img' className='w-full h-full rounded-full object-cover' />
                        </div>
                        <div className='flex justify-evenly flex-col'>
                            <div>
                                <h5 className='text-lg font-semibold font-tbMon capitalize'>{data?.first_name} {data?.last_name}</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.first_name} {data?.email}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>{data?.phone_no}</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.first_name} {data?.address1}</h5>
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
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>gender</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.gender == "" || data?.gender == null || data?.gender == undefined ? '--------' : data?.gender}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>address</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.address == "" ? '--------' : data?.address}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>city</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.city == "" ? '--------' : data?.city}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>state</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.state == "" ? '--------' : data?.state}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>pincode</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.pincode == 0 ? '--------' : data?.pincode}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>active</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.isactive ? 'Active' : 'Deactive'}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>verify</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.isverify ? 'Verified' : 'Not Verified'}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>role</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.role == '' ? '--------' : data?.role}</h5>
                                </div>
                                <div>
                                    <h5 className='font-tbPop text-slate-900 capitalize text-base'>Resgistration Date</h5>
                                    <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.registration_date == '' || data?.registration_date == undefined || data?.registration_date == null ? '--------' : data?.registration_date}</h5>
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

export default UserView