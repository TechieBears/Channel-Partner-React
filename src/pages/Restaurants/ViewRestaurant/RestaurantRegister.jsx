import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSingleRestaurant } from '../../../api'
import SimpleGallery from '../../../components/Gallary/SimpleGallery'
import DashboardForm from '../../../components/Modals/DashboardModals/DashboardForm'
import moment from 'moment'

export default function RestaurantRegister() {
    const [data, setData] = useState();
    const User = useSelector((state) => state?.user?.loggedUserDetails);
    const images = [
        {
            URL: data?.ambience_image,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.vendor?.shop_image,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.vendor?.adhar_card,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.vendor?.pan_card,
            width: 1500,
            height: 900,
        }
    ].filter(image => image.URL !== '' || image.URL !== null);

    const getDetails = () => {
        try {
            getSingleRestaurant(User?.sellerId).then(res => {
                setData(res)
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        getDetails()
    }, [])

    return (
        <div className='px-5 gap-5'>
            <div className='gap-x-4'>
                <div className='flex justify-end'>
                    <DashboardForm data={data} dashBoard={true} button="edit" getDetails={getDetails} />
                </div>
                <div className=''>
                    <div className='bg-white rounded-xl mt-4 p-2 pb-4'>
                        <p className='font-semibold text-sky-400 text-xl p-2 '>Restaurant Details</p>
                        <div className='mx-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 '>
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
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.shop_contact_number == null || data?.vendor?.shop_contact_number == '' ? 'Registration Pending' : data?.vendor?.shop_contact_number}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Opening Time</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.shop_start_time == null ? 'Registration Pending' : moment(data?.vendor?.shop_start_time, 'HH:mm').local().format('hh:mm A')}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Closing Time</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.shop_end_time == null ? 'Registration Pending' : moment(data?.vendor?.shop_end_time, 'HH:mm').local().format('hh:mm A')}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Pincode</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>400708</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>State</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>Maharashtra</h5>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl mt-4 p-2 pb-4'>
                        <p className='font-semibold text-sky-400 text-xl p-2 '>Legal Details</p>
                        <div className='mx-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4'>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Bank Name</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.bank_name == null ? 'Registration Pending' : data?.vendor?.bank_name}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Bank Account Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.account_number == null || data?.vendor?.account_number == '' ? 'Registration Pending' : data?.vendor?.account_number}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>IFSC Code</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.vendor?.ifsc_code == null || data?.vendor?.ifsc_code == '' ? 'Registration Pending' : data?.vendor?.ifsc_code}</h5>
                            </div>
                            {/* <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Adhar Card Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.adhar_card?.adhar_card == null ? 'Registration Pending' : data?.adhar_card?.adhar_card}</h5>
                            </div> */}
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>PAN Card Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.pan_card?.pan_card == null ? 'Registration Pending' : data?.pan_card?.pan_card}</h5>
                            </div>
                            {/* <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>GST Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.gst_number?.gst_number == null ? 'Registration PEnding' : data?.gst_number?.gst_number}</h5>
                            </div> */}
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
                </div>
                <div className=' bg-white rounded-xl mt-4 p-2'>
                    <p className='font-semibold text-sky-400 text-xl p-2'>Restaurant Images</p>
                    <div className='p-2'>
                        <p className='font-semibold text-lg '>Restaurant Images</p>
                        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2'>
                            {data?.ambience_image != '' && <img src={data?.ambience_image} alt='ambinece_image' />}
                            {data?.vendor?.shop_image != '' && <img src={data?.vendor?.shop_image} alt='shop_image' />}
                        </div>
                    </div>
                    <div className='p-2'>
                        <p className='font-semibold text-lg '>Dish Images</p>
                        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2'>
                            {data?.food_image1 != '' && <img src={data?.food_image1} alt='food_image' />}
                            {data?.food_image2 != '' && <img src={data?.food_image2} alt='food_image' />}
                            {data?.food_image3 != '' && <img src={data?.food_image3} alt='food_image' />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
