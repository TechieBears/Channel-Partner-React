import { Fragment, useEffect, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../Errors/Error';
import { Add, Edit } from 'iconsax-react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import { addProduct, editVendorProduct, editAdminFinalProduct, getCategory, getSubCategory, getGalleryImages } from '../../../api';
import { toast } from 'react-toastify';
import { ImageUpload, productLink } from '../../../env';
import MediaGallaryModal from '../../../pages/Settings/MediaGallery/MediaGallery';
import { DatePicker, Space } from "antd";
import moment from "moment";



const AddProduct = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [FinalPriceSeller, setFinalPriceSeller] = useState([]);
    const [FinalPriceAdmin, setFinalPriceAdmin] = useState([]);
    const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm();
    const toggle = () => setOpen(!isOpen)
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const mediaGalleryModalRef = useRef(null);
    const [openGallery, setopenGallery] = useState(false);
    const [openGalleryModal, setopenGalleryModal] = useState(false);
    const [childData, setChildData] = useState([]);
    const [checkExpiry, setCheckExpiry] = useState('');
    const [expireValue, setexpireValue] = useState('');

    let CatField = watch('product_category');
    let subCatField
    if (props?.category && props?.subCategory) {
        subCatField = props?.subCategory.filter(item => item?.category == CatField);
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


    // ========== Date picker =================================
    const disabledDate = current => {
        return current && current < moment().startOf('day');
    };
    
    const rangeHandler = (e) => {
        setexpireValue(e.format("YYYY-MM-DD"))
    }

    const checkexpiryinput = (e) => {
        setexpireValue(e.target.value)
    }

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

    const selectExpiryOption = (e) => {
        if (e.target.value == 'selectdate') {
            setCheckExpiry('selectdate');
        } else {
            setCheckExpiry('other');
        }
    }

    const calculateRevenueSeller = watch('product_actual_price')

    useEffect(() => {
        if (LoggedUserDetails?.role == 'seller') {
            if (calculateRevenueSeller !== "") {
                var mainUserPrice = calculateRevenueSeller * (LoggedUserDetails?.insta_commission == null ? 0 : LoggedUserDetails?.insta_commission / 100);
                const final_price = (calculateRevenueSeller - mainUserPrice);

                if (isNaN(final_price)) {
                    setValue('product_revenue', 0);
                } else {
                    setFinalPriceSeller(parseFloat(final_price));
                    setValue('product_revenue', final_price);
                }
            }
        }
        setTimeout(() => {
            setValue('product_image_1', childData[0]?.media_url)
            setValue('product_image_2', childData[1]?.media_url)
            setValue('product_image_3', childData[2]?.media_url)
            setValue('product_image_4', childData[3]?.media_url)
            setValue('product_image_5', childData[4]?.media_url)
        }, 2000);


    }, [calculateRevenueSeller])



    //  ------------   Admin Calculations Set Final Price to User  --------------------------------
    const calculateRevenueAdmin = watch('markup_percentage')

    useEffect(() => {
        if (LoggedUserDetails?.role == 'admin') {
            if (calculateRevenueAdmin !== "") {
                var mainPrice = (props?.row?.product_actual_price == null ? 0 : props?.row?.product_actual_price) * (calculateRevenueAdmin / 100);
                var adminfinalprice = props?.row?.product_actual_price + mainPrice;
                setFinalPriceAdmin(adminfinalprice);
                setValue('final_price', adminfinalprice?.toFixed(0));
            }
        }
    }, [calculateRevenueAdmin])



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 100 * 1024 * 1024) {
            event.target.value = null;
            alert("File size exceeds 100MB limit");
            return;
        }
    };

    const onSellerSubmit = async (data) => {
        if(expireValue != '' && expireValue){
            data.product_shelflife =  expireValue;
        }
        setLoader(true);
        if (props?.title == 'Edit Product') {
            if (data?.product_image_1?.length > 0) {
                await ImageUpload(data?.product_image_1[0], "shopProduct", "MainImage", data?.product_name)
                data.product_image_1 = `${productLink}${data?.product_name}_MainImage_${data?.product_image_1[0]?.name}`
            } else {
                if (childData[0]?.media_url) {
                    data.product_image_1 = childData[0]?.media_url
                } else {
                    data.product_image_1 = props?.row?.product_image_1
                }
            }
            if (data?.product_image_2?.length > 0) {
                await ImageUpload(data?.product_image_2[0], "shopProduct", "Image2", data?.product_name)
                data.product_image_2 = `${productLink}${data?.product_name}_Image2_${data?.product_image_2[0]?.name}`
            } else {
                if (childData[1]?.media_url) {
                    data.product_image_2 = childData[1]?.media_url
                } else {
                    data.product_image_2 = props?.row?.product_image_2
                }
            }
            if (data?.product_image_3?.length > 0) {
                await ImageUpload(data?.product_image_3[0], "shopProduct", "Image3", data?.product_name)
                data.product_image_3 = `${productLink}${data?.product_name}_Image3_${data?.product_image_3[0]?.name}`
            } else {
                if (childData[2]?.media_url) {
                    data.product_image_3 = childData[2]?.media_url
                } else {
                    data.product_image_3 = props?.row?.product_image_3
                }
            }
            if (data?.product_image_4?.length > 0) {
                await ImageUpload(data?.product_image_4[0], "shopProduct", "Image4", data?.product_name)
                data.product_image_4 = `${productLink}${data?.product_name}_Image4_${data?.product_image_4[0]?.name}`
            } else {
                if (childData[3]?.media_url) {
                    data.product_image_4 = childData[3]?.media_url
                } else {
                    data.product_image_4 = props?.row?.product_image_4
                }
            }
            if (data?.product_image_5?.length > 0) {
                await ImageUpload(data?.product_image_5[0], "shopProduct", "Image5", data?.product_name)
                data.product_image_5 = `${productLink}${data?.product_name}_Image5_${data?.product_image_5[0]?.name}`
            } else {
                if (childData[4]?.media_url) {
                    data.product_image_5 = childData[4]?.media_url
                } else {
                    data.product_image_5 = props?.row?.product_image_5
                }
            }
            if (data?.product_video_url?.length > 0) {
                await ImageUpload(data?.product_video_url[0], "shopProduct", "Image5", data?.product_name)
                data.product_video_url = `${productLink}${data?.product_name}_Image5_${data?.product_video_url[0]?.name}`
            } else {
                data.product_video_url = props?.row?.product_video_url
            }
        } else {
            if (data?.product_image_1?.length > 0 && (childData[0]?.media_url == undefined || childData[0]?.media_url == '')) {
                await ImageUpload(data?.product_image_1[0], "shopProduct", "MainImage", data?.product_name)
                data.product_image_1 = `${productLink}${data?.product_name}_MainImage_${data?.product_image_1[0]?.name}`
            } else {
                if (childData[0]?.media_url) {
                    data.product_image_1 = childData[0]?.media_url
                } else {
                    data.product_image_1 = ''
                }
            }
            if (data?.product_image_2?.length > 0 && (childData[1]?.media_url == undefined || childData[1]?.media_url == '')) {
                await ImageUpload(data?.product_image_2[0], "shopProduct", "Image2", data?.product_name)
                data.product_image_2 = `${productLink}${data?.product_name}_Image2_${data?.product_image_2[0]?.name}`
            } else {
                if (childData[1]?.media_url) {
                    data.product_image_2 = childData[1]?.media_url
                } else {
                    data.product_image_2 = ''
                }
            }
            if (data?.product_image_3?.length > 0 && (childData[2]?.media_url == undefined || childData[2]?.media_url == '')) {
                await ImageUpload(data?.product_image_3[0], "shopProduct", "Image3", data?.product_name)
                data.product_image_3 = `${productLink}${data?.product_name}_Image3_${data?.product_image_3[0]?.name}`
            } else {
                if (childData[2]?.media_url) {
                    data.product_image_3 = childData[2]?.media_url
                } else {
                    data.product_image_3 = ''
                }
            }
            if (data?.product_image_4?.length > 0 && (childData[3]?.media_url == undefined || childData[3]?.media_url == '')) {
                await ImageUpload(data?.product_image_4[0], "shopProduct", "Image4", data?.product_name)
                data.product_image_4 = `${productLink}${data?.product_name}_Image4_${data?.product_image_4[0]?.name}`
            } else {
                if (childData[3]?.media_url) {
                    data.product_image_4 = childData[3]?.media_url
                } else {
                    data.product_image_4 = ''
                }
            }
            if (data?.product_image_5?.length > 0 && (childData[4]?.media_url == undefined || childData[4]?.media_url == '')) {
                await ImageUpload(data?.product_image_5[0], "shopProduct", "Image5", data?.product_name)
                data.product_image_5 = `${productLink}${data?.product_name}_Image5_${data?.product_image_5[0]?.name}`
            } else {
                if (childData[4]?.media_url) {
                    data.product_image_5 = childData[4]?.media_url
                } else {
                    data.product_image_5 = ''
                }
            }
            if (data?.product_video_url?.length != 0) {
                await ImageUpload(data?.product_video_url[0], "shopProduct", "videoUrl", data?.product_name)
                data.product_video_url = `${productLink}${data?.product_name}_videoUrl_${data?.product_video_url[0]?.name}`
            } else {
                data.product_video_url = ''
            }
        }
        if (props?.title == 'Edit Product') {
            const updatedData = { ...data, vendor: props?.row?.vendor?.vendor_id }
            try {
                editVendorProduct(props?.row?.product_id, updatedData).then(res => {
                    if (res?.status == 'success') {
                        setLoader(false);
                        props?.getProducts()
                        toast.success('Product updated successfully')
                        toggle();
                        reset();
                        setopenGallery(false);
                        setopenGalleryModal(false);
                        setChildData([])
                    }
                })
            } catch (error) {
                console.log('error', error)
            }
        } else {
            var updatedData = { ...data, vendor: LoggedUserDetails?.sellerId, final_price: FinalPriceSeller }
            try {
                addProduct(updatedData).then((res) => {
                    if (res?.status == 'success') {
                        props?.getProducts()
                        toast.success('Product Added Successfully')
                        toggle();
                        props?.getProducts();
                        reset();
                        setopenGallery(false);
                        setopenGalleryModal(false);
                        setChildData([])
                        setLoader(false);
                    } else {
                        toast.error('Error while creating product')
                        setLoader(false);
                    }
                })
            } catch (error) {
                console.log('error', error);
            }
        }
    }

    const onAdminSubmit = async (data) => {
        var updatedData = { ...data, vendor: props?.row?.vendor?.vendor_id }
        if (updatedData?.final_price != '0' && updatedData?.markup_percentage != '0') {
            try {
                editAdminFinalProduct(props?.row?.product_id, updatedData).then(res => {
                    if (res?.status == 'success') {
                        props?.getProducts()
                        toast.success('Product updated successfully')
                        toggle();
                    }
                })
            } catch (error) {
                console.log('error', error)
            }
        } else {
            toast.error('Please add markup')
        }
    }

    useEffect(() => {
        if (LoggedUserDetails?.vendor_type == 'seller' || LoggedUserDetails?.vendor_type == 'shop') {
            reset({
                'product_name': props?.row?.product_name,
                'product_category': props?.row?.product_category?.id,
                'product_subcategory': props?.row?.product_subcategory?.subcat_id,
                'product_description': props?.row?.product_description,
                'product_brand': props?.row?.product_brand,
                'product_country_of_origin': props?.row?.product_country_of_origin,
                'product_shelflife': props?.row?.product_shelflife,
                'product_Manufacturer_Name': props?.row?.product_Manufacturer_Name,
                'product_Manufacturer_Address': props?.row?.product_Manufacturer_Address,
                'product_nutritional_info': props?.row?.product_nutritional_info,
                'product_additional_details': props?.row?.product_additional_details,
                'product_available_qty': props?.row?.product_available_qty,
                'product_isactive': props?.row?.product_isactive,
                'product_actual_price': props?.row?.product_actual_price,
                'product_unit': props?.row?.product_unit,
                'product_unit_type': props?.row?.product_unit_type,
                'product_revenue': props?.row?.product_revenue,
                'product_video_url': props?.row?.product_video_url,
                'product_image_1': props?.row?.product_image_1,
                'product_image_2': props?.row?.product_image_2,
                'product_image_3': props?.row?.product_image_3,
                'product_image_4': props?.row?.product_image_4,
                'product_image_5': props?.row?.product_image_5

            })
        }
        if (LoggedUserDetails?.role == 'admin') {
            reset({
                'product_name': props?.row?.product_name,
                'product_category': props?.row?.product_category?.id,
                'product_subcategory': props?.row?.product_subcategory?.subcat_id,
                'product_description': props?.row?.product_description,
                'product_brand': props?.row?.product_brand,
                'product_country_of_origin': props?.row?.product_country_of_origin,
                'product_shelflife': props?.row?.product_shelflife,
                'product_Manufacturer_Name': props?.row?.product_Manufacturer_Name,
                'product_Manufacturer_Address': props?.row?.product_Manufacturer_Address,
                'product_nutritional_info': props?.row?.product_nutritional_info,
                'product_additional_details': props?.row?.product_additional_details,
                'product_available_qty': props?.row?.product_available_qty,
                'product_stock': props?.row?.product_stock,
                'product_isactive': props?.row?.product_isactive,
                'product_actual_price': props?.row?.product_actual_price,
                'insta_commison_percentage': props?.row?.vendor?.insta_commison_percentage,
                'product_image_1': props?.row?.product_image_1,
                'product_image_2': props?.row?.product_image_2,
                'product_image_3': props?.row?.product_image_3,
                'product_image_4': props?.row?.product_image_4,
                'product_image_5': props?.row?.product_image_5,
                'product_video_url': props?.row?.product_video_url,
                'final_price': props?.row?.final_price,
                'markup_percentage': props?.row?.markup_percentage,
                'product_unit': props?.row?.product_unit,
                'product_unit_type': props?.row?.product_unit_type,
                'product_revenue': props?.row?.product_revenue,
            })
        }
    }, [])


    return (
        <>
            {props?.title == 'Edit Product' ?
                <button className='items-center p-1 bg-yellow-100 rounded-xl hover:bg-yellow-200' onClick={() => setOpen(true)}>
                    <Edit size={24} className='text-yellow-400' />
                </button> :
                <button className={`${formBtn1}`} onClick={() => setOpen(true)}>
                    {props?.title}
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
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}

                                        <form onSubmit={LoggedUserDetails?.role == 'admin' ? handleSubmit(onAdminSubmit) : handleSubmit(onSellerSubmit)}>
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-3 customBox">
                                                    <p className='text-xl font-semibold md:col-span-1 lg:col-span-4'>Basic Information</p>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            placeholder='Product Name'
                                                            className={inputClass}
                                                            {...register('product_name', { required: true })}
                                                        />
                                                        {errors.product_name && <Error title='Product Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Category*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            {...register('product_category', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            {props?.category?.map(item =>
                                                                // {
                                                                // console.log(item?.id)
                                                                <option key={item?.id} value={item?.id}>{item?.category_name}</option>
                                                                // }
                                                            )}
                                                        </select>
                                                        {errors.product_category && <Error title='Category is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Sub-Category*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            {...register('product_subcategory', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            {
                                                                subCatField?.map(item => (
                                                                    <option key={item?.subcat_id} value={item?.subcat_id} >{item?.subcat_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {errors.product_subcategory && <Error title='Sub Category is Required*' />}
                                                    </div>
                                                    {
                                                        LoggedUserDetails?.role == 'seller' &&
                                                        <div className="">
                                                            <label className={labelClass}>
                                                                Product MRP*
                                                            </label>
                                                            <input
                                                                type="number"
                                                                placeholder='Product MRP'
                                                                className={inputClass}
                                                                {...register('product_actual_price', { required: true })}
                                                            />
                                                            {errors.product_actual_price && <Error title='MRP is Required*' />}
                                                        </div>
                                                    }
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Status*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            {...register('product_isactive', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value={true}>Available</option>
                                                            <option value={false}>Out Of Stock</option>
                                                        </select>
                                                        {errors.product_isactive && <Error title='Status is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Country of Origin*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            placeholder='India'
                                                            className={inputClass}
                                                            {...register('product_country_of_origin', { required: true })}
                                                        />
                                                        {errors.product_country_of_origin && <Error title='Country of Origin is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Available Quantity*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            placeholder='150'
                                                            className={inputClass}
                                                            {...register('product_available_qty', { required: true })}
                                                        />
                                                        {errors.product_available_qty && <Error title='Available Quantity is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Unit Type *
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            {...register('product_unit_type', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value="(kg)">Kilograms (kg)</option>
                                                            <option value="(g)">grams (g)</option>
                                                            <option value="(ltr)">Liters (ltr)</option>
                                                            <option value="(pcs)">Pieces (pcs)</option>
                                                        </select>
                                                        {errors.product_unit_type && <Error title='Product Unit Type is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Unit*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='50g'
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            className={inputClass}
                                                            {...register('product_unit', { required: true })}
                                                        />
                                                        {errors.product_unit && <Error title='Product Unit is Required*' />}
                                                    </div>
                                                    {
                                                        LoggedUserDetails?.role == 'admin' &&
                                                        <>
                                                            <p className='text-xl font-semibold md:col-span-1 lg:col-span-4'>Price Calculation</p>
                                                            <div className="">
                                                                <label className={labelClass}>
                                                                    Product MRP*
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    readOnly
                                                                    placeholder='Product MRP'
                                                                    className={inputClass}
                                                                    {...register('product_actual_price', { required: true })}
                                                                />
                                                                {errors.product_actual_price && <Error title='MRP is Required*' />}
                                                            </div>
                                                            <div className="">
                                                                <label className={labelClass}>
                                                                    Vendor Commision*
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
                                                            Description*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            placeholder='Description'
                                                            className={inputClass}
                                                            {...register('product_description', { required: true })}
                                                        />
                                                        {errors.product_description && <Error title='Description is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Expiry Date*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            {...register('product_shelflife', { required: true })}
                                                            onChange={selectExpiryOption}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value="selectdate">Select Expiry Date</option>
                                                            <option value="other">Mention In days</option>
                                                        </select>
                                                        {errors.product_shelflife && <Error title='Shelf Life is Required*' />}
                                                    </div>
                                                    {checkExpiry == 'other' && <div>
                                                        <label className={labelClass}>
                                                            Mention In days*
                                                        </label>
                                                         <input
                                                            type="number"
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            placeholder='10'
                                                            className={inputClass}
                                                            onChange={checkexpiryinput}
                                                        />
                                                    </div>}
                                                   {checkExpiry == 'selectdate' && <div className="">
                                                    <   label className={labelClass}>
                                                            Select Expiry Date*
                                                        </label>
                                                        <Space>
                                                            <DatePicker disabledDate={disabledDate} onChange={rangeHandler} />
                                                        </Space>
                                                    </div>}
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="video_input">Product Video</label>
                                                        <input
                                                            className={fileinput}
                                                            id="video_input"
                                                            type='file'
                                                            disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            accept='video/mp4,video/x-m4v,video/*'
                                                            placeholder='Upload Video...'
                                                            {...register("product_video_url")}
                                                            onChange={handleFileChange}
                                                        />
                                                        {props?.title == 'Edit Product' && props?.row?.product_video_url && (
                                                            <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                                                                {props?.row?.product_video_url}
                                                            </label>
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Manufacturer Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            placeholder='Manufacturer Name'
                                                            className={inputClass}
                                                            {...register('product_Manufacturer_Name', { required: true })}
                                                        />
                                                        {errors.product_Manufacturer_Name && <Error title='Manufacturer Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Nutritional Info*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            placeholder='Nutritional Info'
                                                            className={inputClass}
                                                            {...register('product_nutritional_info', { required: true })}
                                                        />
                                                        {errors.product_nutritional_info && <Error title='Nutritional Info is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Brand*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            readOnly={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                            placeholder='Brand'
                                                            className={inputClass}
                                                            {...register('product_brand', { required: true })}
                                                        />
                                                        {errors.product_brand && <Error title='Brand is Required*' />}
                                                    </div>
                                                    {
                                                        LoggedUserDetails?.role == 'seller' &&
                                                        <div className="">
                                                            <label className={labelClass}>
                                                                Product Revenue*
                                                            </label>
                                                            <input
                                                                type="text"
                                                                readOnly
                                                                placeholder='₹ 0.00'
                                                                className={inputClass}
                                                                {...register('product_revenue')}
                                                            />
                                                        </div>
                                                    }
                                                    <p className='text-xl font-semibold md:col-span-1 lg:col-span-4'>Product Images</p>
                                                    {LoggedUserDetails?.role != 'admin' && LoggedUserDetails?.role != 'franchise' && <div className="">
                                                        <label className={labelClass}>
                                                            Check Image Option*
                                                        </label>
                                                        <select
                                                            name=""
                                                            disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
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
                                                                    disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                                    // multiple
                                                                    accept='image/jpeg,image/jpg,image/png'
                                                                    placeholder='Upload Images...'
                                                                    onChange={(e) => handleImageChange(e)}
                                                                    {...register("product_image_1", {
                                                                        required: props.title == 'Edit Product' && (!childData[0]?.media_url || childData[0]?.media_url == '') && !props?.row?.product_image_1
                                                                    })} />
                                                                {props?.title == 'Edit Product' && props?.row?.product_image_1 != '' && props?.row?.product_image_1 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {!childData[0] && props?.row?.product_image_1?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {childData[0]?.media_url?.split('/').pop()}
                                                                </label>

                                                                {errors.product_image_1 && <Error title='Main Image is required*' />}
                                                            </div>


                                                            <div className="">
                                                                <label className={labelClass} htmlFor="main_input">Image 2</label>
                                                                <input className={fileinput}
                                                                    id="main_input"
                                                                    type='file'
                                                                    disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                                    // multiple
                                                                    accept='image/jpeg,image/jpg,image/png'
                                                                    placeholder='Upload Images...'
                                                                    {...register("product_image_2",
                                                                    )}
                                                                />
                                                                {props?.title == 'Edit Product' && props?.row?.product_image_2 != '' && props?.row?.product_image_2 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {!childData[1] && props?.row?.product_image_2?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {childData[1]?.media_url?.split('/').pop()}
                                                                </label>
                                                                {/* {errors.product_image_2 && <Error title='Profile Image is required*' />} */}
                                                            </div>
                                                            <div className="">
                                                                <label className={labelClass} htmlFor="main_input">Image 3</label>
                                                                <input className={fileinput}
                                                                    id="main_input"
                                                                    type='file'
                                                                    disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                                    // multiple
                                                                    accept='image/jpeg,image/jpg,image/png'
                                                                    placeholder='Upload Images...'
                                                                    {...register("product_image_3")} />
                                                                {props?.title == 'Edit Product' && props?.row?.product_image_3 != '' && props?.row?.product_image_3 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {!childData[2] && props?.row?.product_image_3?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {childData[2]?.media_url?.split('/').pop()}
                                                                </label>
                                                                {/* {errors.product_image_3 && <Error title='Profile Image is required*' />} */}
                                                            </div>
                                                            <div className="">
                                                                <label className={labelClass} htmlFor="main_input">Image 4</label>
                                                                <input className={fileinput}
                                                                    id="main_input"
                                                                    type='file'
                                                                    disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                                    // multiple
                                                                    accept='image/jpeg,image/jpg,image/png'
                                                                    placeholder='Upload Images...'
                                                                    {...register("product_image_4")} />
                                                                {props?.title == 'Edit Product' && props?.row?.product_image_4 != '' && props?.row?.product_image_4 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {!childData[3] && props?.row?.product_image_4?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {childData[3]?.media_url?.split('/').pop()}
                                                                </label>
                                                                {/* {errors.product_image_4 && <Error title='Profile Image is required*' />} */}
                                                            </div>
                                                            <div className="">
                                                                <label className={labelClass} htmlFor="main_input">Image 5</label>
                                                                <input className={fileinput}
                                                                    id="main_input"
                                                                    type='file'
                                                                    disabled={LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise'}
                                                                    // multiple
                                                                    accept='image/jpeg,image/jpg,image/png'
                                                                    placeholder='Upload Images...'
                                                                    {...register("product_image_5")} />
                                                                {props?.title == 'Edit Product' && props?.row?.product_image_5 != '' && props?.row?.product_image_5 != undefined && <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {!childData[4] && props?.row?.product_image_5?.split('/').pop()}
                                                                </label>}
                                                                <label className='block mb-1 text-sm font-medium text-blue-800 truncate font-tb'>
                                                                    {childData[4]?.media_url?.split('/').pop()}
                                                                </label>
                                                                {/* {errors.product_image_5 && <Error title='Profile Image is required*' />} */}
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

export default AddProduct