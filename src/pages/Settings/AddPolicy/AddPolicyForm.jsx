import { Edit } from 'iconsax-react';
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { Dialog, Transition } from '@headlessui/react';
import Error from '../../../components/Errors/Error';
import LoadBox from '../../../components/Loader/LoadBox';
import { addPolicy } from '../../../api';

export default function AddPolicyForm(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const toggle = () => setIsOpen(!isOpen);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log('data', data);
        addPolicy(data).then((res) => {
            console.log('res', res);
        })
    }
    const closeBtn = () => {
        toggle();
        setLoader(false);
    }
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
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-sky-400 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="py-4 mx-4 customBox">
                                                <div className="">
                                                    <label className={labelClass}>Policy Name*</label>
                                                    <input className={inputClass}
                                                        type='text'
                                                        placeholder='Policy Name'
                                                        {...register("title", { required: true })} />
                                                    {errors.title && <Error title='Policy Name is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass} >Policy Description*</label>
                                                    <textarea className={`${inputClass}`}
                                                        type='text'
                                                        placeholder='Policy Description'
                                                        {...register("description", { required: true })} />
                                                    {errors.description && <Error title='Policy Description is required*' />}
                                                </div>
                                            </div>

                                            <footer className="py-2 flex bg-white justify-end px-4 space-x-3">
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
