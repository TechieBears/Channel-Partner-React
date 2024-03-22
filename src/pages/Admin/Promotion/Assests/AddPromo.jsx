import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from '../../../../utils/CustomClass';
import { Edit } from 'iconsax-react';
import { editHomePromotion, postHomePromotion } from '../../../../api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Error from '../../../../components/Errors/Error';
import { ImageUpload, promotionLink } from '../../../../env';
import LoadBox from '../../../../components/Loader/LoadBox';
import { setPromotions } from '../../../../redux/Slices/masterSlice';
import { validateEmail, validatePhoneNumber } from '../../../../components/Validations.jsx/Validations';
import { DatePicker, Space } from "antd";
import moment from "moment";

export default function AddPromo(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [promoDuration, setPromoDuration] = useState({});
  const [selectedOption, setSelectedOption] = useState('dropdown');
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors }, setError } = useForm({ criteriaMode: 'all' });
  const promoDurationField = watch('promo_duration');
  // setValue('promo_duration', 'single_day');
  // setpromoDurationField(watch('promo_duration'));
  const { RangePicker } = DatePicker
  console.log('State Value:', promoDurationField);
  console.log('promoDuration Value:', promoDuration);


  const handleRadioChange = (option) => {
    setSelectedOption(option);
    setShowDropdown(option === 'dropdown');
    setInputValue('');
  };
  
 

  const dispatch = useDispatch()
  const toggle = () => setIsOpen(!isOpen);
  const vendorType = watch('vendor_type');
  const [imageError, setImageError] = useState('');

  // ========== Date picker =================================
  const disabledDate = current => {
    return current && current < moment().startOf('day');
  };
  
  const rangeHandler = (e) => {
    console.log('e', e)
    if (e) {    
      if (e[0] == undefined) {
        setPromoDuration({
          ...promoDuration,
          "start_date": e.format("YYYY-MM-DD"),
          "end_date": e.format("YYYY-MM-DD")
        });
      } else {
        setPromoDuration({
          ...promoDuration,
          "start_date": e[0].format("YYYY-MM-DD"),
          "end_date": e[1].format("YYYY-MM-DD")
        });
      }
    }else{
      setPromoDuration({})
    }
  }
  // ===================== close modals ===============================
  const closeBtn = () => {
    toggle();
    setLoader(false);
    reset();
  };

  useEffect(() => {
    reset({
      'vendor_type': props?.data?.vendor_type,
      // 'screen_name': props?.data?.screen_name,
      'redirection_type': props?.data?.redirection_type,
      'redirect_link': props?.data?.redirect_link
    })
    if (props?.data?.redirect_link) {
      setSelectedOption('input')
    }else{
      setSelectedOption('dropdown')
    }
  }, []);

  // ============================ submit data  =====================================
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      'promoDuration': promoDuration
    }
    if (imageError) {
      // Set error message using setError if image dimensions are not valid
      setError("slide_url", {
        type: "manual",
        message: imageError
      });
      return;
    }
    // const slideUrl = watch('slide_url')
    // if (props?.title != 'Edit Promotions' && childData) {

    if (props?.title != 'Edit Promotions') {
      try {
        // if (childData) {
        //     data.slide_url = childData;
        // } else if (data?.slide_url?.length != 0) {
        if (updatedData?.slide_url?.length != 0) {
          await ImageUpload(updatedData.slide_url[0], "promotion", "promotion", updatedData.slide_url[0].name)
          updatedData.slide_url = `${promotionLink}${updatedData.slide_url[0].name}_promotion_${updatedData.slide_url[0].name}`
        } else {
          updatedData.slide_url = ''
        }
        setLoader(true)
        postHomePromotion(updatedData).then((res) => {
          if (res?.message === "slide added successfully") {
            setTimeout(() => {
              dispatch(setPromotions(res));
              reset();
              toggle(),
                setLoader(false),
                props?.getAllPromotionList()
              toast.success(res?.message);
            }, 1000)
          }
        })
      } catch (error) {
        setLoader(false);
        console.log('error', error);
      }
    } else {
      if (props?.title == 'Edit Promotions') {
        try {
          if (data?.slide_url?.length > 0 && props?.data?.slide_url) {
            await ImageUpload(data.slide_url[0], "promotion", "promotion", data.slide_url[0].name)
            data.slide_url = `${promotionLink}${data.slide_url[0].name}_promotion_${data.slide_url[0].name}`
          } else {
            data.slide_url = props?.data?.slide_url
          }
          // }
          setLoader(true);
          editHomePromotion(props?.data?.slide_id, data).then((res) => {
            if (res?.message === "slide edited successfully") {
              setTimeout(() => {
                dispatch(setPromotions(res));
                reset();
                toggle(),
                  setLoader(false),
                  props?.getAllPromotionList()
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

  }

  const handleImageChange = (event,) => {

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          // if ((img.width > 3556 && img.width < 4000 ) && (img.height > 2000 && img.height < 2500)) {
          if (img.width > 3556  && img.height > 2000) {
            console.log('File uploaded successfully');
            setImageError('');
          } else {
            setError("slide_url", {
              type: "manual",
              message: "Image dimensions should be 3556 x 2000"
            });
            console.log('errorr')
            setImageError('Image dimensions should be 3556 x 2000');
          }
        };
      };
      reader.readAsDataURL(file);
    }
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
                <Dialog.Panel className="w-full max-w-6xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                  <Dialog.Title
                    as="h2"
                    className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                  >
                    {props?.title}
                  </Dialog.Title>
                  <div className=" bg-gray-200/70">
                    <form onSubmit={handleSubmit(onSubmit)}>

                      <div className="grid py-4 mx-4 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                        {/* <div className="mb-3">
                          <select
                            name=""
                            onChange={handleSelectChange}
                            className={`${inputClass} !bg-slate-100`}
                            >
                            <option value="false">I have a own Images</option>
                            <option value="true">I Don't have a Images</option>
                          </select>
                        </div> */}

                        <div className="">
                          <label className={labelClass} htmlFor="main_input">
                            Vendor Type*
                          </label>
                          <select
                            name=""
                            {...register('vendor_type', { required: true })}
                            className={`${inputClass} !bg-white`}
                          >
                            <option value="">select</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Seller">Seller</option>
                            <option value="External">External</option>
                          </select>
                          {errors.vendor_type && <Error title='Vendor type is Required*' />}
                        </div>
                        <div>
                          <label className={labelClass}>Select Duration*</label>
                          <select
                            className={inputClass}
                            {...register('promo_duration', { required: true })}
                          >
                            <option value=''>Select</option>
                            <option value='single_day'>For a Day</option>
                            <option value='aboveDay'>Above a Day</option>
                          </select>
                          {errors?.promo_duration && <Error message='Promo Duration is Required' />}
                        </div>
                        <div className='mt-2'>
                          {promoDurationField == 'single_day' ? (
                            <Space>
                              <DatePicker disabledDate={disabledDate} onChange={rangeHandler} />
                            </Space>
                          ) : promoDurationField == 'aboveDay' ? (
                            <Space>
                              <RangePicker disabledDate={disabledDate} onChange={rangeHandler} />
                            </Space>
                          ) : null}
                          { (promoDurationField != undefined && promoDurationField != '') && <Error title={Object.keys(promoDuration).length === 0 ? 'Date or Duration is required' : ''} />}
                        </div>
                        {/* {!openGallery && <div className=""> */}
                        <div className="mt-1">
                          <label className={labelClass} htmlFor="main_input">
                            Image*   <span className='px-2 text-xs text-red-500'>(Image dimensions should be 3556 x 2000)</span>
                          </label>
                          <input
                            className={fileinput}
                            id="main_input"
                            type="file"
                            multiple
                            accept="image/jpeg,image/jpg,image/png"
                            placeholder="Upload Images..."
                            {...register("slide_url", {
                              required: props.button === "edit" ? false : "Image is Required*",
                              onChange: (e) => { handleImageChange(e) },
                            })}
                          />
                          {props?.button == "edit" &&
                            props?.data?.slide_url != "" &&
                            props?.data?.slide_url != undefined && (
                              <label className="block mb-1 font-medium text-blue-800 truncate text-md font-tb">
                                {props?.data?.slide_url?.split("/").pop()}
                              </label>
                            )}
                          {errors.slide_url && (
                            <Error title={errors.slide_url?.message} />
                          )}
                        </div>

                        <div className="flex items-center gap-3 " >
                          <input
                            type="radio"
                            className='w-5 h-5'
                            id="radio-dropdown"
                            name="radio-option"
                            value="dropdown"
                            checked={selectedOption == 'dropdown'}
                            onChange={() => handleRadioChange('dropdown')}
                          />
                          <label htmlFor="radio-dropdown">Internal Redirection</label>
                          <input
                            type="radio"
                            className='w-5 h-5'
                            id="radio-input"
                            name="radio-option"
                            value="input"
                            checked={selectedOption == 'input'}
                            onChange={() => handleRadioChange('input')}
                          />
                          <label htmlFor="radio-input">External Redirection</label>
                        </div>

                        {/* <div className="my-2">
                          <label className={labelClass} htmlFor="main_input">
                            Screen *
                          </label>
                          <select
                            name=""
                            {...register('screen_name', { required: true })}
                            className={`${inputClass} !bg-white`}
                          >
                            <option value="">select</option>
                            <option value="Home Screen">Home Screen</option>
                            <option value="Detail Screen">Detail Screen</option>
                          </select>
                          {errors.screen_name && <Error title='Screen Name is Required*' />}
                        </div> */}
                     
                        {selectedOption == 'dropdown' && (
                          <div className="">
                            <label className={labelClass} htmlFor="main_input">
                              Internal Redirection *
                            </label>
                            <select
                              id="dropdown"
                              name=""
                              {...register('redirection_type', { required: true })}
                              className={`${inputClass} !bg-white`}
                            >
                             <option value="">select</option>
                            <option value="Home Screen">Home Screen</option>
                            <option value="Detail Screen">Detail Screen</option>
                            </select>
                            {errors.redirection_type && <Error title='Redirection type is Required*' />}
                          </div>
                        )}
                        {selectedOption == 'input' && (
                          <div className="">
                            <label className={labelClass}>
                                External Redirection Link*
                              </label>
                              <input
                                type="text"
                                placeholder='xyz.com'
                                className={inputClass}
                                {...register('redirect_link', { required: true })}
                            />
                            {errors.redirect_link && <Error title='Redirection link is Required*' />}
                        </div>
                        )}
                      </div>

                      <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                        {loader ? (
                          <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" />
                        ) :
                          (
                            <button type="submit" className={formBtn1} >
                              submit
                            </button>
                          )
                        }
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
