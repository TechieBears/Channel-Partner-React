import React, { useEffect, useState } from 'react'
// import CoverPic from '../../assets/VendorImages/CoverPic.jpg'
import CoverPic from '../../../assets/RestaurantImages/COverPic.jpg'
import ProfilePic from '../../../assets/user.jpg'
import { useForm } from 'react-hook-form';
import LoadBox from '../../../components/Loader/LoadBox';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import Error from '../../../components/Errors/Error';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Star1, Trash } from 'iconsax-react';
import { MultiSelect } from 'primereact/multiselect';
import Switch from 'react-switch'
import { getCategory } from '../../../api';
import Table from '../../Table/Table';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

export default function VendorDetails() {
    const [tab, setTab] = useState(0);
    const [loader, setLoader] = useState(false);
    const [products, setProducts] = useState([]);
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
    const location = useLocation();
    const data = location.state;
    console.log('dataaaaaaaaaaaaaa', data)
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
    const actionBodyTemplate = (row) => <div className="flex items-center gap-2">
        {/* <CategoryForm button='edit' title='Edit Movable Category' data={row} /> */}
        <button onClick={() => deleteData(row.id)} className="bg-red-100  px-1.5 py-2 rounded-sm"><Trash size="20" className='text-red-500' /></button>
    </div>

    const imageBodyTemp = (row) => <div className='w-20 h-20'>
        <img src={row?.category_image} alt="image" className='object-cover w-full h-full' />
    </div>

    // ================= columns of the table ===============
    const columns = [
        { field: 'category_image', header: 'Image', body: imageBodyTemp, style: true },
        { field: 'category_name', header: 'Name', body: (row) => <NavLink><h6 className='hover:underline hover:text-sky-400'>{row?.category_name}</h6> </NavLink> },
        { field: 'id', header: 'Action', body: actionBodyTemplate, sortable: true },
    ];
    const navigate = useNavigate()
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const closeBtn = () => {
        toggle();
        reset()
    }
    const onSubmit = (data) => {
        console.log('data', data)
    }
    useEffect(() => {
        getCategory().then((res) => {
            setProducts(res)
        })
    }, [])
    return (
        <>
            <div className='relative'>
                <button className='absolute flex mt-4 text-white border-2 rounded-full left-3' onClick={() => navigate(-1)}>
                    <ArrowLeft className='text-white' /> Back
                </button>
                <img src={CoverPic} className='w-full h-60' alt='cover-pic' />
                <img src={data?.user?.profile_pic == null || data?.user?.profile_pic == undefined || data?.user?.profile_pic == '' ? ProfilePic : data?.user?.profile_pic } alt='profile-pic' className='absolute w-1/12 border-4 rounded-full border-sky-400 left-14 bottom-1 top-44' />
            </div>
            <div className='p-4 space-y-4'>
                <div className='my-10'>
                    <Tabs
                        selectedIndex={tab}
                        onSelect={(index) => setTab(index)}
                    >
                        <TabList className="flex mx-6 space-x-4 border-b">
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${tab === 0
                                    ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                    : "text-gray-500 border-b"
                                    }`}
                            >
                                Vendor Detail
                            </Tab>
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${tab === 1
                                    ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                    : "text-gray-500 border-b"
                                    }`}
                            >
                                Food Items
                            </Tab>
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${tab === 2
                                    ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                    : "text-gray-500 border-b"
                                    }`}
                            >
                                Ratings and Reviews
                            </Tab>
                            {/* <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${tab === 3
                                    ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                    : "text-gray-500 border-b"
                                    }`}
                            >
                                Configuration
                            </Tab> */}
                        </TabList>
                        {/* ================= Vendor Details component ============== */}
                        <TabPanel>
                            <div className='mt-5'>
                                <div className='space-y-4' >
                                    <div className='p-2 border-2 border-gray-200'>
                                        <div className='flex justify-between mx-2'>
                                            <h4 className='text-xl font-semibold'>Personal Info.</h4>
                                        </div>
                                        <div className="p-4 overflow-y-scroll scrollbars " >
                                            <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Vendor ISB Code*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.isb_code}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Vendor Name*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.first_name} {data?.user?.last_name}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Vendor Email*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.email}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Vendor Phone*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.phone_no}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Vendor Address*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.address}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        PAN*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.pan_card}</h3>
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
                                                        Bank Account Number*
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
                                                        GST Number*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.gst_number}</h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='p-2 border-2 border-gray-200'>
                                        <div className='grid grid-cols-4 mx-2 mt-2'>
                                            <h4 className='text-xl font-semibold'>Shop Info.</h4>
                                            <div className="flex items-center space-x-4">
                                                <h6>Is Recommanded</h6>
                                                <Switch checked={isRecommanded} onChange={() => setIsRecommanded(!isRecommanded)} />
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <h6>Is Verified</h6>
                                                <Switch checked={data?.is_verified} onChange={() => setIsRecommanded(!isRecommanded)} />
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <h6>Is Active</h6>
                                                <Switch checked={data?.is_activated} onChange={() => setIsRecommanded(!isRecommanded)} />
                                            </div>
                                        </div>

                                        <div className="p-4 overflow-y-scroll scrollbars " >
                                            <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Shop Name*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.shop_name}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Shop Opening Time*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.shop_start_time}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Shop Closing Time*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.shop_end_time}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Shop Email*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.email}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Vendor Phone*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.phone_no}</h3>
                                                </div>
                                                <div className="">
                                                    <label className={labelClass}>
                                                        Vendor Address*
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.user?.address}</h3>
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
                                                       Fssai License Number
                                                    </label>
                                                    <h3
                                                        className={inputClass}
                                                    >{data?.fssai_license == null || data?.fssai_license == undefined || data?.fssai_license == '' ? '-----' : data?.fssai_license }</h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='p-4 border-2 border-gray-200'>
                                        <h4 className='text-xl font-semibold'>Delivery Area</h4>
                                        <p className='text-sm'>Enter a Radius from store's central location in which you want to deliver. </p>
                                        <div className='p-4 space-y-2 bg-sky-100 '>
                                            <div className='grid grid-cols-6'>
                                                <div className="grid items-center grid-cols-5 col-span-5 gap-10 ">
                                                    <label className='text-lg font-bold'>
                                                        Enter Delivery Radius(KM)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='Enter Delivery Radius(KM)'
                                                        className={`${inputClass} colsp`}
                                                        {...register('radius',)}
                                                    />
                                                </div>
                                                <button className={`${formBtn1}`}>View On Map</button>
                                            </div>
                                            <p className='text-xs'>Note: Your Vendor will serve within the radius you enter</p>
                                        </div>
                                    </div>
                                    <footer className="flex justify-start px-4 py-2 space-x-3">
                                        {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Submit</button>}
                                        {/* <button type='button' className={formBtn2} onClick={closeBtn}>close</button> */}
                                    </footer>
                                </div>
                            </div>
                        </TabPanel>
                        {/* ================= Food Items component ============== */}
                        <TabPanel>
                            <div className='mt-5'>
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
                                <div className='bg-white'>
                                    <Table columns={columns} data={products} />
                                </div>
                            </div>
                        </TabPanel>
                        {/* ================= Rating and Reviews component ============== */}
                        <TabPanel>
                            <div className='mt-5'>
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
                            </div>
                        </TabPanel>
                        {/* ================= Configuration component ============== */}
                        {/* <TabPanel>
                            <div className='mt-5'>
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
                            </div>
                        </TabPanel> */}
                    </Tabs>
                </div>
            </div>
        </>
    )
}
