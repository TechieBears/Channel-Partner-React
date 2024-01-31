import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../../utils/CustomClass';
import LoadBox from '../../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add } from 'iconsax-react';

export default function AddRestaurant() {
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
    const categories = ['Asian', 'Mexican', 'Italian', 'Russian cussion', 'Spanish', 'Comfort', 'American', 'North Indian', 'South Indian']
    const onSubmit = (data) => {
        console.log('data', data)
    }
    return (
        <>
            <button className={`${formBtn1} flex`} onClick={() => setOpen(true)}>
                <Add className='text-white' />
                Add Restaurant
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
                                        Add Restaurant
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Restaurant Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Restaurant Name'
                                                            className={inputClass}
                                                            {...register('restaurant_name', { required: true })}
                                                        />
                                                        {errors.restaurant_name && <Error title='Restaurant Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Restaurant Email*
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder='Restaurant Email'
                                                            className={inputClass}
                                                            {...register('restaurant_email', { required: true })}
                                                        />
                                                        {errors.restaurant_email && <Error title='Restaurant Email is Required*' />}
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
                                                            Delivery Mode *
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('delivery_mode', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='both'>Both</option>
                                                            <option value='pickup'>Pick Up</option>
                                                            <option value='delivery'>Delivery</option>
                                                        </select>
                                                        {errors.delivery_mode && <Error title='Delivery Mode is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Admin Delivery Comission (%)*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Admin Delivery Comission (%)'
                                                            className={inputClass}
                                                            {...register('admin_del_commission', { required: true })}
                                                        />
                                                        {errors.admin_del_commission && <Error title='Admin Delivery Commission is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Admin Pickup Comission (%)*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Admin Pickup Comission (%)'
                                                            className={inputClass}
                                                            {...register('admin_pickup_commission', { required: true })}
                                                        />
                                                        {errors.admin_pickup_commission && <Error title='Admin Pickup Commission is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            License Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='License Number'
                                                            className={inputClass}
                                                            {...register('license_number',)}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Categories
                                                        </label>
                                                        <MultiSelect
                                                            value={selectedCategory}
                                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                                            options={categories}
                                                            placeholder='Select Category'
                                                            maxSelectedLabels={3}
                                                            className={`w-full`}
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
