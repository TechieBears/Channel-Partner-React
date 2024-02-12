import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadBox from '../../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add } from 'iconsax-react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../../utils/CustomClass';

export default function AddVendorShops(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
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
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-sky-400 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        Add
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Shop Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Shop Name'
                                                            className={inputClass}
                                                            {...register('shop_name', { required: true })}
                                                        />
                                                        {errors.shop_name && <Error title='Shop Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Vendor Type*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('vendor_type', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='Product Suppliers'>Product Suppliers</option>
                                                            <option value='Service Providers'>Service Providers</option>
                                                            <option value='Contractors'>Contractors</option>
                                                            <option value='Subcontractors'>Subcontractors</option>
                                                            <option value='Other'>Other</option>
                                                        </select>
                                                        {errors.vendor_type && <Error title='Vendor Type is Required*' />}
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
                                                        {errors.gst_number && <Error title='GST Number is Required*' />}
                                                    </div>
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
                                                            {...register('bank_account', { required: true })}
                                                        />
                                                        {errors.bank_account && <Error title='Bank Account Number is Required*' />}
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
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Aadhar Card'
                                                            className={inputClass}
                                                            {...register('adhar_card', { required: true })}
                                                        />
                                                        {errors.adhar_card && <Error title='Aadhar Card is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            PAN Card*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='PAN Card'
                                                            className={inputClass}
                                                            {...register('pan_card', { required: true })}
                                                        />
                                                        {errors.pan_card && <Error title='PAN Card is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            PAN Card*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='PAN Card'
                                                            className={inputClass}
                                                            {...register('pan_card', { required: true })}
                                                        />
                                                        {errors.pan_card && <Error title='PAN Card is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Phone*
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            placeholder='Phone'
                                                            className={inputClass}
                                                            {...register('Vendor_phone', { required: true })}
                                                        />
                                                        {errors.Vendor_phone && <Error title='Phone is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            PINCODE*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            maxLength={6}
                                                            placeholder='PINCODE'
                                                            className={inputClass}
                                                            {...register('pincode', { required: true })}
                                                        />
                                                        {errors.pincode && <Error title='PINCODE is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Address*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Address'
                                                            className={inputClass}
                                                            {...register('address', { required: true })}
                                                        />
                                                        {errors.address && <Error title='Address is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='City'
                                                            className={inputClass}
                                                            {...register('address', { required: true })}
                                                        />
                                                        {errors.address && <Error title='City is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            State
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('password',)}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="address_proof">Address Proof*</label>
                                                        <input className={fileinput}
                                                            id="address_proof"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("address_proof", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.address_proof != '' && props?.data.address_proof != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800'>
                                                            {props?.data?.address_proof?.split('/').pop()}
                                                        </label>}
                                                        {errors.address_proof && <Error title='Address Proof is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="bank_passbook">Bank Passbook*</label>
                                                        <input className={fileinput}
                                                            id="bank_passbook"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("bank_passbook", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.bank_passbook != '' && props?.data.bank_passbook != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800'>
                                                            {props?.data?.bank_passbook?.split('/').pop()}
                                                        </label>}
                                                        {errors.bank_passbook && <Error title='Bank Passbook is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="hawkers_shop_photo">Shop Photo*</label>
                                                        <input className={fileinput}
                                                            id="hawkers_shop_photo"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("hawkers_shop_photo", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.hawkers_shop_photo != '' && props?.data.hawkers_shop_photo != undefined && <label className='block mb-1 text-md font-tb font-medium text-blue-800'>
                                                            {props?.data?.hawkers_shop_photo?.split('/').pop()}
                                                        </label>}
                                                        {errors.bank_passbook && <Error title='Shop Photo is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Shop Opening Time
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('shop_start_time',)}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Shop Closing Time
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('shop_end_time',)}
                                                        />
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
