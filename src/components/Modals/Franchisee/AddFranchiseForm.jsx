import { Fragment, useState, useMemo, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import LoadBox from "../../Loader/LoadBox";
import { useForm } from "react-hook-form";
import Error from "../../Errors/Error";
import { Edit } from 'iconsax-react';
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../utils/CustomClass';
import { CreateFranchisee, GetFranchisee, editfranchise } from "../../../api";
import { setFranchise } from "../../../redux/Slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImageUpload, franchiselink } from '../../../env';
import { toast } from 'react-toastify';
import { handleMobileNoNumericInput, handlePincodeMaxLength, validateEmail, validateGST, validatePANCard, validatePIN, validatePhoneNumber, validateAadharCard } from "../../Validations.jsx/Validations";
import moment from "moment";




export default function AddFranchiseForm(props) {
  console.log("🚀 ~ file: AddFranchiseForm.jsx:20 ~ AddFranchiseForm ~ props:", props)
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, watch, control, setValue, formState: { errors }, } = useForm();
  console.log("🚀 ~ file: AddFranchiseForm.jsx:25 ~ AddFranchiseForm ~ errors:", errors)
  const gstNumber = watch('gst_number');
  const emailField = watch('email');

  const checkEmail = () => {
    if (props?.emails) {
      const isDuplicate = props.emails.some((item) => item === emailField);
      if (isDuplicate) {
        setEmailError('Email field is duplicate, please try another.');
      } else {
        setEmailError('');
      }
    }
  };

  // Call checkEmail whenever emailField changes
  useEffect(() => {
    checkEmail();
  }, [emailField]);

  const pan_watch = watch('pan_url')
  const adhar_watch = watch('adhar_url')
  const gst_watch = watch('gst_url')

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
      if (data?.bank_passbook.length != 0) {
        await ImageUpload(data?.bank_passbook[0], "franchisee", "BankPassbook", data?.first_name)
        data.bank_passbook = `${franchiselink}${data?.first_name}_BankPassbook_${data?.bank_passbook[0].name}`
      } else {
        data.bank_passbook = ''
      }
      if (data?.gst_url.length != 0) {
        await ImageUpload(data?.gst_url[0], "franchisee", "GstImage", data?.first_name)
        data.gst_url = `${franchiselink}${data?.first_name}_GstImage_${data?.gst_url[0].name}`
      } else {
        data.gst_url = ''
      }
      if (data?.adhar_url.length != 0) {
        await ImageUpload(data?.adhar_url[0], "franchisee", "adharImage", data?.first_name)
        data.adhar_url = `${franchiselink}${data?.first_name}_adharImage_${data?.adhar_url[0].name}`
      } else {
        data.adhar_url = ''
      }
      if (data?.pan_url.length != 0) {
        await ImageUpload(data?.pan_url[0], "franchisee", "panImage", data?.first_name)
        data.pan_url = `${franchiselink}${data?.first_name}_panImage_${data?.pan_url[0].name}`
      } else {
        data.pan_url = ''
      }
    }
    else {
      console.log("data===>", data)      // for edit
      if (props?.data?.bank_passbook != data?.bank_passbook) {
        await ImageUpload(data?.bank_passbook[0], "franchisee", "BankPassbook", data?.first_name)
        data.bank_passbook = `${franchiselink}${data?.first_name}_BankPassbook_${data?.bank_passbook[0].name}`
      } else {
        data.bank_passbook = props?.data?.bank_passbook
      }
      if (props?.data?.address_proof != data?.address_proof) {
        await ImageUpload(data?.address_proof[0], "franchisee", "AddressProof", data?.first_name)
        data.address_proof = `${franchiselink}${data?.first_name}_AddressProof_${data?.address_proof[0].name}`
      } else {
        data.address_proof = props?.data?.address_proof
      }
      if (props?.data?.user?.profile_pic != data?.profile_pic) {
        await ImageUpload(data?.profile_pic[0], "franchisee", "ProfileImage", data?.first_name)
        data.profile_pic = `${franchiselink}${data?.first_name}_ProfileImage_${data?.profile_pic[0].name}`
      } else {
        data.profile_pic = props?.data?.user?.profile_pic
      }
      if (data?.gst_url?.length > 0) {
        await ImageUpload(data?.gst_url[0], "franchisee", "GstImage", data?.first_name)
        data.gst_url = `${franchiselink}${data?.first_name}_GstImage_${data?.gst_url[0].name}`
      } else {
        data.gst_url = props?.data?.gst_url
      }
      if (data?.adhar_url?.length > 0) {
        await ImageUpload(data?.adhar_url[0], "franchisee", "adharImage", data?.first_name)
        data.adhar_url = `${franchiselink}${data?.first_name}_adharImage_${data?.adhar_url[0].name}`
      } else {
        data.adhar_url = props?.data?.adhar_url
      }
      if (data?.pan_url?.length > 0) {
        await ImageUpload(data?.pan_url[0], "franchisee", "panImage", data?.first_name)
        data.pan_url = `${franchiselink}${data?.first_name}_panImage_${data?.pan_url[0].name}`
      } else {
        data.pan_url = props?.data?.pan_url
      }
    }
    if (props.button !== 'edit') {   // for create
      checkEmail()
      try {
        setLoader(true)
        const response = await CreateFranchisee(data);
        if (response?.status == "success") {
          setTimeout(() => {
            reset();
            setLoader(false)
            toast.success(response?.message);
            props?.FranchiseeDetails()
            GetFranchisee()
            toggle();
            // fetchData()
          }, 1000);
        } else {
          setLoader(false)
          toast.error(response?.Message);
        }
      } catch (error) {
        setLoader(false)
        console.log('error', error);
      }
    } else {            // for edit
      setLoader(true)
      const response = await editfranchise(props?.data?.user?.id, data)
      if (response?.message == "franchise edited successfully") {
        setTimeout(() => {
          toggle();
          setLoader(false)
          props?.FranchiseeDetails()
          GetFranchisee()
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
    reset()
    // resetData();
  };


  const toggle = async () => {
    setIsOpen(!isOpen);
  };



  // ======================== Reset data into the form  =======================
  useMemo(() => {
    reset({
      first_name: props?.data?.user?.first_name,
      last_name: props?.data?.user?.last_name,
      phone_no: props?.data?.user?.phone_no,
      profile_pic: props?.data?.user?.profile_pic,
      date_of_birth: props?.data?.user?.date_of_birth,
      email: props?.data?.user?.email,
      pincode: props?.data?.user?.pincode,
      state: props?.data?.user?.state,
      city: props?.data?.user?.city,
      address: props?.data?.user?.address,
      adhar_card: props?.data?.adhar_card,
      pan_card: props?.data?.pan_card,
      gst_number: props?.data?.gst_number,
      bank_name: props?.data?.bank_name,
      account_number: props?.data?.account_number,
      bank_passbook: props?.data?.bank_passbook,
      ifsc_code: props?.data?.ifsc_code,
      address_proof: props?.data?.address_proof,
      gender: props?.data?.user?.gender,
      // password: props?.data?.password,
    });
  }, [props.data]);

  // useEffect(() => {
  //   if (props.button == "edit") {
  //       fillData()
  //   }
  // }, [])


  return (
    <>
      {props.button !== "edit" ? (
        <button onClick={toggle} className={tableBtn}>
          Add Franchisee
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
                              {...register("first_name", { required: true, pattern: /^[A-Za-z]+$/i })}
                            />
                            {errors.first_name && (
                              <Error title={errors.first_name ? 'First Should Contain Alphabets Only' : 'First Name is Required'} />
                            )}
                          </div>
                          <div className="">
                            <label className={labelClass}>Last Name*</label>
                            <input
                              type="text"
                              placeholder="Last Name"
                              className={inputClass}
                              {...register("last_name", { required: true, pattern: /^[A-Za-z]+$/i })}
                            />
                            {errors.last_name && (
                              <Error title={errors?.last_name ? "Last Name Should Contain alphabets only" : "Last Name is Required"} />
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
                            {props?.button == 'edit' && props?.data?.user?.profile_pic != '' && props?.data?.user?.profile_pic != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                              {props?.data?.user?.profile_pic?.split('/').pop()}
                            </label>}
                            {errors.profile_pic && <Error title='Profile Image is required*' />}
                          </div>
                          <div className="">
                            <label className={labelClass}>Email*</label>
                            <input
                              type="email"
                              placeholder="Email"
                              className={inputClass}
                              {...register("email", { required: true, validate: validateEmail })}
                            />
                            {errors.email && (
                              <Error title={errors?.email?.message ? errors?.email?.message : 'Email is Required'} />
                            )}
                            {emailError != '' && <Error title={emailError} />}
                          </div>
                          <div className="">
                            <label className={labelClass}>Mobile Number*</label>
                            <input
                              type="tel"
                              placeholder="+91"
                              maxLength={10}
                              className={inputClass}
                              onKeyDown={handleMobileNoNumericInput}
                              {...register("phone_no", { required: true, validate: validatePhoneNumber })}
                            />
                            {errors.phone_no && (
                              <Error title={errors?.phone_no?.message ? errors?.phone_no?.message : 'Phone Number is Required'} />
                            )}
                          </div>
                          {
                            props.button != 'edit' &&
                            <div className="">
                              <label className={labelClass}>
                                Create Password*
                              </label>
                              <input
                                type="text"
                                placeholder="Password"
                                className={inputClass}
                                {...register("password", { required: true, pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/ })}
                              />
                              {errors.password && (
                                <Error title={errors?.password ? 'Password should contain one special character and 8 digit long and must be combination of number and alphabets' : 'Password is required'} />
                              )}
                            </div>
                          }
                          <div className="">
                            <label className={labelClass}>
                              Date Of Birth(DOB)*
                            </label>
                            <input
                              type="date"
                              className={inputClass}
                              max={moment().format('YYYY-MM-DD')}
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
                              <option value="" selected>--Select Type--</option>
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
                              // max={6}
                              // min={0}
                              placeholder="PINCODE"
                              readOnly={props?.button == 'edit' ? true : false}
                              className={inputClass}
                              onKeyDown={handlePincodeMaxLength}
                              {...register("pincode", { required: true, validate: validatePIN })}
                            />
                            {errors.pincode && (
                              <Error title={errors?.pincode?.message ? errors?.pincode?.message : 'PinCode is Required'} />
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
                            <label className={labelClass}>State*</label>
                            <input
                              type="text"
                              placeholder="Enter State"
                              className={inputClass}
                              {...register("state", { required: true, pattern: /^[A-Za-z]+$/i })}
                            />
                            {errors.state && (
                              <Error title={errors.state ? 'State should contain Alphabets only' : 'State is required'} />
                            )}
                          </div>
                          <div className="">
                            <label className={labelClass}>City*</label>
                            <input
                              type="text"
                              placeholder="City"
                              className={inputClass}
                              {...register("city", { required: true, pattern: /^[A-Za-z]+$/i })}
                            />
                            {errors.city && (
                              <Error title={errors.city ? 'City should contain All Alphabets' : 'City is Required'} />
                            )}
                          </div>
                        </div>

                        <h1 className='pt-4 mx-4 text-xl font-semibold text-gray-900 font-tbPop '>Additional Details:</h1>
                        <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-3 gap-y-3">
                          <div className="">
                            <label className={labelClass}>
                              Pan Card*
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder='PAN'
                                maxLength={10}
                                className={inputClass}
                                {...register('pan_card', { required: true, validate: validatePANCard })}
                              />
                              <div className="">
                                <label htmlFor='pan' className={`${pan_watch?.length || props?.data?.pan_url ? "bg-sky-400 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-sky-400 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                  Upload
                                </label>
                                <input className="hidden"
                                  id="pan"
                                  type='file'
                                  multiple
                                  accept='image/jpeg,image/jpg,image/png,application/pdf'
                                  placeholder='Upload Images...'
                                  {...register("pan_url", { required: props.button == 'edit' ? false : true })} />
                              </div>
                            </div>
                            {props?.button == 'edit' && props?.data.pan_url != '' && props?.data.pan_url != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                              {props?.data?.pan_url?.split('/').pop()}
                            </label>}
                            {(errors.pan_card) && <Error title='PAN Card Number & Image is required' />}
                            {(errors.pan_url && !errors.pan_card) && <Error title='PAN Card Image is required' />}

                          </div>
                          <div className="">
                            <label className={labelClass}>
                              Aadhar Card Number*
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                maxLength={14}
                                placeholder='Aadhar Card Number'
                                className={inputClass}
                                {...register('adhar_card', { required: true, validate: validateAadharCard })}
                              />
                              <div className="">
                                <label htmlFor='adhar' className={`${adhar_watch?.length || props?.data?.adhar_url ? "bg-sky-400 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-sky-400 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                  Upload
                                </label>
                                <input className="hidden"
                                  id="adhar"
                                  type='file'
                                  multiple
                                  accept='image/jpeg,image/jpg,image/png,application/pdf'
                                  placeholder='Upload Images...'
                                  {...register("adhar_url", { required: props.button == 'edit' ? false : true })} />
                              </div>
                            </div>
                            {props?.button == 'edit' && props?.data.adhar_url != '' && props?.data.adhar_url != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                              {props?.data?.adhar_url?.split('/').pop()}
                            </label>}
                            {(errors.adhar_card) && <Error title='Aadhar Card Number & Image is required' />}
                            {(errors.adhar_url && !errors.adhar_card) && <Error title='Aadhar Card Image is required' />}
                          </div>
                          <div className="">
                            <label className={labelClass}>
                              GST Number
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder='GST Number'
                                className={inputClass}
                                {...register('gst_number', { validate: (gstNumber != "" && gstNumber != null) ? validateGST : '' })}
                              />
                              <div className="">
                                <label htmlFor='gst' className={`${gst_watch?.length || props?.data?.gst_url ? "bg-sky-400 text-white" : " bg-gray-300/80"}  transition-colors hover:bg-sky-400 font-tb font-semibold hover:text-white py-3 mt-10 px-5 rounded-md cursor-pointer`}>
                                  Upload
                                </label>
                                <input className="hidden"
                                  id="gst"
                                  type='file'
                                  multiple
                                  accept='image/jpeg,image/jpg,image/png,application/pdf'
                                  placeholder='Upload Images...'
                                  {...register("gst_url")} />
                              </div>
                            </div>
                            {props?.button == 'edit' && props?.data.gst_url != '' && props?.data.gst_url != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                              {props?.data?.gst_url?.split('/').pop()}
                            </label>}
                            {errors?.gst_number && <Error title={errors?.gst_number?.message} />}
                          </div>
                          <div className="">
                            <label className={labelClass}>
                              Bank Name*
                            </label>
                            <div className="">
                              <input
                                type="text"
                                placeholder='Bank Name'
                                className={inputClass}
                                {...register('bank_name', { required: true })}
                              />
                              {errors?.bank_name && <Error title={'Bank Name is Requried'} />}
                            </div>
                          </div>
                          <div className="">
                            <label className={labelClass}>
                              Bank Account Number*
                            </label>
                            <div className="">
                              <input
                                type="text"
                                placeholder='Account Number'
                                className={inputClass}
                                {...register('account_number', { required: true })}
                              />
                              {errors?.account_number && <Error title={'Account Number is Requried'} />}
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
                            {props?.button == 'edit' && props?.data.bank_passbook != '' && props?.data.bank_passbook != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
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
                            {props?.button == 'edit' && props?.data?.address_proof != '' && props?.data?.address_proof != undefined && <label className='block mb-1 font-medium text-blue-800 truncate text-md font-tb'>
                              {props?.data?.address_proof?.split('/').pop()}
                            </label>}
                            {errors.address_proof && <Error title='Address Proof Image is required*' />}
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