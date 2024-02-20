import React, { useEffect, useState } from 'react'
import CoverPic from '../../../assets/RestaurantImages/CoverPic.jpg'
import ProfilePic from '../../../assets/user.jpg'
import { useForm } from 'react-hook-form';
import LoadBox from '../../../components/Loader/LoadBox';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import Error from '../../../components/Errors/Error';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Star1 } from 'iconsax-react';
import { MultiSelect } from 'primereact/multiselect';
import Switch from 'react-switch'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

export default function RestaurantDetail() {
    const [tab, setTab] = useState(0);
    const location = useLocation();
    const data = location.state;
    console.log('data====================', data)
    const [loader, setLoader] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [mondayOn, setMondayOn] = useState(true);
    const [tuesdayOn, setTuesdayOn] = useState(true);
    const [wedenesdayOn, setWedenesdayOn] = useState(true);
    const [thursdayOn, setThursdayOn] = useState(true);
    const [fridayOn, setFridayOn] = useState(true);
    const [saturdyaOn, setSaturdyaOn] = useState(true);
    const [sundayOn, setSundayOn] = useState(true);
    const [isRecommanded, setIsRecommanded] = useState(true);
    const categories = ['Asian', 'Mexican', 'Italian', 'Russian cussion', 'Spanish', 'Comfort', 'American', 'North Indian', 'South Indian']
    const ratings = [
        {
            'id': 1,
            'name': 'Naveen',
            'date': 'Jan, 11, 2024',
            'rating': '3'
        },
        {
            'id': 2,
            'name': 'Vijay',
            'date': 'Jan, 10, 2024',
            'rating': '3.5'
        },
        {
            'id': 3,
            'name': 'Shubham',
            'date': 'Jan, 11, 2024',
            'rating': '2.3'
        },
        {
            'id': 4,
            'name': 'Vishal',
            'date': 'Jan, 11, 2024',
            'rating': '1'
        },
        {
            'id': 5,
            'name': 'Sai',
            'date': 'Jan, 11, 2024',
            'rating': '4.2'
        },
    ]
    const navigate = useNavigate()
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
                <button className='absolute flex mt-4 text-white border-2 rounded-full left-3' onClick={() => navigate(-1)}>
                    <ArrowLeft className='text-white' /> Back
                </button>
                <img src={CoverPic} className='w-full h-60' alt='cover-pic' />
                <img src={ProfilePic} alt='profile-pic' className='absolute w-1/12 border-4 rounded-full border-sky-400 left-14 bottom-1 top-44' />
            </div>
            <div className='p-4 space-y-4'>
                <div className='mt-14'>
                    <Tabs selectedIndex={tab} onSelect={index => setTab(index)} >
                        <TabList className="flex mx-6 space-x-4 border-b">
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${tab === 0 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                                    }`}
                            >
                                Restaurant Detail
                            </Tab>
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${tab === 1 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                                    }`}
                            >
                                Food Items
                            </Tab>
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${tab === 2 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                                    }`}
                            >
                                Rating and Reviews
                            </Tab>
                        </TabList>
                        {/* ================= Category component ============== */}
                        <TabPanel className='mt-5' >
                            <>
                                <div className='space-y-4' >
                                    <div className='p-2 border-2 border-gray-200'>
                                        <div className='flex justify-between mx-2 mt-2'>
                                            <h4 className='text-xl font-semibold'>Restaurant Info.</h4>
                                            <div>
                                                <div className="flex items-center space-x-4">
                                                    <h6>Is Recommanded</h6>
                                                    <Switch checked={isRecommanded} onChange={() => setIsRecommanded(!isRecommanded)} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-4">
                                                    <h6>Is Active</h6>
                                                    <Switch checked={data?.is_activated} onChange={() => setIsRecommanded(!isRecommanded)} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-4">
                                                    <h6>Is Verified</h6>
                                                    <Switch checked={data?.is_verified} onChange={() => setIsRecommanded(!isRecommanded)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 overflow-y-scroll scrollbars " >
                                            <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Restaurant Name*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.shop_name}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Restaurant Email*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.email}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Restaurant Phone*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.phone_no}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Restaurant Address*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.address}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        City*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.city}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        State*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.state}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        PIN Code*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.pincode}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Opening Time*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.shop_start_time}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Closing Time*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.shop_end_time}</h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='p-2 border-2 border-gray-200'>
                                        <div className="p-4 overflow-y-scroll scrollbars " >
                                            <h4 className='text-xl font-semibold'>Banking Info.</h4>
                                            <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        GST Number*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.gst_number}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Bank Name*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.bank_name}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Account Number*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.account_number}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        IFSC Code*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.ifsc_code}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        PAN Card*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.pan_card}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Aadhar Card*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.adhar_card}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </TabPanel>
                        {/* ================= SubCategory component ============== */}
                        <TabPanel className='mt-5' >
                            <>
                                <button className={`${formBtn1}`} >Assign Categories</button>
                                <div className='grid grid-cols-2 gap-10'>
                                    <div>
                                        <label className={labelClass}>
                                            Categories
                                        </label>
                                        <select
                                            className={`${inputClass}`}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            <option value=''>Select</option>
                                            <option value='Asian'>Asian</option>
                                            <option value='Mexican'>Mexican</option>
                                            <option value='Italian'>Italian</option>
                                            <option value='Russian Cuisine'>Russian Cuisine</option>
                                            <option value='Sushi'>Sushi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>
                                            {selectedCategory != '' ? selectedCategory : 'Sub-category'}
                                        </label>
                                        <MultiSelect
                                            value={selectedSubCategory}
                                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                                            options={categories}
                                            placeholder='Select Category'
                                            maxSelectedLabels={3}
                                            className={`w-full`}
                                        />
                                    </div>
                                </div>
                            </>
                        </TabPanel>
                        {/* ================= Product component ============== */}
                        <TabPanel className='mt-5'>
                            <>
                                <div className='p-2 overflow-hidden bg-white rounded-lg '>
                                    {
                                        ratings.map((rating) => (
                                            <div key={rating?.id} className='flex items-center p-4 my-4 space-x-3 border-2 border-gray-200 rounded-xl'>
                                                <img src={ProfilePic} alt='user-img' className='w-16 h-16 rounded-full' />
                                                <div>
                                                    <p className='text-lg font-semibold'>{rating?.name}</p>
                                                    <p className='text-sm font-light'>{rating?.date}</p>
                                                    <p className='flex gap-2 text-sm font-light'><Star1 className='text-sm ' size={18} variant='Bold' color='#38bdf8' />{rating?.rating}</p>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </>
                        </TabPanel>
                        <TabPanel>
                            <>
                                <div className='p-2 overflow-hidden bg-white rounded-lg '>
                                    <div className='p-2 border-2 border-gray-300 rounded-lg'>
                                        <form>
                                            <div className='grid grid-cols-4 gap-5'>
                                                <div className="col-span-3">
                                                    <label className={labelClass}>
                                                        Preparation Time*
                                                    </label>
                                                    <input
                                                        type="time"
                                                        placeholder='Preparation Time'
                                                        className={`${inputClass} w-10`}
                                                        {...register('preparation_time', { required: true })}
                                                    />
                                                    {errors.preparation_time && <Error title='Preparation Time is Required*' />}
                                                </div>
                                                <div className="col-span-2">
                                                    <label className={labelClass}>
                                                        Minimum Delivery Time*
                                                    </label>
                                                    <input
                                                        type="time"
                                                        placeholder='Preparation Time'
                                                        className={`${inputClass} w-10`}

                                                        {...register('preparation_time', { required: true })}
                                                    />
                                                    {errors.preparation_time && <Error title='Preparation Time is Required*' />}
                                                </div>
                                                <div className="col-span-2">
                                                    <label className={labelClass}>
                                                        Maximum Delivery Time*
                                                    </label>
                                                    <input
                                                        type="time"
                                                        placeholder='Preparation Time'
                                                        className={`${inputClass} w-10`}
                                                        {...register('preparation_time', { required: true })}
                                                    />
                                                    {errors.preparation_time && <Error title='Preparation Time is Required*' />}
                                                </div>
                                            </div>
                                            <div className='mt-5 '>
                                                <p>Set Time Slot</p>
                                                <div className='p-4 space-y-5 border-2 border-gray-300 rounded-lg '>
                                                    <div className='grid items-center grid-cols-5 gap-10 '>
                                                        <label className={labelClass}>
                                                            Monday
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('monday_in_time', { required: true })}
                                                        />
                                                        <p>to</p>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('monday_out_time', { required: true })}
                                                        />
                                                        <Switch checked={mondayOn} onColor='#38bdf8' onChange={() => setMondayOn(!mondayOn)} />
                                                    </div>
                                                    <div className='grid items-center grid-cols-5 gap-10'>
                                                        <label className={labelClass}>
                                                            Tuesday
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('tuesday_in_time', { required: true })}
                                                        />
                                                        <p>to</p>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('tuesday_out_time', { required: true })}
                                                        />
                                                        <Switch checked={tuesdayOn} onColor='#38bdf8' onChange={() => setTuesdayOn(!tuesdayOn)} />
                                                    </div>
                                                    <div className='grid items-center grid-cols-5 gap-10'>
                                                        <label className={labelClass}>
                                                            Wedenesday
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('wed_in_time', { required: true })}
                                                        />
                                                        <p>to</p>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('wed_out_time', { required: true })}
                                                        />
                                                        <Switch checked={wedenesdayOn} onColor='#38bdf8' onChange={() => setWedenesdayOn(!wedenesdayOn)} />
                                                    </div>
                                                    <div className='grid items-center grid-cols-5 gap-10'>
                                                        <label className={labelClass}>
                                                            Thursday
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('thrs_in_time', { required: true })}
                                                        />
                                                        <p>to</p>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('thrs_out_time', { required: true })}
                                                        />
                                                        <Switch checked={thursdayOn} onColor='#38bdf8' onChange={() => setThursdayOn(!thursdayOn)} />
                                                    </div>
                                                    <div className='grid items-center grid-cols-5 gap-10'>
                                                        <label className={labelClass}>
                                                            Friday
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('friday_in_time', { required: true })}
                                                        />
                                                        <p>to</p>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('friday_out_time', { required: true })}
                                                        />
                                                        <Switch checked={fridayOn} onColor='#38bdf8' onChange={() => setFridayOn(!fridayOn)} />
                                                    </div>
                                                    <div className='grid items-center grid-cols-5 gap-10'>
                                                        <label className={labelClass}>
                                                            Saturday
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('saturday_in_time', { required: true })}
                                                        />
                                                        <p>to</p>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('saturday_out_time', { required: true })}
                                                        />
                                                        <Switch checked={saturdyaOn} onColor='#38bdf8' onChange={() => setSaturdyaOn(!saturdyaOn)} />
                                                    </div>
                                                    <div className='grid items-center grid-cols-5 gap-10'>
                                                        <label className={labelClass}>
                                                            Sunday
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('sunday_in_time', { required: true })}
                                                        />
                                                        <p>to</p>
                                                        <input
                                                            type="time"
                                                            placeholder='Preparation Time'
                                                            className={`${inputClass} w-10`}
                                                            {...register('sunday_out_time', { required: true })}
                                                        />
                                                        <Switch checked={sundayOn} onColor='#38bdf8' onChange={() => setSaturdyaOn(!saturdyaOn)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
