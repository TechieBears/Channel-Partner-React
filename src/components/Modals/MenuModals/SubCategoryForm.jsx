import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import { useForm } from "react-hook-form";
import { Edit } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { getCategory } from '../../../api';
import { setCategory } from '../../../redux/Slices/masterSlice';
import LoadBox from '../../Loader/LoadBox';
import Error from '../../Errors/Error';
// import { ImageUpload, movableCatLink } from '../../../env';


export default function CategoryForm(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    // const toggle = () => setIsOpen(!isOpen);

    const toggle = async () => {
        setIsOpen(!isOpen);
        try {
          // Make an API call using fetch or any other method
          const response = await fetch('your_api_endpoint', {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else {
            console.error('API call failed');
          }
    
          setIsOpen(!isOpen);
        } catch (error) {
          console.error('Error during API call', error);
        }
      };
    

    // ========================= fetch data from api ==============================
    const categoryList = () => {
        getCategory().then(res => {
            dispatch(setCategory(res))
        }).catch(err => {
            console.error('Error', err);
        })
    }

    // ============================ submit data  =====================================
    const onSubmit = (data) => {
        console.log('data', data)
        // if (props?.button !== 'edit') {
        //     try {
        //         if (data.image.length != 0) {
        //             await ImageUpload(data.image[0], "movablecategory", "category", data.name)
        //             data.image = `${movableCatLink}${data.name}_category_${data.image[0].name}`
        //         } else {
        //             data.image = ''
        //         }
        //         setLoader(true)
        //         createMovableCategory(data).then((res) => {
        //             if (res?.message === "Data added successfully") {
        //                 setTimeout(() => {
        //                     dispatch(setCategory(res));
        //                     reset();
        //                     toggle(),
        //                         setLoader(false),
        //                         categoryList()
        //                     toast.success(res.message);
        //                 }, 1000)
        //             }
        //         }).catch(err => {
        //             setLoader(false)
        //             console.error('Error', err);
        //         })
        //     } catch (error) {
        //         setLoader(false);
        //         console.log('error', error);
        //     }
        // } else {
        //     try {
        //         if (data.image.length != 0) {
        //             await ImageUpload(data.image[0], "movablecategory", "category", data.name)
        //             data.image = `${movableCatLink}${data.name}_category_${data.image[0].name}`
        //         } else {
        //             data.image = props.data.image
        //         }
        //         setLoader(true);
        //         editMovableCategory(props?.data?.id, data).then((res) => {
        //             if (res?.message === "Data edited successfully") {
        //                 setTimeout(() => {
        //                     dispatch(setCategory(res));
        //                     reset();
        //                     toggle(),
        //                         setLoader(false),
        //                         categoryList()
        //                     toast.success(res.message);
        //                 }, 1000)

        //             }
        //         })
        //     } catch (error) {
        //         setLoader(false);
        //         console.log('error', error);
        //     }
        // }
    }

    // ======================= close modals ===============================
    const closeBtn = () => {
        toggle();
        setLoader(false);
    }

    // ======================== Reset data into the form  =======================
    useMemo(() => {
        reset({
            'name': props?.data?.name
        })
    }, [props.data])


    return (
        <>
            {props.button !== "edit" ? (
                <button onClick={toggle} className={tableBtn}>
                    Add SubCategory
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
                                            <div className="grid grid-cols-2 py-4 mx-4 gap-x-3 gap-y-3 customBox">
                                                <div className="">
                                                    <label className={labelClass}>
                                                       SubCategory Name*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder='Name'
                                                        autoComplete='off'
                                                        className={inputClass}
                                                        {...register('subcat_name', { required: true })}
                                                    />
                                                    {errors.subcat_name && <Error title='Subcategory Name is required*' />}
                                                </div>
                                                <div className="">
                                                    <label className={labelClass} htmlFor="main_input">SubCategory Image*</label>
                                                    <input className={fileinput}
                                                        id="main_input"
                                                        type='file'
                                                        multiple
                                                        accept='image/jpeg,image/jpg,image/png'
                                                        placeholder='Upload Images...'
                                                        {...register("subcat_image", { required: props.button == 'edit' ? false : true })} />
                                                    {props?.button == 'edit' && props?.data.image != '' && props?.data.image != undefined &&
                                                     <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                        {props?.data?.image?.split('/').pop()}
                                                    </label>}
                                                    {errors.subcat_image && <Error title='SubCategory Image is required*' />}
                                                </div>
                                                <div className="">
                                                        <label className={labelClass}>
                                                            Category Type*
                                                        </label>
                                                        <select
                                                            name="Business Type"
                                                            className={inputClass}
                                                            {...register("category", { required: true })}
                                                        >
                                                            <option value="" >
                                                                Select Type
                                                            </option>
                                                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                                                            <option value="General Partnerships">General Partnerships</option>
                                                            <option value="Limited Liability Partnerships (LLP)">Limited Liability Partnerships (LLP)</option>
                                                            <option value="C Corporation">C Corporation</option>
                                                            <option value="B Corporation">B Corporation</option>
                                                            <option value="S Corporation">S Corporation</option>
                                                            <option value="Non-Profit Corporation">Non-Profit Corporation</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {errors.category && <Error title="Category Type is required*" />}
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
