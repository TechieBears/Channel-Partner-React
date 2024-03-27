import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-react';
import SimpleGallery from '../../Gallary/SimpleGallery';

export default function VendorDetails() {
    const [tab, setTab] = useState(0);
    const location = useLocation();
    const data = location.state;
    console.log('dataaaaaaaaaaaaaa', data)
    const images = [
        {
            URL: data?.user?.profile_pic,
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
    const navigate = useNavigate()
    return (
        <div className='gap-5 px-5'>
            <button className='flex' onClick={() => navigate(-1)}>
                <ArrowLeft /> Back
            </button>
            <div className='grid grid-cols-8 gap-x-4'>
                <div className='col-span-6'>
                    <div className='p-2 mt-4 bg-white rounded-xl'>
                        <p className='p-2 text-xl font-semibold text-sky-400 '>Shop Details</p>
                        <div className='grid grid-cols-4 mx-4 mt-4 gap-y-4'>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Shop Name</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_name}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Shop Address</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_address == null || data?.shop_address == '' ? '-----' : data?.shop_address}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Shop Contact</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_contact_number == null || data?.shop_contact_number == '' ? '-----' : data?.shop_contact_number}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Shop Opening Time</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_start_time}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Shop Closing Time</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_end_time}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Shop Pincode</h5>
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
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Shop Closing Time</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.shop_end_time}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='p-2 mt-4 bg-white rounded-xl'>
                        <p className='p-2 text-xl font-semibold text-sky-400 '>Legal Details</p>
                        <div className='grid grid-cols-4 mx-4 mt-4 gap-y-4'>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Bank Name</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.bank_name}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Bank Account Number</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.account_number == null || data?.account_number == '' ? '-----' : data?.account_number}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>IFSC Code</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.ifsc_code == null || data?.ifsc_code == '' ? '-----' : data?.ifsc_code}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Adhar Card Number</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.adhar_card}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>PAN Card Number</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.pan_card}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>GST Number</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.gst_number ? data?.gst_number : '-----'}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Commision (%)</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.insta_commison_percentage}</h5>
                            </div>
                            <div>
                                <h5 className='text-base capitalize font-tbPop text-slate-900'>Verifcation by Franchise</h5>
                                <h5 className='text-sm capitalize font-tbPop text-slate-500'>{data?.isverifiedbyfranchise == true ? 'Verified' : 'Verification Pending'}</h5>
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
