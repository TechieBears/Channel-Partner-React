import { ArrowLeft } from 'iconsax-react'
import { useEffect, useState } from 'react';
import PathName from '../../../components/PathName/PathName'
import { useLocation } from 'react-router-dom'
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs'
import userImg from '../../../assets/user.jpg';
import ImageGallery from '../../../components/Modals/LightBox/ImageGallery'
import Table from '../../../components/table/Table';

import { Link } from 'react-router-dom';
import { Eye } from 'iconsax-react';
import axios from 'axios';
import { environment } from '../../../env';
import { AddWalletAmt } from '../../../components/Modals/WalletModal/AddWalletAmt';
import PriceFormater from '../../../utils/PriceFormater';

function UserView() {
    const location = useLocation();
    const data = location.state;
    const [selectedTab, setSelectedTab] = useState(0);
    const [walletData, setWalletData] = useState();

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

    const amountData = (rowData) => {
        return (
            <h6 className={`${Math.sign(rowData?.amount) === 1 ? "text-green-500" : "text-red-500"}`}>
                {/* {<PriceFormater price={rowData?.amount}/>} */}
                {rowData?.amount}
            </h6>
        )
    }

    const columns = [
        { field: "trans_id", header: "Transaction Id", style: true },
        { field: "trans_time", header: "Date & Time", style: true },
        // { field: "user", header: "User", style: true, sortable: true },
        // { field: "transaction_log", header: "Transaction Log", style: true, sortable: true },
        { field: "amount", header: "Amount", style: true, sortable: true, body: amountData },
        { field: "transaction_status", header: "Status", style: true, sortable: true },
    ]

    const getWalletDetails = async () => {
        try {
            const url = `${environment.baseUrl}app/list_wallet_transaction?user=${data?.id}`;
            await axios.get(url).then((res) => {
                setWalletData(res?.data)
            }).catch((err) => {
                console.log("🚀 ~ file: UserView.jsx:74 ~ awaitaxios.get ~ err:", err)
            })
        } catch (err) {
            console.log("🚀 ~ file: UserView.jsx:87 ~ getWalletDetails ~ err:", err)
        }
    }

    useEffect(() => {
        getWalletDetails()
    }, [data])

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
                            <img src={data?.profile == null || data?.profile == '' || data?.profile == undefined ? userImg : data?.profile} alt='img' className='object-cover w-full h-full rounded-full' />
                        </div>
                        <div className='grid grid-cols-2 pb-5 gap-8'>
                            <div>
                                <h5 className='text-lg font-semibold capitalize font-tbMon'>{data?.first_name} {data?.last_name}</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.first_name} {data?.email}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>{data?.phone_no}</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.first_name} {data?.address1}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Total Amount</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{walletData?.total_balance?.amount__sum}</h5>
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
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>gender</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.gender == "" || data?.gender == null || data?.gender == undefined ? '--------' : data?.gender}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>address</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.address == "" ? '--------' : data?.address}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>city</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.city == "" ? '--------' : data?.city}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>state</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.state == "" ? '--------' : data?.state}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>pincode</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.pincode == 0 ? '--------' : data?.pincode}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>active</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.isactive ? 'Active' : 'Deactive'}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>verify</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.isverify ? 'Verified' : 'Not Verified'}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>role</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.role == '' ? '--------' : data?.role}</h5>
                                </div>
                                <div>
                                    <h5 className='text-base capitalize font-tbPop text-slate-900'>Resgistration Date</h5>
                                    <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.registration_date == '' || data?.registration_date == undefined || data?.registration_date == null ? '--------' : data?.registration_date}</h5>
                                </div>
                            </div>
                        </TabPanel>
                        {/* ================= Image Gallery component ============== */}
                        <TabPanel className="mx-8 my-2">
                            <ImageGallery images={images} />
                        </TabPanel>
                    </Tabs>
                </div>
                <div className='py-8 px-8 mx-5 my-2 space-y-3 bg-white rounded-xl'>
                    <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
                        <div className="">
                            <h1 className='text-xl font-semibold text-gray-900 font-tbPop'>Wallet Details</h1>
                        </div>
                        <AddWalletAmt title='Add Amount' userData={data} />

                    </div>
                    {
                        <Table data={walletData?.transaction_log} columns={columns} />
                    }


                </div>
            </div>
        </>
    )
}

export default UserView