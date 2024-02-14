import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { useForm } from 'react-hook-form';
import { addDeliveryBoy, createUser, editUser, getUser } from '../../../api';
import { Edit } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { setUserList } from '../../../redux/Slices/userSlice';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { toast } from 'react-toastify';
import query from 'india-pincode-search';

function AddDriverFrom(props) {
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
    // ============================ file uplaod watch ===============================
    const role = watch('role')
    const fssai_watch = watch('fssai_url')
    const gst_watch = watch('gst_url')
    const odoc_watch = watch('odoc_url')
    const pan_watch = watch('pan_url')
    const pincodeWatch = watch('pincode')

    // ===================== Custom validation function for a 6-digit PIN code ================
    const validatePIN = (value) => {
        const pattern = /^[0-9]{6}$/;
        if (pattern.test(value)) {
            return true;
        }
        return 'Pincode must be 6-digit';
    };

    // =================== Custom validation function for a 10-digit US phone number ============
    const validatePhoneNumber = (value) => {
        const pattern = /^\d{10}$/;
        if (pattern.test(value)) {
            return true;
        }
        return 'Phone Number must be 10-digit';
    };
    // ==================== Custom validation function for email ========================
    const validateEmail = (value) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (emailPattern.test(value)) {
            return true;
        }
        return 'Invalid email address';
    };
    const validateGST = (value) => {
        // GST pattern for India
        const gstPattern = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

        if (gstPattern.test(value)) {
            return true;
        }

        return 'Invalid GST number*';
    };
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

    // ============================= form submiting ======================================
    const onSubmit = async (data) => {
        if (props.button != 'edit') {                 // for create
            if (data?.bank_passbook.length != 0) {
                await ImageUpload(data?.bank_passbook[0], "doc", "passbookImage", data?.name)
                data.bank_passbook = `${link}${data?.name}_passbookImage_${data?.bank_passbook[0].name}`
            } else {
                data.bank_passbook = ''
            }
            if (data?.address_proof.length != 0) {
                await ImageUpload(data?.address_proof[0], "doc", "addressproofImage", data?.name)
                data.address_proof = `${link}${data?.name}_addressproofImage_${data?.address_proof[0].name}`
            } else {
                data.address_proof = ''
            }
        }
        else {                                        // for edit
            if (data?.bank_passbook.length != 0) {
                ImageUpload(data?.bank_passbook[0], "doc", "passBookImage", data?.name)
                data.bank_passbook = `${link}${data?.name}_passBookImage_${data?.bank_passbook[0].name}`
            } else {
                data.bank_passbook = props?.data?.bank_passbook
            }
            if (data?.address_proof.length != 0) {
                await ImageUpload(data?.address_proof[0], "doc", "addressproofImage", data?.name)
                data.address_proof = `${link}${data?.name}_addressproofImage_${data?.address_proof[0].name}`
            } else {
                data.address_proof = props?.data?.address_proof
            }
        }
        if (props.button !== 'edit') {   // for create
            try {
                setLoader(true)
                // const response = await createUser(data);
                addDeliveryBoy(data).then((res) => {
                    if (res?.code == 2002) {
                        setTimeout(() => {
                            reset();
                            setLoader(false)
                            toggle();
                            fetchData()
                            toast.success(res?.Message);
                        }, 1000);
                    } else {
                        setLoader(false)
                        toast.error(res?.Message);
                        console.log('failed to create delivery partner')
                    }
                })
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
                console.log('failed to update delivery partner')
            }
        }
    }

    // ============================== close modals ======================================
    const closeBtn = () => {
        toggle();
        reset();
        setLoader(false);
    }
    // ============================== Reseting data ======================================
    const fillData = () => {
        reset({
            "first_name": props?.data?.first_name,
            "last_name": props?.data?.last_name,
            "email": props?.data?.email,
            "pincode": props?.data?.pincode,
            "phone_no": props?.data?.phone_no,
            "address": props?.data?.address,
            "state": props?.data?.state,
            "city": props?.data?.city,
            "date_of_birth": props?.data?.date_of_birth,
            "gender": props?.data?.gender,
            "vehicle_type": props?.data?.vehicle_type,
            "driver_license": props?.data?.driver_license,
            "vehicle_rc": props?.data?.vehicle_rc,
            "bank_name": props?.data?.bank_name,
            "accounr_number": props?.data?.accounr_number,
            "ifsc_code": props?.data?.ifsc_code,
            "adhar_card": props?.data?.adhar_card,
            "pan_card": props?.data?.pan_card,
        })
    }

    // useMemo(() => {
    //     if (pincodeWatch != undefined && pincodeWatch?.length == 6) {
    //         const pincode = query?.search(pincodeWatch);
    //         if (pincode.length > 0) {
    //             setValue('city', pincode[0]?.city)
    //             setValue('state', pincode[0]?.state)
    //         } else {
    //             setValue('city', '')
    //             setValue('state', '');
    //         }

    //     } else (
    //         setValue('city', ''),
    //         setValue('state', '')
    //     )
    // }, [pincodeWatch])

    // useEffect(() => {
    //     if (props.button == "edit") {
    //         fillData()
    //     }
    // }, [])

    return (
        <>

            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Delivery Partner
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
                                                <div className="text-center mt-8">
                                                    <div className="relative inline-block">
                                                        <img
                                                            className="h-24 w-24 rounded-full border object-cover mx-auto"
                                                            src="/src/assets/user.webp"
                                                            alt="User_Profile"
                                                        />
                                                        <label
                                                            htmlFor="profilePicture"
                                                            className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-4 w-4 text-gray-600"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M12 4v16m8-8H4"
                                                                />
                                                            </svg>
                                                        </label>
                                                        <input
                                                            id="profilePicture"
                                                            type="file"
                                                            accept="image/jpeg,image/jpg,image/png"
                                                            className="hidden"
                                                            {...register('profile_picture')}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="py-4 mx-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  gap-x-3 gap-y-3 ">
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
                                                            Last Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Last Name'
                                                            className={inputClass}
                                                            {...register('last_name', { required: true })}
                                                        />
                                                        {errors.last_name && <Error title="Last Name is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Email*
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder='Email'
                                                            className={inputClass}
                                                            {...register('email', { required: true, validate: validateEmail })}
                                                        />
                                                        {errors.email && <Error title="Email is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Password*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('password', { required: true, })}
                                                        />
                                                        {errors.password && <Error title="Email is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Pincode*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            maxLength={6}
                                                            placeholder='Pincode'
                                                            className={inputClass}
                                                            {...register('pincode', { required: true, })}
                                                        />
                                                        {errors.pincode && <Error title="Pincode is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength={6}
                                                            placeholder='City'
                                                            className={inputClass}
                                                            {...register('city', { required: true, })}
                                                        />
                                                        {errors.city && <Error title="City is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            State*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength={6}
                                                            placeholder='State'
                                                            className={inputClass}
                                                            {...register('state', { required: true, })}
                                                        />
                                                        {errors.state && <Error title="state is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Date Of Birth*
                                                        </label>
                                                        <input
                                                            type="date"
                                                            placeholder='Date Of Birth'
                                                            className={inputClass}
                                                            {...register('date_of_birth', { required: true, })}
                                                        />
                                                        {errors.date_of_birth && <Error title="Date Of Birth is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Gender*
                                                        </label>

                                                        <select
                                                            className={inputClass}
                                                            {...register('date_of_birth', { required: true, })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='Male'>Male</option>
                                                            <option value='Female'>Female</option>
                                                        </select>
                                                        {errors.date_of_birth && <Error title="Date Of Birth is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Driving License Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Driving License Number'
                                                            className={inputClass}
                                                            {...register('driver_license', { required: true })}
                                                        />
                                                        {errors.driver_license && <Error title='Driving License Number is required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Vehicle Type*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Vehicle Type'
                                                            className={inputClass}
                                                            {...register('vehicle_type', { required: true, })}
                                                        />
                                                        {errors.vehicle_type && <Error title='Vehicle Type is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Vehicle RC*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Vehicle RC'
                                                            className={inputClass}
                                                            {...register('vehicle_rc', { required: true, })}
                                                        />
                                                        {errors.vehicle_rc && <Error title='Vehicle RC is required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Bank Name"
                                                            className={inputClass}
                                                            {...register('bank_name', { required: true })}
                                                        />
                                                        {errors.bank_name && <Error title='Bank Name is required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Account Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Account Number'
                                                            className={inputClass}
                                                            {...register('account_number', { required: true })}
                                                        />
                                                        {errors.account_number && <Error title="Account Number is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            IFSC Code
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='IFSC Code'
                                                            className={inputClass}
                                                            {...register('ifsc_code', { required: true })}
                                                        />
                                                        {errors?.ifsc_code && <Error title='IFSC Code is required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Aadhar Card Number'
                                                            className={inputClass}
                                                            {...register('adhar_card', { required: true })}
                                                        />
                                                        {errors?.adhar_card && <Error title='Aadhar Card Number is required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            PAN Card Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='PAN Card Number'
                                                            className={inputClass}
                                                            {...register('pan_card', { required: true })}
                                                        />
                                                        {errors.pan_card && <Error title='PAN Card Number is required' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Address Proof Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("address_proof", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.address_proof != '' && props?.data.address_proof != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.address_proof?.split('/').pop()}
                                                        </label>}
                                                        {errors.bank_passbook && <Error title='Address Proof Image is required*' />}
                                                    </div>                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Bank PassBook Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("bank_passbook", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.bank_passbook != '' && props?.data.bank_passbook != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.bank_passbook?.split('/').pop()}
                                                        </label>}
                                                        {errors.bank_passbook && <Error title='Bank PassBook Image is required*' />}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Is Activated</label>
                                                        <select
                                                            {...register('is_activated', { required: true })}
                                                            className={inputClass}
                                                        >
                                                            <option value={true}>Yes</option>
                                                            <option value={false}>no</option>
                                                        </select>
                                                        {errors?.is_activated && <Errors title='Acitvated Status is required' />}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Driver Rating's</label>
                                                        <select
                                                            {...register('driver_rating', { required: true })}
                                                            className={inputClass}
                                                        >
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4}>4</option>
                                                            <option value={5}>5</option>
                                                        </select>
                                                        {errors?.driver_rating && <Errors title='Acitvated Status is required' />}
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

export default AddDriverFrom