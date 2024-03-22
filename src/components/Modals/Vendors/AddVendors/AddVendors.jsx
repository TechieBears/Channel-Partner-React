import { Fragment, useRef, useState, useMemo, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import LoadBox from '../../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add, Edit } from 'iconsax-react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../../utils/CustomClass';
import { GetFranchiseeVendors, CreateFranchiseeVendors, EditFranchiseeVendors } from "../../../../api";
import { setFranchiseVendors } from "../../../../redux/Slices/masterSlice";
import { setLoggedUser, setLoggedUserDetails, setRoleIs, setFranchiseeDetails } from '../../../../redux/Slices/loginSlice';
import { useDispatch, useSelector } from "react-redux";
import { ImageUpload, vendorlink } from "../../../../env";
import { toast } from 'react-toastify';
import { handleMobileNoNumericInput, validateEmail, validateGST, validatePANCard, validatePIN, validatePhoneNumber } from '../../../Validations.jsx/Validations';
import moment from 'moment';
import { validateAadharCard } from './../../../Validations.jsx/Validations';



export default function AddVendors(props) {
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const Franchisee = useSelector((state) => state?.master?.Franchise);
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();
    const SelectedFranchise = watch('created_by')
    const gstNumber = watch('gst_number');



    const toggle = () => setOpen(!isOpen)

    const pan_watch = watch('pan_url')
    const adhar_watch = watch('adhar_url')
    const gst_watch = watch('gst_url')


    const closeBtn = () => {
        toggle();
        reset();
        if (LoggedUserDetails?.role === 'franchise') {
            setValue('pincode', LoggedUserDetails?.pincode)
            setValue('state', LoggedUserDetails?.state)
            setValue('city', LoggedUserDetails?.city)
        }
    }
    const FranchiseeVendors = () => {
        try {
            GetFranchiseeVendors().then((res) => {
                dispatch(setFranchiseVendors(res));
            });
        } catch (error) {
            console.log(error);
        }
    };
    // ============================= form submiting ======================================
    const onSubmit = async (data) => {
        const shopStartTime = moment(data?.shop_start_time, 'HH:mm').format('hh:mm A');
        const shopEndTime = moment(data?.shop_end_time, 'HH:mm').format('hh:mm A');
        data.shop_start_time = shopStartTime;
        data.shop_end_time = shopEndTime;

        if (props.button != 'edit') {    // for create
            if (data?.bank_passbook.length != 0) {
                await ImageUpload(data?.bank_passbook[0], "vendor", "BankPassbook", data?.first_name)
                data.bank_passbook = `${vendorlink}${data?.first_name}_BankPassbook_${data?.bank_passbook[0].name}`
            } else {
                data.bank_passbook = ''
            }
            if (data?.address_proof.length != 0) {
                await ImageUpload(data?.address_proof[0], "vendor", "AddressProof", data?.first_name)
                data.address_proof = `${vendorlink}${data?.first_name}_AddressProof_${data?.address_proof[0].name}`
            } else {
                data.address_proof = ''
            }
            if (data?.profile_pic.length != 0) {
                await ImageUpload(data?.profile_pic[0], "vendor", "ProfileImage", data?.first_name)
                data.profile_pic = `${vendorlink}${data?.first_name}_ProfileImage_${data?.profile_pic[0].name}`
            } else {
                data.profile_pic = ''
            }
            if (data?.hawker_shop_photo.length != 0) {
                await ImageUpload(data?.hawker_shop_photo[0], "vendor", "shopImage", data?.first_name)
                data.hawker_shop_photo = `${vendorlink}${data?.first_name}_shopImage_${data?.hawker_shop_photo[0].name}`
            } else {
                data.hawker_shop_photo = ''
            }
            if (data?.gst_url.length != 0) {
                await ImageUpload(data?.gst_url[0], "vendor", "GstImage", data?.first_name)
                data.gst_url = `${vendorlink}${data?.first_name}_GstImage_${data?.gst_url[0].name}`
              } else {
                data.gst_url = ''
              }
              if (data?.adhar_url.length != 0) {
                await ImageUpload(data?.adhar_url[0], "vendor", "adharImage", data?.first_name)
                data.adhar_url = `${vendorlink}${data?.first_name}_adharImage_${data?.adhar_url[0].name}`
              } else {
                data.adhar_url = ''
              }
              if (data?.pan_url.length != 0) {
                await ImageUpload(data?.pan_url[0], "vendor", "panImage", data?.first_name)
                data.pan_url = `${vendorlink}${data?.first_name}_panImage_${data?.pan_url[0].name}`
              } else {
                data.pan_url = ''
              }
        }
        else {          // for edit
            if (data?.bank_passbook != props?.data?.bank_passbook) {
                await ImageUpload(data?.bank_passbook[0], "vendor", "BankPassbook", data?.first_name)
                data.bank_passbook = `${vendorlink}${data?.first_name}_BankPassbook_${data?.bank_passbook[0].name}`
            } else {
                data.bank_passbook = props?.data?.bank_passbook
            }
            if (data?.address_proof != props?.data?.address_proof) {
                await ImageUpload(data?.address_proof[0], "vendor", "AddressProof", data?.first_name)
                data.address_proof = `${vendorlink}${data?.first_name}_AddressProof_${data?.address_proof[0].name}`
            } else {
                data.address_proof = props?.data?.address_proof
            }
            if (data?.profile_pic != props?.data?.user?.profile_pic) {
                await ImageUpload(data?.profile_pic[0], "vendor", "ProfileImage", data?.first_name)
                data.profile_pic = `${vendorlink}${data?.first_name}_ProfileImage_${data?.profile_pic[0].name}`
            } else {
                data.profile_pic = props?.data?.user?.profile_pic
            }
            if (data?.hawker_shop_photo != props?.data?.hawker_shop_photo) {
                await ImageUpload(data?.hawker_shop_photo[0], "vendor", "shopImage", data?.first_name)
                data.hawker_shop_photo = `${vendorlink}${data?.first_name}_shopImage_${data?.hawker_shop_photo[0].name}`
            } else {
                data.hawker_shop_photo = props?.data?.hawker_shop_photo
            }
            if (props?.data?.gst_url != data?.gst_url) {
                await ImageUpload(data?.gst_url[0], "vendor", "GstImage", data?.first_name)
                data.gst_url = `${vendorlink}${data?.first_name}_GstImage_${data?.gst_url[0].name}`
              } else {
                data.gst_url = props?.data?.gst_url
              }
              if (props?.data?.adhar_url != data?.adhar_url) {
                await ImageUpload(data?.adhar_url[0], "vendor", "adharImage", data?.first_name)
                data.adhar_url = `${vendorlink}${data?.first_name}_adharImage_${data?.adhar_url[0].name}`
              } else {
                data.adhar_url = props?.data?.adhar_url
              }
              if (props?.data?.pan_url != data?.pan_url) {
                await ImageUpload(data?.pan_url[0], "vendor", "panImage", data?.first_name)
                data.pan_url = `${vendorlink}${data?.first_name}_panImage_${data?.pan_url[0].name}`
              } else {
                data.pan_url = props?.data?.pan_url
              }
        }
        if (props.button != 'edit') {   // for create
            try {
                setLoader(true);
                let additionalPayload = {};
                if (LoggedUserDetails?.role == 'franchise') {
                    additionalPayload = { created_by: LoggedUserDetails?.userid, vendor_type: "shop" };
                }
                let vendorType = {};
                if (LoggedUserDetails?.role == 'admin') {
                    vendorType = { vendor_type: "shop" };
                }

                const requestData = { ...data, ...additionalPayload, ...vendorType };

                const response = await CreateFranchiseeVendors(requestData)
                if (response?.message == "seller added successfully") {
                    setTimeout(() => {
                        // dispatch(setFranchiseVendors(res));
                        toast.success(response?.message);
                        reset();
                        props?.FranchiseeVendors()
                        toggle(), setLoader(false), FranchiseeVendors();
                    }, 1000);
                } else {
                    setLoader(false)
                    toast.error(response?.message);
                    console.log('failed to create user')
                }
            } catch (error) {
                setLoader(false)
                console.log('error', error);
            }
        } else {
            try {      // for edit
                setLoader(true)
                let additionalPayload = {};
                if (LoggedUserDetails?.role == 'franchise') {
                    additionalPayload = { created_by: LoggedUserDetails?.userid, vendor_type: "shop" };
                }
                let vendorType = {};
                if (LoggedUserDetails?.role == 'admin') {
                    vendorType = { vendor_type: "shop" };
                }
                const requestData = { ...data, ...additionalPayload, ...vendorType };

                const response = await EditFranchiseeVendors(props?.data?.user?.id, requestData)
                if (response?.status == "success") {
                    setTimeout(() => {
                        toggle();
                        setLoader(false)
                        props?.FranchiseeVendors()
                        toast.success(response?.message);
                    }, 1000);
                } else {
                    setLoader(false)
                    console.log('failed to update user')
                }
            }
            catch (error) {
                setLoader(false)
                console.log('error', error);
            }
        }
    }



    // ======================== Reset data into the form  =======================
    useMemo(() => {
        const formattedStartTime = moment(props?.data?.shop_start_time, 'h:mm A').format('HH:mm');
        const formattedEndTime = moment(props?.data?.shop_end_time, 'h:mm A').format('HH:mm');
        reset({
            first_name: props?.data?.user?.first_name,
            last_name: props?.data?.user?.last_name,
            phone_no: props?.data?.user?.phone_no,
            profile_pic: props?.data?.user?.profile_pic,
            date_of_birth: props?.data?.user?.date_of_birth,
            email: props?.data?.user?.email,
            pincode: props?.data?.user?.pincode,
            state: props?.data?.user?.state,
            city: props?.data?.user?.city,
            address: props?.data?.user?.address,
            adhar_card: props?.data?.adhar_card,
            pan_card: props?.data?.pan_card,
            gst_number: props?.data?.gst_number,
            bank_name: props?.data?.bank_name,
            account_number: props?.data?.account_number,
            bank_passbook: props?.data?.bank_passbook,
            ifsc_code: props?.data?.ifsc_code,
            address_proof: props?.data?.address_proof,
            gender: props?.data?.user?.gender,
            insta_commison_percentage: props?.data?.insta_commison_percentage,
            created_by: props?.data?.created_by?.id,
            shop_name: props?.data?.shop_name,
            hawker_shop_photo: props?.data?.hawker_shop_photo,
            shop_start_time: formattedStartTime,
            shop_end_time: formattedEndTime
        });
        setValue('created_by', props?.data?.created_by?.id)
    }, [props.data]);

    useEffect(() => {
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

    useEffect(() => {
        if (LoggedUserDetails?.role === 'franchise') {
            setValue('pincode', LoggedUserDetails?.pincode)
            setValue('state', LoggedUserDetails?.state)
            setValue('city', LoggedUserDetails?.city)
        }
    }, [LoggedUserDetails])

    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Vendors
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
                                <Dialog.Panel className="w-full max-w-5xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">

                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="">
                                                <h1 className='pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Basic Details:</h1>
                                                <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-3 gap-y-3 ">
                                                    <div className="">
                                                        <label className={labelClass}>First Name*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="First Name"
                                                            className={inputClass}
                                                            {...register("first_name", { required: true, pattern: /^[A-Za-z]+$/i })}
                                                        />
                                                        {errors.first_name && (
                                                            <Error title={errors?.first_name ? 'First Name should Contain alphabets only' : 'First Name is Required'} />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Last Name*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Last Name"
                                                            className={inputClass}
                                                            {...register("last_name", { required: true, pattern: /^[A-Za-z]+$/i })}
                                                        />
                                                        {errors.last_name && (
                                                            <Error title={errors?.last_name ? 'Last Name should Contain alphabets Only' : 'Last Name is Required'} />
                                                        )}
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
                                                        {props?.button == 'edit' && props?.data?.user?.profile_pic != '' && props?.data?.user?.profile_pic != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
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
                                                                <option value="" selected>--Select Franchisee--</option>
                                                                {Franchisee?.map(franchisee => (
                                                                    <option key={franchisee?.user?.id} value={franchisee?.user?.id}>
                                                                        {franchisee?.user?.id} {franchisee?.user?.first_name + " (" + franchisee?.user?.pincode + ")"}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.created_by && (
                                                                <Error title="Franchisee is Required*" />
                                                            )}
                                                        </div>
                                                    }
                                                    <div className="">
                                                        <label className={labelClass}>Email*</label>
                                                        <input
                                                            type="email"
                                                            placeholder="Email"
                                                            className={inputClass}
                                                            {...register("email", { required: true, validate: validateEmail })}
                                                        />
                                                        {errors.email && (
                                                            <Error title={errors?.email?.message ? errors?.email?.message : 'Email is Required'} />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Mobile Number*</label>
                                                        <input
                                                            type='tel'
                                                            placeholder="Phone"
                                                            maxLength={10}
                                                            className={inputClass}
                                                            onKeyDown={handleMobileNoNumericInput}
                                                            {...register("phone_no", { required: true, validate: validatePhoneNumber })}
                                                        />
                                                          {errors.phone_no && (
                                                            <Error title={errors?.phone_no?.message ? errors?.phone_no?.message : 'Phone Number is Required'} />
                                                            )}
                                                    </div>
                                                    {props.button != 'edit' &&
                                                        <div className="">
                                                            <label className={labelClass}>
                                                                Create Password
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Password"
                                                                className={inputClass}
                                                                {...register("password", { required: true, pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/ })}
                                                            />
                                                            {errors.password && <Error title={errors?.password ? 'Password should contain one special character and 8 digit long and must be combination of number and alphabets' : 'Password is required'} />}
                                                        </div>}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Date Of Birth(DOB)*
                                                        </label>
                                                        <input
                                                            type="date"
                                                            max={moment().format('YYYY-MM-DD')}
                                                            className={inputClass}
                                                            {...register("date_of_birth", { required: true })}
                                                        />
                                                        {errors.date_of_birth && (
                                                            <Error title="Date of birth is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Gender*</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register("gender", { required: true })}
                                                        >
                                                            <option value="">select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {errors.gender && (
                                                            <Error title="Gender is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Shop Name*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="shop name"
                                                            className={inputClass}
                                                            {...register("shop_name", { required: true })}
                                                        />
                                                        {errors.shop_name && (
                                                            <Error title="Shop Name is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Shop Image *</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("hawker_shop_photo", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.hawker_shop_photo != '' && props?.data.hawker_shop_photo != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                                                            {props?.data?.hawker_shop_photo?.split('/').pop()}
                                                        </label>}
                                                        {errors.hawker_shop_photo && <Error title='Shop Image is required*' />}
                                                    </div>

                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Shop Start Time*
                                                        </label>
                                                        <input
                                                            type="time"
                                                            className={inputClass}
                                                            {...register("shop_start_time", { required: true })}
                                                        />
                                                        {errors.shop_start_time && (
                                                            <Error title="shop start time is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Shop End Time*
                                                        </label>
                                                        <input
                                                            type="time"
                                                            className={inputClass}
                                                            {...register("shop_end_time", { required: true })}
                                                        />
                                                        {errors.shop_end_time && (
                                                            <Error title="shop end time is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>PINCODE*</label>
                                                        <input
                                                            type="number"
                                                            maxLength={6}
                                                            placeholder="PINCODE"
                                                            className={inputClass}
                                                            readOnly={true}
                                                            {...register("pincode", { required: true, validate: validatePIN })}
                                                        />
                                                         {errors.pincode && (
                                                            <Error title={errors?.pincode?.message ? errors?.pincode?.message : 'PinCode is Required'} />
                                                        )}
                                                    </div>
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
                                                        <label className={labelClass}>State*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter State"
                                                            className={inputClass}
                                                            readOnly={true}
                                                            {...register("state", { required: true, pattern: /^[A-Za-z]+$/i })}
                                                        />
                                                        {errors.state && (
                                                            <Error title={errors.state && 'State should contain All Alphabets'} />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>City*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="City"
                                                            className={inputClass}
                                                            readOnly={true}
                                                            {...register("city", { required: true, pattern: /^[A-Za-z]+$/i })}
                                                        />
                                                        {errors.city && (
                                                            <Error title={errors?.city ? 'City should contain All Alphabets' : 'City is Required'} />
                                                        )}
                                                    </div>

                                                    {LoggedUserDetails?.role == 'admin' || LoggedUserDetails?.role == 'franchise' &&
                                                        <div className="">
                                                            <label className={labelClass}>Insta Commission (%)*</label>
                                                            <input
                                                                type="number"
                                                                placeholder="10"
                                                                className={inputClass}
                                                                min={0}
                                                                {...register("insta_commison_percentage", { required: true })}
                                                            />
                                                            {errors.address && (
                                                                <Error title="Insta commison percentage is Required*" />
                                                            )}
                                                        </div>
                                                    }

                                                </div>
                                                <h1 className='col-span-4 pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Additional Details:</h1>
                                                <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-3 gap-y-3">
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Pan Card*
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='PAN'
                                                                className={inputClass}
                                                                maxLength={10}
                                                                {...register('pan_card', { required: true, validate: validatePANCard })}
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
                                                            Pan Card*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='PAN  No'
                                                            className={inputClass}
                                                            maxLength={10}
                                                            {...register('pan_card', { required: true, validate: validatePANCard })}
                                                        />
                                                        {errors?.pan_card && <Error title='Pan Card Number is required' />}
                                                    </div> */}
                                                     <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card Number*
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="number"
                                                                maxLength={14}
                                                                placeholder='Aadhar Card Number'
                                                                className={inputClass}
                                                                {...register('adhar_card', { required: true , validate: validateAadharCard })}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='adhar' className={`${adhar_watch?.length || props?.data?.adhar_url ? "bg-sky-400 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-sky-400 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="adhar"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("adhar_url", { required: true })} />
                                                            </div>
                                                        </div>
                                                        {errors?.adhar_card && <Error title={errors?.adhar_card?.message ? errors?.adhar_card?.message : 'Aadhar Card Number & Image is required'} />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Aadhar No'
                                                            maxLength={14}
                                                            className={inputClass}
                                                            {...register('adhar_card', { required: true, validate: validateAadharCard })}
                                                        />
                                                        {errors?.adhar_card && <Error title='Aadhar Card Number is required' />}
                                                    </div> */}
                                                       <div className="">
                                                        <label className={labelClass}>
                                                            GST Number*
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='GST Number*'
                                                                className={inputClass}
                                                                {...register('gst_number', {
                                                                    // required: 'GST Number is required*',
                                                                    validate: validateGST
                                                                })}
                                                            />
                                                            <div className="">
                                                                <label htmlFor='gst' className={`${gst_watch?.length || props?.data?.gst_url ? "bg-sky-400 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-sky-400 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                                                    Upload
                                                                </label>
                                                                <input className="hidden"
                                                                    id="gst"
                                                                    type='file'
                                                                    multiple
                                                                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                                                                    placeholder='Upload Images...'
                                                                    {...register("gst_url")} />
                                                            </div>
                                                        </div>
                                                        {errors?.gst_number && <Error title={errors?.gst_number?.message ? errors?.gst_number?.message : 'GST Number is Requried'} />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            GST Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='GST Number'
                                                            className={inputClass}
                                                            {...register('gst_number', { validate: (gstNumber != "" && gstNumber != null) ? validateGST : '' })}

                                                        />
                                                        {errors?.gst && <Error title={errors?.gst?.message} />}
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Name*
                                                        </label>
                                                        <div className="">
                                                            <input
                                                                type="text"
                                                                placeholder='Bank Name'
                                                                className={inputClass}
                                                                {...register('bank_name', { required: true })}
                                                            />
                                                        </div>
                                                        {errors?.bank_name && <Error title='Bank name is Required' />}
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
                                                        {errors?.account_number && <Error title='Account Number is Required' />}
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
                                                        {props?.button == 'edit' && props?.data.bank_passbook != '' && props?.data.bank_passbook != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                                                            {props?.data?.bank_passbook?.split('/').pop()}
                                                        </label>}
                                                        {errors.bank_passbook && <Error title='Bank PassBook Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>IFSC Code*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="IFSC Code"
                                                            className={inputClass}
                                                            {...register("ifsc_code", { required: true })}
                                                        />
                                                        {errors.ifsc_code && (
                                                            <Error title="Ifsc code is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Address Proof*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("address_proof", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.address_proof != '' && props?.data.address_proof != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                                                            {props?.data?.address_proof?.split('/').pop()}
                                                        </label>}
                                                        {errors.address_proof && <Error title='Address Proof Image is required*' />}
                                                    </div>
                                                </div>
                                            </div>
                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                                {loader ? (
                                                    <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" />
                                                ) : (
                                                    <button type="submit" className={formBtn1}>
                                                        Submit
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className={formBtn2}
                                                    onClick={closeBtn}
                                                >
                                                    close
                                                </button>
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
