import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-react';
import SimpleGallery from '../../../components/Gallary/SimpleGallery';

export default function RestaurantDetail() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate()
    const images = [
        {
            URL: data?.profile_pic,
            width: 15,
            height: 9,
        },
        {
            URL: data?.address_proof,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.bank_passbook,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.hawker_shop_photo,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.shop_image,
            width: 1500,
            height: 900,
        },
    ].filter(image => image.URL !== '' || image.URL !== null);
    return (
        <div className='px-5 gap-5'>
            <button className='flex' onClick={() => navigate(-1)}>
                <ArrowLeft /> Back
            </button>
            <div className='grid grid-cols-8 gap-x-4'>
                <div className='col-span-6'>
                    <div className='bg-white rounded-xl mt-4 p-2'>
                        <p className='font-semibold text-sky-400 text-xl p-2 '>Restaurant Details</p>
                        <div className='mx-4 grid grid-cols-4 gap-y-4 mt-4'>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Name</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.Restaurant_name == null ? 'Registration Pending' : data?.Restaurant_name}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Address</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.Restaurant_address == null || data?.Restaurant_address == '' ? 'Registration Pending' : data?.Restaurant_address}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Contact</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.Restaurant_contact_number == null || data?.Restaurant_contact_number == '' ? 'Registration Pending' : data?.Restaurant_contact_number}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Opening Time</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.Restaurant_start_time == null ? 'Registration Pending' : data?.Restaurant_start_time}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Closing Time</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.Restaurant_end_time == null ? 'Registration Pending' : data?.Restaurant_end_time}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Restaurant Pincode</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.pincode}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>State</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.user?.state}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl mt-4 p-2'>
                        <p className='font-semibold text-sky-400 text-xl p-2 '>Owner Details</p>
                        <div className='mx-4 grid grid-cols-4 gap-y-4 mt-4'>
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
                    </div>
                    <div className='bg-white rounded-xl mt-4 p-2'>
                        <p className='font-semibold text-sky-400 text-xl p-2 '>Legal Details</p>
                        <div className='mx-4 grid grid-cols-4 gap-y-4 mt-4'>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Bank Name</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.bank_name == null ? 'Registration Pending' : data?.bank_name}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Bank Account Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.account_number == null || data?.account_number == '' ? 'Registration Pending' : data?.account_number}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>IFSC Code</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.ifsc_code == null || data?.ifsc_code == '' ? 'Registration Pending' : data?.ifsc_code}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Adhar Card Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.adhar_card == null ? 'Registration Pending' : data?.adhar_card}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>PAN Card Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.pan_card == null ? 'Registration Pending' : data?.pan_card}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>GST Number</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.gst_number == null ? 'Registration PEnding' : data?.gst_number}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Commision (%)</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.insta_commison_percentage == null ? "Registration Pending" : data?.insta_commison_percentage}</h5>
                            </div>
                            <div>
                                <h5 className='font-tbPop text-slate-900 capitalize text-base'>Verifcation by Franchise</h5>
                                <h5 className='font-tbPop text-slate-500 capitalize text-sm'>{data?.isverifiedbyfranchise == true ? 'Verfied' : 'Verifcation Pending'}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' col-span-2 bg-white rounded-xl mt-4 p-2'>
                    <SimpleGallery
                        galleryID="my-test-gallery"
                        images={images}
                    />
                </div>
            </div>
        </div>
    )
}
