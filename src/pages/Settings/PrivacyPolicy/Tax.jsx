import React, { useEffect, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass'
import Error from '../../../components/Errors/Error'
import LoadBox from '../../../components/Loader/LoadBox';
import { ConfigurationCharges, GetConfigurationCharges } from "../../../api";
import {setConfigurations } from '../../../redux/Slices/loginSlice';
import { useDispatch, useSelector } from "react-redux";


function Tax() {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const configData = useSelector((state) => state?.user?.configureDetails);
    console.log('config Data = ', configData)


    const closeBtn = () => {
        reset()
    }

    const getconfig = () => {
        try {
            GetConfigurationCharges().then((res) => {
                console.log('config data = ', res);
                dispatch(setConfigurations(res));
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getconfig();    
    }, []);

    
    // ======================== Reset data into the form  =======================
    useMemo(() => {
        reset({
            gst: configData[0]?.gst,
            tds: configData[0]?.tds,
            tcs: configData[0]?.tcs,
            handling_charges: configData[0]?.handling_charges,
            platform_fee: configData[0]?.platform_fee,
        });
    }, [configData]);

    // ============================= form submiting ======================================
    const onSubmit = async (data) => {
        try {
            setLoader(true);
            const response = await ConfigurationCharges(data)
            if (response?.message == "successfully added") {
                setTimeout(() => {
                    // dispatch(setConfigurations(res));
                    toast.success('Configurations Added Successfully');
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
                    {/* <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Restaurent</h1> */}
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
                                    {...register('gst', { required: true })}
                                >
                                    <option value="">select</option>
                                    <option value='18'>18%</option>
                                    <option value='16'>16%</option>
                                    <option value='20'>20%</option>
                                </select>
                                {errors.gst && <Error title='GST is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    TDS*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('tds', { required: true })}
                                >
                                    <option value="">select</option>
                                    <option value='1'>1%</option>
                                    <option value='2'>2%</option>
                                    <option value='3'>3%</option>
                                    <option value='4'>4%</option>
                                    <option value='5'>5%</option>
                                </select>
                                {errors.tds && <Error title='TDS is Required*' />}
                            </div>
                    
                            <div className="">
                                <label className={labelClass}>
                                    TCS*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('tcs', { required: true })}
                                >
                                    <option value="">select</option>
                                    <option value='1'>1%</option>
                                    <option value='2'>2%</option>
                                    <option value='3'>3%</option>
                                    <option value='4'>4%</option>
                                    <option value='5'>5%</option>
                                </select>
                                {errors.tcs && <Error title='TCS is Required*' />}
                            </div>
                            
                            <div className="">
                            <label className={labelClass}>Handling Charges*</label>
                                <input
                                    type="number"
                                    placeholder="20"
                                    className={inputClass}
                                    {...register("handling_charges", { required: true })}
                                />
                                {errors.handling_charges && <Error title='Handling charges is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>Platform Fees*</label>
                                <input
                                    type="number"
                                    placeholder="25"
                                    className={inputClass}
                                    {...register("platform_fee", { required: true })}
                                />
                                {errors.platform_fees && <Error title='Platform fees is Required*' />}
                            </div>
                        </div>
                    </div>
                    <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                        {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Save</button>}
                        <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default Tax