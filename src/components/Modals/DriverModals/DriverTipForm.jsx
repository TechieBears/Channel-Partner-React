import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { useForm } from 'react-hook-form';
import { createUser, editUser, getUser } from '../../../api';
import { Edit } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { setUserList } from '../../../redux/Slices/userSlice';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';

function DriverTipForm(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();
 
    // ============================= fetching data api ==================================
    const fetchData = () => {
        try {
            getUser().then((res) => {
                dispatch(setUserList(res))
            })
        } catch (err) {
            console.log('error', err);
        }
    }

   
    // ============================== close modals ======================================
    const closeBtn = () => {
        toggle();
        reset();
        setLoader(false);
    }

    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Driver Tip
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
                                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-sky-400 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>

                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form >
                                            <div className="">
                                                <div className="py-4 mx-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  gap-x-3 gap-y-3 ">
                                                    
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            ID Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="ID Number"
                                                            className={inputClass}
                                                            {...register('id_number',{ required: true })}
                                                        />
                                                    </div>
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
                                                        {errors.first_name && <Error title="First Name is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Tip Amount
                                                        </label>
                                                        <input
                                                            type="Number"
                                                            placeholder="Tip Amount"
                                                            className={inputClass}
                                                            {...register('tip_amount',{ required: true })}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            {/* =============== footer section ==================== */}
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

export default DriverTipForm