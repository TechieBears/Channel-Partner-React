import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import { fileinput, formBtn1, formBtn2, formBtn3, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import Switch from 'react-switch'
import { Edit } from 'iconsax-react';
import { createStorage } from '../../../api';
import { setStorageList } from '../../../redux/slices/storageSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { ImageUpload, link, demovideoLink } from '../../../env';
import { toast } from 'react-toastify';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import { validateEmail, validatePhoneNumber } from '../../Validations.jsx/Validations';


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
                        // <div className=' col-span-3 pt-3 grid grid-cols-2 gap-2'>
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
                        // </div>
                    }
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Number*
                        </label>
                        <input
                            type="tel"
                            placeholder='Restaurant Number'
                            className={inputClass}
                            {...register('rest_num', { required: true })}
                        />
                        {errors.rest_num && <Error title='Restaurant Number is required*' />}
                        {/* {verifyPhone &&
                            <div id="otp" class="flex flex-row justify-center text-center px-2 mt-2">
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" />
                            </div>}
                        <div className='grid grid-cols-2 gap-10'>
                            <button type='button' onClick={() => setVerifyPhone(!verifyPhone)} className={`${formBtn1} mt-2`}>Verify</button>
                            {verifyPhone && <button type='button' className={` mt-2`}>Resend</button>}
                        </div> */}
                    </div>
                    <div className=''>
                        <label className={labelClass}>
                            Personal Number*
                        </label>
                        <input
                            type="tel"
                            placeholder='Restaurant Number'
                            className={inputClass}
                            {...register('personal_num', {})}
                        />
                    </div>
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Mail*
                        </label>
                        <input
                            type="email"
                            placeholder='Restaurant Mail'
                            className={inputClass}
                            {...register('mail', { required: true })}
                        />
                        {/* {errors.address && <Error title='Year is required*' />} */}
                        {/* {verifyEmail &&
                            <div id="otp" class="flex flex-row justify-center text-center px-2 mt-2">
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" />
                                <input class="m-2 border focus:border-sky-400 h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" />
                            </div>}
                        <div className='grid grid-cols-2 gap-10'>
                            <button type='button' onClick={() => setVerifyEmail(!verifyEmail)} className={`${formBtn1} mt-2`}>Verify</button>
                            {verifyEmail && <button type='button' className={` mt-2`}>Resend</button>}
                        </div> */}
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
    const cuision = [
        "Italian Cuisine",
        "French Cuisine",
        "Chinese Cuisine",
        "Japanese Cuisine",
        "Mexican Cuisine",
        "Thai Cuisine",
        "Spanish Cuisine",
        "Greek Cuisine",
        "Lebanese Cuisine",
        "Turkish Cuisine",
        "North Indian Cuisine",
        "South Indian Cuisine",
        "East Indian Cuisine",
        "West Indian Cuisine",
        "Central Indian Cuisine",
        "Northeast Indian Cuisine",
        "Kashmiri Cuisine",
        "Punjabi Cuisine",
        "Rajasthani Cuisine",
        "Gujarati Cuisine",
        "Maharashtrian Cuisine",
        "Goan Cuisine",
        "Bengali Cuisine",
        "Odia Cuisine",
        "Assamese Cuisine",
        "Manipuri Cuisine",
        "Tripuri Cuisine",
        "Arunachali Cuisine",
        "Sikkimese Cuisine",
        "Naga Cuisine"
    ]
    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <p className='md:col-span-2 lg:col-span-3 font-semibold text-lg'>Establishment Type</p>
            <div className="">
                <label className={labelClass}>
                    Type*
                </label>
                <select
                    className={inputClass}
                    {...register('type', { required: true })}
                >
                    <option value=''>select</option>
                    <option value='Both'>Both</option>
                    <option value='Delivery only'>Delivery only</option>
                    <option value='Dine-in only'>Dine-in only</option>
                </select>
                {errors.type && <Error title='Name is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Selct Option which best describe your outlet*
                </label>
                <select
                    className={inputClass}
                    {...register('outlet_type', { required: true })}
                >
                    <option value=''>select</option>
                    <option value='Bakery'>Bakery</option>
                    <option value='Casual Dining'>Casual Dining</option>
                    <option value='Quick Bites'>Quick Bites</option>
                    <option value='Beverage Shop'>Beverage Shop</option>
                    <option value='Dessert Parlour'>Dessert Parlour</option>
                    <option value='Sweet Shop'>Sweet Shop</option>
                    <option value='Cafe'>Cafe</option>
                    <option value='Food Court'>Food Court</option>
                </select>
                {errors.outlet_type && <Error title='Name is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Cuisines Type*
                </label>
                <select
                    className={inputClass}
                    {...register('cuisines_type', { required: true })}
                >
                    <option value=''>select</option>
                    {cuision.map((cuisine, index) => (
                        <option key={index} value={cuisine}>{cuisine}</option>
                    ))}
                </select>
                {errors.cuisines_type && <Error title='Name is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Opening Hour*
                </label>
                <input
                    type="time"
                    placeholder=''
                    className={inputClass}
                    {...register('opening_hour', { required: true })}
                />
                {errors.opening_hour && <Error title='Opening Hour is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Closing Hour
                </label>
                <input
                    type="time"
                    placeholder='Closing Hour'
                    className={inputClass}
                    {...register('closing_hour', { required: true })}
                />
                {errors.closing_hour && <Error title={'Closing Hour is required'} />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Week Off
                </label>
                <select
                    className={inputClass}
                    {...register('week_off', { required: true })}
                >
                    <option value=''>Select</option>
                    <option value='Monday'>Monday</option>
                    <option value='Tuesday'>Tuesday</option>
                    <option value='Wednesday'>Wednessday</option>
                    <option value='Thursday'>Thursday</option>
                    <option value='Friday'>Friday</option>
                    <option value='Saturday'>Saturday</option>
                    <option value='Sunday'>Sunday</option>
                </select>
                {errors.week_off && <Error title={'Closing Hour is required'} />}
            </div>
        </div>
    );
}
// =================== form steps 3 =================

const Step3 = () => {
    const { register, formState: { errors }, } = useFormContext()
    const designationList = useSelector(state => state?.master?.designation)
    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <div className="">
                <label className={labelClass}>
                    Contact Person Name*
                </label>
                <input
                    type="text"
                    placeholder='Contact person Name'
                    className={inputClass}
                    {...register('dm_name', { required: true })}
                />
                {errors.dm_name && <Error title='Contact is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Desgination*
                </label>
                <select
                    placeholder='Desgination'
                    className={inputClass}
                    {...register('dm_desgination', { required: true })}
                >
                    <option value=''>Select Desgination</option>
                    {designationList?.map((curElm) => <option value={curElm?.name} key={curElm?.name}>{curElm?.name}</option>)}
                </select>
                {errors.dm_desgination && <Error title='Desgination is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Contact No*
                </label>
                <input
                    type="text"
                    placeholder='Contact No'
                    className={inputClass}
                    {...register('dm_contact', { required: true })}
                />
                {errors.dm_contact && <Error title='Contact No is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Email id
                </label>
                <input
                    type="email"
                    placeholder='Email id'
                    className={inputClass}
                    {...register('dm_email', {
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Enter Valid Email"
                        }
                    })}
                />
                {errors.dm_email && <Error title={`${errors?.dm_email?.message}`} />}
            </div>
        </div>
    );
}
// =================== form steps 4 =================

// const Step4 = (props) => {
//     const { register, formState: { errors }, setError } = useFormContext()
//     const validateVideoSize = (file) => {
//         if (file[0].size > 30 * 1024 * 1024) {
//             setError('video', {
//                 type: 'manual',
//                 message: 'Video file size should be less than 10MB',
//             });
//         } else {
//             return true;
//         }
//     };
//     return (
//         <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
//             <div className="">
//                 <label className={labelClass} htmlFor="main_input">Main Image*</label>
//                 <input className={fileinput}
//                     id="main_input"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("image", { required: props.button == 'edit' ? false : true })} />
//                 {props?.button == 'edit' && props?.data.image != '' && props?.data.image != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                     {props?.data.image.split('storage')[1].split('/')[1].split('_')[2]}
//                 </label>}
//                 {errors.image && <Error title='Main Image is required*' />}
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="Outside">Outside Image*</label>
//                 <input className={fileinput}
//                     id="Outside"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("outside_img", { required: props.button == 'edit' ? false : true })} />
//                 {props?.button == 'edit' && props?.data.outside_img != '' && props?.data.outside_img != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                     {props?.data.outside_img.split('storage')[1].split('/')[1].split('_')[2]}
//                 </label>}
//                 {errors.outside_img && <Error title=' Outside Image is required*' />}
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="Other">Other Images</label>
//                 <input className={fileinput}
//                     id="Other"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("other_img")} />
//                 {props?.button == 'edit' && props?.data.other_img != '' && props?.data.other_img != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                     {props?.data.other_img.split('storage')[1].split('/')[1].split('_')[2]}
//                 </label>}
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="Loading">Loading / Unloading Bays</label>
//                 <input className={fileinput}
//                     id="Loading"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("loading_img")} />
//                 {props?.button == 'edit' && props?.data.loading_img != '' && props?.data.loading_img != undefined &&
//                     <>
//                         <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                             {props?.data.loading_img.split('storage')[1].split('/')[1].split('_')[2]}
//                         </label>
//                     </>
//                 }
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="Staging">Staging Area / Ante Room</label>
//                 <input className={fileinput}
//                     id="Staging"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("staging_img")} />
//                 {props?.button == 'edit' && props?.data.staging_img != '' && props?.data.staging_img != undefined &&
//                     <>
//                         <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                             {props?.data.staging_img.split('storage')[1].split('/')[1].split('_')[2]}
//                         </label>
//                     </>
//                 }
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="Storage">Storage Area</label>
//                 <input className={fileinput}
//                     id="Storage"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("storage_img")} />
//                 {props?.button == 'edit' && props?.data.storage_img != '' && props?.data.storage_img != undefined &&
//                     <>
//                         <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                             {props?.data.storage_img.split('storage')[1].split('/')[1].split('_')[2]}
//                         </label>
//                     </>
//                 }
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="evideo">E-Demo Video*</label>
//                 <input className={fileinput}
//                     id="evideo"
//                     type='file'
//                     multiple
//                     accept='video/mp4,video/x-m4v,video/*,video/quicktime,video/x-ms-wmv,video/x-msvideo'
//                     placeholder='Upload Video...'
//                     {...register("video_url", {
//                         required: props.button == 'edit' ? false : 'Video is required*',
//                         onChange: (e) => {
//                             validateVideoSize(e.target.files);
//                         }
//                     })} />
//                 {props?.button == 'edit' && props?.data.video_url != '' && props?.data.video_url != undefined &&
//                     <>
//                         <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                             {props?.data.video_url.split('demovideo')[1].split('/')[1].split('_')[2]}
//                         </label>
//                     </>
//                 }
//                 {errors.video_url && <Error title={`${errors.video_url.message}`} />}
//             </div>
//         </div>
//     )
// }
// // =================== form steps 5 =================

// const Step5 = (props) => {
//     const { register, formState: { errors }, } = useFormContext()
//     return (
//         <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
//             <div className="">
//                 <label className={labelClass}>
//                     Fassai license*
//                 </label>
//                 <input
//                     type="text"
//                     placeholder='Fassai License'
//                     className={inputClass}
//                     {...register('fassai_license', { required: true })}
//                 />
//                 {errors.fassai_license && <Error title=' License is required*' />}
//             </div>
//             <div className="">
//                 <label className={labelClass}>
//                     GST No*
//                 </label>
//                 <input
//                     type="text"
//                     placeholder='GST No'
//                     className={inputClass}
//                     {...register('gst_no', { required: true })}
//                 />
//                 {errors.gst_no && <Error title='GST No is required*' />}
//             </div>
//             <div className="">
//                 <label className={labelClass}>
//                     Any Other licenses
//                 </label>
//                 <input
//                     type="text"
//                     placeholder='Any Other Licenses'
//                     className={inputClass}
//                     {...register('other_license')}
//                 />
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="main_input">Fassai license  Doc*</label>
//                 <input className={fileinput}
//                     id="main_input"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("fassai_doc", { required: props.button == 'edit' ? false : true })} />
//                 {props?.button == 'edit' && props?.data?.fassai_doc != '' && props?.data?.fassai_doc != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                     {props?.data?.fassai_doc.split('storage')[1].split('/')[1].split('_')[2]}
//                 </label>}
//                 {errors.fassai_doc && <Error title='Fassai license Docx*' />}
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="main_input">Gst Doc*</label>
//                 <input className={fileinput}
//                     id="main_input"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("gst_doc", { required: props.button == 'edit' ? false : true })} />
//                 {props?.button == 'edit' && props?.data?.gst_doc != '' && props?.data?.gst_doc != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                     {props?.data?.gst_doc.split('storage')[1].split('/')[1].split('_')[2]}
//                 </label>}
//                 {errors.gst_doc && <Error title='Gst Image docx is required*' />}
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="other_lic_doc">Other licenses Doc</label>
//                 <input className={fileinput}
//                     id="other_lic_doc"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Images...'
//                     {...register("other_lic_doc")} />
//                 {props?.button == 'edit' && props?.data?.other_lic_doc != '' && props?.data?.other_lic_doc != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                     {props?.data?.other_lic_doc.split('storage')[1].split('/')[1].split('_')[2]}
//                 </label>}
//                 {errors.other_lic_doc && <Error title='Other licenses Docx is required*' />}
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="electricity_url">Electricity Doc</label>
//                 <input className={fileinput}
//                     id="electricity_url"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Doc...'
//                     {...register("electricity_url")} />
//                 {props?.button == 'edit' && props?.data.electricity_url != '' && props?.data.electricity_url != undefined &&
//                     <>
//                         <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                             {props?.data.electricity_url.split('storage')[1].split('/')[1].split('_')[2]}
//                         </label>
//                     </>
//                 }
//             </div>
//             <div className="">
//                 <label className={labelClass} htmlFor="noc_url">NOC Doc</label>
//                 <input className={fileinput}
//                     id="noc_url"
//                     type='file'
//                     multiple
//                     accept='image/jpeg,image/jpg,image/png,application/pdf'
//                     placeholder='Upload Doc...'
//                     {...register("noc_url")} />
//                 {props?.button == 'edit' && props?.data.noc_url != '' && props?.data.noc_url != undefined &&
//                     <>
//                         <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
//                             {props?.data.noc_url.split('storage')[1].split('/')[1].split('_')[2]}
//                         </label>
//                     </>
//                 }
//             </div>
//         </div>
//     )
// }

export default function DashboardForm(props) {
    const user = useSelector((state) => state.user.loggedUserDetails)
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();
    const steps = ['Restaurant Information', 'Restaurant Type and Timing', 'Upload Images'];
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
            // case 3:
            //     return <Step5 {...props} />
            // case 4:
            //     return <Step4 {...props} />
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