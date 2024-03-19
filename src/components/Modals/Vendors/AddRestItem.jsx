import { Dialog, Transition } from '@headlessui/react';
import { Edit } from 'iconsax-react';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addFoodItem, editAdminFinalFood, editFoodItem, getRestaurantCategory, getRestaurantSubCategory } from '../../../api';
import { ImageUpload, restaurantLink } from '../../../env';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import MediaGallaryModal from '../../../pages/Settings/MediaGallery/MediaGallery';


export default function AddRestItem(props) {
    // console.log('props = ', props?.data);
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [FinalPriceSeller, setFinalPriceSeller] = useState([]);
    const [FinalPriceAdmin, setFinalPriceAdmin] = useState([]);
    const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm();
    const user = useSelector((state) => state?.user?.loggedUserDetails);
    const mediaGalleryModalRef = useRef(null);
    const [openGallery, setopenGallery] = useState(false);
    const [openGalleryModal, setopenGalleryModal] = useState(false);
    const [childData, setChildData] = useState([]);

    const categoryField = watch('food_category');
    let subCat;
    if (props?.category && props?.subCategory) {
        subCat = props?.subCategory.filter(cat => cat?.category == categoryField)
    }
    const toggle = () => {
        setOpen(!isOpen)
        setLoader(false)
    }
    const closeBtn = () => {
        toggle();
        reset()
        setChildData([])
        setopenGallery(false);
        setopenGalleryModal(false);
    }

    const handleSelectChange = (e) => {
        if (e.target.value == 'true') {
            setopenGallery(true);
        } else {
            setopenGallery(false);
        }
    };

    const openMediaModal = () => {
        setopenGalleryModal(!openGalleryModal);
    };

    // ============== fetch data from api ================


    const receiveDataFromChild = (data) => {
        // console.log('-- child data --', data);
        setChildData(data);

        if (data) {
            console.log(openGallery)
            setopenGallery(!openGallery);
        }
        // setValue("slide_url", childData);
        // console.log('childData = ', childData)
    };

    const handleImageChange = async (e) => {
        console.log('e', e)
        const file = e.target.files[0];
        const { width, height } = await getImageDimensions(file);

        if (width === 200 && height === 200) {
            console.log('Image dimensions are valid (200x200).');
        } else {
            alert('Please upload an image with dimensions 200x200.');
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 100 * 1024 * 1024) {
            event.target.value = null;
            alert("File size exceeds 100MB limit");
            return;
        }
    };
    const onSellerSubmit = async (data) => {
        console.log('data ==', data)
        if (props?.title != 'Add Item') {      // for edit
            console.log('image edit')
            if (data?.food_image_1?.length > 0) {
                console.log('food image if ')
                await ImageUpload(data?.food_image_1[0], "restaurant", "mainImage", data?.food_name)
                data.food_image_1 = `${restaurantLink}${data?.food_name}_mainImage_${data?.food_image_1[0]?.name}`
            } else {
                if (childData[0]?.media_url) {
                    data.food_image_1 = childData[0]?.media_url
                } else {
                    data.food_image_1 = props?.data?.food_image_1
                }
            }
            if (data?.food_image_2?.length > 0) {
                await ImageUpload(data?.food_image_2[0], "restaurant", "img2", data?.food_name)
                data.food_image_2 = `${restaurantLink}${data?.food_name}_img2_${data?.food_image_2[0]?.name}`
            } else {
                if (childData[1]?.media_url) {
                    data.food_image_2 = childData[1]?.media_url
                } else {
                    data.food_image_2 = props?.data?.food_image_2
                }
            }
            if (data?.food_image_3?.length > 0) {
                await ImageUpload(data?.food_image_3[0], "restaurant", "img3", data?.food_name)
                data.food_image_3 = `${restaurantLink}${data?.food_name}_img3_${data?.food_image_3[0]?.name}`
            } else {
                if (childData[2]?.media_url) {
                    data.food_image_3 = childData[2]?.media_url
                } else {
                    data.food_image_3 = props?.data?.food_image_3
                }
            }
            if (data?.food_image_4?.length > 0) {
                await ImageUpload(data?.food_image_4[0], "restaurant", "img4", data?.food_name)
                data.food_image_4 = `${restaurantLink}${data?.food_name}_img4_${data?.food_image_4[0]?.name}`
            } else {
                if (childData[3]?.media_url) {
                    data.food_image_4 = childData[3]?.media_url
                } else {
                    data.food_image_4 = props?.data?.food_image_4
                }
            }
            if (data?.food_image_5?.length > 0) {
                await ImageUpload(data?.food_image_5[0], "restaurant", "img5", data?.food_name)
                data.food_image_5 = `${restaurantLink}${data?.food_name}_img5_${data?.food_image_5[0]?.name}`
            } else {
                if (childData[4]?.media_url) {
                    data.food_image_5 = childData[4]?.media_url
                } else {
                    data.food_image_5 = props?.data?.food_image_5
                }
            }
            if (data?.food_video_url?.length > 0) {
                await ImageUpload(data?.food_video_url[0], "restaurant", "img5", data?.food_name)
                data.food_video_url = `${restaurantLink}${data?.food_name}_img5_${data?.food_video_url[0]?.name}`
            } else {
                data.food_video_url = props?.data?.food_video_url
            }
        } else {               // for create
            // console.log('image create')
            console.log('childData[0]?.media_url', childData[0]?.media_url)
            if (data?.food_image_1?.length != 0 && (childData[0]?.media_url == undefined || childData[0]?.media_url == '')) {
                await ImageUpload(data?.food_image_1[0], "restaurant", "mainImage", data?.food_name)
                data.food_image_1 = `${restaurantLink}${data?.food_name}_mainImage_${data.food_image_1[0]?.name}`
            } else {
                if (childData[0]?.media_url) {
                    data.food_image_1 = childData[0]?.media_url
                } else {
                    data.food_image_1 = ''
                }
            }
            if (data?.food_image_2?.length != 0 && (childData[1]?.media_url == undefined || childData[1]?.media_url == '')) {
                await ImageUpload(data?.food_image_2[0], "restaurant", "img2", data?.food_name)
                data.food_image_2 = `${restaurantLink}${data?.food_name}_img2_${data.food_image_2[0]?.name}`
            } else {
                if (childData[1]?.media_url) {
                    data.food_image_2 = childData[1]?.media_url
                } else {
                    data.food_image_2 = ''
                }
            }
            if (data?.food_image_3?.length != 0 && (childData[2]?.media_url == undefined || childData[2]?.media_url == '')) {
                await ImageUpload(data?.food_image_3[0], "restaurant", "img3", data?.food_name)
                data.food_image_3 = `${restaurantLink}${data?.food_name}_img3_${data.food_image_3[0]?.name}`
            } else {
                if (childData[2]?.media_url) {
                    data.food_image_3 = childData[2]?.media_url
                } else {
                    data.food_image_3 = ''
                }
            }
            if (data?.food_image_4?.length != 0 && (childData[3]?.media_url == undefined || childData[3]?.media_url == '')) {
                await ImageUpload(data?.food_image_4[0], "restaurant", "img4", data?.food_name)
                data.food_image_4 = `${restaurantLink}${data?.food_name}_img4_${data.food_image_4[0]?.name}`
            } else {
                if (childData[3]?.media_url) {
                    data.food_image_4 = childData[3]?.media_url
                } else {
                    data.food_image_4 = ''
                }
            }
            if (data?.food_image_5?.length != 0 && (childData[4]?.media_url == undefined || childData[4]?.media_url == '')) {
                await ImageUpload(data?.food_image_5[0], "restaurant", "img5", data?.food_name)
                data.food_image_5 = `${restaurantLink}${data?.food_name}_img5_${data.food_image_5[0]?.name}`
            } else {
                if (childData[4]?.media_url) {
                    data.food_image_5 = childData[4]?.media_url
                } else {
                    data.food_image_5 = ''
                }
            }
            if (data?.food_video_url?.length != 0) {
                await ImageUpload(data?.food_video_url[0], "restaurant", "img5", data?.food_name)
                data.food_video_url = `${restaurantLink}${data?.food_name}_img5_${data.food_video_url[0]?.name}`
            } else {
                data.food_video_url = ''
            }
        }
        let updatedData = { ...data, vendor: user?.sellerId }
        if (props?.title != 'Add Item') {
            setLoader(true)
            try {
                editFoodItem(props?.data?.food_id, updatedData).then(res => {
                    if (res?.status == 'success') {
                        toast?.success('Food item updated successfully')
                        props?.getRestFood();
                        toggle();
                        setLoader(false);
                        reset();
                        setopenGallery(false);
                        setopenGalleryModal(false);
                        setChildData([])
                    }
                })
            } catch (error) {
                console.log('error', error);
            }
        } else {
            setLoader(true)
            try {
                addFoodItem(updatedData).then(res => {
                    if (res?.status == 'success') {
                        toast.success('Food Item Added Successfully')
                        props?.getRestFood();
                        toggle();
                        setLoader(false);
                        reset();
                        setopenGallery(false);
                        setopenGalleryModal(false);
                        setChildData([])
                    }
                })
            } catch (error) {
                console.log('error', error);
            }
        }
    }

    const onAdminSubmit = async (data) => {
        var updatedData = { ...data, vendor: props?.data?.vendor?.vendor_id }
        if (updatedData?.final_price != 0 && updatedData?.insta_commison_percentage != '0') {
            try {
                editAdminFinalFood(props?.data?.food_id, updatedData).then(res => {
                    if (res?.status == 'success') {
                        props?.getRestaurantFoodItems();
                        toast.success('Food item updated successfully')
                        toggle();
                    }
                })
            } catch (error) {
                console.log('error', error);
            }
        } else {
            toast.error('Please add markup')
        }
    }

    useEffect(() => {
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
                'food_video_url': props?.row?.food_video_url,
                'food_image_1': props?.row?.food_image_1,
                'food_image_2': props?.row?.food_image_2,
                'food_image_3': props?.row?.food_image_3,
                'food_image_4': props?.row?.food_image_4,
                'food_image_5': props?.row?.food_image_5

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
                    'food_video_url': props?.row?.food_video_url,
                    'food_image_1': props?.row?.food_image_1,
                    'food_image_2': props?.row?.food_image_2,
                    'food_image_3': props?.row?.food_image_3,
                    'food_image_4': props?.row?.food_image_4,
                    'food_image_5': props?.row?.food_image_5
                })
            }
        }
    }, [isOpen])
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
                <button className={`${formBtn1}`} onClick={() => setOpen(true)}>
                    {/* <Add className='text-white' /> */}
                    {props?.title == 'edit' ? 'Edit Item' : "Add Item"}
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
                                        {props?.title == "edit" ? "Edit Food Item" : "Add Item"}
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
                                                            {props?.category?.map(item =>
                                                                <option key={item?.id} value={item?.id}>{item?.category_name}</option>
                                                            )}
                                                        </select>
                                                        {errors.food_category && <Error title='Category is Required*' />}
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
                                                                subCat?.map(item => (
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
                                                                    min={0}
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
                                                            disabled={(user?.role == 'admin')}
                                                            {...register('food_veg_nonveg', { required: true })}
                                                            value={props?.details?.veg_nonveg}
                                                        >
                                                            <option value='' >Select</option>
                                                            <option value='Both'>Both</option>
                                                            <option value='Veg'>Veg</option>
                                                            <option value='Non-Veg'>Non-Veg</option>
                                                            {/* <option value='Veg' selected={props?.details?.veg_nonveg == 'Veg'}>Veg</option> */}
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
                                                            <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                                                                {props?.data.food_video_url?.name}
                                                            </label>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Food Availability*</label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={user?.role != 'admin' ? false : true}
                                                            {...register('food_isactive', { required: true })}
                                                        >
                                                            <option value="">select</option>
                                                            <option value={true}>Available</option>
                                                            <option value={false}>Out of Stock</option>
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
                                                    {user?.role != 'admin' && user?.role != 'franchise' && <div className="">
                                                        <label className={labelClass}>
                                                            Check Image Option*
                                                        </label>
                                                        <select
                                                            name=""
                                                            disabled={user?.role == 'admin' || user?.role == 'franchise'}
                                                            onChange={handleSelectChange}
                                                            className={`${inputClass} !bg-slate-100`}
                                                        >
                                                            <option value="false">I have a own Images</option>
                                                            <option value="true">I Don't have a Images</option>
                                                        </select>
                                                    </div>}
                                                    {openGallery && (
                                                        <div className="w-full mt-3 mb-2">
                                                            <span className={`cursor-pointer w-full ${formBtn1}`} onClick={openMediaModal}>
                                                                Open Sample Images
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="hidden"
                                                            />
                                                            {childData == undefined || childData == '' && (
                                                                <Error title="Main Image is required*" />
                                                            )}
                                                        </div>
                                                    )}

                                                    {!openGallery &&
                                                        <>
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
                                                                    {...register("food_image_1", {
                                                                        required: props.button == 'edit' && (!childData[0]?.media_url || childData[0]?.media_url == '') && !props?.data?.food_image_1
                                                                    })} />
                                                                {props?.button == 'edit' && props?.data?.food_image_1 != '' && props?.data?.food_image_1 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {!childData[0] && props?.data?.food_image_1?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {childData[0]?.media_url?.split('/').pop()}
                                                                </label>
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
                                                                    {...register("food_image_2")} />
                                                                {props?.button == 'edit' && props?.data?.food_image_2 != '' && props?.data?.food_image_2 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {!childData[1] && props?.data?.food_image_2?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {childData[1]?.media_url?.split('/').pop()}
                                                                </label>
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
                                                                {props?.button == 'edit' && props?.data?.food_image_3 != '' && props?.data?.food_image_3 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {!childData[2] && props?.data?.food_image_3?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {childData[2]?.media_url?.split('/').pop()}
                                                                </label>
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
                                                                {props?.button == 'edit' && props?.data?.food_image_4 != '' && props?.data?.food_image_4 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {!childData[3] && props?.data?.food_image_4?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {childData[3]?.media_url?.split('/').pop()}
                                                                </label>
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
                                                                {props?.button == 'edit' && props?.data?.food_image_5 != '' && props?.data?.food_image_5 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {!childData[4] && props?.data?.food_image_5?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 font-tb'>
                                                                    {childData[4]?.media_url?.split('/').pop()}
                                                                </label>
                                                            </div>
                                                        </>}
                                                </div>
                                            </div>
                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Submit</button>}
                                                <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                                            </footer>
                                        </form>
                                        {openGalleryModal && <div className="hidden">
                                            <MediaGallaryModal
                                                ref={mediaGalleryModalRef}
                                                id="mediaGalleryModal"
                                                className="hidden"
                                                title="Upload Image"
                                                imageDetails={props?.ImageDetails}
                                                setopenGalleryModal={openMediaModal}
                                                sendDataToParent={receiveDataFromChild}
                                            />
                                        </div>}
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
