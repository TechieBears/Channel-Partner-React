import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import { fileinput, formBtn1, formBtn2, formBtn3, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import { createStorage } from '../../../api';
import { setStorageList } from '../../../redux/slices/storageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import Select from 'react-select'
import { validateEmail, validatePhoneNumber } from '../../Validations.jsx/Validations';
import { inputClasses } from '@mui/material';


// =================== form steps 1 =================

const Step1 = () => {
    const [manually, setManally] = useState(false);
    const [verifyPhone, setVerifyPhone] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const { register, control, formState: { errors }, } = useFormContext()
    const OTPInput = () => {
        const inputs = document.querySelectorAll('#otp > *[id]');
        for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function (event) { if (event.key === "Backspace") { inputs[i].value = ''; if (i !== 0) inputs[i - 1].focus(); } else { if (i === inputs.length - 1 && inputs[i].value !== '') { return true; } else if (event.keyCode > 47 && event.keyCode < 58) { inputs[i].value = event.key; if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } else if (event.keyCode > 64 && event.keyCode < 91) { inputs[i].value = String.fromCharCode(event.keyCode); if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } } }); }
        OTPInput()
    }
    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-3 ">
            <div className='col-span-3 gap-x-3'>
                <div className='grid grid-cols-2 gap-3'>
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Name*
                        </label>
                        <input
                            type="text"
                            placeholder='Name'
                            className={inputClass}
                            {...register('name', { required: true })}
                        />
                        {errors.name && <Error title='Name is required*' />}
                    </div>
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Complete Address*
                        </label>
                        <input
                            type="text"
                            placeholder='Restaurant Address'
                            className={inputClass}
                            {...register('address', { required: true })}
                        />
                        {errors.address && <Error title='Year is required*' />}
                    </div>
                    {manually &&
                        <>
                            <p className={`col-span-2 text-center`}>--or enter coordinates manually--</p>
                            <div className="">
                                <label className={labelClass}>
                                    Latitude*
                                </label>
                                <input
                                    type="text"
                                    placeholder='Latitude'
                                    className={inputClass}
                                    {...register('lat', { required: manually })}
                                />
                                {errors.lat && <Error title={errors?.lat?.message} />}
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    Longitutde*
                                </label>
                                <input
                                    type="text"
                                    placeholder='Longitutde'
                                    className={inputClass}
                                    {...register('long', { required: manually })}
                                />
                                {errors.long && <Error title={errors?.long?.message} />}
                            </div>

                            <div className="">
                                <label className={labelClass}>
                                    State*
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder='State'
                                    className={inputClass}
                                    {...register('state',)}
                                />
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    Pincode*
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder='Pincode'
                                    className={inputClass}
                                    {...register('pinocde',)}
                                />
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    City*
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    placeholder='City'
                                    className={inputClass}
                                    {...register('city',)}
                                />
                            </div>
                            <div></div>
                        </>
                    }
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Number*
                        </label>
                        <input
                            type="tel"
                            placeholder='Restaurant Number'
                            className={inputClass}
                            {...register('rest_num', { required: true, validate: validatePhoneNumber })}
                        />
                        {errors.rest_num && <Error title='Restaurant Number is required*' />}
                    </div>
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Mail*
                        </label>
                        <input
                            type="email"
                            placeholder='Restaurant Mail'
                            className={inputClass}
                            {...register('mail', { required: true, validate: validateEmail })}
                        />
                    </div>
                </div>
            </div>
            <div className='col-span-2'>
                {/* ============================= Maps start ============================= */}
                <div className=''>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30128.960774986183!2d73.0314032258855!3d19.27714285590321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bda4c2cb3497%3A0x65c3365426378045!2sKamatghar%2C%20Bhiwandi%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709017397432!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                {/* ============================= Maps end ============================= */}
                <p onClick={() => setManally(!manually)} className={`cursor-pointer ${manually ? 'text-black' : 'text-sky-400'}`}>or enter coordinates manually</p>
            </div>
        </div>
    )
}
// =================== form steps 2 =================
const Step2 = () => {
    const { register, formState: { errors }, } = useFormContext()
    const [allCuisines, setAllCuisines] = useState([
        { value: "Italian Cuisine", label: "Italian Cuisine" },
        { value: "French Cuisine", label: "French Cuisine" },
        { value: "Chinese Cuisine", label: "Chinese Cuisine" },
        { value: "Japanese Cuisine", label: "Japanese Cuisine" },
        { value: "Mexican Cuisine", label: "Mexican Cuisine" },
        { value: "Thai Cuisine", label: "Thai Cuisine" },
        { value: "Spanish Cuisine", label: "Spanish Cuisine" },
        { value: "South Indian Cuisine", label: "South Indian Cuisine" },
        { value: "Maharashtrian Cuisine", label: "Maharashtrian Cuisine" },
        { value: "Goan Cuisine", label: "Goan Cuisine" },
    ]);
    const [allRestaurantTypes, setAllRestaurantTypes] = useState([
        { value: "Fine Dining", label: 'Fine Dining' },
        { value: "Casual Dining", label: "Casual Dining" },
        { value: "Fast Food", label: "Fast Food" },
        { value: "Café/Bistro", label: "Café/Bistro" },
        { value: "Ethnic Restaurants", label: "Ethnic Restaurants" },
        { value: "Family Style Restaurants", label: "Family Style Restaurants" },
        { value: "Buffet Style Restaurants", label: "Buffet Style Restaurants" },
        { value: "Food Trucks", label: "Food Trucks" },
        { value: "Pop-Up Restaurants", label: "Pop-Up Restaurants" },
        { value: "Vegetarian/Vegan Restaurants", label: "Vegetarian/Vegan Restaurants" },
    ]);
    const [selectedRestType, setSelectedRestType] = useState([])
    const [selectedCuisines, setSelectedCuisines] = useState([])
    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <p className='md:col-span-2 lg:col-span-3 font-semibold text-lg'>Establishment Type</p>
            <div className="">
                <label className={labelClass}>
                    Select What Describe you the best*
                </label>
                <Select
                    options={allRestaurantTypes}
                    isMulti
                    value={selectedRestType}
                    onChange={(selectedOption) => setSelectedRestType(selectedOption)}
                />
                {selectedRestType.length <= 0 && <Error title='This is required' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Type of cuisines*
                </label>
                <Select
                    options={allCuisines}
                    isMulti
                    value={selectedCuisines}
                    onChange={(selectedOption) => setSelectedCuisines(selectedOption)}
                />
                {selectedCuisines.length <= 0 && <Error title='This is required' />}
            </div>
            <div>
                <label className={labelClass}>
                    Opeing Hour*
                </label>
                <input
                    type='time'
                    className={inputClass}
                    {...register('opening_hour', { required: true })}
                />
                {errors?.opening_hour && <Error title='Opening Hour is required' />}
            </div>
            <div>
                <label className={labelClass}>
                    Closing Hour*
                </label>
                <input
                    type='time'
                    className={inputClass}
                    {...register('closing_hour', { required: true })}
                />
                {errors?.closing_hour && <Error title='Closing Hour is required' />}
            </div>
        </div>
    );
};

// =================== form steps 3 =================

const Step3 = (props) => {
    const { register, formState: { errors }, } = useFormContext()
    // const designationList = useSelector(state => state?.master?.designation)
    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <p className='md:col-span-2 lg:col-span-3 font-semibold text-lg'>Upload Images</p>
            <p className='md:col-span-2 lg:col-span-3 font-normal text-base'>Ambience Images</p>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 1 *</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("menu_image", { required: true })} />
                {props?.button == 'edit' && props?.data.menu_image != '' && props?.data.menu_image != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.menu_image?.split('/').pop()}
                </label>}
                {errors.menu_image && <Error title='Menu Image is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 2</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("menu_image2", {})} />
                {props?.button == 'edit' && props?.data.menu_image2 != '' && props?.data.menu_image2 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.menu_image2?.split('/').pop()}
                </label>}
                {errors.menu_image2 && <Error title='Menu Image is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 3</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("res_img3", {})} />
                {props?.button == 'edit' && props?.data.res_img3 != '' && props?.data.res_img3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.res_img3?.split('/').pop()}
                </label>}
                {errors.res_img3 && <Error title='Restaurant Image is required*' />}
            </div>
            <p className='md:col-span-2 lg:col-span-3 font-normal text-base'>Dish Images</p>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 1*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("img2", { required: true })} />
                {props?.button == 'edit' && props?.data.img2 != '' && props?.data.img2 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.img2?.split('/').pop()}
                </label>}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 2</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("img3", {})} />
                {props?.button == 'edit' && props?.data.img3 != '' && props?.data.img3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.img3?.split('/').pop()}
                </label>}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 3</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("img3", {})} />
                {props?.button == 'edit' && props?.data.img3 != '' && props?.data.img3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.img3?.split('/').pop()}
                </label>}
            </div>
        </div>
    );
}
// =================== form steps 4 =================

const Step4 = (props) => {
    const { register, formState: { errors }, setError, watch } = useFormContext()
    const deliveryTime = watch('delivery_time')
    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <p className='col-span-3 text-lg font-semibold'>Ordering Menu Photos</p>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 1</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("order_img1", {})} />
                {props?.button == 'edit' && props?.data.order_img1 != '' && props?.data.order_img1 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.order_img1?.split('/').pop()}
                </label>}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 2</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("order_img2", {})} />
                {props?.button == 'edit' && props?.data.order_img2 != '' && props?.data.order_img2 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.order_img2?.split('/').pop()}
                </label>}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 3</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("order_img3", {})} />
                {props?.button == 'edit' && props?.data.order_img3 != '' && props?.data.order_img3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.order_img3?.split('/').pop()}
                </label>}
            </div>
        </div>
    )
}
// // =================== form steps 5 =================

const Step5 = (props) => {
    const { register, formState: { errors }, watch } = useFormContext()
    const gstRegistered = watch('gst_registered');
    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <p className='col-span-3 text-lg font-semibold'>PAN Details</p>
            <div className="">
                <label className={labelClass}>
                    PAN No*
                </label>
                <input
                    type="text"
                    placeholder='PAN No'
                    className={inputClass}
                    {...register('pan_no', { required: true })}
                />
                {errors.pan_no && <Error title='PAN No is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Name On Document*
                </label>
                <input
                    type="text"
                    placeholder='Name On Document'
                    className={inputClass}
                    {...register('pan_name', { required: true })}
                />
                {errors.pan_name && <Error title='Name On Document is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Upload Image</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("order_img3", {})} />
                {props?.button == 'edit' && props?.data.order_img3 != '' && props?.data.order_img3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.order_img3?.split('/').pop()}
                </label>}
            </div>
            <p className='col-span-3 text-lg font-semibold'>GST Details</p>
            <div>
                <label>Is Your Restaurant GST registered</label>
                <select
                    className={inputClass}
                    {...register('gst_registered', {})}
                >
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                </select>
            </div>
            {gstRegistered == "Yes" &&
                <>
                    <div>
                        <label>GST Number</label>
                        <input
                            className={inputClass}
                            {...register('gst_no', { required: gstRegistered == 'Yes' ? true : false })}
                            placeholder='GST Number'
                        />
                    </div>
                    <div className="">
                        <label className={labelClass} htmlFor="main_input">Upload Image</label>
                        <input className={fileinput}
                            id="main_input"
                            type='file'
                            multiple
                            accept='image/jpeg,image/jpg,image/png'
                            placeholder='Upload Images...'
                            {...register("order_img3", {})} />
                        {props?.button == 'edit' && props?.data.order_img3 != '' && props?.data.order_img3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                            {props?.data?.order_img3?.split('/').pop()}
                        </label>}
                    </div>
                    <div>
                        <label>Do you charge 5% GST on all your menu items?</label>
                        <select
                            className={inputClass}
                            {...register('gst_charge_menu', { required: true })}
                        >
                            <option value='No'>No</option>
                            <option value='Yes'>Yes</option>
                        </select>
                    </div>
                </>
            }
            <p className='col-span-3 text-lg font-semibold'>FSSAI Details</p>
            <div className="">
                <label className={labelClass}>
                    FSSAI Cerificate Number
                </label>
                <input
                    type="text"
                    placeholder='FSSAI Cerificate Number'
                    className={inputClass}
                    {...register('fssai_certificate_number')}
                />
            </div>
            <div className="">
                <label className={labelClass}>
                    FSSAI Expiry Date
                </label>
                <input
                    type="date"
                    placeholder='FSSAI Expiry Date'
                    className={inputClass}
                    {...register('fssai_expiry_date')}
                />
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Fassai license  Doc*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("fassai_doc", { required: false })} />
                {props?.button == 'edit' && props?.data?.fassai_doc != '' && props?.data?.fassai_doc != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
                    {props?.data?.fassai_doc.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
                {errors.fassai_doc && <Error title='Fassai license Docx*' />}
            </div>
            <p className='col-span-3 text-lg font-semibold'>Banking Details</p>
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
            </div>
            <div className="">
                <label className={labelClass}>
                    Bank Account Type
                </label>
                <select
                    className={inputClass}
                    {...register('bank_account_type', { required: true })}
                >
                    <option value='Current'>Current</option>
                    <option value='Savings'>Savings</option>
                </select>
            </div>
            <div className="">
                <label className={labelClass}>
                    Bank IFSC Code
                </label>
                <input
                    type="text"
                    placeholder='Bank IFSC Code'
                    className={inputClass}
                    {...register('ifsc_code')}
                />
            </div>
            <p className='col-span-3 text-lg font-semibold'>Adhar Details</p>
            <div className="">
                <label className={labelClass}>
                    Adhar Number*
                </label>
                <input
                    type="text"
                    placeholder='Adhar Number'
                    className={inputClass}
                    {...register('adhar_no', { required: true })}
                />
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Adhar Photo*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("adhar_img", { required: true })} />
                {props?.button == 'edit' && props?.data?.adhar_img != '' && props?.data?.adhar_img != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
                    {props?.data?.adhar_img.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
                {errors.adhar_img && <Error title='Adhar Card Image is required*' />}
            </div>
        </div>
    )
}

export default function DashboardForm(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();
    const steps = ['Restaurant Information', 'Restaurant Type and Timing', 'Upload Images', 'General Information', 'Legal Documentation',];
    var methods = useForm({
        defaultValues: {
            "name": "",
            "operational_year": "",
            "location": "",
            "manage_software": "",
            "operating_hrs": "",
            "rating": "",
            "address": "",
            "description": "",
            "door_sensor": "",
            "temp_system": "",
            "remote_temp_sys": "",
            "electricity_bckup": "",
            "cctv": "",
            "chamber_type": "",
            "storage_type": "",
            "temp_compliance": "",
            "blast_frezzing": "",
            "spoc_name": "",
            "spoc_desgination": "",
            "spoc_contact": "",
            "spoc_email": "",
            "dm_name": "",
            "dm_desgination": "",
            "dm_contact": "",
            "dm_email": "",
            "fassai_license": "",
            "gst_no": "",
            "other_license": "",
        }
    });
    // =================== default values ====================
    if (props.button == 'edit' && props.data) {
        methods = useForm({
            defaultValues: {
                "name": props?.data?.name,
                "operational_year": props?.data?.operational_year,
                "location": props?.data?.location,
                "manage_software": props?.data?.manage_software,
                "operating_hrs": props?.data?.operating_hrs,
                "rating": props?.data?.rating,
                "chamber_type": props?.data?.chamber_type,
                "storage_type": props?.data?.storage_type,
                "temp_compliance": props?.data?.temp_compliance,
                "address": props?.data?.address,
                "description": props?.data?.description,
                "door_sensor": props?.data?.door_sensor,
                "temp_system": props?.data?.temp_system,
                "remote_temp_sys": props?.data?.remote_temp_sys,
                "electricity_bckup": props?.data?.electricity_bckup,
                "cctv": props?.data?.cctv,
                "blast_frezzing": props?.data?.blast_frezzing,
                "spoc_name": props?.data?.spoc_name,
                "spoc_desgination": props?.data?.spoc_desgination,
                "spoc_contact": props?.data?.spoc_contact,
                "spoc_email": props?.data?.spoc_email,
                "dm_name": props?.data?.dm_name,
                "dm_desgination": props?.data?.dm_desgination,
                "dm_contact": props?.data?.dm_contact,
                "dm_email": props?.data?.dm_email,
                "fassai_license": props?.data?.fassai_license,
                "gst_no": props?.data?.gst_no,
                "other_license": props?.data?.other_license,
            }
        })
    } else {
        methods = useForm()
    }

    // ============== fetch data from api ================
    const StorageList = () => {
        if (user.role == 'admin') {
            getStorages().then(res => {
                dispatch(setStorageList(res))
            }).catch(err => {
                console.error('Error', err);
            })
        } else {
            getPartnerStorage(user?.userid).then(res => {
                dispatch(setStorageList(res))
            }).catch(err => {
                console.error('Error', err);
            })
        }

    }
    // =========================== back button =========================
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isStepFalied = () => {
        return Boolean(Object.keys(methods.formState.errors).length);
    };
    // =========================== step counter =========================
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Step1 />
            case 1:
                return <Step2 />
            case 2:
                return <Step3 />
            case 3:
                return <Step4 {...props} />
            case 4:
                return <Step5 {...props} />
            default:
                return (
                    <h1>
                        Unkown Step
                    </h1>
                )
        }
    }

    // ================= submit data  ===============================
    const onSubmit = async (data) => {
        console.log('data=================', data)
        // return
        isStepFalied()
        setLoader(true)
        if (activeStep == steps.length - 1) {
            if (props.button != 'edit') {
                if (data.image.length != 0) {
                    await ImageUpload(data.image[0], "storage", "mainImage", data.name)
                    data.image = `${link}${data.name}_mainImage_${data.image[0].name}`
                } else {
                    data.image = ''
                }
                if (data.outside_img.length != 0) {
                    await ImageUpload(data.outside_img[0], "storage", "outSideImage", data.name)
                    data.outside_img = `${link}${data.name}_outSideImage_${data.outside_img[0].name}`
                } else {
                    data.outside_img = ''
                }
                if (data.loading_img.length != 0) {
                    await ImageUpload(data.loading_img[0], "storage", "loadingImage", data.name)
                    data.loading_img = `${link}${data.name}_loadingImage_${data.loading_img[0].name}`
                } else {
                    data.loading_img = ''
                }
                if (data.staging_img.length != 0) {
                    await ImageUpload(data.staging_img[0], "storage", "stagingImage", data.name)
                    data.staging_img = `${link}${data.name}_stagingImage_${data.staging_img[0].name}`
                } else {
                    data.staging_img = ''
                }
                if (data.storage_img.length != 0) {
                    await ImageUpload(data.storage_img[0], "storage", "storageImage", data.name)
                    data.storage_img = `${link}${data.name}_storageImage_${data.storage_img[0].name}`
                } else {
                    data.storage_img = ''
                }
                if (data.other_img.length != 0) {
                    await ImageUpload(data.other_img[0], "storage", "otherImage", data.name)
                    data.other_img = `${link}${data.name}_otherImage_${data.other_img[0].name}`
                } else {
                    data.other_img = ''
                }
                if (data.fassai_doc.length != 0) {
                    await ImageUpload(data.fassai_doc[0], "storage", "fassaiImage", data.name)
                    data.fassai_doc = `${link}${data.name}_fassaiImage_${data.fassai_doc[0].name}`
                } else {
                    data.fassai_doc = ''
                }
                if (data.gst_doc.length != 0) {
                    await ImageUpload(data.gst_doc[0], "storage", "gstImage", data.name)
                    data.gst_doc = `${link}${data.name}_gstImage_${data.gst_doc[0].name}`
                } else {
                    data.gst_doc = ''
                }
                if (data.other_lic_doc.length != 0) {
                    await ImageUpload(data.other_lic_doc[0], "storage", "otherImage", data.name)
                    data.other_lic_doc = `${link}${data.name}_otherImage_${data.other_lic_doc[0].name}`
                } else {
                    data.other_lic_doc = ''
                }
                if (data.video_url.length != 0) {
                    await ImageUpload(data.video_url[0], "demovideo", "edemo", data.name)
                    data.video_url = `${demovideoLink}${data.name}_edemo_${data.video_url[0].name}`
                } else {
                    data.video_url = ''
                }
                if (data.electricity_url.length != 0) {
                    await ImageUpload(data.electricity_url[0], "storage", "electricity", data.name)
                    data.electricity_url = `${link}${data.name}_electricity_${data.electricity_url[0].name}`
                } else {
                    data.electricity_url = ''
                }
                if (data.noc_url.length != 0) {
                    await ImageUpload(data.noc_url[0], "storage", "noc", data.name)
                    data.noc_url = `${link}${data.name}_noc_${data.noc_url[0].name}`
                } else {
                    data.noc_url = ''
                }
            }
            else {
                if (data.image.length != 0) {
                    ImageUpload(data.image[0], "storage", "mainImage", data.name)
                    data.image = `${link}${data.name}_mainImage_${data.image[0].name}`
                } else {
                    data.image = props.data.image
                }
                if (data.outside_img.length != 0) {
                    await ImageUpload(data.outside_img[0], "storage", "outSideImage", data.name)
                    data.outside_img = `${link}${data.name}_outSideImage_${data.outside_img[0].name}`
                } else {
                    data.outside_img = props.data.outside_img
                }
                if (data.loading_img.length != 0) {
                    await ImageUpload(data.loading_img[0], "storage", "loadingImage", data.name)
                    data.loading_img = `${link}${data.name}_loadingImage_${data.loading_img[0].name}`
                } else {
                    data.loading_img = props.data.loading_img
                }
                if (data.staging_img.length != 0) {
                    await ImageUpload(data.staging_img[0], "storage", "stagingImage", data.name)
                    data.staging_img = `${link}${data.name}_stagingImage_${data.staging_img[0].name}`
                } else {
                    data.staging_img = props.data.staging_img
                }
                if (data.storage_img.length != 0) {
                    await ImageUpload(data.storage_img[0], "storage", "storageImage", data.name)
                    data.storage_img = `${link}${data.name}_storageImage_${data.storage_img[0].name}`
                } else {
                    data.storage_img = props.data.storage_img
                }
                if (data.other_img.length != 0) {
                    await ImageUpload(data.other_img[0], "storage", "otherImage", data.name)
                    data.other_img = `${link}${data.name}_otherImage_${data.other_img[0].name}`
                } else {
                    data.other_img = props.data.other_img
                }
                if (data.fassai_doc.length != 0) {
                    await ImageUpload(data.fassai_doc[0], "storage", "fassaiImage", data.name)
                    data.fassai_doc = `${link}${data.name}_fassaiImage_${data.fassai_doc[0].name}`
                } else {
                    data.fassai_doc = props.data.fassai_doc
                }
                if (data.gst_doc.length != 0) {
                    await ImageUpload(data.gst_doc[0], "storage", "gstImage", data.name)
                    data.gst_doc = `${link}${data.name}_gstImage_${data.gst_doc[0].name}`
                } else {
                    data.gst_doc = props.data.gst_doc
                }
                if (data.other_lic_doc.length != 0) {
                    await ImageUpload(data.other_lic_doc[0], "storage", "otherImage", data.name)
                    data.other_lic_doc = `${link}${data.name}_otherImage_${data.other_lic_doc[0].name}`
                } else {
                    data.other_lic_doc = props.data.other_lic_doc
                }

                if (data.video_url.length != 0) {
                    await ImageUpload(data.video_url[0], "demovideo", "edemo", data.name)
                    data.video_url = `${demovideoLink}${data.name}_edemo_${data.video_url[0].name}`
                } else {
                    data.video_url = props.data.video_url
                }
                if (data.electricity_url.length != 0) {
                    await ImageUpload(data.electricity_url[0], "storage", "electricity", data.name)
                    data.electricity_url = `${link}${data.name}_electricity_${data.electricity_url[0].name}`
                } else {
                    data.electricity_url = props.data.electricity_url
                }
                if (data.noc_url.length != 0) {
                    await ImageUpload(data.noc_url[0], "storage", "noc", data.name)
                    data.noc_url = `${link}${data.name}_noc_${data.noc_url[0].name}`
                } else {
                    data.noc_url = props.data.noc_url
                }
            }

            try {
                if (props.button == 'edit') {
                    updateStorage(props?.data?.id, data).then((res) => {
                        if (res?.message === 'Data edited successfully') {
                            StorageList()
                            setLoader(false)
                            toggle();
                            toast.success(res?.message);
                        }
                    })
                } else {
                    if (user.role == 'partner') {
                        data.user = user?.userid
                        createStorage(data).then((res) => {
                            if (res?.message === 'Data added successfully') {
                                StorageList()
                                setLoader(false)
                                toggle();
                                toast.success(res?.message);
                            }
                        })
                    } else {
                        createStorage(data).then((res) => {
                            if (res?.message === 'Data added successfully') {
                                StorageList()
                                setLoader(false)
                                toggle();
                                toast.success(res?.message);
                            }
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setLoader(false)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    // ================= close modal  ===============
    const closeBtn = () => {
        toggle();
        setActiveStep(0)
        methods.reset();
        setLoader(false);
        // setIsOpen(true)
    }
    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add Storage
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
                    <div className="fixed inset-0 ">
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
                                <Dialog.Panel className="w-full max-w-8xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">

                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        Register Restaurant
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <FormProvider {...methods}>
                                            <form onSubmit={methods.handleSubmit(onSubmit)} >
                                                <div className="py-4 overflow-y-scroll scrollbars h-[24rem] lg:h-[34rem]" >
                                                    <Stepper activeStep={activeStep} className='p-2' alternativeLabel>
                                                        {
                                                            steps?.map((step, index) => {
                                                                const labelProps = {};
                                                                if (isStepFalied() && activeStep == index) {
                                                                    labelProps.error = true;
                                                                }
                                                                return (
                                                                    <Step key={index}>
                                                                        <StepLabel  {...labelProps}>{step}</StepLabel>
                                                                    </Step>
                                                                )
                                                            })
                                                        }
                                                    </Stepper>
                                                    {getStepContent(activeStep)}
                                                </div>
                                                <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                                    <button type='button' className={formBtn1} disabled={activeStep == 0} onClick={handleBack}>Back</button>
                                                    {/* <button type='submit' className={formBtn1}>{activeStep == 4 ? "Submit" : "Next"}</button> */}
                                                    {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>{activeStep == 4 ? "Submit" : "Next"}</button>}
                                                    <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                                                </footer>
                                            </form>
                                        </FormProvider>
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