import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add } from 'iconsax-react';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import { getCategory, getSubCategory } from '../../../api';

function AddProduct(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [category, setCategory] = useState([]);
    const [subCategory, setsubCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cancelButtonRef = useRef(null)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const toggle = () => setOpen(!isOpen)
    const closeBtn = () => {
        toggle();
        reset()
    }
    const onSubmit = (data) => {
        console.log('data', data)
    }

    useEffect(() => {
        getCategory().then(res => {
            // console.log('res', res)
            setCategory(res)
        })
        getSubCategory().then(res => {
            setsubCategory(res)
        })
    }, [])
    return (
        <>
            <button className={`${formBtn1} flex`} onClick={() => setOpen(true)}>
                <Add className='text-white' />
                {props?.title}
            </button>
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
                                                                <option key={item?.id} value={item?.id}>{item?.category_name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.product_category && <Error title='Category is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Category*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('sub_category', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            {
                                                                subCategory?.map(item => (
                                                                    <option key={item?.subcat_id} value={item?.subcat_id} >{item?.subcat_name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {errors.sub_category && <Error title='Sub Category is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product MRP*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Product MRP'
                                                            className={inputClass}
                                                            {...register('mrp', { required: true })}
                                                        />
                                                        {errors.mrp && <Error title='MRP is Required*' />}
                                                    </div>

                                                    <div className="">
                                                        <label className={labelClass}>
                                                            SKU*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='SKU'
                                                            className={inputClass}
                                                            {...register('sku', { required: true })}
                                                        />
                                                        {errors.sku && <Error title='SKU is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Variations
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Variations'
                                                            className={inputClass}
                                                            {...register('variations', { required: true })}
                                                        />
                                                        {errors?.variations && <Error title='Varitation is Required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Weight (gm)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Weight (gm)'
                                                            className={inputClass}
                                                            {...register('weight', { required: true })}
                                                        />
                                                        {errors?.weight && <Error title='Weight is Required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Dimensions
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Dimensions'
                                                            className={inputClass}
                                                            {...register('dimenisons', { required: true })}
                                                        />
                                                        {errors?.dimenisons && <Error title='Dimensions is Required' />}
                                                    </div>
                                                    <div className="">
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
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Product Status*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('product_status', { required: true })}
                                                        >
                                                            <option value='Available'>Avilable</option>
                                                            <option value='Out Of Stock'>Out Of Stock</option>
                                                            <option value='Other'>Other</option>
                                                        </select>
                                                        {errors.product_status && <Error title='Status is Required*' />}
                                                    </div>
                                                    <div className="">
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
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Brand*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength={6}
                                                            placeholder='Brand'
                                                            className={inputClass}
                                                            {...register('brand', { required: true })}
                                                        />
                                                        {errors.brand && <Error title='Brand is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Warranty / Guaranty *
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('warranty',)}
                                                        >
                                                            <option value='Yes'>Yes</option>
                                                            <option value='No'>No</option>
                                                        </select>
                                                        {/* {errors.warranty && <Error title='War is Required*' />} */}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Special Offer*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('speacial_offer',)}
                                                        >
                                                            <option value='Yes'>Yes</option>
                                                            <option value='No'>No</option>
                                                        </select>
                                                        {/* {errors.warranty && <Error title='War is Required*' />} */}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Tags*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Tags'
                                                            className={inputClass}
                                                            {...register('tags',)}
                                                        />
                                                        {/* {errors.tags && <Error title='Tags is Required*' />} */}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Discount Price
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Discount Price'
                                                            className={inputClass}
                                                            {...register('discount_price',)}
                                                        />
                                                        {/* {errors.tags && <Error title='Tags is Required*' />} */}
                                                    </div>
                                                    <p className='col-span-4 text-xl font-semibold'>Additional Information</p>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Description*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Description'
                                                            className={inputClass}
                                                            {...register('product_details', { required: true })}
                                                        />
                                                        {errors.product_details && <Error title='Description is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Country of Origin*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Country of Origin'
                                                            className={inputClass}
                                                            {...register('country_of_origin', { required: true })}
                                                        />
                                                        {errors.country_of_origin && <Error title='Country of Origin is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Shell Life*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Shell Life'
                                                            className={inputClass}
                                                            {...register('shell_life', { required: true })}
                                                        />
                                                        {errors.shell_life && <Error title='Shell Life is Required*' />}
                                                    </div>
                                                    <div className="">
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
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Manufacturer Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Manufacturer Name'
                                                            className={inputClass}
                                                            {...register('manufac_name', { required: true })}
                                                        />
                                                        {errors.manufac_name && <Error title='Manufacturer Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Nutritional Info*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Nutritional Info'
                                                            className={inputClass}
                                                            {...register('nutri_info', { required: true })}
                                                        />
                                                        {errors.nutri_info && <Error title='Nutritional Info is Required*' />}
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