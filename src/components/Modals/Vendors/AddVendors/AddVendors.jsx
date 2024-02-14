import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import LoadBox from '../../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add } from 'iconsax-react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass } from '../../../../utils/CustomClass';
import { GetFranchiseeVendors, CreateFranchiseeVendors } from "../../../../api";
import { setFranchiseVendors } from "../../../../redux/Slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddVendors(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cancelButtonRef = useRef(null)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const toggle = () => setOpen(!isOpen)
    const closeBtn = () => {
        toggle();
        reset()
    }


    const FranchiseeVendors = () => {
        try {
            GetFranchiseeVendors().then((res) => {
                console.log('vendors data = ', res);
                dispatch(setFranchiseVendors(res));
            });
        } catch (error) {
            console.log(error);
        }
    };



    // ============================ submit data  =====================================
    const onSubmit = async (data) => {
        console.log("data", data);

        if (props?.button !== "edit") {
            try {
                setLoader(true);

                CreateFranchiseeVendors(data)
                    .then((res) => {
                        if (res) {
                            setTimeout(() => {
                                dispatch(setFranchiseVendors(res));
                                reset();
                                toggle(), setLoader(false), FranchiseeVendors();
                                toast.success(res.message);
                            }, 1000);
                        }
                    })
                    .catch((err) => {
                        setLoader(false);
                        console.error("Error", err);
                    });
            } catch (error) {
                setLoader(false);
                console.log("error", error);
            }
        } else {
            try {
                setLoader(true);
                editSubCategory(props?.data?.subcat_id, data).then((res) => {
                    if (res?.message === "franchise edited successfully") {
                        setTimeout(() => {
                            dispatch(setFranchiseVendors(res));
                            reset();
                            toggle(), setLoader(false), FranchiseeVendors();
                            toast.success(res.message);
                        }, 1000);
                    }
                });
            } catch (error) {
                setLoader(false);
                console.log("error", error);
            }
        }
    };


    return (
        <>
            <button className={`${formBtn1} flex`} onClick={() => setOpen(true)}>
                <Add className='text-white' />
                {props?.title}
            </button>
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
                                <Dialog.Panel className="w-full max-w-5xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">

                                    <Dialog.Title
                                        as="h2"
                                        className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                                    >
                                        Add Vendor
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70">
                                        {/* React Hook Form */}
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="p-4 overflow-y-scroll scrollbars ">
                                                <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-4 gap-x-3 gap-y-3 customBox">
                                                    <div className="">
                                                        <label className={labelClass}>First Name*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="First Name"
                                                            className={inputClass}
                                                            {...register("first_name", { required: true })}
                                                        />
                                                        {errors.first_name && (
                                                            <Error title="First Name is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Last Name*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Last Name"
                                                            className={inputClass}
                                                            {...register("last_name", { required: true })}
                                                        />
                                                        {errors.last_name && (
                                                            <Error title="Last Name is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Email*</label>
                                                        <input
                                                            type="email"
                                                            placeholder="Email"
                                                            className={inputClass}
                                                            {...register("email", { required: true })}
                                                        />
                                                        {errors.email && (
                                                            <Error title="Email is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Mobile Number*</label>
                                                        <input
                                                            type="tel"
                                                            placeholder="Phone"
                                                            className={inputClass}
                                                            {...register("phone_no", { required: true })}
                                                        />
                                                        {errors.phone_no && (
                                                            <Error title="Phone is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Create Password
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Password"
                                                            className={inputClass}
                                                            {...register("password")}
                                                        />
                                                    </div>

                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Date Of Birth(DOB)*
                                                        </label>
                                                        <input
                                                            type="date"
                                                            // placeholder='Last Name'
                                                            className={inputClass}
                                                            {...register("date_of_birth", { required: true })}
                                                        />
                                                        {errors.date_of_birth && (
                                                            <Error title="Date of birth is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Gender*</label>
                                                        <select
                                                            className={inputClass}
                                                            {...register("gender", { required: true })}
                                                        >
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {errors.gender && (
                                                            <Error title="Gender is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>PINCODE*</label>
                                                        <input
                                                            type="number"
                                                            maxLength={6}
                                                            placeholder="PINCODE"
                                                            className={inputClass}
                                                            {...register("pincode", { required: true })}
                                                        />
                                                        {errors.pincode && (
                                                            <Error title="PINCODE is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>Address*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Address"
                                                            className={inputClass}
                                                            {...register("address", { required: true })}
                                                        />
                                                        {errors.address && (
                                                            <Error title="Address is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>State</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter State"
                                                            className={inputClass}
                                                            {...register("state")}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>City*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="City"
                                                            className={inputClass}
                                                            {...register("city", { required: true })}
                                                        />
                                                        {errors.address && (
                                                            <Error title="City is Required*" />
                                                        )}
                                                    </div>
                                                    <h1 className='col-span-4 pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Additional Details:</h1>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Pan Card
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='PAN  No'
                                                            className={inputClass}
                                                            {...register('pan_card')}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Aadhar Card
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Aadhar No'
                                                            className={inputClass}
                                                            {...register('adhar_card')}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            GST Number*
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='GST Number'
                                                            className={inputClass}
                                                            {...register('gst_number', {
                                                                required: 'GST is required*',
                                                                // validate: validateGST
                                                            })}
                                                        />
                                                        {/* {errors?.gst && <Error title={errors?.gst?.message} />} */}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Name
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                placeholder='Bank Name'
                                                                className={inputClass}
                                                                {...register('bank_name')}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>
                                                            Bank Account Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder='Account Number'
                                                            className={inputClass}
                                                            {...register('account_number')}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Bank PassBook Image*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("bank_passbook", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.bank_passbook != '' && props?.data.bank_passbook != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.bank_passbook?.split('/').pop()}
                                                        </label>}
                                                        {errors.bank_passbook && <Error title='Bank PassBook Image is required*' />}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass}>IFSC Code*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="IFSC Code"
                                                            className={inputClass}
                                                            {...register("ifsc_code", { required: true })}
                                                        />
                                                        {errors.ifsc_code && (
                                                            <Error title="Ifsc code is Required*" />
                                                        )}
                                                    </div>
                                                    <div className="">
                                                        <label className={labelClass} htmlFor="main_input">Address Proof*</label>
                                                        <input className={fileinput}
                                                            id="main_input"
                                                            type='file'
                                                            multiple
                                                            accept='image/jpeg,image/jpg,image/png'
                                                            placeholder='Upload Images...'
                                                            {...register("address_proof", { required: props.button == 'edit' ? false : true })} />
                                                        {props?.button == 'edit' && props?.data.address_proof != '' && props?.data.address_proof != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                                            {props?.data?.address_proof?.split('/').pop()}
                                                        </label>}
                                                        {errors.address_proof && <Error title='Main Image is required*' />}
                                                    </div>
                                                </div>
                                            </div>
                                            <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                                                {loader ? (
                                                    <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" />
                                                ) : (
                                                    <button type="submit" className={formBtn1}>
                                                        Submit
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className={formBtn2}
                                                    onClick={closeBtn}
                                                >
                                                    close
                                                </button>
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
