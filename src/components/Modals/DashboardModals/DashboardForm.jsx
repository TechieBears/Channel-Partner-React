import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import { registerRestaurant, getRestaurantCategory, editOnBoarding } from '../../../api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Error from '../../Errors/Error';
import LoadBox from '../../Loader/LoadBox';
import Select from 'react-select';
import { validatePhoneNumber } from '../../Validations.jsx/Validations';
import { ImageUpload, restaurantLink } from '../../../env';
import moment from 'moment';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { LocateFixed } from 'lucide-react';

// =================== form steps 1 =================



const Step1 = (props) => {
    console.log('props = ', props)

    const [manually, setManally] = useState(false);
    const [verifyPhone, setVerifyPhone] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const { register, getValues, setValue, control, reset, formState: { errors }, } = useFormContext()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY
    })

    const [position, setPosition] = useState({
        lat: 0,
        lng: 0
    });

    const getCurrentPostion = () => {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            const { latitude, longitude } = coords;
            setPosition({
                lat: latitude,
                lng: longitude
            })
            await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDGaE5jGDxrxwRCloXLOgDgcH-1Q64IlpI`)
                .then(response => response.json())
                .then(data => {
                    const address = data?.results[0]?.formatted_address;
                    const components = data?.results[0]?.address_components;
    
                    const city = components?.find(comp => comp.types.includes('locality'))?.long_name || '';
                    const state = components?.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name || '';
                    const pincode = components?.find(comp => comp.types.includes('postal_code'))?.long_name || '';
                    if (address) {
                        const { shop_name, shop_contact_number, about_restaurant } = getValues();
                        const mergedData = {
                            shop_name: shop_name,
                            shop_contact_number: shop_contact_number,
                            about_restaurant: about_restaurant,
                            city: city,
                            state: state,
                            pincode: pincode,
                            shop_address: address,
                            latitude: latitude,
                            longitude: longitude
                        };
                        // console.log("++", mergedData)
                        reset(mergedData);
                    }
                })
                .catch(error => console.error('Error fetching address:', error));
                // setPosition({
                //     lat: e.latLng.lat(),
                //     lng: e.latLng.lng(),
                // });
        })
    }

    useEffect(() => {
        if (props.button == 'edit' && props.data) {
            reset({
                "shop_name": props?.data?.vendor?.shop_name,
                "shop_address": props?.data?.vendor?.shop_address,
                "shop_contact_number": props?.data?.vendor?.shop_contact_number,
                "about_restaurant": props?.data?.about_restaurant,
                "latitude": props?.data?.vendor?.latitude,
                "longitude": props?.data?.vendor?.longitude,
            })
        } else {
            // methods = useForm()
        }
        getCurrentPostion()
    }, [])

    const onMarkerDragEnd = async (e) => {
        const latLng = e.latLng
        const latitude = latLng.lat();
        const longitude = latLng.lng();
        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const address = data?.results[0]?.formatted_address;
                const components = data?.results[0]?.address_components;

                const city = components?.find(comp => comp.types.includes('locality'))?.long_name || '';
                const state = components?.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name || '';
                const pincode = components?.find(comp => comp.types.includes('postal_code'))?.long_name || '';
                if (address) {
                    const { shop_name, shop_contact_number, about_restaurant } = getValues();
                    const mergedData = {
                        shop_name: shop_name,
                        shop_contact_number: shop_contact_number,
                        about_restaurant: about_restaurant,
                        city: city,
                        state: state,
                        pincode: pincode,
                        shop_address: address,
                        latitude: latitude,
                        longitude: longitude
                    };
                    // console.log("++", mergedData)
                    reset(mergedData);
                }
            })
            .catch(error => console.error('Error fetching address:', error));
        setPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };


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
                            {...register('shop_name', { required: true })}
                        />
                        {errors.shop_name && <Error title='Restaurant Name is required*' />}
                    </div>
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Complete Address*
                        </label>
                        <input
                            type="text"
                            placeholder='Restaurant Address'
                            className={inputClass}
                            {...register('shop_address', { required: true })}
                        />
                        {errors.shop_address && <Error title='Restaurant Address is Required*' />}
                    </div>
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Phone Number*
                        </label>
                        <input
                            type="tel"
                            placeholder='Restaurant Number'
                            className={inputClass}
                            {...register('shop_contact_number', { required: true, validate: validatePhoneNumber })}
                        />
                        {errors.shop_contact_number && <Error title='Restaurant Phone Number is required*' />}
                    </div>
                    <div className=''>
                    <label className={`text-transparent ${labelClass}`}>
                            Restaurant Phone Number*
                        </label>
                        <button type='button' className={`flex w-full justify-center ${formBtn1}`} onClick={getCurrentPostion}><LocateFixed className='me-3'/>Get Current Location</button>
                    </div>
                    <div className="">
                        <label className={labelClass}>
                            Restaurant Description*
                        </label>
                        <input
                            type="text"
                            placeholder='Restaurant Description'
                            className={inputClass}
                            {...register('about_restaurant', { required: true, })}
                        />
                        {errors.about_restaurant && <Error title='Restaurant Description is required*' />}
                    </div>
                  
                    <div className="">
                        <label className={labelClass}>
                            Latitude*
                        </label>
                        <input
                            type="text"
                            placeholder='Latitude'
                            className={inputClass}
                            {...register('latitude', { required: manually })}
                        />
                        {errors.latitude && <Error title='Latitude Is required' />}
                    </div>
                    <div className="">
                        <label className={labelClass}>
                            Longitude*
                        </label>
                        <input
                            type="text"
                            placeholder='Longitutde'
                            className={inputClass}
                            {...register('longitude', { required: manually })}
                        />
                        {errors.longitude && <Error title='Longitude' />}
                    </div>

                    {/* <div className="">
                        <label className={labelClass}>
                            State*
                        </label>
                        <input
                            type="text"
                            // readOnly
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
                            // readOnly
                            placeholder='Pincode'
                            className={inputClass}
                            {...register('pincode',)}
                        />
                    </div>
                    <div className="">
                        <label className={labelClass}>
                            City*
                        </label>
                        <input
                            type="text"
                            // readOnly
                            placeholder='City'
                            className={inputClass}
                            {...register('city',)}
                        />
                    </div> */}
                   
                </div>
            </div>
            <div className='col-span-2'>
                {/* ============================= Maps start ============================= */}
                <div className='bg-slate-50 rounded-xl'>
                    {
                        isLoaded ? (
                            <GoogleMap
                                center={position}
                                zoom={18}
                                mapContainerStyle={{ width: '100%', height: '400px', backgroundColor: '#fff' }}
                            >
                                <Marker
                                    position={position}
                                    draggable={true}
                                    onDragEnd={onMarkerDragEnd}
                                />
                            </GoogleMap>
                        ) : null
                    }
                </div>
                {/* ============================= Maps end ============================= */}
                <p className='text-sm text-gray-400'>Please provide precise location for better results</p>
            </div>
        </div>
    )
}

// =================== form steps 2 =================
const Step2 = (props) => {
    console.log('step 2 props ========', props?.category)
    console.log('props ========', props)
    const { register, getValues, setValue, control, reset, formState: { errors }, } = useFormContext()

    const [allCuisines, setAllCuisines] = useState([
        { value: "Fast Food", label: "Fast Food" },
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

    useEffect(() => {
        if (props.button == 'edit' && props.data) {
            const formattedStartTime = moment(props?.data?.vendor?.shop_start_time, 'h:mm A').format('HH:mm');
            const formattedEndTime = moment(props?.data?.vendor?.shop_end_time, 'h:mm A').format('HH:mm');

            reset({
               'veg_nonveg': props?.data?.veg_nonveg,
               'restaurant_type': props?.data?.restaurant_type,
               'shop_start_time':formattedStartTime,
               'shop_end_time': formattedEndTime,
               'type_of_cuisine': JSON.parse(props?.data?.type_of_cuisine) 
            })
        } else {
            // methods = useForm()
        }
    }, [])

    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <p className='text-lg font-semibold md:col-span-2 lg:col-span-3'>Establishment Type</p>
            <div className="">
                <label className={labelClass}>
                    Restaurant Type*
                </label>
                <select
                    className={inputClass}
                    {...register('veg_nonveg', { required: true })}
                >
                    <option value=''>Select</option>
                    <option value='Both'>Both</option>
                    <option value='Veg'>Veg</option>
                    <option value='Non-Veg'>Non-Veg</option>
                </select>
                {errors?.veg_nonveg && <Error title='Restaurant Type is required' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Select What Describe you the best*
                </label>
                <select
                    className={inputClass}
                    {...register('restaurant_type', { required: true })}
                >
                    <option value=''>Select</option>
                    {props?.category?.map(item =>
                        <option value={item?.category_name}>{item?.category_name}</option>
                    )}
                </select>
                {errors?.restaurant_type && <Error title='Select Your Describe is required' />}
            </div>
            {/* <div className="">
                <label className={labelClass}>
                    Select What Describes you the best*
                </label>
                <select
                    className={inputClass}
                    {...register('restaurant_type', { required: true })}
                >
                    <option value=''>Select</option>
                    {allOptions.map(item =>
                        <option key={item?.value} value={item?.value}>{item?.value}</option>
                    )}
                </select>
                {errors?.restaurant_type && <Error title='Select Your Describe is required' />}
            </div> */}
            <div className="">
                <label className={labelClass}>
                    Type of cuisines*
                </label>
                <Select
                    options={allCuisines}
                    isMulti
                    value={props?.selectedCuisines}
                    onChange={(selectedOption) => props?.setSelectedCuisines(selectedOption)}
                />
                {errors?.type_of_cuisine && <Error title='Type of Cuisine is required' />}
            </div>
            <div>
                <label className={labelClass}>
                    Opeing Hour*
                </label>
                <input
                    type='time'
                    className={inputClass}
                    {...register('shop_start_time', { required: true })}
                />
                {errors?.shop_start_time && <Error title='Opening Hour is required' />}
            </div>
            <div>
                <label className={labelClass}>
                    Closing Hour*
                </label>
                <input
                    type='time'
                    className={inputClass}
                    step={1800}
                    {...register('shop_end_time', { required: true })}
                />
                {errors?.shop_closing_time && <Error title='Closing Hour is required' />}
            </div>
        </div>
    );
};

// =================== form steps 3 =================
const Step3 = (props) => {
    console.log('props 3', props);
    const { register, getValues, setValue, control, reset, formState: { errors }, } = useFormContext()

    useEffect(() => {
        if (props.button == 'edit' && props.data) {
            reset({
               'ambience_image': props?.data?.ambience_image,
               'shop_image': props?.data?.vendor?.shop_image,
            })
        } else {
            // methods = useForm()
        }
    }, [])

    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <p className='text-lg font-semibold md:col-span-2 lg:col-span-3'>Upload Images</p>
            <p className='text-base font-normal md:col-span-2 lg:col-span-3'>Ambience Images</p>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 1 *</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    // multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("ambience_image", { required: !props?.data?.ambience_image })} />
                {props?.button == 'edit' && props?.data.ambience_image != '' && props?.data?.ambience_image != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.ambience_image?.split('/').pop()}
                </label>}
                {errors.ambience_image && <Error title='Image is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 2</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    // multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("shop_image")} />
                {props?.button == 'edit' && props?.data?.vendor?.shop_image != '' && props?.data?.vendor?.shop_image != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.vendor?.shop_image?.split('/').pop()}
                </label>}
                {/* {errors.shop_image && <Error title='Image is required*' />} */}
            </div>
            {/* <div className="">
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
            </div> */}
            <p className='text-base font-normal md:col-span-2 lg:col-span-3'>Dish Images</p>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 1*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    // multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("food_image1", { required: !props?.data?.food_image1 })} />
                {props?.button == 'edit' && props?.data.food_image1 != '' && props?.data.food_image1 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.food_image1?.split('/').pop()}
                </label>}
                {errors.food_image1 && <Error title='Dish Image is required*' />}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 2</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    // multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("food_image2", {})} />
                {props?.button == 'edit' && props?.data.food_image2 != '' && props?.data.food_image2 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.food_image2?.split('/').pop()}
                </label>}
            </div>
            <div className="">
                <label className={labelClass} htmlFor="main_input">Image 3</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    // multiple
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("food_image3", {})} />
                {props?.button == 'edit' && props?.data.food_image3 != '' && props?.data.food_image3 != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.food_image3?.split('/').pop()}
                </label>}
            </div>
        </div>
    );
}

// =================== form steps 4 =================
const Step4 = (props) => {
    console.log('props4 = ', props)
    const { register, setValue, formState: { errors }, setError, watch } = useFormContext()
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
    console.log('props5 = ', props)
    const { register, setValue, getValues, control, reset, watch, formState: { errors }, } = useFormContext()
    const gstRegistered = watch('gst_registered');
    
    useEffect(() => {
        if (props.button == 'edit' && props.data) {
            reset({

               'pan_card': props?.data?.vendor?.pan_card,
               'bank_name': props?.data?.vendor?.bank_name,
               'account_number': props?.data?.vendor?.account_number,
               'ifsc_code': props?.data?.vendor?.ifsc_code,
               'adhar_card': props?.data?.vendor?.adhar_card,
            //    'gst_number': props?.data?.vendor?.gst_number,
            })
        } else {
            // methods = useForm()
        }
    }, [])
    return (
        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
            <p className='col-span-3 text-lg font-semibold'>PAN Details</p>
            {/* <div className="">
                <label className={labelClass}>
                    PAN No*
                </label>
                <input
                    type="text"
                    placeholder='PAN No'
                    className={inputClass}
                    {...register('pan_card', { required: true })}
                />
                {errors.pan_card && <Error title='PAN No is required*' />}
            </div> */}
            {/* <div className="">
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
            </div> */}
            <div className="">
                <label className={labelClass} htmlFor="main_input">PAN Card Photo*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    accept='image/jpeg,image/jpg,image/png'
                    placeholder='Upload Images...'
                    {...register("pan_name", {required: true})} />
                {props?.button == 'edit' && props?.data.pan_name != '' && props?.data.pan_name != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                    {props?.data?.pan_name?.split('/').pop()}
                </label>
                }
                {errors.pan_name && <Error title='PAN Card Image is required*' />}
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
                            {...register('gst_number', { required: gstRegistered == 'Yes' ? true : false })}
                            placeholder='GST Number'
                        />
                        {errors?.gst_number && (gstRegistered == 'Yes') ? <Error title='GST Number is required*' /> : ''}
                    </div>
                    {/* <div className="">
                        <label className={labelClass} htmlFor="main_input">GST Image</label>
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
                    </div> */}
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
                <label className={labelClass} htmlFor="main_input">Fassai license  Doc</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("fassai_doc", {})} />
                {props?.button == 'edit' && props?.data?.fassai_doc != '' && props?.data?.fassai_doc != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
                    {props?.data?.fassai_doc.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
            </div>
            <p className='col-span-3 text-lg font-semibold'>Banking Details</p>
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
                {errors?.bank_name && <Error title='Bank Name is required*' />}
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
                {errors?.account_number && <Error title='Account Number is required*' />}
            </div>
            <div className="">
                <label className={labelClass}>
                    Bank IFSC Code*
                </label>
                <input
                    type="text"
                    placeholder='Bank IFSC Code'
                    className={inputClass}
                    {...register('ifsc_code', { required: true })}
                />
                {errors?.ifsc_code && <Error title='IFSC Code is required*' />}
            </div>
            <p className='col-span-3 text-lg font-semibold'>Adhar Details</p>
            {/* <div className="">
                <label className={labelClass}>
                    Adhar Number*
                </label>
                <input
                    type="text"
                    placeholder='Adhar Number'
                    className={inputClass}
                    {...register('adhar_card', { required: true })}
                />
                {errors?.adhar_card && <Error title='Adhar number is required' />}
            </div> */}
            <div className="">
                <label className={labelClass} htmlFor="main_input">Aadhar Card Photo*</label>
                <input className={fileinput}
                    id="main_input"
                    type='file'
                    multiple
                    accept='image/jpeg,image/jpg,image/png,application/pdf'
                    placeholder='Upload Images...'
                    {...register("adhar_card", { required: true })} />
                {props?.button == 'edit' && props?.data?.adhar_card != '' && props?.data?.adhar_card != undefined && <label className='block mb-1 font-medium text-blue-800 capitalize text-md font-tb'>
                    {props?.data?.adhar_card.split('storage')[1].split('/')[1].split('_')[2]}
                </label>}
                {errors.adhar_card && <Error title='Adhar Card Image is required*' />}
            </div>
        </div>
    )
}

export default function DashboardForm(props) {
    console.log('get rest props = ', props)
    const LoggedUserDetails = useSelector((state) => state?.user?.loggedUserDetails);
    const [isOpen, setIsOpen] = useState(props?.isOpen ? props?.isOpen : false)
    const [loader, setLoader] = useState(false)
    const [category, setCategory] = useState([])
    const [selectedRestType, setSelectedRestType] = useState([])
    const [selectedCuisines, setSelectedCuisines] = useState([])
    const [activeStep, setActiveStep] = useState(0);
    const toggle = () => setIsOpen(!isOpen);
    const { register, handleSubmit, setValue,  control, formState: { errors }, reset } = useForm();

    const steps = ['Restaurant Information', 'Restaurant Type and Timing', 'Upload Images', 'General Information', 'Legal Documentation',];

    // ============== Restaurant API ================
    const restaurantCategories = () => {
        try {
            getRestaurantCategory().then((res) => {
                setCategory(res)
            });
        } catch (error) {
            console.log(error);
        }
    };

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
                return <Step1 {...props}/>
            case 1:
                return <Step2  {...props} selectedCuisines={selectedCuisines} setSelectedCuisines={setSelectedCuisines} selectedRestType={selectedRestType}
                    setSelectedRestType={setSelectedRestType} category={category} />
            case 2:
                return <Step3  {...props}/>
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
        const shopStartTime = moment(data?.shop_start_time, 'HH:mm').format('hh:mm A');
        const shopEndTime = moment(data?.shop_end_time, 'HH:mm').format('hh:mm A');

        data.shop_start_time = shopStartTime;
        data.shop_end_time = shopEndTime;

        // moment(data?.shop_start_time).format('LT');
        // moment(data?.shop_closing_time).format('LT');

        // setValue('shop_start_time', moment(data?.shop_start_time, 'HH:mm').format('h:mm A'))
        // setValue('shop_end_time', moment(data?.shop_end_time, 'HH:mm').format('h:mm A'))
        // console.log( moment(data?.shop_start_time, 'HH:mm').format('h:mm A'),  moment(data?.shop_end_time, 'HH:mm').format('h:mm A'))
        console.log(data.shop_start_time, data.shop_end_time)

        // if(data?.shop_start_time || data?.shop_end_time){
        //     data?.shop_start_time = moment(data?.shop_start_time, 'HH:mm').format('h:mm A')
        //     data?.shop_end_time = moment(data?.shop_end_time, 'HH:mm').format('h:mm A')
        // }

        console.log('data', data)
        isStepFalied()
        setLoader(true)
        if (props?.button != 'edit') {      
            if (activeStep == steps.length - 1) {
                if (data.ambience_image.length != 0) {
                    await ImageUpload(data.ambience_image[0], "restaurant", "ambience_image", data.shop_name)
                    data.ambience_image = `${restaurantLink}${data.shop_name}_ambience_image_${data.ambience_image[0].name}`
                } else {
                    data.ambience_image = ''
                }
                if (data.shop_image.length != 0) {
                    await ImageUpload(data.shop_image[0], "restaurant", "shop_image", data.shop_name)
                    data.shop_image = `${restaurantLink}${data.shop_name}_shop_image_${data.shop_image[0].name}`
                } else {
                    data.shop_image = ''
                }
                if (data.food_image1.length != 0) {
                    await ImageUpload(data.food_image1[0], "restaurant", "food_image1", data.shop_name)
                    data.food_image1 = `${restaurantLink}${data.shop_name}_food_image1_${data.food_image1[0].name}`
                } else {
                    data.food_image1 = ''
                }
                if (data.food_image2.length != 0) {
                    await ImageUpload(data.food_image2[0], "restaurant", "food_image2", data.shop_name)
                    data.food_image2 = `${restaurantLink}${data.shop_name}_food_image2_${data.food_image2[0].name}`
                } else {
                    data.food_image2 = ''
                }
                if (data.food_image3.length != 0) {
                    await ImageUpload(data.food_image3[0], "restaurant", "food_image3", data.shop_name)
                    data.food_image3 = `${restaurantLink}${data.shop_name}_food_image3_${data.food_image3[0].name}`
                } else {
                    data.food_image3 = ''
                }
                if (data.adhar_img.length != 0) {
                    await ImageUpload(data.adhar_img[0], "restaurant", "adhar_img", data.shop_name)
                    data.adhar_img = `${restaurantLink}${data.shop_name}_adhar_img_${data.adhar_img[0].name}`
                } else {
                    data.adhar_img = ''
                }
                if (data.fassai_doc.length != 0) {
                    await ImageUpload(data.fassai_doc[0], "restaurant", "fassai_doc", data.shop_name)
                    data.fassai_doc = `${restaurantLink}${data.shop_name}_fassai_doc_${data.fassai_doc[0].name}`
                } else {
                    data.fassai_doc = ''
                }
                // if (data.menu_image2.length != 0) {
                //     await ImageUpload(data.menu_image2[0], "restaurant", "stagingImage", data.name)
                //     data.menu_image2 = `${restaurantLink}${data.name}_stagingImage_${data.menu_image2[0].name}`
                // } else {
                //     data.menu_image2 = ''
                // }
                if (data.order_img1.length != 0) {
                    await ImageUpload(data.order_img1[0], "restaurant", "order_img1", data.shop_name)
                    data.order_img1 = `${restaurantLink}${data.shop_name}_order_img1_${data.order_img1[0].name}`
                } else {
                    data.order_img1 = ''
                }
                if (data.order_img2.length != 0) {
                    await ImageUpload(data.order_img2[0], "restaurant", "order_img2", data.shop_name)
                    data.order_img2 = `${restaurantLink}${data.shop_name}_order_img2_${data.order_img2[0].name}`
                } else {
                    data.order_img2 = ''
                }
                if (data.order_img3.length != 0) {
                    await ImageUpload(data.order_img3[0], "restaurant", "order_img3", data.shop_name)
                    data.order_img3 = `${restaurantLink}${data.shop_name}_order_img3_${data.order_img3[0].name}`
                } else {
                    data.order_img3 = ''
                }
                if (data.pan_name.length != 0) {
                    await ImageUpload(data.pan_name[0], "restaurant", "pan_name", data.shop_name)
                    data.pan_name = `${restaurantLink}${data.shop_name}_pan_name_${data.pan_name[0].name}`
                } else {
                    data.pan_name = ''
                }
                if (data.adhar_card.length != 0) {
                    await ImageUpload(data.adhar_card[0], "restaurant", "adhar_card", data.shop_name)
                    data.adhar_card = `${restaurantLink}${data.shop_name}_adhar_card_${data.adhar_card[0].name}`
                } else {
                    data.adhar_card = ''
                }
                // if (data.res_img3.length != 0) {
                //     await ImageUpload(data.res_img3[0], "restaurant", "stagingImage", data.name)
                //     data.res_img3 = `${restaurantLink}${data.name}_stagingImage_${data.res_img3[0].name}`
                // } else {
                //     data.res_img3 = ''
                // }
                let updatedData = {
                    ...data,
                    "type_of_cuisine": JSON.stringify(selectedCuisines),
                    // "restaurant_type": selectedRestType,
                    "vendorId": LoggedUserDetails?.sellerId,
                }
                registerRestaurant(updatedData).then(res => {
                    if (res?.status == 'success') {
                        toast?.success('Restaurants registered successfully')
                        toggle();
                        setLoader(false);
                    }
                })
            } else {
                setLoader(false)
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else{
            if (data.ambience_image.length > 0 && props?.data?.ambience_image) {
                await ImageUpload(data.ambience_image[0], "restaurant", "ambience_image", data.shop_name)
                data.ambience_image = `${restaurantLink}${data.shop_name}_ambience_image_${data.ambience_image[0].name}`
            } else {
                data.ambience_image = props?.data?.ambience_image
            }
            if (data.shop_image.length > 0 && props?.data?.vendor?.shop_image) {
                await ImageUpload(data.shop_image[0], "restaurant", "shop_image", data.shop_name)
                data.shop_image = `${restaurantLink}${data.shop_name}_shop_image_${data.shop_image[0].name}`
            } else {
                data.shop_image = props?.data?.vendor?.shop_image
            }
            if (data.food_image1.length > 0 && props?.data?.food_image1) {
                await ImageUpload(data.food_image1[0], "restaurant", "food_image1", data.shop_name)
                data.food_image1 = `${restaurantLink}${data.shop_name}_food_image1_${data.food_image1[0].name}`
            } else {
                data.food_image1 = props?.data?.food_image1
            }
            if (data.food_image2.length > 0 && props?.data?.food_image2) {
                await ImageUpload(data.food_image2[0], "restaurant", "food_image2", data.shop_name)
                data.food_image2 = `${restaurantLink}${data.shop_name}_food_image2_${data.food_image2[0].name}`
            } else {
                data.food_image2 = props?.data?.food_image2
            }
            if (data.food_image3.length > 0 && props?.data?.food_image3) {
                await ImageUpload(data.food_image3[0], "restaurant", "food_image3", data.shop_name)
                data.food_image3 = `${restaurantLink}${data.shop_name}_food_image3_${data.food_image3[0].name}`
            } else {
                data.food_image3 = props?.data?.food_image3
            }
            if (data.adhar_img.length > 0 && props?.data?.adhar_img) {
                await ImageUpload(data.adhar_img[0], "restaurant", "adhar_img", data.shop_name)
                data.adhar_img = `${restaurantLink}${data.shop_name}_adhar_img_${data.adhar_img[0].name}`
            } else {
                data.adhar_img = props?.data?.adhar_img
            }
            if (data.fassai_doc.length > 0 && props?.data?.fassai_doc) {
                await ImageUpload(data.fassai_doc[0], "restaurant", "fassai_doc", data.shop_name)
                data.fassai_doc = `${restaurantLink}${data.shop_name}_fassai_doc_${data.fassai_doc[0].name}`
            } else {
                data.fassai_doc = props?.data?.fassai_doc
            }
            // if (data.menu_image2.length != 0) {
            //     await ImageUpload(data.menu_image2[0], "restaurant", "stagingImage", data.name)
            //     data.menu_image2 = `${restaurantLink}${data.name}_stagingImage_${data.menu_image2[0].name}`
            // } else {
            //     data.menu_image2 = ''
            // }
            if (data.order_img1.length > 0 && props?.data?.order_img1) {
                await ImageUpload(data.order_img1[0], "restaurant", "order_img1", data.shop_name)
                data.order_img1 = `${restaurantLink}${data.shop_name}_order_img1_${data.order_img1[0].name}`
            } else {
                data.order_img1 = props?.data?.order_img1
            }
            if (data.order_img2.length != 0) {
                await ImageUpload(data.order_img2[0], "restaurant", "order_img2", data.shop_name)
                data.order_img2 = `${restaurantLink}${data.shop_name}_order_img2_${data.order_img2[0].name}`
            } else {
                data.order_img2 = order_img1
            }
            if (data.order_img3.length > 0 && props?.data?.order_img3) {
                await ImageUpload(data.order_img3[0], "restaurant", "order_img3", data.shop_name)
                data.order_img3 = `${restaurantLink}${data.shop_name}_order_img3_${data.order_img3[0].name}`
            } else {
                data.order_img3 = props?.data?.order_img3
            }
            if (data.pan_name.length > 0 && props?.data?.pan_name) {
                await ImageUpload(data.pan_name[0], "restaurant", "pan_name", data.shop_name)
                data.pan_name = `${restaurantLink}${data.shop_name}_pan_name_${data.pan_name[0].name}`
            } else {
                data.pan_name = props?.data?.pan_name
            }
            if (data.adhar_card.length > 0 && props?.data?.adhar_card) {
                await ImageUpload(data.adhar_card[0], "restaurant", "adhar_card", data.shop_name)
                data.adhar_card = `${restaurantLink}${data.shop_name}_adhar_card_${data.adhar_card[0].name}`
            } else {
                data.adhar_card = props?.data?.adhar_card
            }
            let updatedData = {
                ...data,
                "type_of_cuisine": JSON.stringify(selectedCuisines),
                "vendorId": LoggedUserDetails?.sellerId,
                // "restaurant_type": selectedRestType,
            }
            editOnBoarding(LoggedUserDetails?.sellerId, updatedData).then((res) => {
                if (res?.message === "product edited successfully") {
                    setTimeout(() => {
                        reset();
                        productList();
                        toggle(),
                            setLoader(false),
                        toast.success(res.message);
                    }, 1000)
                }
            })
        }
    }

    // ================= close modal  ===============
    const closeBtn = () => {
        toggle();
        setActiveStep(0)
        methods.reset();
        setLoader(false);
        reset();
    }

    useEffect(() => {
        restaurantCategories();
    }, [])
    return (
        <>
            {props?.dashBoard &&
                <button onClick={toggle} className={formBtn1}>
                    Edit
                </button>}
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
                                <Dialog.Panel className="w-full overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl max-w-8xl">

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