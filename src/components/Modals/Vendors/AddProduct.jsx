import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add, Edit } from 'iconsax-react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import { addProduct, editVendorProduct, getAllSeller, getCategory, getSubCategory } from '../../../api';
import { toast } from 'react-toastify';
import { ImageUpload, franchiselink } from '../../../env';

function AddProduct(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [category, setCategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const toggle = () => setOpen(!isOpen)
    const closeBtn = () => {
        toggle();
        reset()
    }
    const onSubmit = async (data) => {
        if (props?.title == 'Edit Product') {
            if (data?.product_image_1.length != 0) {
                await ImageUpload(data?.product_image_1[0], "franchisee", "MainImage", data?.product_name)
                data.product_image_1 = `${franchiselink}${data?.product_name}_MainImage_${data?.product_image_1[0]?.name}`
            } else {
                data.product_image_1 = ''
            }
            if (data?.product_image_2.length != 0) {
                await ImageUpload(data?.product_image_2[0], "franchisee", "Image2", data?.product_name)
                data.product_image_2 = `${franchiselink}${data?.product_name}_Image2_${data?.product_image_2[0]?.name}`
            } else {
                data.product_image_2 = ''
            }
            if (data?.product_image_3.length != 0) {
                await ImageUpload(data?.product_image_3[0], "franchisee", "Image3", data?.product_name)
                data.product_image_3 = `${franchiselink}${data?.product_name}_Image3_${data?.product_image_3[0]?.name}`
            } else {
                data.product_image_3 = ''
            }
            if (data?.product_image_4.length != 0) {
                await ImageUpload(data?.product_image_4[0], "franchisee", "Image4", data?.product_name)
                data.product_image_4 = `${franchiselink}${data?.product_name}_Image4_${data?.product_image_4[0]?.name}`
            } else {
                data.product_image_4 = ''
            }
            if (data?.product_image_5.length != 0) {
                await ImageUpload(data?.product_image_5[0], "franchisee", "Image5", data?.product_name)
                data.product_image_5 = `${franchiselink}${data?.product_name}_Image5_${data?.product_image_5[0]?.name}`
            } else {
                data.product_image_5 = ''
            }
        } else {
            if (data?.product_image_1.length != 0) {
                await ImageUpload(data?.product_image_1[0], "franchisee", "MainImage", data?.product_name)
                data.product_image_1 = `${franchiselink}${data?.product_name}_MainImage_${data?.product_image_1[0]?.name}`
            } else {
                data.product_image_1 = ''
            }
            if (data?.product_image_2.length != 0) {
                await ImageUpload(data?.product_image_2[0], "franchisee", "Image2", data?.product_name)
                data.product_image_2 = `${franchiselink}${data?.product_name}_Image2_${data?.product_image_2[0]?.name}`
            } else {
                data.product_image_2 = ''
            }
            if (data?.product_image_3.length != 0) {
                await ImageUpload(data?.product_image_3[0], "franchisee", "Image3", data?.product_name)
                data.product_image_3 = `${franchiselink}${data?.product_name}_Image3_${data?.product_image_3[0]?.name}`
            } else {
                data.product_image_3 = ''
            }
            if (data?.product_image_4.length != 0) {
                await ImageUpload(data?.product_image_4[0], "franchisee", "Image4", data?.product_name)
                data.product_image_4 = `${franchiselink}${data?.product_name}_Image4_${data?.product_image_4[0]?.name}`
            } else {
                data.product_image_4 = ''
            }
            if (data?.product_image_5.length != 0) {
                await ImageUpload(data?.product_image_5[0], "franchisee", "Image5", data?.product_name)
                data.product_image_5 = `${franchiselink}${data?.product_name}_Image5_${data?.product_image_5[0]?.name}`
            } else {
                data.product_image_5 = ''
            }
        }
        const updatedData = { ...data, vendor: props?.sellerId }
        if (props?.title == 'Edit Product') {
            console.log('called')
            editVendorProduct(updatedData).then(res => {
                if (res.status == 'success') {
                    props?.getProducts()
                    toast.success('Product updated successfully')
                    toggle();
                }
            })
        } else {
            addProduct(updatedData).then((res) => {
                if (res?.status == 'success') {
                    props?.getProducts()
                    toast.success('Product Added Successfully')
                    toggle();
                } else {
                    toast.error('Error while creating product')
                }
            })
        }
    }

    useEffect(() => {
        getCategory().then(res => {
            setCategory(res)
        })
        getSubCategory().then(res => {
            setsubCategory(res)
        })
        if (props?.title == 'Edit Product') {
            reset({
                'product_name': props?.row?.product_name,
                'product_category': props?.row?.product_category,
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
            })
        }
    }, [])
    return (
        <>
            {props?.title == 'Edit Product' ?
                <button className='items-center p-1 rounded-xl bg-yellow-100 hover:bg-yellow-200' onClick={() => setOpen(true)}>
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
                                                    <p className='md:col-span-1 lg:col-span-4 text-xl font-semibold'>Basic Information</p>
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
                                                            {category?.map(item => (
                                                                <option key={item?.id} value={item?.category_name}>{item?.category_name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.product_category && <Error title='Category is Required*' />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Product Category*
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
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product MRP*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Product MRP'
                                                            className={inputClass}
                                                            {...register('product_actual_price', { required: true })}
                                                        />
                                                        {errors.product_actual_price && <Error title='MRP is Required*' />}
                                                    </div>

                                                    <div className="">
                                                        <label className={labelClass}>
                                                            SKU*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='SKU'
                                                            className={inputClass}
                                                            {...register('product_available_qty', { required: true })}
                                                        />
                                                        {errors.product_available_qty && <Error title='SKU is Required*' />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Variations
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Variations'
                                                            className={inputClass}
                                                            {...register('variations')}
                                                        />
                                                        {errors?.variations && <Error title='Varitation is Required' />}
                                                    </div> */}
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            GST (%)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='GST (%)'
                                                            className={inputClass}
                                                            {...register('gst_per', { required: true })}
                                                        />
                                                        {errors?.gst_per && <Error title='GST is Required' />}
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Status*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('product_isactive', { required: true })}
                                                        >
                                                            <option value={true}>Avilable</option>
                                                            <option value={false}>Out Of Stock</option>
                                                        </select>
                                                        {errors.product_isactive && <Error title='Status is Required*' />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Availability Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            placeholder=''
                                                            className={inputClass}
                                                            {...register('availability_date',)}
                                                        />
                                                        {errors.availability_date && <Error title='Availability Date is Required*' />}
                                                    </div> */}
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Warranty / Guaranty
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('warranty',)}
                                                        >
                                                            <option value='Yes'>Yes</option>
                                                            <option value='No'>No</option>
                                                        </select>
                                                        {errors.warranty && <Error title='War is Required*' />}
                                                    </div> */}
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Special Offer
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('speacial_offer',)}
                                                        >
                                                            <option value='Yes'>Yes</option>
                                                            <option value='No'>No</option>
                                                        </select>
                                                        {errors.warranty && <Error title='War is Required*' />}
                                                    </div> */}
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Tags
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Tags'
                                                            className={inputClass}
                                                            {...register('tags')}
                                                        />
                                                        {errors.tags && <Error title='Tags is Required*' />}
                                                    </div> */}
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Discount Price
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Discount Price'
                                                            className={inputClass}
                                                            {...register('discount_price',)}
                                                        />
                                                        {errors.tags && <Error title='Tags is Required*' />}
                                                    </div> */}
                                                    <p className='md:col-span-1 lg:col-span-4 text-xl font-semibold'>Additional Information</p>
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
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            FSSAI License*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='FSSAI License'
                                                            className={inputClass}
                                                            {...register('fssai_lic', { required: true })}
                                                        />
                                                        {errors.fssai_lic && <Error title='FSSAI License is Required*' />}
                                                    </div> */}
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
                                                    <p className='md:col-span-1 lg:col-span-4 text-xl font-semibold'>Brand Information</p>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Brand*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength={6}
                                                            placeholder='Brand'
                                                            className={inputClass}
                                                            {...register('product_brand', { required: true })}
                                                        />
                                                        {errors.product_brand && <Error title='Brand is Required*' />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Brand Logo*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_brand_logo", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.product_brand_logo != '' && props?.data.product_brand_logo != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.product_brand_logo?.split('/').pop()}
                                                        </label>}
                                                        {errors.product_brand_logo && <Error title='Profile Image is required*' />}
                                                    </div> */}
                                                    <p className='md:col-span-1 lg:col-span-4 text-xl font-semibold'>Product Images</p>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Main Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_1", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.product_image_1 != '' && props?.data.product_image_1 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.product_image_1?.split('/').pop()}
                                                        </label>}
                                                        {errors.product_image_1 && <Error title='Profile Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 2*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_2", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.product_image_2 != '' && props?.data.product_image_2 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.product_image_2?.split('/').pop()}
                                                        </label>}
                                                        {errors.product_image_2 && <Error title='Profile Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 3*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_3", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.product_image_3 != '' && props?.data.product_image_3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.product_image_3?.split('/').pop()}
                                                        </label>}
                                                        {errors.product_image_3 && <Error title='Profile Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 3*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_4", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.product_image_4 != '' && props?.data.product_image_4 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.product_image_4?.split('/').pop()}
                                                        </label>}
                                                        {errors.product_image_4 && <Error title='Profile Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Image 4*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("product_image_5", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.product_image_5 != '' && props?.data.product_image_5 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.product_image_5?.split('/').pop()}
                                                        </label>}
                                                        {errors.product_image_5 && <Error title='Profile Image is required*' />}
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
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}

export default AddProduct