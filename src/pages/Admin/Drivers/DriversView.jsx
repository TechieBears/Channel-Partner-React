import React, { useEffect, useState } from 'react'
import CoverPic from '../../../assets/RestaurantImages/CoverPic.jpg'
import ProfilePic from '../../../assets/user.jpg'
import { useForm } from 'react-hook-form';
import LoadBox from '../../../components/Loader/LoadBox';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import Error from '../../../components/Errors/Error';

export default function DriversView() {
    const [tab, setTab] = useState(0);
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const closeBtn = () => {
        toggle();
        reset()
    }
    const onSubmit = (data) => {
        console.log('data', data)
    }
    return (
        <>
            <div className='relative'>
                <img src={CoverPic} className='h-60 w-full' alt='cover-pic' />
                <img src={ProfilePic} alt='profile-pic' className='absolute w-1/12 border-4 border-sky-400 left-14 bottom-1 top-44 rounded-full' />
            </div>
            <div className='p-4 space-y-4'>
                <div className=' mt-14 grid md:grid-cols-1 lg:grid-cols-5 gap-5'>
                    <div onClick={() => setTab(0)} className={`${tab == 0 ? 'bg-sky-400 text-white' : 'border-sky-400 border-2 text-sky-400'} p-2 text-center cursor-pointer`}>
                        Personal Information
                    </div>

                    <div onClick={() => setTab(2)} className={`${tab == 2 ? 'bg-sky-400 text-white' : 'border-sky-400 border-2 text-sky-400'} p-2 text-center cursor-pointer`}>
                        Ratings and Reviews
                    </div>
                    <div onClick={() => setTab(3)} className={`${tab == 3 ? 'bg-sky-400 text-white' : 'border-sky-400 border-2 text-sky-400'} p-2 text-center cursor-pointer`}>
                        Configuration
                    </div>
                </div>
                {
                    tab == 0 && <>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' >
                            <div className='p-2'>
                                <div className='flex justify-between mx-2'>
                                    <h4 className='font-semibold text-xl'>Personal Info.</h4>
                                </div>
                                <div className="p-4 overflow-y-scroll scrollbars " >
                                    <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                        <div className="border-2 p-5">
                                            <div className='flex justify-between space-y-5'>
                                                <p>Name:</p>
                                                <p>Naveen</p>
                                            </div>
                                            <div className='flex justify-between space-y-5'>
                                                <p>Email:</p>
                                                <p>info@deliciousbites.com</p>
                                            </div>
                                            <div className='flex justify-between space-y-5'>
                                                <p>Occupation</p>
                                                <p>NA</p>
                                            </div>
                                            <div className='flex justify-between space-y-5'>
                                                <p>Address</p>
                                                <p>123 Main Street, Cityville</p>
                                            </div>
                                            <div className='flex justify-between space-y-5'>
                                                <p>Alternate Phone Number</p>
                                                <p>999999999</p>
                                            </div>
                                            <div className='flex justify-between space-y-5'>
                                                <p>Pin Code</p>
                                                <p>421302</p>
                                            </div>
                                            <div className='flex justify-between space-y-5'>
                                                <p>City</p>
                                                <p>Bhiwandi</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </>
                }
            </div>
        </>
    )
}
