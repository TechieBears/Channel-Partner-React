import React, { useEffect, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass'
import Error from '../../../components/Errors/Error'
import LoadBox from '../../../components/Loader/LoadBox';
import { ConfigurationCharges, GetConfigurationCharges } from "../../../api";
import {setConfigurations } from '../../../redux/Slices/loginSlice';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';



function Tax() {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    // const configData = useSelector((state) => state?.user?.configureDetails);
    // console.log('config Data = ', configData)

    const [editable, setEditable] = useState(false);
    const [saveButtonVisible, setSaveButtonVisible] = useState(false);
    const [configData, setConfigData] = useState();
    console.log('editable = ', editable)



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setEditable(!editable);
        setSaveButtonVisible(!editable);
    };

    const closeBtn = () => {
        reset(formData); // Reset form data to its initial state
        setEditable(false); // Set editable state to false to disable input fields
        setSaveButtonVisible(false); // Hide the Save button
    };

    const [formData, setFormData] = useState({
        gst: '',
        tds: '',
        tcs: '',
        handling_charges: '',
        platform_fee: '',
        mini_cart: '',
        multi_cart: '',
    });
    
    const getconfig = () => {
        try {
            GetConfigurationCharges().then((res) => {
                console.log('config data = ', res);
                setFormData(res[0])
                setConfigData(res[0]);
                dispatch(setConfigurations(res));
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        getconfig();   
        reset({
            gst: formData?.gst,
            tds: formData?.tds,
            tcs: formData?.tcs,
            handling_charges: formData?.handling_charges,
            platform_fee: formData?.platform_fee,
            mini_cart: formData?.mini_cart,
            multi_cart: formData?.multi_cart,
        })
    }, []);
        
    console.log('formData = ', formData);

    // ============================= form submiting ======================================
    const onSubmit = async (data) => {
        try {
            console.log('data', data)
            setLoader(true);
            const response = await ConfigurationCharges(configData[0]?.charges_id, data)
            if (response?.message == "edited successfully") {
                setTimeout(() => {
                    setEditable(!editable);
                    // dispatch(setConfigurations(res));
                    toast.success(response?.message);
                    setLoader(false)
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
    }
   
    return (
        <div className='p-4 m-4'>
            <div className="p-4 mb-6 bg-white rounded-lg">
                <div className="">
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4 overflow-y-scroll scrollbars ">
                        <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-3 gap-x-3 gap-y-3 customBox">
                            <div className="">
                                <label className={labelClass}>
                                    GST*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('gst', { required: editable })}
                                    disabled={!editable}
                                    onChange={handleChange}
                                >
                                    <option value="">select</option>
                                    <option value='18'>18%</option>
                                    <option value='16'>16%</option>
                                    <option value='20'>20%</option>
                                </select>
                                {errors.gst &&  editable && <Error title='GST is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    TDS*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('tds', { required: editable })}
                                    disabled={!editable}
                                    onChange={handleChange}
                                >
                                    <option value="">select</option>
                                    <option value='1'>1%</option>
                                    <option value='2'>2%</option>
                                    <option value='3'>3%</option>
                                    <option value='4'>4%</option>
                                    <option value='5'>5%</option>
                                </select>
                                {errors.tds && editable && <Error title='TDS is Required*' />}
                            </div>
                    
                            <div className="">
                                <label className={labelClass}>
                                    TCS*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('tcs', { required: editable })}
                                    disabled={!editable}
                                    onChange={handleChange}
                                >
                                    <option value="">select</option>
                                    <option value='1'>1%</option>
                                    <option value='2'>2%</option>
                                    <option value='3'>3%</option>
                                    <option value='4'>4%</option>
                                    <option value='5'>5%</option>
                                </select>
                                {errors.tcs && editable && <Error title='TCS is Required*' />}
                            </div>
                            
                            <div className="">
                            <label className={labelClass}>Handling Charges*</label>
                                <input
                                    type="number"
                                    placeholder="20"
                                    className={inputClass}
                                    {...register("handling_charges", { required: editable })}
                                    readOnly={!editable}
                                    onChange={handleChange}
                                />
                                {errors.handling_charges && editable && <Error title='Handling charges is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>Platform Fees*</label>
                                <input
                                    type="number"
                                    placeholder="25"
                                    className={inputClass}
                                    {...register("platform_fee", { required: editable })}
                                    readOnly={!editable}
                                    onChange={handleChange}
                                />
                                {errors.platform_fee && editable && <Error title='Platform fees is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>Mini Cart Charges*</label>
                                <input
                                    type="number"
                                    placeholder="25"
                                    className={inputClass}
                                    {...register("mini_cart", { required: editable })}
                                    readOnly={!editable}
                                    onChange={handleChange}
                                />
                                {errors.mini_cart && editable && <Error title='mini cart is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>Multi Cart Charges*</label>
                                <input
                                    type="number"
                                    placeholder="25"
                                    className={inputClass}
                                    {...register("multi_cart", { required: editable })}
                                    readOnly={!editable}
                                    onChange={handleChange}
                                />
                                {errors.multi_cart && editable && <Error title='multi cart is Required*' />}
                            </div>
                        </div>
                    </div>
                    <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                        { !editable  && <button type='button' className={formBtn1} onClick={handleEdit}>
                            Edit
                        </button> }
                   
                        {/* {!editable && <button type='submit' className={formBtn1}>Save</button>} */}
                        {saveButtonVisible && editable && <button type='submit' className={formBtn1}>Save</button>}
                        {saveButtonVisible && <button type='button' className={formBtn2} onClick={closeBtn}>Cancel</button>}
                    </footer>

                    {/* <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                        <button type='button' className={formBtn2} onClick={closeBtn}>Edit</button>

                        {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Save</button>}
                    </footer> */}
                </form>
            </div>
        </div>
    )
}

export default Tax