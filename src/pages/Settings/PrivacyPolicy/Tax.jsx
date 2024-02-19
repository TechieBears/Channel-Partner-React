import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass'
import Error from '../../../components/Errors/Error'
import LoadBox from '../../../components/Loader/LoadBox';

function Tax() {
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const closeBtn = () => {
        reset()
    }
    const onSubmit = (data) => {
        console.log('data', data)
    }
    return (
       
        <div className='p-4 m-4'>
            <div className="p-4 mb-6 bg-white rounded-lg">
                <div className="">
                    <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Restaurent</h1>
                </div>
                <form>
                    <div className="p-4 overflow-y-scroll scrollbars ">
                        <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                            <div className="">
                                <label className={labelClass}>
                                    GST*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('gst', { required: true })}
                                >
                                    <option value='18'>18%</option>
                                    <option value='16'>16%</option>
                                    <option value='20'>20%</option>
                                </select>
                                {errors.gst && <Error title='Payment Method is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    TDS*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('tcs', { required: true })}
                                >
                                    <option value='1'>1%</option>
                                    <option value='2'>2%</option>
                                    <option value='3'>3%</option>
                                    <option value='4'>4%</option>
                                    <option value='5'>5%</option>
                                </select>
                                {errors.tcs && <Error title='TCS is Required*' />}
                            </div>
                    
                            <div className="">
                                <label className={labelClass}>
                                    Commission*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('commission', { required: true })}
                                >
                                    <option value='10'>10%</option>
                                    <option value='15'>15%</option>
                                    <option value='20'>20%</option>
                                </select>
                                {errors.commission && <Error title='Commission is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    TCS*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('tcs', { required: true })}
                                >
                                    <option value='1'>1%</option>
                                    <option value='2'>2%</option>
                                    <option value='3'>3%</option>
                                    <option value='4'>4%</option>
                                    <option value='5'>5%</option>
                                </select>
                                {errors.tcs && <Error title='TCS is Required*' />}
                            </div>
                        </div>
                    </div>
                    <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                        {loader ? <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" /> : <button type='submit' className={formBtn1}>Save</button>}
                        <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                    </footer>
                </form>
            </div>

            <div className="p-4 mb-6 bg-white rounded-lg">
                <div className="">
                    <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Seller</h1>
                </div>
                <form>
                    <div className="p-4 overflow-y-scroll scrollbars ">
                        <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                        <div className="">
                                <label className={labelClass}>
                                    GST*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('gst', { required: true })}
                                >
                                    <option value='18'>18%</option>
                                    <option value='16'>16%</option>
                                    <option value='20'>20%</option>
                                </select>
                                {errors.gst && <Error title='Payment Method is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    Referal Amount For Receiver*
                                </label>
                                <input
                                    type="text"
                                    placeholder='Referal Amount For Receiver'
                                    className={inputClass}
                                    {...register('receiver_amount', { required: true })}
                                />
                                {errors.receiver_amount && <Error title='Referal Amount For Receiver is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    Commission*
                                </label>
                                <select
                                    className={inputClass}
                                    {...register('commission', { required: true })}
                                >
                                    <option value='10'>10%</option>
                                    <option value='15'>15%</option>
                                    <option value='20'>20%</option>
                                </select>
                                {errors.commission && <Error title='Commission is Required*' />}
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    Waiting Charges Per Min*
                                </label>
                                <input
                                    type="text"
                                    placeholder='Waiting Charges Per Min'
                                    className={inputClass}
                                    {...register('waiting_charge', { required: true })}
                                />
                                {errors.waiting_charge && <Error title='Waiting Charges Per Min is Required*' />}
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