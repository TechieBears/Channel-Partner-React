import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add, Edit } from 'iconsax-react';
import { addRestaurant, editRestaurant } from '../../../api';
import { toast } from 'react-toastify';

export default function AddRestaurant(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const user = useSelector((state) => state?.user?.FranchiseeDetails);
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const toggle = () => {
        setOpen(!isOpen)
        setSelectedCategory([])
    }
    const closeBtn = () => {
        toggle();
        reset()
    }
    const categories = ['Asian', 'Mexican', 'Italian', 'Russian cussion', 'Spanish', 'Comfort', 'American', 'North Indian', 'South Indian']
    const onSubmit = (data) => {
        if (props?.button == 'edit') {
            let updateData = {
                ...data,
                'created_by': props?.id,
                "vendor_type": 'restaurant'
            }
            editRestaurant(props?.id, updateData).then(res => {
                if (res?.status == 'success') {
                    toast.success('Restaurant Updated Successfully')
                    props?.getAllRestaurant()
                    toggle()
                }
            })
        } else {
            let updateData = {
                ...data,
                'created_by': props?.id,
                "vendor_type": 'restaurant'
            }
            addRestaurant(updateData).then(res => {
                if (res.status == 'success') {
                    toast.success('Resuraurant added successfully')
                    props?.getAllRestaurant()
                    toggle();
                } else {
                    toast.error('Error adding restaurant')
                }
            })
        }
    }
    useEffect(() => {
        if (props?.button === 'edit') {
            reset({
                'first_name': props?.data?.user?.first_name,
                'last_name': props?.data?.user?.last_name,
                'date_of_birth': props?.data?.user?.date_of_birth,
                'gender': props?.data?.user?.gender,
                'email': props?.data?.user?.email,
                'shop_name': props?.data?.shop_name,
                'restaurant_phone': props?.data?.user?.phone_no,
                'restaurant_address': props?.data?.user?.address,
                'restaurant_city': props?.data?.user?.city,
                'restaurant_state': props?.data?.user?.state,
                'restaurant_pin_code': props?.data?.user?.pincode,
                'restaurant_opening_time': props?.data?.shop_start_time,
                'restaurant_closing_time': props?.data?.shop_end_time,
                'veg_or_nonveg': props?.data?.veg_or_nonveg,
                'short_description': props?.data?.short_description,
                'selectedCategory': props?.data?.selectedCategory,
                'bank_name': props?.data?.bank_name,
                'account_number': props?.data?.account_number,
                'ifsc_code': props?.data?.ifsc_code,
                'adhar_card': props?.data?.adhar_card,
                'pan_card': props?.data?.pan_card,
                'gst_number': props?.data?.gst_number,
            });
        }
    }, []);
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
                                        Add Restaurant
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-3 customBox">
                                                    <h3 className='col-span-4 font-semibold text-xl'>Personal Details</h3>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            First Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='First Name'
                                                            className={inputClass}
                                                            {...register('first_name', { required: true })}
                                                        />
                                                        {errors.first_name && <Error title='First Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Last Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Last Name'
                                                            className={inputClass}
                                                            {...register('last_name', { required: true })}
                                                        />
                                                        {errors.last_name && <Error title='Last Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Date of birth (DOB)*
                                                        </label>
                                                        <input
                                                            type="date"
                                                            placeholder='Last Name'
                                                            className={inputClass}
                                                            {...register('date_of_birth', { required: true })}
                                                        />
                                                        {errors.date_of_birth && <Error title='DOB is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Gender*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('gender', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='Male'>Male</option>
                                                            <option value='Female'>Female</option>
                                                        </select>
                                                        {errors.gender && <Error title='Gender is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Email*
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder='Email'
                                                            className={inputClass}
                                                            {...register('email', { required: true })}
                                                        />
                                                        {errors.email && <Error title='Email is Required*' />}
                                                    </div>
                                                    {props?.button != 'edit' &&
                                                        <div className="">
                                                            <label className={labelClass}>
                                                                Password*
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder='Password'
                                                                className={inputClass}
                                                                {...register('password', { required: true })}
                                                            />
                                                            {errors.password && <Error title='Password is Required*' />}
                                                        </div>
                                                    }
                                                    <h3 className='col-span-4 font-semibold text-xl'>Basic Details</h3>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Restaurant Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Restaurant Name'
                                                            className={inputClass}
                                                            {...register('shop_name', { required: true })}
                                                        />
                                                        {errors.shop_name && <Error title='Restaurant Name is Required*' />}
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
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='City'
                                                            className={inputClass}
                                                            {...register('restaurant_city', { required: true })}
                                                        />
                                                        {errors.restaurant_city && <Error title='Restaurant City is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            State*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='State'
                                                            className={inputClass}
                                                            {...register('restaurant_state', { required: true })}
                                                        />
                                                        {errors.restaurant_state && <Error title='Restaurant State is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            PIN Code*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='PIN Code'
                                                            className={inputClass}
                                                            {...register('pincode', { required: true })}
                                                        />
                                                        {errors.pincode && <Error title='Restaurant PIN Code is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Opening Hours*
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='PIN Code'
                                                            className={inputClass}
                                                            {...register('restaurant_opening_time', { required: true })}
                                                        />
                                                        {errors.restaurant_opening_time && <Error title='Restaurant Opening is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Closing Hours*
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='PIN Code'
                                                            className={inputClass}
                                                            {...register('restaurant_closing_time', { required: true })}
                                                        />
                                                        {errors.restaurant_closing_time && <Error title='Restaurant Closing is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Type *
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('veg_or_nonveg', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='both'>Both</option>
                                                            <option value='Veg'>Veg</option>
                                                            <option value='Non Veg'>Non Veg</option>
                                                        </select>
                                                        {errors.veg_or_nonveg && <Error title='Type is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Short Description
                                                        </label>
                                                        <textarea
                                                            placeholder='Short Description'
                                                            className={inputClass}
                                                            {...register('short_description',)}
                                                        />
                                                    </div>
                                                    <h3 className='col-span-4 text-xl font-semibold'>Banking Details</h3>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Bank Name'
                                                            className={inputClass}
                                                            {...register('bank_name', { required: true })}
                                                        />
                                                        {errors.bank_name && <Error title='Bank Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Account Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Bank Account Number'
                                                            className={inputClass}
                                                            {...register('account_number', { required: true })}
                                                        />
                                                        {errors.account_number && <Error title='Bank Account Number is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            IFSC Code*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='IFSC Code'
                                                            className={inputClass}
                                                            {...register('ifsc_code', { required: true })}
                                                        />
                                                        {errors.ifsc_code && <Error title='IFSC Code is Required*' />}
                                                    </div>
                                                    <h3 className='text-xl font-semibold col-span-4'>Additional Details</h3>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Aadhar Card Number'
                                                            className={inputClass}
                                                            {...register('adhar_card', { required: true })}
                                                        />
                                                        {errors.adhar_card && <Error title='Aadhar Card is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            PAN Card Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='PAN Card Number'
                                                            className={inputClass}
                                                            {...register('pan_card', { required: true })}
                                                        />
                                                        {errors.pan_card && <Error title='PAN Card is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            GST Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='GST Number'
                                                            className={inputClass}
                                                            {...register('gst_number', { required: true })}
                                                        />
                                                        {errors.gst_number && <Error title='GST is Required*' />}
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
