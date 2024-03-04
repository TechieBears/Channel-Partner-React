import React, { useEffect, useState } from 'react'
import SimpleGallery from '../../../components/Gallary/SimpleGallery'
import Rest1 from '../../../assets/RestaurantImages/Rest1.jpg'
import Rest2 from '../../../assets/RestaurantImages/Rest2.jpg'
import Rest3 from '../../../assets/RestaurantImages/Rest3.jpg'
import Rest4 from '../../../assets/RestaurantImages/Rest4.jpg'
import DashboardForm from '../../../components/modals/DashboardModals/DashboardForm'
import { getSingleRestaurant } from '../../../api'
import { useSelector } from 'react-redux'

export default function RestaurantRegister() {
    const [data, setData] = useState();
    console.log('data', data)
    const User = useSelector((state) => state?.user?.loggedUserDetails);
    console.log('user', User)
    const images = [
        {
            URL: Rest1,
            width: 1500,
            height: 900,
        },
        {
            URL: Rest2,
            width: 1500,
            height: 900,
        },
        {
            URL: Rest3,
            width: 1500,
            height: 900,
        },
        {
            URL: Rest4,
            width: 1500,
            height: 900,
        },
    ].filter(image => image.URL !== '' || image.URL !== null);

    const getDetails = () => {
        getSingleRestaurant(User?.sellerId).then(res => {
            console.log('res', res)
            setData(res)
        })
    }

    useEffect(() => {
        getDetails()
    }, [])

    return (
        <div className='px-5 gap-5'>
            <div className='grid grid-cols-8 gap-x-4'>
                <div className='col-span-6'>
                    <div className='bg-white rounded-xl mt-4 p-2'>
                        <p className='font-semibold text-sky-400 text-xl p-2 '>Restaurant Details</p>
                        <div className='mx-4 grid grid-cols-4 gap-y-4 '>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Name</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.shop_name == null ? 'Registration Pending' : data?.vendor?.shop_name}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Address</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.shop_address == null || data?.Restaurant_address == '' ? 'Registration Pending' : data?.vendor?.shop_address}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Contact</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.shop_contact_number == null || data?.vendor?.shop_contact_number == '' ? 'Registration Pending' : data?.Restaurant_contact_number}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Opening Time</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.shop_start_time == null ? 'Registration Pending' : data?.vendor?.shop_start_time}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Closing Time</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.shop_end_time == null ? 'Registration Pending' : data?.vendor?.shop_end_time}</h5>
                                {/* <h5 className='font-tbPop text-slate-500 capitalize text-sm'>9:00 Pm</h5> */}
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Pincode</h5>
                                {/* <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.pincode}</h5> */}
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>400708</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>State</h5>
                                {/* <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.state}</h5> */}
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>Maharashtra</h5>
                            </div>
                        </div>
                    </div>
                    {/* <div className='bg-white rounded-xl mt-4 p-2'>
                        <p className='font-semibold text-sky-400 text-xl p-2 '>Owner Details</p>
                        <div className='mx-4 grid grid-cols-4 gap-y-4'>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Owner Name</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.first_name} {data?.user?.last_name}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Owner Email</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.email == null || data?.user?.email == '' ? '-----' : data?.user?.email}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Owner Contact</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.phone_no == null || data?.user?.phone_no == '' ? '-----' : data?.user?.phone_no}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Registration Date</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.registration_date}</h5>
                            </div>
                        </div>
                    </div> */}
                    <div className='bg-white rounded-xl mt-4 p-2'>
                        <p className='font-semibold text-sky-400 text-xl p-2 '>Legal Details</p>
                        <div className='mx-4 grid grid-cols-4 gap-y-4'>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Bank Name</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.bank_name == null ? 'Registration Pending' : data?.vendor?.bank_name}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Bank Account Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.account_number == null || data?.vendor?.account_number == '' ? 'Registration Pending' : data?.account_number}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>IFSC Code</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.ifsc_code == null || data?.vendor?.ifsc_code == '' ? 'Registration Pending' : data?.ifsc_code}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Adhar Card Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.adhar_card?.adhar_card == null ? 'Registration Pending' : data?.adhar_card?.adhar_card}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>PAN Card Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.pan_card?.pan_card == null ? 'Registration Pending' : data?.pan_card?.pan_card}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>GST Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.gst_number?.gst_number == null ? 'Registration PEnding' : data?.gst_number?.gst_number}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Commision (%)</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.insta_commison_percentage == null ? "Registration Pending" : data?.vendor?.insta_commison_percentage}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Verifcation by Franchise</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.isverifiedbyfranchise == true ? 'Verfied' : 'Verifcation Pending'}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <DashboardForm dashBoard={true} />
                    </div>
                </div>
                <div className=' col-span-2 bg-white rounded-xl mt-4 p-2'>
                    <p className='font-semibold text-sky-400 text-xl p-2 '>Restaurant Images</p>
                    <SimpleGallery
                        galleryID="my-test-gallery"
                        images={images}
                    />
                </div>
            </div>

        </div>
    )
}
