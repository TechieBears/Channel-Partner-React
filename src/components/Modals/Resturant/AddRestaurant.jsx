import { Fragment, useEffect, useMemo, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../Errors/Error';
import { Edit } from 'iconsax-react';
import { addRestaurant, editRestaurant } from '../../../api';
import { toast } from 'react-toastify';
import { handleMobileNoNumericInput, validateCommision, validateEmail, validatePIN, validatePhoneNumber } from '../../Validations.jsx/Validations';

export default function AddRestaurant(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [emailError, setEmailError] = useState('');
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const Franchisee = useSelector((state) => state?.master?.Franchise);
    const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm();
    const SelectedFranchise = watch('created_by')
    const emailField = watch('email');

    const checkEmail = () => {
        if (props?.emails) {
            const isDuplicate = props.emails.some((item) => item === emailField);
            if (isDuplicate) {
                setEmailError('Email field is duplicate, please try another.');
            } else {
                setEmailError('');
            }
        }
    };

    // Call checkEmail whenever emailField changes
    useEffect(() => {
        console.log('called')
        checkEmail();
    }, [emailField]);
    const toggle = () => {
        setOpen(!isOpen)
    }
    const closeBtn = () => {
        toggle();
        reset()
        if (props?.button !== 'edit' && LoggedUserDetails?.role === 'admin') {
            reset({
                pincode: '',
                state: '',
                city: '',
            })
        }
    }

    useEffect(() => {
        // if (SelectedFranchise?.length > 0 && props?.button !== 'edit' && isOpen && LoggedUserDetails?.role === 'admin') {
        if (SelectedFranchise?.length > 0 && isOpen && LoggedUserDetails?.role === 'admin') {
            Franchisee.map((data) => {
                if (data?.user?.id == SelectedFranchise) {
                    setValue('pincode', data?.user?.pincode)
                    setValue('state', data?.user?.state)
                    setValue('city', data?.user?.city)
                }
            });
        }
    }, [SelectedFranchise]);


    const onSubmit = async (data) => {
        let updateData
        if (LoggedUserDetails?.role == 'franchise') {
            updateData = {
                ...data,
                "vendor_type": 'restaurant',
                'created_by': LoggedUserDetails?.userid
            }
        } else {
            updateData = {
                ...data,
                "vendor_type": 'restaurant',
            }
        }
        if (props?.button == 'edit') {
            try {
                editRestaurant(props?.data?.user?.id, updateData).then(res => {
                    if (res?.message == 'restaurant edited successfully') {
                        toast.success('Restaurant edited Successfully')
                        props?.getAllRestaurant()
                        toggle()
                    }
                })
            } catch (error) {
                console.log('error', error)
            }
        } else {
            try {
                addRestaurant(updateData).then(res => {
                    if (res.message == 'restaurant added successfully') {
                        toast.success('Resuraurant added successfully')
                        toggle();
                        reset();
                        props?.getAllRestaurant()
                    } else {
                        toast.error('Error adding restaurant')
                    }
                })
            } catch (error) {
                console.log('Error adding restaurant', error)
            }
        }
    }
    useEffect(() => {
        if (props?.button === 'edit') {
            reset({
                'first_name': props?.data?.user?.first_name,
                'last_name': props?.data?.user?.last_name,
                'address': props?.data?.user?.address,
                'city': props?.data?.user?.city,
                'state': props?.data?.user?.state,
                'pincode': props?.data?.user?.pincode,
                'email': props?.data?.user?.email,
                'phone_no': props?.data?.user?.phone_no,
                'created_by': props?.data?.created_by?.id,
                'insta_commison_percentage': props?.data?.insta_commison_percentage
            });
        }
    }, []);
    useEffect(() => {
        if (LoggedUserDetails?.role === 'franchise' && props?.button !== 'edit') {
            reset({
                pincode: LoggedUserDetails?.pincode,
                city: LoggedUserDetails?.city,
                state: LoggedUserDetails?.state,
            })
        }
    }, [LoggedUserDetails])
    return (
        <>
            {
                props?.button == 'edit' ? <button className={`bg-yellow-100 p-1 rounded-lg`} onClick={() => setOpen(true)}>
                    <Edit size={20} className='text-yellow-500' />
                </button> : <button className={`${formBtn1} flex`} onClick={() => setOpen(true)}>
                    {/* <Add className='text-white' /> */}
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
                                <Dialog.Panel className="w-full max-w-6xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">

                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="grid py-4 mx-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-3 customBox">
                                                    <h3 className='sm:col-span-1 md:col-span-1 lg:col-span-4 text-xl font-semibold'>Personal Details</h3>
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
                                                    {
                                                        LoggedUserDetails?.role == 'admin' &&
                                                        <div className="">
                                                            <label className={labelClass}>Select Franchisee*</label>
                                                            <select
                                                                className={inputClass}

                                                                {...register("created_by", { required: true })}
                                                            >
                                                                <option value="">Select Franchisee</option>
                                                                {Franchisee?.map(franchisee => (
                                                                    <option key={franchisee?.user?.id} value={franchisee?.user?.id}>
                                                                        {franchisee?.user?.id}   {franchisee?.user?.first_name + " (" + franchisee?.user?.pincode + ")"}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.created_by && (
                                                                <Error title="Franchisee is Required*" />
                                                            )}
                                                        </div>
                                                    }
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Email*
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder='Email'
                                                            className={inputClass}
                                                            {...register('email', { required: "Email is required*", validate: validateEmail })}
                                                        />
                                                        {errors.email && <Error title={errors?.email?.message} />}
                                                        {
                                                            emailError != '' && <Error title={emailError} />
                                                        }
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
                                                                {...register('password', { required: true, pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/ })}
                                                            />
                                                            {errors.password && <Error title={errors?.password ? 'Password should contain one special character and 8 digit long and must be combination of number and alphabets' : 'Password is required'} />}
                                                        </div>
                                                    }
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Phone Number*
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            maxLength={10}
                                                            placeholder='+91'
                                                            className={inputClass}
                                                            onKeyDown={handleMobileNoNumericInput}
                                                            {...register('phone_no', { required: "Phone Number is required", validate: validatePhoneNumber })}
                                                        />
                                                        {errors.phone_no && <Error title={errors?.phone_no?.message} />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='City'
                                                            className={inputClass}
                                                            readOnly={true}
                                                            {...register('city', { required: true })}
                                                        />
                                                        {errors.city && <Error title='Restaurant City is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            State*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='State'
                                                            className={inputClass}
                                                            readOnly={true}
                                                            {...register('state', { required: true })}
                                                        />
                                                        {errors.state && <Error title='Restaurant State is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Address*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Restaurant Address'
                                                            className={inputClass}
                                                            {...register('address', { required: true })}
                                                        />
                                                        {errors.address && <Error title='Restaurant Address is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            PIN Code*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength={6}
                                                            placeholder='PIN Code'
                                                            className={inputClass}
                                                            readOnly={true}
                                                            {...register('pincode', { required: "Pincode is required*", validate: validatePIN })}
                                                        />
                                                        {errors.pincode && <Error title={errors?.pincode?.message} />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Insta Commision (%)*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Insta Commision (%)'
                                                            className={inputClass}
                                                            min={0}
                                                            {...register('insta_commison_percentage', { required: true, validate: validateCommision })}
                                                        />
                                                        {errors.insta_commison_percentage && <Error title='Insta Commision is Required*' />}
                                                    </div>
                                                </div>
                                            </div>
                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
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
