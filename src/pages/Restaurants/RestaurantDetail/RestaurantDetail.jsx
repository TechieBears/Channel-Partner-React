import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-react';
import SimpleGallery from '../../../components/Gallary/SimpleGallery';
import moment from 'moment';

export default function RestaurantDetail() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate()
    const images = [
        // {
        //     URL: data?.created_by?.profile_pic,
        //     width: 1500,
        //     height: 900,
        // },
        // {
        //     URL: data?.ambience_image,
        //     width: 1500,
        //     height: 900,
        // },
        {
            URL: data?.shop_image,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.pan_card,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.adhar_card,
            width: 1500,
            height: 900,
        },
    ].filter(image => image.URL !== '' || image.URL !== null || image.URL.includes('undefined'));

    console.log('data = ', data)
    return (
        <div className='gap-5 px-5'>
            <button className='flex' onClick={() => navigate(-1)}>
                <ArrowLeft /> Back
            </button>
            <div className='grid grid-cols-8 gap-x-4'>
                <div className='col-span-6'>
                    <div className='p-2 mt-4 bg-white rounded-xl'>
                        <p className='p-2 text-xl font-semibold text-sky-400 '>Restaurant Details</p>
                        <div className='grid grid-cols-4 mx-4 mt-4 gap-y-4'>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Restaurant Name</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_name == null ? 'Registration Pending' : data?.shop_name}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Restaurant Address</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_address == null || data?.shop_address == '' ? 'Registration Pending' : data?.shop_address}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Restaurant Contact</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_contact_number == null || data?.shop_contact_number == '' ? 'Registration Pending' : data?.shop_contact_number}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Restaurant Opening Time</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_start_time == null ? 'Registration Pending' : moment(data?.shop_start_time, 'HH:mm').local().format('hh:mm A')}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Restaurant Closing Time</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_end_time == null ? 'Registration Pending' : moment(data?.shop_start_time, 'HH:mm').local().format('hh:mm A')}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Restaurant Pincode</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.pincode}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>State</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.state}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 mt-4 bg-white rounded-xl'>
                        <p className='p-2 text-xl font-semibold text-sky-400 '>Owner Details</p>
                        <div className='grid grid-cols-4 mx-4 mt-4 gap-y-4'>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Owner Name</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.first_name} {data?.user?.last_name}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Owner Email</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.email == null || data?.user?.email == '' ? '-----' : data?.user?.email}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Owner Contact</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.phone_no == null || data?.user?.phone_no == '' ? '-----' : data?.user?.phone_no}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Registration Date</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.user?.registration_date}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 mt-4 bg-white rounded-xl'>
                        <p className='p-2 text-xl font-semibold text-sky-400 '>Legal Details</p>
                        <div className='grid grid-cols-4 mx-4 mt-4 gap-y-4'>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Bank Name</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.bank_name == null ? 'Registration Pending' : data?.bank_name}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Bank Account Number</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.account_number == null || data?.account_number == '' ? 'Registration Pending' : data?.account_number}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>IFSC Code</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.ifsc_code == null || data?.ifsc_code == '' ? 'Registration Pending' : data?.ifsc_code}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>GST Number</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.gst_number == null ? 'Registration Pending' : data?.gst_number}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Commision (%)</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.insta_commison_percentage == null ? "Registration Pending" : data?.insta_commison_percentage}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Verifcation by Franchise</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.isverifiedbyfranchise == true ? 'Verfied' : 'Verifcation Pending'}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 p-2 mt-4 bg-white rounded-xl'>
                    <SimpleGallery
                        galleryID="my-test-gallery"
                        images={images}
                    />
                </div>
            </div>
        </div>
    )
}
