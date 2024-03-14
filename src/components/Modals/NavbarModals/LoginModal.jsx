import { Dialog, Transition } from '@headlessui/react'
import { CheckBadgeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { startSession } from '../../../api'
import { setSessionStarted } from '../../../redux/Slices/SessionSlice'
import { inputClass, labelClass } from '../../../utils/CustomClass'
import Error from '../../Errors/Error'

export default function LoginModal({ open, setOpen, id }) {
    const cancelButtonRef = useRef(null)
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const sessionStarted = useSelector(state => state?.session?.isSessionStarted)
    const toggle = () => {
        setOpen(false);
        reset();
    }
    const specific = watch('session_timeout');
    if (specific == 'specific') {
    }
    const logIn = () => {
        const data = {
            'vendorID': id,
            'isshopopen': true,
        }
        try {
            startSession(data).then(res => {
                if (res?.status == 'success') {
                    // setLogin(true)
                    dispatch(setSessionStarted(true))
                    toast?.success(res?.message);
                    toggle();
                }
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const logout = () => {
        const data = {
            'vendorID': id,
            'isshopopen': false,
        }
        try {
            startSession(data).then(res => {
                if (res?.status == 'success') {
                    // setLogin(false)
                    dispatch(setSessionStarted(false))
                    toast?.success(res?.message);
                    toggle();
                }
            })
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[99]" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-[99] w-screen overflow-y-auto">
                    <form className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" onSubmit={sessionStarted == true ? handleSubmit(logout) : handleSubmit(logIn)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${sessionStarted == true ? 'bg-red-100' : 'bg-sky-100'} sm:mx-0 sm:h-12 sm:w-12`}>
                                            {sessionStarted == true ? <ExclamationTriangleIcon className="h-7 w-7 text-red-500" aria-hidden="true" /> :
                                                <CheckBadgeIcon className="h-7 w-7 text-sky-400" aria-hidden="true" />}
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 font-tbPop">
                                                {sessionStarted == true ? 'Are You Sure you want to send session' : "Start your session"}
                                            </Dialog.Title>
                                            {/* <div className="mt-2">
                                                <p className="text-sm font-tbPop font-medium text-slate-500">
                                                    {sessionStarted == true ? 'Your will go offline for the day' : 'Confirm to start your session'}
                                                </p>
                                            </div> */}
                                            {sessionStarted == true && <div className='mt-2'>
                                                <label className={labelClass}>
                                                    Session Out Timing
                                                </label>
                                                <select
                                                    className={inputClass}
                                                    {...register('session_timeout', { required: true })}
                                                >
                                                    <option value=''>Select</option>
                                                    <option value='2 hours'>2 hours</option>
                                                    <option value='4 hours'>4 hours</option>
                                                    <option value='tommarow'>Tommarow</option>
                                                    <option value='specific'>Specific date & time</option>
                                                </select>
                                                {errors?.session_timeout && <Error title='This is required' />}
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className={`inline-flex w-full justify-center rounded-md ${sessionStarted == true ? 'bg-red-400' : 'bg-sky-400'} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:${sessionStarted == true ? 'bg-red-600' : 'bg-sky-600'} sm:ml-3 sm:w-auto`}
                                    >
                                        {sessionStarted == true ? "Logout" : "Login"}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                                        onClick={() => toggle()}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </form>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
