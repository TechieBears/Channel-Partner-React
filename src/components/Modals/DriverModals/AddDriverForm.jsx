import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useState } from 'react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { useForm } from 'react-hook-form';
import { editUser, createDeliveryBoy, editDriverBoy } from '../../../api';
import { Edit } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { toast } from 'react-toastify';
import { ImageUpload, deliveryBoylink } from '../../../env';
import { setFranchise } from "../../../redux/Slices/masterSlice";
import "../../../redux/Slices/loginSlice";
import { GetFranchisee } from "../../../api";
import { validateEmail, validatePIN, validatePhoneNumber } from '../../Validations.jsx/Validations';




function AddDriverFrom(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const Franchisee = useSelector((state) => state?.master?.Franchise);
    const toggle = () => setIsOpen(!isOpen);
    const user = useSelector((state) => state?.user?.FranchiseeDetails);
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    // // ========================= fetch data from api ==============================
    const FranchiseeDetails = () => {
        try {
            GetFranchisee().then((res) => {
                dispatch(setFranchise(res));
            });
        } catch (error) {
            console.log(error);
        }
    };
    // ============================== close modals ======================================
    const closeBtn = () => {
        toggle();
        reset();
        setLoader(false);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 100 * 1024 * 1024) {
            event.target.value = null;
            alert("File size exceeds 100MB limit");
            return;
        }
    };

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
    const pan_watch = watch('pan_url')
    const adhar_watch = watch('adhar_url')


    // ============================= form submiting ======================================
    const onSubmit = async (data) => {
        console.log(data)
        setLoader(true)
        if (props.button != 'edit') {    // for create
            if (data?.bank_passbook.length != 0) {
                await ImageUpload(data?.bank_passbook[0], "deliveryboy", "BankPassbook", data?.first_name)
                data.bank_passbook = `${deliveryBoylink}${data?.first_name}_BankPassbook_${data?.bank_passbook[0].name}`
            } else {
                data.bank_passbook = ''
            }
            if (data?.video_url.length != 0) {
                await ImageUpload(data?.video_url[0], "deliveryboy", "AddressProof", data?.first_name)
                data.video_url = `${deliveryBoylink}${data?.first_name}_AddressProof_${data?.video_url[0].name}`
            } else {
                data.video_url = ''
            }
            if (data?.profile_pic.length != 0) {
                await ImageUpload(data?.profile_pic[0], "deliveryboy", "ProfileImage", data?.first_name)
                data.profile_pic = `${deliveryBoylink}${data?.first_name}_ProfileImage_${data?.profile_pic[0].name}`
            } else {
                data.profile_pic = ''
            }
            if (data?.adhar_url.length != 0) {
                await ImageUpload(data?.adhar_url[0], "deliveryboy", "adharImage", data?.first_name)
                data.adhar_url = `${deliveryBoylink}${data?.first_name}_adharImage_${data?.adhar_url[0].name}`
              } else {
                data.adhar_url = ''
              }
              if (data?.pan_url.length != 0) {
                await ImageUpload(data?.pan_url[0], "deliveryboy", "panImage", data?.first_name)
                data.pan_url = `${deliveryBoylink}${data?.first_name}_panImage_${data?.pan_url[0].name}`
              } else {
                data.pan_url = ''
              }
        }
        else {          // for edit
            if (data?.bank_passbook.length != props?.data.bank_passbook) {
                await ImageUpload(data?.bank_passbook[0], "deliveryboy", "BankPassbook", data?.first_name)
                data.bank_passbook = `${deliveryBoylink}${data?.first_name}_BankPassbook_${data?.bank_passbook[0]?.name}`
            } else {
                data.bank_passbook = props?.data.bank_passbook
            }
            if (data?.video_url.length != props?.data?.video_url) {
                await ImageUpload(data?.video_url[0], "deliveryboy", "AddressProof", data?.first_name)
                data.video_url = `${deliveryBoylink}${data?.first_name}_AddressProof_${data?.video_url[0]?.name}`
            } else {
                data.video_url = props?.data?.video_url
            }
            if (data?.profile_pic.length != props?.data?.user?.profile_pic) {
                await ImageUpload(data?.profile_pic[0], "deliveryboy", "ProfileImage", data?.first_name)
                data.profile_pic = `${deliveryBoylink}${data?.first_name}_ProfileImage_${data?.profile_pic[0]?.name}`
            } else {
                data.profile_pic = props?.data?.user?.profile_pic
            }
            if (props?.data?.adhar_url != data?.adhar_url) {
                await ImageUpload(data?.adhar_url[0], "deliveryboy", "adharImage", data?.first_name)
                data.adhar_url = `${deliveryBoylink}${data?.first_name}_adharImage_${data?.adhar_url[0].name}`
              } else {
                data.adhar_url = props?.data?.adhar_url
              }
              if (props?.data?.pan_url != data?.pan_url) {
                await ImageUpload(data?.pan_url[0], "deliveryboy", "panImage", data?.first_name)
                data.pan_url = `${deliveryBoylink}${data?.first_name}_panImage_${data?.pan_url[0].name}`
              } else {
                data.pan_url = props?.data?.pan_url
              }
        }
        if (props.button != 'edit') {   // for create
            try {
                // setLoader(true)
                if (data.job_type === "Part Time (4-5 Hours/Day)") {
                    data.job_type = {
                        "subTitle": "4-5 hours per day",
                        "title": "Part Time"
                    };
                } else if (data.job_type === "Full Time (9 Hours/Day)") {
                    data.job_type = {
                        "subTitle": "9 hours per day",
                        "title": "Full Time"
                    };
                }
                if (data.shift === "Morning 9AM to Afternoon 1PM 4 Hours") {
                    data.shift = {
                        "subTitle": "4 hours",
                        "title": "Morning 9AM to Afternoon 1PM"
                    };
                } else if (data.shift === "Afternoon 4PM to Evening 8PM 4 Hours") {
                    data.shift = {
                        "subTitle": "4 hours",
                        "title": "Afternoon 4PM to Evening 8PM"
                    };
                }

                let requestData;
                if (LoggedUserDetails?.role == 'franchise') {
                    const additionalPayload = { created_by: user?.user?.id };
                    requestData = { ...data, ...additionalPayload };
                } else if (LoggedUserDetails?.role == 'admin') {
                    requestData = { ...data, created_by: user?.user?.id };
                }

                const response = await createDeliveryBoy(requestData);
                if (response?.message == "delivery boy added successfully") {
                    setTimeout(() => {
                        reset();
                        setLoader(false)
                        toggle();
                        props?.DeliveryBoyDetails()
                        toast.success(response?.message);
                    }, 1000);
                } else {
                    setLoader(false)
                    toast.error(response?.message);
                }
            } catch (error) {
                setLoader(false)
                console.log('error', error);
            }
        } else {            // for edit
            setLoader(true)
            const response = await editDriverBoy(props?.data?.user?.id, data)
            if (response?.message == "delivery boy edited successfully") {
                setTimeout(() => {
                    toggle();
                    setLoader(false)
                    props?.DeliveryBoyDetails()
                    toast.success(response?.message);
                }, 1000);
            } else {
                setLoader(false)
                console.log('failed to update user')
            }
        }
    }

    // ============================== Reseting data ======================================
    const fillData = () => {
        reset({
            "first_name": props?.data?.user?.first_name,
            "last_name": props?.data?.user?.last_name,
            "email": props?.data?.user?.email,
            "pincode": props?.data?.user?.pincode,
            "phone_no": props?.data?.user?.phone_no,
            "address": props?.data?.user?.address,
            "state": props?.data?.user?.state,
            "city": props?.data?.user?.city,
            "date_of_birth": props?.data?.user?.date_of_birth,
            "gender": props?.data?.user?.gender,
            "vehicle_type": props?.data?.vehicle_type,
            "driver_license": props?.data?.driver_license,
            "vehicle_rc": props?.data?.vehicle_rc,
            "bank_name": props?.data?.bank_name,
            "account_number": props?.data?.account_number,
            "ifsc_code": props?.data?.ifsc_code,
            "adhar_card": props?.data?.adhar_card,
            "pan_card": props?.data?.pan_card,
            "week_off": props?.data?.week_off,
            // "shift": shift?.title,
            // "job_type": jobType?.title,
            "created_by": props?.data?.created_by?.id,
        })
        const inputString = props?.data?.job_type;
        const jsonString = inputString.replace(/'/g, '"');
        const keyValuePairs = jsonString.match(/"([^"]+)":\s*"([^"]+)"/g);
        if (keyValuePairs) {
            const parsedObject = {};
            keyValuePairs.forEach(pair => {
                const [key, value] = pair.split(':').map(str => str.trim().replace(/"/g, ''));
                parsedObject[key] = value;
            });
            if (parsedObject.subTitle == '4-5 hours per day') {
                setValue('job_type', 'Part Time (4-5 Hours/Day)')
            } else {
                setValue('job_type', 'Full Time (9 Hours/Day)')
            }
            if (parsedObject?.subTitle == "Morning 9AM to Afternoon 1PM") {
                setValue('shift', 'Morning 9AM to Afternoon 1PM 4 Hours')
            } else {
                setValue('shift', 'Afternoon 4PM to Evening 8PM 4 Hours')
            }
        } else {
            console.error("No key-value pairs found in the input string.");
        }
    }

    useEffect(() => {
        if (props.button == "edit") {
            fillData()
        }
        FranchiseeDetails()
    }, [])

    useEffect(() => {
        if (LoggedUserDetails?.role === 'franchise') {
            reset({
                pincode: LoggedUserDetails?.pincode,
                state: LoggedUserDetails?.state,
                city: LoggedUserDetails?.city,
            })
        }
    }, [LoggedUserDetails])

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
                                        Add Delivery Boy
                                    </Dialog.Title>

                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="">
                                                <h1 className='pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Basic Details:</h1>
                                                <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-3 gap-y-3 ">

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
                                                        <label className={labelClass} htmlFor="main_input">Profile Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("profile_pic", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data?.user?.profile_pic != '' && props?.data?.user?.profile_pic != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.user?.profile_pic?.split('/').pop()}
                                                        </label>}
                                                        {errors.profile_pic && <Error title='Profile Image is required*' />}
                                                    </div>
                                                    {
                                                        LoggedUserDetails?.role == 'admin' &&
                                                        <div className="">
                                                            <label className={labelClass}>Select Franchisee*</label>
                                                            <select
                                                                className={inputClass}
                                                                {...register("created_by", { required: true })}
                                                            >
                                                                <option value="">--Select Franchisee--</option>
                                                                {Franchisee?.map(franchisee => (
                                                                    <option key={franchisee?.user?.id} value={franchisee?.user?.id}>
                                                                        {franchisee?.user?.first_name + " (" + franchisee?.user?.pincode + ")"}
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
                                                            {...register('email', { required: true, validate: validateEmail })}
                                                        />
                                                         {errors.email && (
                                                            <Error title={errors?.email?.message ? errors?.email?.message : 'Email is Required'} />
                                                        )}
                                                        {/* {errors.email && <Error title={errors?.email?.message} />} */}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Password*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Password'
                                                            className={inputClass}
                                                            {...register('password', { required: true, })}
                                                        />
                                                        {errors.password && <Error title="Password is required*" />}
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>Address*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Address"
                                                            className={inputClass}
                                                            {...register("address", { required: true })}
                                                        />
                                                        {errors.address && (
                                                            <Error title="Address is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Pincode*
                                                        </label>
                                                        <input
                                                            type='number'
                                                            maxLength={6}
                                                            placeholder='Pincode'
                                                            className={inputClass}
                                                            readOnly={LoggedUserDetails?.role === 'franchise' ? true : false}
                                                            {...register('pincode', { required: "Pincode is required*", validate: validatePIN })}
                                                        />
                                                        {errors.pincode && <Error title={errors?.pincode?.message} />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            // maxLength={6}
                                                            placeholder='City'
                                                            className={inputClass}
                                                            readOnly={LoggedUserDetails?.role === 'franchise' ? true : false}
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
                                                            // maxLength={6}
                                                            placeholder='State'
                                                            className={inputClass}
                                                            readOnly={LoggedUserDetails?.role === 'franchise' ? true : false}
                                                            {...register('state', { required: true, })}
                                                        />
                                                        {errors.state && <Error title="State is required*" />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Phone Number*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            maxLength={10}
                                                            placeholder='+91'
                                                            className={inputClass}
                                                            {...register('phone_no', { required: true, validate: validatePhoneNumber })}
                                                        />
                                                         {errors.phone_no && (
                                                            <Error title={errors?.phone_no?.message ? errors?.phone_no?.message : 'Phone Number is Required'} />
                                                            )}
                                                        {/* {errors.phone_no && <Error title={errors?.phone_no?.message} />} */}
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
                                                            {...register('gender', { required: true, })}
                                                        >
                                                            <option value=''>--Select--</option>
                                                            <option value='Male'>Male</option>
                                                            <option value='Female'>Female</option>
                                                            <option value='Other'>Other</option>
                                                        </select>
                                                        {errors.gender && <Error title="Gender is required*" />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Marital Status*
                                                        </label>

                                                        <select
                                                            className={inputClass}
                                                            {...register('marital_status', { required: true, })}
                                                        >
                                                            <option value=''>--Select--</option>
                                                            <option value='Single'>Single</option>
                                                            <option value='Married'>Married</option>
                                                        </select>
                                                        {errors.marital_status && <Error title="Marital Status is required*" />}
                                                    </div> */}
                                                </div>

                                                <h1 className='pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Additional Details:</h1>
                                                <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-3 gap-y-3">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Driving License Number*
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
                                                        <label className={labelClass}>  Vehicle Type*</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register("vehicle_type", { required: true })}
                                                        >
                                                            <option value="">--Select Type--</option>
                                                            <option value="Cycle">Cycle</option>
                                                            <option value="Bike">Bike</option>
                                                            <option value="Electric Bike">Electric Bike</option>
                                                            <option value="I don't own a vehicle">I don't own a vehicle</option>
                                                        </select>
                                                        {errors.vehicle_type && (
                                                            <Error title="Vehicle Type is Required*" />
                                                        )}
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
                                                        <label className={labelClass}>Job Type*</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register("job_type", { required: true })}
                                                        >
                                                            <option value="">--Select Type--</option>
                                                            <option value="Part Time (4-5 Hours/Day)">Part Time (4-5 Hours/Day)</option>
                                                            <option value="Full Time (9 Hours/Day)">Full Time (9 Hours/Day)</option>
                                                        </select>
                                                        {errors.job_type && (
                                                            <Error title="Job Type is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Select Shift*</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register("shift", { required: true })}
                                                        >
                                                            <option value="">--Select Type--</option>
                                                            <option value="Morning 9AM to Afternoon 1PM 4 Hours">Morning 9AM to Afternoon 1PM (4 Hours)</option>
                                                            <option value="Afternoon 4PM to Evening 8PM 4 Hours">Afternoon 4PM to Evening 8PM (4 Hours)</option>
                                                        </select>
                                                        {errors.shift && (
                                                            <Error title="Shift Type is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Select WeekOff*</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register("week_off", { required: true })}
                                                        >
                                                            <option value="">--Select Type--</option>
                                                            <option value="Monday">Monday</option>
                                                            <option value="Tuesday">Tuesday</option>
                                                            <option value="Wednesday">Wednesday</option>
                                                            <option value="Thursday">Thursday</option>
                                                            <option value="Friday">Friday</option>
                                                            <option value="Saturday">Saturday</option>
                                                            <option value="Sunday">Sunday</option>
                                                        </select>
                                                        {errors.shift && (
                                                            <Error title="WeekOff is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="video_input">Upload Video*</label>
                                                        <input
                                                            className={fileinput}
                                                            id="video_input"
                                                            type='file'
                                                            accept='video/mp4,video/x-m4v,video/*'
                                                            placeholder='Upload Video...'
                                                            {...register("video_url", { required: props.button === 'edit' ? false : true })}
                                                            onChange={handleFileChange}
                                                        />
                                                        {props?.button == 'edit' && props?.data?.video_url != '' && props?.data?.video_url != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.video_url?.split('/').pop()}
                                                        </label>}
                                                        {errors.video_url && <Error title='Video file is required*' />}
                                                    </div>
                                                </div>

                                                <h1 className='pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Bank Details:</h1>
                                                <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-3 gap-y-3">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Pan Card
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='PAN'
                                                                className={inputClass}
                                                                {...register('pan_card', { required: true })}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='pan' className={`${pan_watch?.length || props?.data?.pan_url ? "bg-sky-400 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-sky-400 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="pan"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("pan_url", { required: true })} />
                                                            </div>
                                                        </div>
                                                            {errors.pan_card && <Error title='PAN Card Number & Image is required' />}
                                                    </div>
                                                    {/* <div className="">
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
                                                    </div> */}
                                                     <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card Number*
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="number"
                                                                maxLength={12}
                                                                placeholder='Aadhar Card Number'
                                                                className={inputClass}
                                                                {...register('adhar_card', { required: true })}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='adhar' className={`${adhar_watch?.length || props?.data?.adhar_url ? "bg-sky-400 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-sky-400 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="pan"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("adhar_url", { required: true })} />
                                                            </div>
                                                        </div>
                                                            {errors.adhar_card && <Error title='Aadhar Card Number & Image is required' />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Aadhar Card Number'
                                                            className={inputClass}
                                                            {...register('adhar_card', { required: true })}
                                                        />
                                                        {errors?.adhar_card && <Error title='Aadhar Card Number is required' />}
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Name*
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
                                                            Bank Account Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Account Number'
                                                            className={inputClass}
                                                            {...register('account_number', { required: true })}
                                                        />
                                                        {errors.account_number && <Error title="Bank Account Number is required*" />}
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
                                                        {errors?.ifsc_code && <Error title='IFSC Code is required' />}
                                                    </div>
                                                    <div className="">
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
                                                </div>
                                            </div>
                                            {/* =============== footer section ==================== */}
                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
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