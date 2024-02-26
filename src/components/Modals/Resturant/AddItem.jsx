import { Dialog, Transition } from '@headlessui/react'
import React, { useState, Fragment, useEffect } from 'react'
import LoadBox from '../../Loader/LoadBox'
import { Add, Edit } from 'iconsax-react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import { useForm } from 'react-hook-form';
import { getCategory, getSubCategory } from '../../../api';
import { useSelector } from 'react-redux';
import Error from '../../Errors/Error';

function AddItem(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [category, setCategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const handleFileChange = (event) => {
        // console.log("file", event.target.files[0]);
        const file = event.target.files[0];
        if (file.size > 100 * 1024 * 1024) {
            event.target.value = null;
            alert("File size exceeds 100MB limit");
            return;
        }
    };
    const toggle = () => {
        setOpen(!isOpen)
    }
    const closeBtn = () => {
        toggle();
        reset()
    }

    const onSubmit = async (data) => {
        if (props?.title == 'Edit Product') {
            if (data?.product_image_1 != props?.row?.product_image_1) {
                await ImageUpload(data?.product_image_1[0], "shopProduct", "MainImage", data?.product_name)
                data.product_image_1 = `${productLink}${data?.product_name}_MainImage_${data?.product_image_1[0]?.name}`
            } else {
                data.product_image_1 = props?.row?.product_image_1
            }
            if (data?.product_image_2 != props?.row?.product_image_2) {
                await ImageUpload(data?.product_image_2[0], "shopProduct", "Image2", data?.product_name)
                data.product_image_2 = `${productLink}${data?.product_name}_Image2_${data?.product_image_2[0]?.name}`
            } else {
                data.product_image_2 = props?.row?.product_image_2
            }
            if (data?.product_image_3 != props?.row?.product_image_3) {
                await ImageUpload(data?.product_image_3[0], "shopProduct", "Image3", data?.product_name)
                data.product_image_3 = `${productLink}${data?.product_name}_Image3_${data?.product_image_3[0]?.name}`
            } else {
                data.product_image_3 = props?.row?.product_image_3
            }
            if (data?.product_image_4 != props?.row?.product_image_4) {
                await ImageUpload(data?.product_image_4[0], "shopProduct", "Image4", data?.product_name)
                data.product_image_4 = `${productLink}${data?.product_name}_Image4_${data?.product_image_4[0]?.name}`
            } else {
                data.product_image_4 = props?.row?.product_image_4
            }
            if (data?.product_image_5 != props?.row?.product_image_5) {
                await ImageUpload(data?.product_image_5[0], "shopProduct", "Image5", data?.product_name)
                data.product_image_5 = `${productLink}${data?.product_name}_Image5_${data?.product_image_5[0]?.name}`
            } else {
                data.product_image_5 = props?.row?.product_image_5
            }
            if (data?.product_video_url != props?.row?.product_video_url) {
                await ImageUpload(data?.product_video_url[0], "shopProduct", "Image5", data?.product_name)
                data.product_video_url = `${productLink}${data?.product_name}_Image5_${data?.product_video_url[0]?.name}`
            } else {
                data.product_video_url = props?.row?.product_video_url
            }
        } else {
            if (data?.product_image_1.length != 0) {
                await ImageUpload(data?.product_image_1[0], "shopProduct", "MainImage", data?.product_name)
                data.product_image_1 = `${productLink}${data?.product_name}_MainImage_${data?.product_image_1[0]?.name}`
            } else {
                data.product_image_1 = ''
            }
            if (data?.product_image_2.length != 0) {
                await ImageUpload(data?.product_image_2[0], "shopProduct", "Image2", data?.product_name)
                data.product_image_2 = `${productLink}${data?.product_name}_Image2_${data?.product_image_2[0]?.name}`
            } else {
                data.product_image_2 = ''
            }
            if (data?.product_image_3.length != 0) {
                await ImageUpload(data?.product_image_3[0], "shopProduct", "Image3", data?.product_name)
                data.product_image_3 = `${productLink}${data?.product_name}_Image3_${data?.product_image_3[0]?.name}`
            } else {
                data.product_image_3 = ''
            }
            if (data?.product_image_4.length != 0) {
                await ImageUpload(data?.product_image_4[0], "shopProduct", "Image4", data?.product_name)
                data.product_image_4 = `${productLink}${data?.product_name}_Image4_${data?.product_image_4[0]?.name}`
            } else {
                data.product_image_4 = ''
            }
            if (data?.product_image_5.length != 0) {
                await ImageUpload(data?.product_image_5[0], "shopProduct", "Image5", data?.product_name)
                data.product_image_5 = `${productLink}${data?.product_name}_Image5_${data?.product_image_5[0]?.name}`
            } else {
                data.product_image_5 = ''
            }
            if (data?.product_video_url.length != 0) {
                await ImageUpload(data?.product_video_url[0], "shopProduct", "Image5", data?.product_name)
                data.product_video_url = `${productLink}${data?.product_name}_Image5_${data?.product_video_url[0]?.name}`
            } else {
                data.product_video_url = ''
            }
        }
        console.log('data: ', data)
    }

    useEffect(() => {
        getCategory().then(res => {
            setCategory(res)
        })
        getSubCategory().then(res => {
            setsubCategory(res)
        })
    }, [])
    return (
        <>
            {
                props?.button == 'edit' ? <button className={`bg-yellow-100 p-1 rounded-lg`} onClick={() => setOpen(true)}>
                    <Edit size={20} className='text-yellow-500' />
                </button> : <button className={`${formBtn1} flex`} onClick={() => setOpen(true)}>
                    <Add className='text-white' />
                    {props?.title}
                </button>
            }
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-sky-400 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-3 customBox">
                                                    <h3 className='col-span-4 font-semibold text-xl'>Basic Details</h3>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Name*
                                                        </label>
                                                        <input
                                                            type="text"
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
                                                            {...register('product_category', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            {category?.map(item =>
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
                                                            {...register('product_subcategory', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            {
                                                                subCategory?.map(item => (
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
                                                                    placeholder='Vendor Commision'
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
                                                            Description*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Description'
                                                            className={inputClass}
                                                            {...register('product_description', { required: true })}
                                                        />
                                                        {errors.product_description && <Error title='Description is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="video_input">Product Video</label>
                                                        <input
                                                            className={fileinput}
                                                            id="video_input"
                                                            type='file'
                                                            accept='video/mp4,video/x-m4v,video/*'
                                                            placeholder='Upload Video...'
                                                            {...register("product_video_url")}
                                                            onChange={handleFileChange}
                                                        />
                                                        {props?.button === 'edit' && props?.data.product_video_url && (
                                                            <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                                {props?.data?.product_video_url?.name}
                                                            </label>
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Nutritional Info*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Nutritional Info'
                                                            className={inputClass}
                                                            {...register('product_nutritional_info', { required: true })}
                                                        />
                                                        {errors.product_nutritional_info && <Error title='Nutritional Info is Required*' />}
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
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Main Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_1",
                                                                { required: props.title == 'Edit Product' ? false : true })} />
                                                        {props?.title == 'Edit Product' && props?.row?.product_image_1 != '' && props?.row?.product_image_1 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.row?.product_image_1?.split('/').pop()}
                                                        </label>}
                                                        {errors.product_image_1 && <Error title='Main Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 2</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_2",
                                                            )}
                                                        />
                                                        {props?.title == 'Edit Product' && props?.row?.product_image_2 != '' && props?.row?.product_image_2 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.row?.product_image_2?.split('/').pop()}
                                                        </label>}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 3</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_3")} />
                                                        {props?.title == 'edit' && props?.row?.product_image_3 != '' && props?.row?.product_image_3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.row?.product_image_3?.split('/').pop()}
                                                        </label>}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 4</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_4")} />
                                                        {props?.title == 'Edit Product' && props?.row?.product_image_4 != '' && props?.row?.product_image_4 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.row?.product_image_4?.split('/').pop()}
                                                        </label>}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 5</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_5")} />
                                                        {props?.title == 'Edit Product' && props?.row?.product_image_5 != '' && props?.row?.product_image_5 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.row?.product_image_5?.split('/').pop()}
                                                        </label>}
                                                    </div>
                                                </div>
                                            </div>
                                            <footer className="py-2 flex bg-white justify-end px-4 space-x-3">
                                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Submit</button>}
                                                <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                                            </footer>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div >
                </Dialog >
            </Transition >
        </>
    )
}

export default AddItem