import { Dialog, Transition } from '@headlessui/react'
import React, { useState, Fragment } from 'react'
import LoadBox from '../../Loader/LoadBox'
import { Add, Edit } from 'iconsax-react';
import { formBtn1, formBtn2 } from '../../../utils/CustomClass';
import { useForm } from 'react-hook-form';

function AddItem(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const toggle = () => {
        setOpen(!isOpen)
    }
    const closeBtn = () => {
        toggle();
        reset()
    }

    const onSubmit = (data) => {
        console.log('data', data)
    }
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
                                                    <h3 className='col-span-4 font-semibold text-xl'>Personal Details</h3>

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