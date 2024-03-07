import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass'
import Error from '../../../components/Errors/Error'
import LoadBox from '../../../components/Loader/LoadBox';

function Basic() {
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const closeBtn = () => {
        reset()
    }
    const onSubmit = (data) => {
        console.log('data', data)
    }
    return (
        <div
        className='p-4 m-4'
    >
        <div className="p-4 mb-6 bg-white rounded-lg">
            <div className="">
                <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Basic's</h1>
            </div>
            <form>
                <div className="p-4 overflow-y-scroll scrollbars ">
                    <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                        <div className="">
                            <label className={labelClass}>
                                Referal Amount For Sender*
                            </label>
                            <input
                                type="text"
                                placeholder='Referal Amount For Sender'
                                className={inputClass}
                                {...register('sender_amount', { required: true })}
                            />
                            {errors.sender_amount && <Error title='Referal Amount For Sender is Required*' />}
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
                                Payment Method*
                            </label>
                            <select
                                className={inputClass}
                                {...register('paymebt_method', { required: true })}
                            >
                                <option value='Both'>Both</option>
                                <option value='UPI'>UPI</option>
                                <option value='Cash'>Cash</option>
                            </select>
                            {errors.paymebt_method && <Error title='Payment Method is Required*' />}
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
        <div className="p-4 mb-6 bg-white rounded-lg">
            <div className="">
                <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Cancelation Policy</h1>
            </div>
            <form>
                <div className="p-4 overflow-y-scroll scrollbars ">
                    <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                        <div className="">
                            <label className={labelClass}>
                                Max Cancellation Waiting Time*
                            </label>
                            <input
                                type="time"
                                // placeholder='15:00'
                                className={inputClass}
                                {...register('can_time', { required: true })}
                            />
                            {errors.can_time && <Error title='Cancelation Time is Required*' />}
                        </div>
                        <div className="">
                            <label className={labelClass}>
                                Partial Refund Deduction Charges (%)*
                            </label>
                            <input
                                type="text"
                                placeholder='Partial Refund Deduction Charges (%)'
                                className={inputClass}
                                {...register('receiver_amount', { required: true })}
                            />
                            {errors.receiver_amount && <Error title='Deducation Charges are Required*' />}
                        </div>
                        <div className='grid grid-cols-2 gap-6 mt-3 '>
                            <p className='font-semibold '>Status</p>
                            <p className='font-semibold '>Refund Type</p>
                            <div className="">
                                <label className='font-medium'>
                                    Pending*
                                </label>
                            </div>
                            <div className="">
                                <select
                                    className={inputClass}
                                    {...register('paymebt_method', { required: true })}
                                >
                                    <option value=''>Select</option>
                                    <option value='Full Refund'>Full Refund</option>
                                    <option value='Partial Refund'>Partial Refund</option>
                                    <option value='No Refund'>No Refund</option>
                                </select>
                                {errors.paymebt_method && <Error title='Payment Method is Required*' />}
                            </div>
                            <div className="">
                                <label className='font-medium'>
                                    Confirmed*
                                </label>
                            </div>
                            <div className="">
                                <select
                                    className={inputClass}
                                    {...register('paymebt_method', { required: true })}
                                >
                                    <option value=''>Select</option>
                                    <option value='Full Refund'>Full Refund</option>
                                    <option value='Partial Refund'>Partial Refund</option>
                                    <option value='No Refund'>No Refund</option>
                                </select>
                                {errors.paymebt_method && <Error title='Payment Method is Required*' />}
                            </div>
                            <div className="">
                                <label className='font-medium'>
                                    On the way*
                                </label>
                            </div>
                            <div className="">
                                <select
                                    className={inputClass}
                                    {...register('paymebt_method', { required: true })}
                                >
                                    <option value=''>Select</option>
                                    <option value='Full Refund'>Full Refund</option>
                                    <option value='Partial Refund'>Partial Refund</option>
                                    <option value='No Refund'>No Refund</option>
                                </select>
                                {errors.paymebt_method && <Error title='Payment Method is Required*' />}
                            </div>
                            <div className="">
                                <label className='font-medium'>
                                    Delivered*
                                </label>
                            </div>
                            <div className="">
                                <select
                                    className={inputClass}
                                    {...register('paymebt_method', { required: true })}
                                >
                                    <option value=''>Select</option>
                                    <option value='Full Refund'>Full Refund</option>
                                    <option value='Partial Refund'>Partial Refund</option>
                                    <option value='No Refund'>No Refund</option>
                                </select>
                                {errors.paymebt_method && <Error title='Payment Method is Required*' />}
                            </div>
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

export default Basic