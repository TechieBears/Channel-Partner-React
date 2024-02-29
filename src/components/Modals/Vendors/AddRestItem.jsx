import { Dialog, Transition } from '@headlessui/react'
import { Add, Edit } from 'iconsax-react'
import React, { useState, Fragment, useEffect } from 'react'
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass'
// import { CloseButton } from 'react-toastify/dist/components';
import { useForm } from 'react-hook-form';
import LoadBox from '../../Loader/LoadBox';
import { useSelector } from 'react-redux';
import { getCategory, getSubCategory } from '../../../api';

export default function AddRestItem(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setsubCategory] = useState([])
    const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm();
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const toggle = () => setOpen(!isOpen)
    const closeBtn = () => {
        toggle();
        reset()
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 100 * 1024 * 1024) {
            event.target.value = null;
            alert("File size exceeds 100MB limit");
            return;
        }
    };
    const onSellerSubmit = (data) => {
        console.log('data', data)
    }

    const onAdminSubmit = (data) => {
        console.log('data', data)
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
            {props?.button == 'edit' ?
                <button className='items-center p-1 bg-yellow-100 rounded-xl hover:bg-yellow-200' onClick={() => setOpen(true)}>
                    <Edit size={24} className='text-yellow-400' />
                </button> :
                <button className={`${formBtn1} flex`} onClick={() => setOpen(true)}>
                    <Add className='text-white' />
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
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Status*
                                                        </label>
                                                        <select
                                                            className={inputClass}
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
                                                            {...register('product_unit_type', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option key="" value="(kg)">Kilograms (kg)</option>
                                                            <option key="" value="(g)">grams (g)</option>
                                                            <option key="" value="(ltr)">Liters (ltr)</option>
                                                            <option key="" value="(pcs)">Pieces (pcs)</option>
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
                                                        <label className={labelClass}>
                                                            Shelf Life*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Shelf Life'
                                                            className={inputClass}
                                                            {...register('product_shelflife', { required: true })}
                                                        />
                                                        {errors.product_shelflife && <Error title='Shelf Life is Required*' />}
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
                                                            Manufacturer Name*
                                                        </label>
                                                        <input
                                                            type="text"
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
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Main Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            onChange={(e) => handleImageChange(e)}
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
                                                        {/* {errors.product_image_5 && <Error title='Profile Image is required*' />} */}
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
