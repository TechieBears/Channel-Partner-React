import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../Errors/Error';
import { Add, Edit } from 'iconsax-react';
import { addRestaurant, editRestaurant } from '../../../api';
import { toast } from 'react-toastify';
import { restaurantLink, ImageUpload } from '../../../env';
import { validateCommision, validateEmail, validateGST, validatePIN, validatePhoneNumber } from '../../Validations.jsx/Validations';

export default function AddRestaurant(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const Franchisee = useSelector((state) => state?.master?.Franchise);
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const toggle = () => {
        setOpen(!isOpen)
    }
    const closeBtn = () => {
        toggle();
        reset()
    }
    const categories = ['Asian', 'Mexican', 'Italian', 'Russian cussion', 'Spanish', 'Comfort', 'American', 'North Indian', 'South Indian']
    const onSubmit = async (data) => {
        // if (props.button != 'edit') {    // for create
        //     if (data?.profile_pic.length != 0) {
        //         await ImageUpload(data?.profile_pic[0], "restaurant", "profileimg", data?.first_name)
        //         data.profile_pic = `${restaurantLink}${data?.first_name}_profileimg_${data?.profile_pic[0].name}`
        //     } else {
        //         data.profile_pic = ''
        //     }
        //     if (data?.shop_image.length != 0) {
        //         await ImageUpload(data?.shop_image[0], "restaurant", "restaurantimg", data?.first_name)
        //         data.shop_image = `${restaurantLink}${data?.first_name}_restaurantimg_${data?.shop_image[0].name}`
        //     } else {
        //         data.shop_image = ''
        //     }
        // }
        // else {          // for edit
        //     if (data?.profile_pic != props?.data?.profile_pic) {
        //         await ImageUpload(data?.profile_pic[0], "restaurant", "profileimg", data?.first_name)
        //         data.profile_pic = `${restaurantLink}${data?.first_name}_profileimg_${data?.profile_pic[0].name}`
        //     } else {
        //         data.profile_pic = props?.data?.profile_pic
        //     }
        //     if (data?.shop_image != props?.data?.shop_image) {
        //         await ImageUpload(data?.shop_image[0], "restaurant", "restaurantimg", data?.first_name)
        //         data.shop_image = `${restaurantLink}${data?.first_name}_restaurantimg_${data?.shop_image[0].name}`
        //     } else {
        //         data.shop_image = props?.data?.shop_image
        //     }
        // }
        if (props?.button == 'edit') {
            let updateData = {
                ...data,
                'created_by': props?.id,
                "vendor_type": 'restaurant'
            }
            editRestaurant(props?.id, updateData).then(res => {
                if (res?.status == 'success') {
                    toast.success('Restaurant Updated Successfully')
                    props?.getAllRestaurant()
                    toggle()
                }
            })
        } else {
            let updateData = {
                ...data,
                'created_by': props?.id,
                "vendor_type": 'restaurant'
            }
            addRestaurant(updateData).then(res => {
                if (res.status == 'success') {
                    toast.success('Resuraurant added successfully')
                    toggle();
                    props?.getAllRestaurant()
                } else {
                    toast.error('Error adding restaurant')
                }
            })
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
                // 'date_of_birth': props?.data?.user?.date_of_birth,
                // 'gender': props?.data?.user?.gender,
                // 'shop_name': props?.data?.shop_name,
                // 'restaurant_phone': props?.data?.user?.phone_no,
                // 'shop_start_time': props?.data?.shop_start_time,
                // 'shop_end_time': props?.data?.shop_end_time,
                // 'veg_or_nonveg': props?.data?.veg_or_nonveg,
                // 'short_description': props?.data?.short_description,
                // 'selectedCategory': props?.data?.selectedCategory,
                // 'bank_name': props?.data?.bank_name,
                // 'account_number': props?.data?.account_number,
                // 'ifsc_code': props?.data?.ifsc_code,
                // 'adhar_card': props?.data?.adhar_card,
                // 'pan_card': props?.data?.pan_card,
                // 'gst_number': props?.data?.gst_number,
            });
        }
    }, []);
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
                                        Add Restaurant
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-3 customBox">
                                                    <h3 className='col-span-4 font-semibold text-xl'>Personal Details</h3>
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
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Date of birth (DOB)*
                                                        </label>
                                                        <input
                                                            type="date"
                                                            placeholder='Last Name'
                                                            className={inputClass}
                                                            {...register('date_of_birth', { required: true })}
                                                        />
                                                        {errors.date_of_birth && <Error title='DOB is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Gender*
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('gender', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='Male'>Male</option>
                                                            <option value='Female'>Female</option>
                                                        </select>
                                                        {errors.gender && <Error title='Gender is Required*' />}
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
                                                    </div> */}
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
                                                        {errors.email && <Error title={errors?.email?.message} />}
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
                                                                {...register('password', { required: true })}
                                                            />
                                                            {errors.password && <Error title='Password is Required*' />}
                                                        </div>
                                                    }
                                                
                                                    {/* <h3 className='col-span-4 font-semibold text-xl'>Restaurant Details</h3>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Restaurant Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Restaurant Name'
                                                            className={inputClass}
                                                            {...register('shop_name', { required: true })}
                                                        />
                                                        {errors.shop_name && <Error title='Restaurant Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Restaurant Phone*
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            placeholder='Restaurant Phone'
                                                            className={inputClass}
                                                            {...register('phone_no', { required: true, validate: validatePhoneNumber })}
                                                        />
                                                        {errors.phone_no && <Error title={errors?.phone_no?.message} />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Restaurant Address*
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
                                                        <label className={labelClass} htmlFor="main_input">Restaurant Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("shop_image", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data?.user?.shop_image != '' && props?.data?.user?.shop_image != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.user?.shop_image?.split('/').pop()}
                                                        </label>}
                                                        {errors.shop_image && <Error title='Restaurnat Image is required*' />}
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            City*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='City'
                                                            className={inputClass}
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
                                                            placeholder='PIN Code'
                                                            className={inputClass}
                                                            {...register('pincode', { required: true, validate: validatePIN })}
                                                        />
                                                        {errors.pincode && <Error title={errors?.pincode?.message} />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Opening Hours*
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='PIN Code'
                                                            className={inputClass}
                                                            {...register('shop_start_time', { required: true })}
                                                        />
                                                        {errors.shop_start_time && <Error title='Restaurant Opening is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Closing Hours*
                                                        </label>
                                                        <input
                                                            type="time"
                                                            placeholder='PIN Code'
                                                            className={inputClass}
                                                            {...register('shop_end_time', { required: true })}
                                                        />
                                                        {errors.shop_end_time && <Error title='Restaurant Closing is Required*' />}
                                                    </div> */}
                                                    {/* <div className="">
                                                        <label className={labelClass}>Closing Day*</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register("closing_day", { required: true })}
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
                                                        {errors.closing_day && (
                                                            <Error title="Clsoing day is Required*" />
                                                        )}
                                                    </div> */}
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Type *
                                                        </label>
                                                        <select
                                                            className={inputClass}
                                                            {...register('veg_or_nonveg', { required: true })}
                                                        >
                                                            <option value=''>Select</option>
                                                            <option value='both'>Both</option>
                                                            <option value='Veg'>Veg</option>
                                                            <option value='Non Veg'>Non Veg</option>
                                                        </select>
                                                        {errors.veg_or_nonveg && <Error title='Type is Required*' />}
                                                    </div> */}
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Insta Commision (%)*
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder='Insta Commision (%)'
                                                            className={inputClass}
                                                            {...register('insta_commison_percentage', { required: true, validate: validateCommision })}
                                                        />
                                                        {errors.insta_commison_percentage && <Error title='Restaurant Closing is Required*' />}
                                                    </div>
                                                    {/* <div className="">
                                                        <label className={labelClass}>
                                                            Short Description
                                                        </label>
                                                        <textarea
                                                            placeholder='Short Description'
                                                            className={inputClass}
                                                            {...register('short_description',)}
                                                        />
                                                    </div> */}
                                                    {/* <h3 className='col-span-4 text-xl font-semibold'>Banking Details</h3>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Name*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Bank Name'
                                                            className={inputClass}
                                                            {...register('bank_name', { required: true })}
                                                        />
                                                        {errors.bank_name && <Error title='Bank Name is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Account Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Bank Account Number'
                                                            className={inputClass}
                                                            {...register('account_number', { required: true })}
                                                        />
                                                        {errors.account_number && <Error title='Bank Account Number is Required*' />}
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
                                                        {errors.ifsc_code && <Error title='IFSC Code is Required*' />}
                                                    </div> */}
                                                    {/* <h3 className='text-xl font-semibold col-span-4'>Additional Details</h3>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Aadhar Card Number'
                                                            className={inputClass}
                                                            {...register('adhar_card', { required: true })}
                                                        />
                                                        {errors.adhar_card && <Error title='Aadhar Card is Required*' />}
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
                                                        {errors.pan_card && <Error title='PAN Card is Required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            GST Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='GST Number'
                                                            className={inputClass}
                                                            {...register('gst_number', { required: true, })}
                                                        />
                                                        {errors.gst_number && <Error title={errors?.gst_number?.message} />}
                                                    </div> */}
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
