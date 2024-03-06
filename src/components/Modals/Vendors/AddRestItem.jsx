import { Dialog, Transition } from '@headlessui/react'
import { Add, Edit } from 'iconsax-react'
import React, { useState, Fragment, useEffect } from 'react'
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass'
// import { CloseButton } from 'react-toastify/dist/components';
import { useForm } from 'react-hook-form';
import LoadBox from '../../Loader/LoadBox';
import { useSelector } from 'react-redux';
import { addFoodItem, addRestaurant, editFoodItem, editRestaurantFood, getCategory, getRestaurantCategory, getRestaurantSubCategory, getSubCategory, editAdminFinalFood } from '../../../api';
import { ImageUpload, restaurantLink } from '../../../env';
import { toast } from 'react-toastify';

export default function AddRestItem(props) {
    console.log('props = ', props)
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setsubCategory] = useState([])
    const [FinalPriceSeller, setFinalPriceSeller] = useState([]);
    const [FinalPriceAdmin, setFinalPriceAdmin] = useState([]);
    const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm();
    const user = useSelector((state) => state?.user?.loggedUserDetails);
    const toggle = () => setOpen(!isOpen)
    const closeBtn = () => {
        toggle();
        reset();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 100 * 1024 * 1024) {
            event.target.value = null;
            alert("File size exceeds 100MB limit");
            return;
        }
    };
    const onSellerSubmit = async (data) => {
        if (props?.button == 'edit') {      // for edit
            // console.log('image edit')
            if (data?.food_image_1 != props?.data?.food_image_1) {
                await ImageUpload(data?.food_image_1[0], "restaurant", "mainImage", data?.food_name)
                data.food_image_1 = `${restaurantLink}${data?.food_name}_mainImage_${data?.food_image_1[0]?.name}`
            } else {
                data.food_image_1 = props?.data?.food_image_1
            }
            if (data?.food_image_2 != props?.data?.food_image_2) {
                console.log('img 2 called');
                await ImageUpload(data?.food_image_2[0], "restaurant", "img2", data?.food_name)
                data.food_image_2 = `${restaurantLink}${data?.food_name}_img2_${data?.food_image_2[0]?.name}`
            } else {
                data.food_image_2 = props?.data?.food_image_2
            }
            if (data?.food_image_3 != props?.data?.food_image_3) {
                await ImageUpload(data?.food_image_3[0], "restaurant", "img3", data?.food_name)
                data.food_image_3 = `${restaurantLink}${data?.food_name}_img3_${data?.food_image_3[0]?.name}`
            } else {
                data.food_image_3 = props?.data?.food_image_3
            }
            if (data?.food_image_4 != props?.data?.food_image_4) {
                await ImageUpload(data?.food_image_4[0], "restaurant", "img4", data?.food_name)
                data.food_image_4 = `${restaurantLink}${data?.food_name}_img4_${data?.food_image_4[0]?.name}`
            } else {
                data.food_image_4 = props?.data?.food_image_4
            }
            if (data?.food_image_5 != props?.data?.food_image_5) {
                await ImageUpload(data?.food_image_5[0], "restaurant", "img5", data?.food_name)
                data.food_image_5 = `${restaurantLink}${data?.food_name}_img5_${data?.food_image_5[0]?.name}`
            } else {
                data.food_image_5 = props?.data?.food_image_5
            }
            if (data?.food_video_url != props?.data?.food_video_url) {
                await ImageUpload(data?.food_video_url[0], "restaurant", "img5", data?.food_name)
                data.food_video_url = `${restaurantLink}${data?.food_name}_img5_${data?.food_video_url[0]?.name}`
            } else {
                data.food_video_url = props?.data?.food_video_url
            }
        } else {               // for create
            // console.log('image create')
            if (data.food_image_1.length != 0) {
                await ImageUpload(data.food_image_1[0], "restaurant", "mainImage", data?.food_name)
                data.food_image_1 = `${restaurantLink}${data?.food_name}_mainImage_${data.food_image_1[0]?.name}`
            } else {
                data.food_image_1 = ''
            }
            if (data.food_image_2.length != 0) {
                await ImageUpload(data.food_image_2[0], "restaurant", "img2", data?.food_name)
                data.food_image_2 = `${restaurantLink}${data?.food_name}_img2_${data.food_image_2[0]?.name}`
            } else {
                data.food_image_2 = ''
            }
            if (data.food_image_3.length != 0) {
                await ImageUpload(data.food_image_3[0], "restaurant", "img3", data?.food_name)
                data.food_image_3 = `${restaurantLink}${data?.food_name}_img3_${data.food_image_3[0]?.name}`
            } else {
                data.food_image_3 = ''
            }
            if (data.food_image_4.length != 0) {
                await ImageUpload(data.food_image_4[0], "restaurant", "img4", data?.food_name)
                data.food_image_4 = `${restaurantLink}${data?.food_name}_img4_${data.food_image_4[0]?.name}`
            } else {
                data.food_image_4 = ''
            }
            if (data.food_image_5.length != 0) {
                await ImageUpload(data.food_image_5[0], "restaurant", "img5", data?.food_name)
                data.food_image_5 = `${restaurantLink}${data?.food_name}_img5_${data.food_image_5[0]?.name}`
            } else {
                data.food_image_5 = ''
            }
            if (data.food_video_url.length != 0) {
                await ImageUpload(data.food_video_url[0], "restaurant", "img5", data?.food_name)
                data.food_video_url = `${restaurantLink}${data?.food_name}_img5_${data.food_video_url[0]?.name}`
            } else {
                data.food_video_url = ''
            }
        }
        let updatedData = { ...data, vendor: user?.sellerId }
        if (props?.button == 'edit') {
            console.log('in function edit')
            editFoodItem(props?.data?.food_id, updatedData).then(res => {
                if (res?.status == 'success') {
                    toast?.success('Food item updated successfully')
                    props?.getRestFood()
                    toggle();
                }
            })
        } else {
            addFoodItem(updatedData).then(res => {
                if (res?.status == 'success') {
                    toast.success('Food Item Added Successfully')
                    props?.getRestFood()
                    toggle()
                }
            })
        }
    }

    const onAdminSubmit = async (data) => {
        var updatedData = { ...data, vendor: props?.data?.vendor?.vendor_id }
        editAdminFinalFood(props?.data?.food_id, updatedData).then(res => {
            if (res?.status == 'success') {
                props?.getRestaurantFoodItems();
                toast.success('Food item updated successfully')
                toggle();
            }
        })
    }

    useEffect(() => {
        getRestaurantCategory().then(res => {
            setCategory(res)
        })
        getRestaurantSubCategory().then(res => {
            setsubCategory(res)
        })
        if (user?.role == 'admin') {
            reset({
                'food_name': props?.data?.food_name,
                'food_category': props?.data?.food_category?.id,
                'food_subcategory': props?.data?.food_subcategory?.subcat_id,
                'food_actual_price': props?.data?.food_actual_price,
                'insta_commison_percentage': props?.data?.vendor?.insta_commison_percentage,
                'markup_percentage': props?.data?.markup_percentage,
                'food_details': props?.data?.food_details,
                'food_isactive': props?.data?.food_isactive,
                'food_veg_nonveg': props?.data?.food_veg_nonveg,
                'menu_type': props?.data?.menu_type,
            })
        } else {
            if (props?.button == 'edit') {
                reset({
                    'food_name': props?.data.food_name,
                    'food_category': props?.data.food_category?.id,
                    'food_subcategory': props?.data.food_subcategory?.subcat_id,
                    'food_actual_price': props?.data.food_actual_price,
                    'insta_commison_percentage': props?.data.vendor?.insta_commison_percentage,
                    'markup_percentage': props?.data.markup_percentage,
                    'food_details': props?.data.food_details,
                    'food_isactive': props?.data.food_isactive,
                    'food_veg_nonveg': props?.data.food_veg_nonveg,
                    'menu_type': props?.data?.menu_type,
                })
            }
        }
    }, [])



    //  ------------   Seller Calculations SetPrice --------------------------------
    // const calculateRevenueRestaurant = watch('food_actual_price')

    // useEffect(() => {
    //     if (user?.role == 'admin') {
    //         if (calculateRevenueRestaurant !== "") {
    //             var mainUserPrice = calculateRevenueRestaurant * (props?.data.vendor?.insta_commison_percentage == null ? 0 : props?.row?.vendor?.insta_commison_percentage / 100);
    //             console.log('mainUserPrice = ', (calculateRevenueRestaurant - mainUserPrice));
    //             const final_price = (calculateRevenueRestaurant - mainUserPrice);

    //             if (isNaN(final_price)) {
    //                 setValue('product_revenue', 0);
    //             } else {
    //                 setFinalPriceSeller(parseFloat(final_price));
    //                 setValue('product_revenue', final_price);
    //             }
    //         }
    //     }
    // }, [calculateRevenueRestaurant])





    //  ------------   Seller Calculations SetPrice --------------------------------
    const calculateRevenueRestaurant = watch('food_actual_price')

    useEffect(() => {
        if (user?.role == 'seller') {
            if (calculateRevenueRestaurant !== "") {
                var mainUserPrice = calculateRevenueRestaurant * (user?.insta_commission == null ? 0 : user?.insta_commission / 100);
                const final_price = (calculateRevenueRestaurant - mainUserPrice);

                if (isNaN(final_price)) {
                    setValue('food_revenue', 0);
                } else {
                    setFinalPriceSeller(parseFloat(final_price));
                    setValue('food_revenue', final_price);
                }
            }
        }
    }, [calculateRevenueRestaurant])



        //  ------------   Admin Calculations Set Final Price to User  --------------------------------
        const calculateRevenueAdmin = watch('markup_percentage')

        useEffect(() => {
            if (user?.role == 'admin') {
                if (calculateRevenueAdmin !== "") {
                    var mainPrice = (props?.data?.food_actual_price == null ? 0 : props?.data?.food_actual_price) * (calculateRevenueAdmin / 100);
                    var adminfinalprice = props?.data?.food_actual_price + mainPrice;
                    setFinalPriceAdmin(adminfinalprice);
                    setValue('final_price', adminfinalprice?.toFixed(0));
                }
            }
        }, [calculateRevenueAdmin])

    return (
        <>
            {props?.title == 'edit' ?
                <button className='items-center p-1 bg-yellow-100 rounded-xl hover:bg-yellow-200' onClick={() => setOpen(true)}>
                    <Edit size={24} className='text-yellow-400' />
                </button> :
                <button className={`${formBtn1} flex`} onClick={() => setOpen(true)}>
                    {/* <Add className='text-white' /> */}
                    {props?.title == 'edit' ? 'Edit Food Item' : "Add Food Item"}
                </button>}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={() => toggle}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-scroll ">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-6xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">

                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        {props?.title == "edit" ? "Edit Food Item" : "Add Food Item"}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={user?.role == 'admin' ? handleSubmit(onAdminSubmit) : handleSubmit(onSellerSubmit)}>
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-3 customBox">
                                                    <p className='text-xl font-semibold md:col-span-1 lg:col-span-4'>Basic Information</p>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Food Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly={user?.role != 'admin' ? false : true}
                                                            placeholder='Food Name'
                                                            className={inputClass}
                                                            {...register('food_name', { required: true })}
                                                        />
                                                        {errors.food_name && <Error title='Food Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Food Category*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            {...register('food_category', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            {category?.map(item =>
                                                                <option key={item?.id} value={item?.id}>{item?.category_name}</option>
                                                            )}
                                                        </select>
                                                        {errors.good_category && <Error title='Category is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Food Sub-Category*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            {...register('food_subcategory', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            {
                                                                subCategory?.map(item => (
                                                                    <option key={item?.subcat_id} value={item?.subcat_id} >{item?.subcat_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {errors.food_subcategory && <Error title='Sub Category is Required*' />}
                                                    </div>
                                                    {user?.role == 'seller' &&
                                                        <>
                                                            <div className="">
                                                                <label className={labelClass}>
                                                                    Food MRP*
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    placeholder='Food MRP'
                                                                    step={1}
                                                                    min={1}
                                                                    className={inputClass}
                                                                    {...register('food_actual_price', { required: true })}
                                                                />
                                                                {errors.food_actual_price && <Error title='MRP is Required*' />}
                                                            </div>
                                                            {/* <div className="">
                                                                <label className={labelClass}>
                                                                    Item Revenue*
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    readOnly
                                                                    placeholder='₹ 0.00'
                                                                    className={inputClass}
                                                                    {...register('food_revenue')}
                                                                />
                                                            </div> */}
                                                        </>
                                                    }
                                                    {
                                                        user?.role == 'admin' &&
                                                        <>
                                                            <p className='text-xl font-semibold md:col-span-1 lg:col-span-4'>Price Calculation</p>
                                                            <div className="">
                                                                <label className={labelClass}>
                                                                    Food MRP*
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    readOnly
                                                                    placeholder='Food MRP'
                                                                    className={inputClass}
                                                                    {...register('food_actual_price', { required: true })}
                                                                />
                                                                {errors.food_actual_price && <Error title='MRP is Required*' />}
                                                            </div>
                                                            <div className="">
                                                                <label className={labelClass}>
                                                                    Restaurant Commision*
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    readOnly
                                                                    placeholder=''
                                                                    className={inputClass}
                                                                    {...register('insta_commison_percentage', { required: true })} />
                                                                {errors.insta_commison_percentage && <Error title='Country of Origin is Required*' />}
                                                            </div><div className="">
                                                                <label className={labelClass}>
                                                                    Markup (in %)*
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    placeholder='0.00'
                                                                    className={inputClass}
                                                                    {...register('markup_percentage', { required: true })} />
                                                                {errors.markup_percentage && <Error title='Markup Percentage is required*' />}
                                                            </div><div className="">
                                                                <label className={labelClass}>
                                                                    Product Final Price* <span className='text-red-500'>(App View)</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    readOnly
                                                                    placeholder='₹ 0.00'
                                                                    className={inputClass}
                                                                    {...register('final_price', { required: true })} />
                                                                {errors.final_price && <Error title='Product Final Price is required*' />}
                                                            </div>
                                                        </>
                                                    }

                                                    <p className='text-xl font-semibold md:col-span-1 lg:col-span-4'>Additional Information</p>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Food Details*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly={user?.role != 'admin' ? false : true}
                                                            placeholder='Food Details'
                                                            className={inputClass}
                                                            {...register('food_details', { required: true })}
                                                        />
                                                        {errors.food_details && <Error title='Food Details is Required*' />}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Veg or Non-Veg*</label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            {...register('food_veg_nonveg', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='Both'>Both</option>
                                                            <option value='Veg'>Veg</option>
                                                            <option value='Non-Veg'>Non-Veg</option>
                                                        </select>
                                                        {errors?.food_veg_nonveg && <Error title='This is required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="video_input">Food Video</label>
                                                        <input
                                                            className={fileinput}
                                                            id="video_input"
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            type='file'
                                                            accept='video/mp4,video/x-m4v,video/*'
                                                            placeholder='Upload Video...'
                                                            {...register("food_video_url")}
                                                            onChange={handleFileChange}
                                                        />
                                                        {props?.button === 'edit' && props?.data.food_video_url && (
                                                            <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                                {props?.data.food_video_url?.name}
                                                            </label>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Is Active*</label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            {...register('food_isactive', { required: true })}
                                                        >
                                                            <option value="">select</option>
                                                            <option value={true}>Active</option>
                                                            <option value={false}>In-Active</option>
                                                        </select>
                                                        {errors?.food_isactive && <Error title='This is required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Menu Type*
                                                        </label>
                                                        <select
                                                            name="menu"
                                                            className={`${inputClass}`}
                                                            {...register("menu_type", { required: true })}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Bestseller">Best Seller</option>
                                                            <option value="New">New</option>
                                                        </select>
                                                        {errors?.menu_type && <Error title='Menu Type is required' />}
                                                    </div>
                                                    {
                                                        user?.role == 'seller' &&
                                                        <div className="">
                                                            <label className={labelClass}>
                                                                Food Revenue*
                                                            </label>
                                                            <input
                                                                type="text"
                                                                readOnly
                                                                placeholder='₹ 0.00'
                                                                className={inputClass}
                                                                {...register('food_revenue')}
                                                            />
                                                        </div>
                                                    }
                                                    <p className='text-xl font-semibold md:col-span-1 lg:col-span-4'>Food Images</p>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Main Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            // multiple
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            // onChange={(e) => handleImageChange(e)}
                                                            {...register("food_image_1",
                                                                { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data?.food_image_1 != '' && props?.data?.food_image_1 != undefined && <label className='block mb-1 font-medium text-blue-800 text-sm font-tb'>
                                                            {props?.data?.food_image_1?.split('/').pop()}
                                                        </label>}
                                                        {errors.food_image_1 && <Error title='Main Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 2</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            // multiple
                                                            disabled={user?.role == 'admin' ? true : false}
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("food_image_2",
                                                                { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data?.food_image_2 != '' && props?.data?.food_image_2 != undefined && <label className='block mb-1 font-medium text-blue-800 text-sm font-tb'>
                                                            {props?.data?.food_image_2?.split('/').pop()}
                                                        </label>}
                                                        {errors.food_image_2 && <Error title='Main Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 3</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            // multiple
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("food_image_3")} />
                                                        {props?.button == 'edit' && props?.data?.food_image_3 != '' && props?.data?.food_image_3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-sm font-tb'>
                                                            {props?.data?.food_image_3?.split('/').pop()}
                                                        </label>}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 4</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            // multiple
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("food_image_4")} />
                                                        {props?.button == 'edit' && props?.data?.food_image_4 != '' && props?.data?.food_image_4 != undefined && <label className='block mb-1 font-medium text-blue-800 text-sm font-tb'>
                                                            {props?.data?.food_image_4?.split('/').pop()}
                                                        </label>}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 5</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            // multiple
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("food_image_5")} />
                                                        {props?.button == 'edit' && props?.data?.food_image_5 != '' && props?.data?.food_image_5 != undefined && <label className='block mb-1 font-medium text-blue-800 text-sm font-tb'>
                                                            {props?.data?.food_image_5?.split('/').pop()}
                                                        </label>}
                                                    </div>
                                                </div>
                                            </div>
                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Submit</button>}
                                                <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                                            </footer>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}
