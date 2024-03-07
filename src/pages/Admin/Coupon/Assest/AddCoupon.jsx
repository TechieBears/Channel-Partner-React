import { Dialog, Transition } from '@headlessui/react'
import React, { useState, Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../../utils/CustomClass'
import { Edit } from 'iconsax-react'
import { addCoupon, editCoupon } from '../../../../api'
import { toast } from 'react-toastify'

export default function AddCoupon(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [username, setUsername] = useState("");
    const handleInput = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    };
    const changeCase = (event) => {
        event.preventDefault();
        setUsername(event.target.value.toUpperCase());
    };

    const onSubmit = (data) => {
        const payload= {...data, coupon_name: data?.coupon_name?.toUpperCase() }
        console.log('data', data);
        if (props?.button == 'edit') {
            editCoupon(payload, props?.data?.coupon_id).then(res => {
                if (res?.status == 'success') {
                    props?.fetchCoupon();
                    toast?.success('Coupon Edited Successfully')
                    toggle();
                    reset()
                } else {
                    toast?.error('Error While Editing Coupon')
                }
            })
        } else {
            addCoupon(payload).then(res => {
                if (res?.status == 'success') {
                    props?.fetchCoupon();
                    toast?.success('Coupon Added Successfully')
                    toggle();
                    reset()
                } else {
                    toast?.error('Error While Adding Coupon')
                }
            })
        }
    } 
    

    // ===================== close modals ===============================
    const closeBtn = () => {
        toggle();
        setLoader(false);
        reset()
    }

    useEffect(() => {
        if (props?.button == 'edit') {
            reset({
                'coupon_name': props?.data?.coupon_name,
                'discount_percent': props?.data?.discount_percent,
                'expiry_date': props?.data?.expiry_date,
                'coupon_type': props?.data?.coupon_type,
                'discount_price': props?.data?.discount_price,
            })
        }
    }, [])
    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    {props?.title}
                </button>
            ) : (
                <button
                    onClick={toggle}
                    className="bg-yellow-100 px-1.5 py-2 rounded-sm"><Edit size="20" className='text-yellow-500' />
                </button>
            )}
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
                    <div className="fixed inset-0 overflow-y-auto scrollbars">
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
                                <Dialog.Panel className="w-full max-w-xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">

                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="py-4 mx-4 space-y-2 customBox">
                                                <div className="">
                                                    <label className={labelClass} >Coupon Name*</label>
                                                    <input
                                                        placeholder='Coupon Name'
                                                        type='text'
                                                        className={`${inputClass} uppercase`}
                                                        {...register('coupon_name', { required: true })}
                                                    />
                                                    {errors.coupon_name && <Error title='Coupon Name is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass} >Percentage(%)*</label>
                                                    <input
                                                        placeholder='Percentage (%) '
                                                        type='number'
                                                        className={inputClass}
                                                        {...register('discount_percent', { required: true })}
                                                    />
                                                    {errors.discount_percent && <Error title='Percentage is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass} >Discount Price (₹)*</label>
                                                    <input
                                                        placeholder='Discount Price (₹)'
                                                        type='number'
                                                        className={inputClass}
                                                        {...register('discount_price', { required: true })}
                                                    />
                                                    {errors.discount_price && <Error title='Percentage is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass} >Expiry Date*</label>
                                                    <input
                                                        type='date'
                                                        min={new Date().toISOString().split('T')[0]}
                                                        className={inputClass}
                                                        {...register('expiry_date', { required: true })}
                                                    />
                                                    {errors.expiry_date && <Error title='Percentage is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass} >Coupon Type*</label>
                                                    <select
                                                        className={inputClass}
                                                        {...register('coupon_type', { required: true })}
                                                    >
                                                        <option value=''>Select</option>
                                                        <option value='Restaurant'>Restaurant</option>
                                                        <option value='Vendor'>Vendor</option>
                                                    </select>
                                                    {errors.discount_percent && <Error title='Percentage is required*' />}
                                                </div>
                                            </div>

                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                                {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>submit</button>}
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
