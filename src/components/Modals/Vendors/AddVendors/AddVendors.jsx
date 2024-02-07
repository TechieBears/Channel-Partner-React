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
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../../utils/CustomClass';

export default function AddVendors(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
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
                                        Add Vendor
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Vendor Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Vendor Name'
                                                            className={inputClass}
                                                            {...register('Vendor_name', { required: true })}
                                                        />
                                                        {errors.Vendor_name && <Error title='Vendor Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Vendor Email*
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder='Vendor Email'
                                                            className={inputClass}
                                                            {...register('Vendor_email', { required: true })}
                                                        />
                                                        {errors.Vendor_email && <Error title='Vendor Email is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Vendor Phone*
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            placeholder='Vendor Phone'
                                                            className={inputClass}
                                                            {...register('Vendor_phone', { required: true })}
                                                        />
                                                        {errors.Vendor_phone && <Error title='Vendor Phone is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Vendor Address*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Vendor Address'
                                                            className={inputClass}
                                                            {...register('Vendor_address', { required: true })}
                                                        />
                                                        {errors.Vendor_address && <Error title='Vendor Address is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Login ID
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Login ID'
                                                            className={inputClass}
                                                            {...register('login_id',)}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Password
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('password',)}
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
