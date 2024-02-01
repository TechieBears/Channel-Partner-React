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

function AddPromoCode(props) {
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

    // ============================= form submiting ======================================
    const onSubmit = async (data) => {
        if (props.button != 'edit') {                 // for create
            if (data?.pan_url.length != 0) {
                await ImageUpload(data?.pan_url[0], "doc", "panImage", data?.name)
                data.pan_url = `${link}${data?.name}_panImage_${data?.pan_url[0].name}`
            } else {
                data.pan_url = ''
            }
            // if (data?.cheque_url.length != 0) {
            //     await ImageUpload(data?.cheque_url[0], "doc", "chequeImage", data?.name)
            //     data.cheque_url = `${link}${data?.name}_chequeImage_${data?.cheque_url[0].name}`
            // } else {
            //     data.cheque_url = ''
            // }
            if (data?.gst_url.length != 0) {
                await ImageUpload(data?.gst_url[0], "doc", "gstImage", data?.name)
                data.gst_url = `${link}${data?.name}_gstImage_${data?.gst_url[0].name}`
            } else {
                data.gst_url = ''
            }
            if (data?.fssai_url.length != 0) {
                await ImageUpload(data?.fssai_url[0], "doc", "fssaiImage", data?.name)
                data.fssai_url = `${link}${data?.name}_fssaiImage_${data?.fssai_url[0].name}`
            } else {
                data.fssai_url = ''
            }
            // if (data?.bus_card_url.length != 0) {
            //     await ImageUpload(data?.bus_card_url[0], "doc", "businessImage", data?.name)
            //     data.bus_card_url = `${link}${data?.name}_businessImage_${data?.bus_card_url[0].name}`
            // } else {
            //     data.bus_card_url = ''
            // }
            if (data?.odoc_url.length != 0) {
                await ImageUpload(data?.odoc_url[0], "doc", "otherImage", data?.name)
                data.odoc_url = `${link}${data?.name}_otherImage_${data?.odoc_url[0].name}`
            } else {
                data.odoc_url = ''
            }
        }
        else {                                        // for edit
            if (data?.pan_url.length != 0) {
                ImageUpload(data?.pan_url[0], "doc", "panImage", data?.name)
                data.pan_url = `${link}${data?.name}_panImage_${data?.pan_url[0].name}`
            } else {
                data.pan_url = props?.data?.pan_url
            }
            // if (data?.cheque_url.length != 0) {
            //     await ImageUpload(data?.cheque_url[0], "doc", "chequeImage", data?.name)
            //     data.cheque_url = `${link}${data?.name}_chequeImage_${data?.cheque_url[0].name}`
            // } else {
            //     data.cheque_url = props?.data?.cheque_url
            // }
            if (data?.gst_url.length != 0) {
                await ImageUpload(data?.gst_url[0], "doc", "gstImage", data?.name)
                data.gst_url = `${link}${data?.name}_gstImage_${data?.gst_url[0].name}`
            } else {
                data.gst_url = props?.data?.gst_url
            }
            if (data?.fssai_url.length != 0) {
                await ImageUpload(data?.fssai_url[0], "doc", "fssaiImage", data?.name)
                data.fssai_url = `${link}${data?.name}_fssaiImage_${data?.fssai_url[0].name}`
            } else {
                data.fssai_url = props?.data?.fssai_url
            }
            // if (data?.bus_card_url.length != 0) {
            //     await ImageUpload(data?.bus_card_url[0], "doc", "businessImage", data?.name)
            //     data.bus_card_url = `${link}${data?.name}_businessImage_${data?.bus_card_url[0].name}`
            // } else {
            //     data.bus_card_url = props?.data?.bus_card_url
            // }
            if (data?.odoc_url.length != 0) {
                await ImageUpload(data?.odoc_url[0], "doc", "otherImage", data?.name)
                data.odoc_url = `${link}${data?.name}_otherImage_${data?.odoc_url[0].name}`
            } else {
                data.odoc_url = props?.data?.odoc_url
            }
        }
        if (props.button !== 'edit') {   // for create
            try {
                setLoader(true)
                const response = await createUser(data);
                if (response?.code == 2002) {
                    setTimeout(() => {
                        reset();
                        setLoader(false)
                        toggle();
                        fetchData()
                        toast.success(response?.Message);
                    }, 1000);
                } else {
                    setLoader(false)
                    toast.error(response?.Message);
                    console.log('failed to create user')
                }
            } catch (error) {
                setLoader(false)
                console.log('error', error);
            }
        } else {                         // for edit
            setLoader(true)
            const response = await editUser(props?.data?.id, data)
            if (response) {
                setTimeout(() => {
                    toggle();
                    setLoader(false)
                    fetchData()
                    toast.success(response?.message);
                }, 1000);
            } else {
                console.log('failed to update user')
            }
        }
    }

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
                    Promo Code
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
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="">
                                                <div className="col-span-2 py-4 mx-4    ">
                                                    <div className="flex items-center space-x-4">
                                                        <label className={labelClass}>Promo Code:</label>
                                                        <div>
                                                            <label className="inline-flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    value="all_users"
                                                                    {...register('promo_code')}
                                                                    className="form-radio h-5 w-5 text-sky-400"
                                                                />
                                                                <span className="ml-2">For All Users</span>
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label className="inline-flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    value="first_time_users"
                                                                    {...register('promo_code')}
                                                                    className="form-radio h-5 w-5 text-sky-400"
                                                                />
                                                                <span className="ml-2">For First Time Users Only</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-4 mx-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  gap-x-3 gap-y-3 ">

                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Promo Code Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder=" Promo Code Name"
                                                            className={inputClass}
                                                            {...register(' Promo_Code_Name', { required: true })}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Promo Code Description
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Promo Code Description'
                                                            className={inputClass}
                                                            {...register('Promo_Code_Description')}
                                                        />
                                                        {errors.first_name && <Error title="Promo Code is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Promo Code Discount</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('Promo_Code_Discount', { required: true })}
                                                        >
                                                            <option value="" disabled selected>
                                                                Select
                                                            </option>
                                                            <option value="option1">Percent(%)</option>
                                                            <option value="option2">Flat</option>
                                                            {/* Add more options as needed */}
                                                        </select>
                                                        {errors.promo_bearer && <Error title="Promo Code Discount is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Promo Bearer</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('promo_bearer', { required: true })}
                                                        >
                                                            <option value="" disabled selected>
                                                                Select
                                                            </option>
                                                            <option value="option1">Admin</option>
                                                            <option value="option2">Restaurant</option>
                                                            {/* Add more options as needed */}
                                                        </select>
                                                        {errors.promo_bearer && <Error title="Promo Bearer is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Total No. Of Vouchers
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Total No. Of Vouchers"
                                                            className={inputClass}
                                                            {...register(' No. of Vouchers')}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Promo Code Validity
                                                        </label>
                                                        <input
                                                            type="date"
                                                            placeholder="Promo Code Validity"
                                                            className={inputClass}
                                                            {...register('Validity')}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            No. Of Remeeds
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="No. Of Remeeds"
                                                            className={inputClass}
                                                            {...register('Validity')}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Total Discount
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Total Discount"
                                                            className={inputClass}
                                                            {...register('Validity')}
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

export default AddPromoCode