import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { useForm } from "react-hook-form";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import {  addHomePromotion , editHomePromotion} from '../../../../api';
import { useDispatch } from 'react-redux';
import { setBanner } from '../../../../redux/Slices/masterSlice';
import { toast } from 'react-toastify';
import Error from '../../../../components/Errors/Error';
import { ImageUpload, promotionLink } from '../../../../env';
import LoadBox from '../../../../components/Loader/LoadBox';



export default function AddPromo(props) {
    console.log('props = ', props)
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const toggle = () => setIsOpen(!isOpen);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    // ============================ submit data  =====================================
    const onSubmit = async (data) => {
        console.log('data = ', data)
        if (props?.button != 'Edit Home Banner') {
            try {
                if (data.image.length != 0) {
                    await ImageUpload(data.image[0], "promotion", "promotion", data.image[0].name)
                    data.image = `${promotionLink}${data.image[0].name}_promotion_${data.image[0].name}`
                } else {
                    data.image = ''
                }
                setLoader(true)
                addHomePromotion(data).then((res) => {
                    if (res?.message === "slide added successfully") {
                        setTimeout(() => {
                            // dispatch(setBanner(res));
                            reset();
                            toggle(),
                                setLoader(false),
                                props?.getAllPromotionList()()
                            toast.success(res?.message);
                        }, 1000)
                    }
                })
            } catch (error) {
                setLoader(false);
                console.log('error', error);
            }
        } else {
            try {
                if (data?.image != props?.data?.slide_url) {
                    await ImageUpload(data.image[0], "promotion", "promotion", data.image[0].name)
                    data.image = `${promotionLink}${data.image[0].name}_promotion_${data.image[0].name}`
                } else {
                    data.image = props?.data?.slide_url
                }
                setLoader(true);
                editHomePromotion(props?.data?.slide_id, data).then((res) => {
                    if (res?.message === "slide edited successfully") {
                        setTimeout(() => {
                            // dispatch(setBanner(res));
                            reset();
                            toggle(),
                                setLoader(false),
                                props?.getAllPromotionList()()
                            toast.success(res?.message);
                        }, 1000)

                    }
                })
            } catch (error) {
                setLoader(false);
                console.log('error', error);
            }
        }

    }

    // ===================== close modals ===============================
    const closeBtn = () => {
        toggle();
        setLoader(false);
    }

    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    {props?.title}
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
                                <Dialog.Panel className="w-full max-w-xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">

                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div className="py-4 mx-4 customBox">
                                                {/* <div className="">
                                                    <label className={labelClass} >Type*</label>
                                                    <select
                                                        className={inputClass}
                                                        {...register('promo_type', { required: true })}
                                                    >
                                                        <option value=''>Select</option>
                                                        <option value='run_ads'>Run Ads for your products</option>
                                                        <option value='run_7_days'>Get your product on top for 7 days</option>
                                                        <option value='search_panel'>Show in search tab</option>
                                                    </select>
                                                    {errors.promo_type && <Error title='Promo Type is required*' />}
                                                </div> */}
                                                <div className="">
                                                    <label className={labelClass} htmlFor="main_input">Image*</label>
                                                    <input className={fileinput}
                                                        id="main_input"
                                                        type='file'
                                                        multiple
                                                        accept='image/jpeg,image/jpg,image/png'
                                                        placeholder='Upload Images...'
                                                        {...register("image", { required: props.button == 'edit' ? false : true })} />
                                                    {props?.button == 'edit' && props?.data.image != '' && props?.data.image != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                        {props?.data?.image?.split('/').pop()}
                                                    </label>}
                                                    {errors.image && <Error title='Main Image is required*' />}
                                                </div>
                                            </div>

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
