import React, { useEffect, useState } from 'react'
import CoverPic from '../../../assets/RestaurantImages/CoverPic.jpg'
import ProfilePic from '../../../assets/user.jpg'
import { useForm } from 'react-hook-form';
import LoadBox from '../../../components/Loader/LoadBox';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import Error from '../../../components/Errors/Error';

export default function RestaurantDetail() {
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
                <div className=' mt-14 grid grid-cols-5 gap-5'>
                    <div onClick={() => setTab(0)} className={`${tab == 0 ? 'bg-sky-400 text-white' : 'border-sky-400 border-2 text-sky-400'} p-2 text-center cursor-pointer`}>
                        Restaurant Detail
                    </div>
                    <div onClick={() => setTab(1)} className={`${tab == 1 ? 'bg-sky-400 text-white' : 'border-sky-400 border-2 text-sky-400'} p-2 text-center cursor-pointer`}>
                        Food Items
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
                            <div className='border-2 border-gray-200 p-2'>
                                <div className='flex justify-between mx-2'>
                                    <h4 className='font-semibold text-xl'>Personal Info.</h4>
                                    <div className="flex space-x-4">
                                        <h6>Is Recommanded</h6>
                                        <label htmlFor="toogleA" className="flex items-center cursor-pointer" >
                                            <div className="relative">
                                                {/* <!-- input --> */}
                                                <input id="toogleA" type="checkbox" className="sr-only" />
                                                {/* <!-- line --> */}
                                                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                                {/* <!-- dot --> */}
                                                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="p-4 overflow-y-scroll scrollbars " >
                                    <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                        <div className="">
                                            <label className={labelClass}>
                                                Restaurant Name*
                                            </label>
                                            <input
                                                type="text"
                                                placeholder='Restaurant Name'
                                                className={inputClass}
                                                {...register('restaurant_name', { required: true })}
                                            />
                                            {errors.restaurant_name && <Error title='Restaurant Name is Required*' />}
                                        </div>
                                        <div className="">
                                            <label className={labelClass}>
                                                Restaurant Email*
                                            </label>
                                            <input
                                                type="email"
                                                placeholder='Restaurant Email'
                                                className={inputClass}
                                                {...register('restaurant_email', { required: true })}
                                            />
                                            {errors.restaurant_email && <Error title='Restaurant Email is Required*' />}
                                        </div>
                                        <div className="">
                                            <label className={labelClass}>
                                                Restaurant Phone*
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder='Restaurant Phone'
                                                className={inputClass}
                                                {...register('restaurant_phone', { required: true })}
                                            />
                                            {errors.restaurant_phone && <Error title='Restaurant Phone is Required*' />}
                                        </div>
                                        <div className="">
                                            <label className={labelClass}>
                                                Restaurant Address*
                                            </label>
                                            <input
                                                type="text"
                                                placeholder='Restaurant Address'
                                                className={inputClass}
                                                {...register('restaurant_address', { required: true })}
                                            />
                                            {errors.restaurant_address && <Error title='Restaurant Address is Required*' />}
                                        </div>
                                        <div className="">
                                            <label className={labelClass}>
                                                Delivery Mode *
                                            </label>
                                            <select
                                                className={inputClass}
                                                {...register('delivery_mode', { required: true })}
                                            >
                                                <option value=''>Select</option>
                                                <option value='both'>Both</option>
                                                <option value='pickup'>Pick Up</option>
                                                <option value='delivery'>Delivery</option>
                                            </select>
                                            {errors.delivery_mode && <Error title='Delivery Mode is Required*' />}
                                        </div>
                                        <div className="">
                                            <label className={labelClass}>
                                                Admin Delivery Comission (%)*
                                            </label>
                                            <input
                                                type="number"
                                                placeholder='Admin Delivery Comission (%)'
                                                className={inputClass}
                                                {...register('admin_del_commission', { required: true })}
                                            />
                                            {errors.admin_del_commission && <Error title='Admin Delivery Commission is Required*' />}
                                        </div>
                                        <div className="">
                                            <label className={labelClass}>
                                                Admin Pickup Comission (%)*
                                            </label>
                                            <input
                                                type="number"
                                                placeholder='Admin Pickup Comission (%)'
                                                className={inputClass}
                                                {...register('admin_pickup_commission', { required: true })}
                                            />
                                            {errors.admin_pickup_commission && <Error title='Admin Pickup Commission is Required*' />}
                                        </div>
                                        <div className="">
                                            <label className={labelClass}>
                                                License Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder='License Number'
                                                className={inputClass}
                                                {...register('license_number',)}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='border-2 border-gray-200 p-4'>
                                <h4 className='text-xl font-semibold'>Delivery Area</h4>
                                <p className='text-sm'>Enter a Radius from store's central location in which you want to deliver. </p>
                                <div className='bg-sky-100 p-4 space-y-2 '>
                                    <div className='grid grid-cols-6'>
                                        <div className=" col-span-5 flex items-center gap-10">
                                            <label className='text-lg font-bold'>
                                                Enter Delivery Radius(KM)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder='Enter Delivery Radius(KM)'
                                                className={`${inputClass} w-1/4`}
                                                {...register('radius',)}
                                            />
                                        </div>
                                        <button className={`${formBtn1}`}>View On Map</button>
                                    </div>
                                    <p className='text-xs'>Note: Your Restaurant will serve within the radius you enter</p>
                                </div>
                            </div>
                            <footer className="py-2 flex justify-start px-4 space-x-3">
                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Submit</button>}
                                {/* <button type='button' className={formBtn2} onClick={closeBtn}>close</button> */}
                            </footer>
                        </form>
                    </>
                }
            </div>
        </>
    )
}
