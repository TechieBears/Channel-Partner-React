import { Fragment, useRef, useState, useMemo, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LoadBox from "../../Loader/LoadBox";
import { useForm } from "react-hook-form";
import Error from "../../Errors/Error";
import { Add } from "iconsax-react";
// import { formBtn1, formBtn2, inputClass, labelClass } from "../../../utils/CustomClass";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';

import { CreateFranchisee, GetFranchisee } from "../../../api";
import { setFranchise } from "../../../redux/Slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImageUpload, franchiselink } from '../../../env';



export default function AddFranchise(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, watch, control, setValue, formState: { errors },} = useForm();


  // ============================ file uplaod watch ===============================
  // const buscard_watch = watch('bus_card_url')
  // const cheque_watch = watch('cheque_url')
  const role = watch('role')
  const fssai_watch = watch('fssai_url')
  const gst_watch = watch('gst_url')
  const odoc_watch = watch('odoc_url')
  const pan_watch = watch('pan_url')
  const pincodeWatch = watch('pincode')


    // ===================== Custom validation function for a 6-digit PIN code ================
    const validatePIN = (value) => {
      const pattern = /^[0-9]{6}$/;
      if (pattern.test(value)) {
          return true;
      }
      return 'Pincode must be 6-digit';
  };

  // =================== Custom validation function for a 10-digit US phone number ============
  const validatePhoneNumber = (value) => {
      const pattern = /^\d{10}$/;
      if (pattern.test(value)) {
          return true;
      }
      return 'Phone Number must be 10-digit';
  };
  // ==================== Custom validation function for email ========================
  const validateEmail = (value) => {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (emailPattern.test(value)) {
          return true;
      }
      return 'Invalid email address';
  };
  const validateGST = (value) => {
      // GST pattern for India
      const gstPattern = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

      if (gstPattern.test(value)) {
          return true;
      }

      return 'Invalid GST number*';
  };


  
    // ============================= form submiting ======================================
    const onSubmit = async (data) => {
      if (props.button != 'edit') {    // for create
          if (data?.bank_passbook.length != 0) {
              await ImageUpload(data?.bank_passbook[0], "franchisee", "BankPassbook", data?.first_name)
              data.bank_passbook = `${franchiselink}${data?.first_name}_BankPassbook_${data?.bank_passbook[0].name}`
          } else {
              data.bank_passbook = ''
          }
          if (data?.address_proof.length != 0) {
              await ImageUpload(data?.address_proof[0], "franchisee", "AddressProof", data?.first_name)
              data.address_proof = `${franchiselink}${data?.first_name}_AddressProof_${data?.address_proof[0].name}`
          } else {
              data.address_proof = ''
          }
          if (data?.profile_pic.length != 0) {
              await ImageUpload(data?.profile_pic[0], "franchisee", "ProfileImage", data?.first_name)
              data.profile_pic = `${franchiselink}${data?.first_name}_ProfileImage_${data?.profile_pic[0].name}`
          } else {
              data.profile_pic = ''
          }
      }
      else {          // for edit
        if (data?.bank_passbook.length != 0) {
          await ImageUpload(data?.bank_passbook[0], "franchisee", "BankPassbook", data?.first_name)
          data.bank_passbook = `${franchiselink}${data?.first_name}_BankPassbook_${data?.bank_passbook[0].name}`
      } else {
          data.bank_passbook = ''
      }
      if (data?.address_proof.length != 0) {
          await ImageUpload(data?.address_proof[0], "franchisee", "AddressProof", data?.first_name)
          data.address_proof = `${franchiselink}${data?.first_name}_AddressProof_${data?.address_proof[0].name}`
      } else {
          data.address_proof = ''
      }
      if (data?.profile_pic.length != 0) {
          await ImageUpload(data?.profile_pic[0], "franchisee", "ProfileImage", data?.first_name)
          data.profile_pic = `${franchiselink}${data?.first_name}_ProfileImage_${data?.profile_pic[0].name}`
      } else {
          data.profile_pic = ''
      }
      }
      if (props.button !== 'edit') {   // for create
          try {
              setLoader(true)
              const response = await CreateFranchisee(data);
              if (response?.code == 2002) {
                  setTimeout(() => {
                      reset();
                      setLoader(false)
                      toggle();
                      // fetchData()
                      toast.success(response?.Message);
                  }, 1000);
              } else {
                  setLoader(false)
                  toast.error(response?.Message);
                  console.log('failed to create user')
              }
          } catch (error) {
              setLoader(false)
              console.log('error', error);
          }
      } else {                         // for edit
          setLoader(true)
          // const response = await editUser(props?.data?.id, data)
          if (response) {
              setTimeout(() => {
                  toggle();
                  setLoader(false)
                  fetchData()
                  toast.success(response?.message);
              }, 1000);
          } else {
              console.log('failed to update user')
          }
      }
  }

  // ======================= close modals ===============================
  const closeBtn = () => {
    toggle();
    setLoader(false);
  };


  const toggle = async () => {
    setIsOpen(!isOpen);
  };


    // // ========================= fetch data from api ==============================
    const FranchiseeDetails = () => {
      try {
        GetFranchisee().then((res) => {
          dispatch(setFranchise(res));
        });
      } catch (error) {
        console.log(error);
      }
    };


    // ============================== Reseting data ======================================
  //   const fillData = () => {
  //     reset({
  //         "address": props?.data?.address,
  //         "address2": props?.data?.address2,
  //         "alt_phone": props?.data?.alt_phone,
  //         "bus_card": props?.data?.bus_card,
  //         "bus_type": props?.data?.bus_type,
  //         "service": props?.data?.service,
  //         "cheque": props?.data?.cheque,
  //         "city": props?.data?.city,
  //         "comp_name": props?.data?.comp_name,
  //         "comp_type": props?.data?.comp_type,
  //         "designation": props?.data?.designation,
  //         "email": props?.data?.email,
  //         "first_name": props?.data?.first_name,
  //         "fssai": props?.data?.fssai,
  //         "gst": props?.data?.gst,
  //         "landmark": props?.data?.landmark,
  //         "last_name": props?.data?.last_name,
  //         "odoc": props?.data?.odoc,
  //         "pan": props?.data?.pan,
  //         "phone_no": props?.data?.phone_no,
  //         "pincode": props?.data?.pincode,
  //         "role": props?.data?.role,
  //         "state": props?.data?.state
  //     })
  // }


  // useEffect(() => {
  //   if (props.button == "edit") {
  //       fillData()
  //   }
  // }, [])


  // ======================== Reset data into the form  =======================
  useMemo(() => {
    reset({
      subcat_name: props?.data?.subcat_name,
    });
  }, [props.data]);  

  
  return (
    <>
      <button className={`${formBtn1} flex`} onClick={() => setIsOpen(true)}>
        <Add className="text-white" />
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
                <Dialog.Panel className="w-full max-w-6xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                <Dialog.Title
                    as="h2"
                    className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                >
                    Add Franchisee
                  </Dialog.Title>
                  <div className=" bg-gray-200/70">
                    {/* React Hook Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="">
                      <h1 className='pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Basic Details:</h1>
                        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-3 gap-y-3 ">
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
                                <label className={labelClass} htmlFor="main_input">Profile Image*</label>
                                <input className={fileinput}
                                    id="main_input"
                                    type='file'
                                    multiple
                                  accept='image/jpeg,image/jpg,image/png'
                                  placeholder='Upload Images...'
                                  {...register("profile_pic", { required: props.button == 'edit' ? false : true })} />
                              {props?.button == 'edit' && props?.data.profile_pic != '' && props?.data.profile_pic != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                  {props?.data?.profile_pic?.split('/').pop()}
                              </label>}
                              {errors.image && <Error title='Main Image is required*' />}
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
                              placeholder="+91"
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
                        </div>
                        <h1 className='pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Additional Details:</h1>
                        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-3 gap-y-3">
                            <div className="">
                                <label className={labelClass}>
                                    Pan Card
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder='PAN  No'
                                        className={inputClass}
                                        {...register('pan_card')}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    Aadhar Card
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder='Aadhar No'
                                        className={inputClass}
                                        {...register('adhar_card')}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label className={labelClass}>
                                    GST Number*
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder='GST Number'
                                        className={inputClass}
                                        {...register('gst_number', {
                                            // required: 'GST is required',
                                            // validate: validateGST
                                        })}
                                    />
                                </div>
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
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder='Account Number'
                                        className={inputClass}
                                        {...register('account_number')}
                                    />
                                </div>
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
                              {props?.button == 'edit' && props?.data?.address_proof != '' && props?.data?.address_proof != undefined && <label className='block mb-1 font-medium text-blue-800 text-md font-tb'>
                                  {props?.data?.address_proof?.split('/').pop()}
                              </label>}
                              {/* {errors.address_proof && <Error title='Address Proof Image is required*' />} */}
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
      </Transition>
    </>
  );
}