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


export default function AddPromo(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [loader, setLoader] = useState(false)

  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRadioChange = (option) => {
    setSelectedOption(option);
    setShowDropdown(option === 'dropdown');
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // const [openGallery, setopenGallery] = useState(false);
  // const [openGalleryModal, setopenGalleryModal] = useState(false);
  // const [imageDetails, setImageDetails] = useState([]);
  // const [childData, setChildData] = useState('');
  // const mediaGalleryModalRef = useRef(null);
  // console.log('childData == ', childData)
  const dispatch = useDispatch()
  const toggle = () => setIsOpen(!isOpen);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors }, setError } = useForm({criteriaMode:'all'});

  const [imageError, setImageError] = useState('');
  // ===================== close modals ===============================
  const closeBtn = () => {
    toggle();
    setLoader(false);
    reset();
    // setopenGallery(false);
    // setopenGalleryModal(false);
  };

  // const openMediaModal = () => {
  //     setopenGalleryModal(!openGalleryModal);
  // };


  // const handleSelectChange = (e) => {
  //     if (e.target.value == 'true') {
  //        setopenGallery(true);
  //     }else{
  //       setopenGallery(false);
  //     }
  // };

  // const receiveDataFromChild = (data) => {
  //     setChildData(data);
  //     setValue("slide_url", childData);
  //     // console.log('childData = ', childData)
  // };


  // ============== fetch data from api ================
  // const fetchData = () => {
  //     try {
  //     getGalleryImages().then((res) => {
  //         // console.log("media gallery data = ", res);
  //         setImageDetails(res);
  //     });
  //     } catch (err) {
  //     console.log("error", err);
  //     }
  // };

  useEffect(() => {
    // fetchData();
    reset({
      'vendor_type': props?.data?.vendor_type
    })
  }, []);



  // ============================ submit data  =====================================
  const onSubmit = async (data) => {
    if (imageError) {
      // Set error message using setError if image dimensions are not valid
      setError("slide_url", {
        type: "manual",
        message: imageError
      });
      return;
    }
    console.log("🚀 ~ file: AddPromo.jsx:81 ~ data:", data)
    // const slideUrl = watch('slide_url')
    // if (props?.title != 'Edit Promotions' && childData) {

    if (props?.title != 'Edit Promotions') {
      try {
        // if (childData) {
        //     data.slide_url = childData;
        // } else if (data?.slide_url?.length != 0) {
        if (data?.slide_url?.length != 0) {
          await ImageUpload(data.slide_url[0], "promotion", "promotion", data.slide_url[0].name)
          data.slide_url = `${promotionLink}${data.slide_url[0].name}_promotion_${data.slide_url[0].name}`
        } else {
          data.slide_url = ''
        }
        setLoader(true)
        postHomePromotion(data).then((res) => {
          if (res?.message === "slide added successfully") {
            setTimeout(() => {
              dispatch(setPromotions(res));
              reset();
              toggle(),
                setLoader(false),
                props?.getAllPromotionList()
              toast.success(res?.message);
              // setChildData('')
              // setopenGallery(false);
              // setopenGalleryModal(false);
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
          // if (childData) {
          //   data.slide_url = childData
          // } else{
          // if (data?.slide_url?.length > 0 && props?.data?.slide_url && !childData) {
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
                // setChildData('')
                // setopenGallery(false);
                // setopenGalleryModal(false);
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
          if (img.width === 3556 && img.height === 2000) {
            console.log('File uploaded successfully');
            setImageError('');
          } else {
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
                    {/* React Hook Form */}
                    {/* <form onSubmit={childData == '' ? handleSubmit(onSubmit) : handleSubmit(GallerySubmit)}> */}
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
                            Vendor *
                          </label>
                          <select
                            name=""
                            {...register('vendor_type', { required: true })}
                            className={`${inputClass} !bg-white`}
                          >
                            <option value="">select</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Seller">Seller</option>
                          </select>
                          {errors.vendor_type && <Error title='Vendor type is Required*' />}
                        </div>

                         {/* {!openGallery && <div className=""> */}
                         <div className="mt-1">
                          <label className={labelClass} htmlFor="main_input">
                            Image*
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
                              <label className="block mb-1 font-medium text-blue-800 text-md font-tb">
                                {props?.data?.slide_url?.split("/").pop()}
                              </label>
                            )}
                         {errors.slide_url && (
                            <Error title={errors.slide_url?.message} />
                          )}
                        </div>

                        <div className=" flex items-center gap-3" >
                          <input
                            type="radio"
                            className='w-5 h-5'
                            id="radio-dropdown"
                            name="radio-option"
                            value="dropdown"
                            checked={selectedOption === 'dropdown'}
                            onChange={() => handleRadioChange('dropdown')}
                          />
                          <label htmlFor="radio-dropdown">Internal Redirection</label>
                          <input
                            type="radio"
                            className='w-5 h-5'
                            id="radio-input"
                            name="radio-option"
                            value="input"
                            checked={selectedOption === 'input'}
                            onChange={() => handleRadioChange('input')}
                          />
                          <label htmlFor="radio-input">External Redirection</label>
                        </div>

                        <div className="my-2">
                          <label className={labelClass} htmlFor="main_input">
                            Screen *
                          </label>
                          <select
                            name=""
                            // {...register('screen_type', { required: true })}
                            className={`${inputClass} !bg-white`}
                          >
                            <option value="">select</option>
                            <option value="Home Screen">Home Screen</option>
                            <option value="Detail Screen">Detail Screen</option>
                          </select>
                          {/* {errors.screen_type && <Error title='Screen type is Required*' />} */}
                        </div>
                     
                        {showDropdown && (
                          <div className="">
                            <label className={labelClass} htmlFor="main_input">
                              Internal Redirection *
                            </label>
                            <select
                              id="dropdown"
                              name=""
                              // {...register('internal_link', { required: true })}
                              className={`${inputClass} !bg-white`}
                            >
                             <option value="">select</option>
                            <option value="Home Screen">Home Screen</option>
                            <option value="Detail Screen">Detail Screen</option>
                            </select>
                            {/* {errors.internal_link && <Error title='Vendor type is Required*' />} */}
                          </div>



                          // <div>
                          //   <label htmlFor="dropdown">Dropdown:</label>
                          //   <select id="dropdown">
                          //     <option value="option1">Option 1</option>
                          //     <option value="option2">Option 2</option>
                          //     <option value="option3">Option 3</option>
                          //   </select>
                          // </div>
                        )}
                        {selectedOption === 'input' && (
                          <div className="">
                            <label className={labelClass}>
                                External Redirection Link*
                            </label>
                            <input
                                type="text"
                                placeholder='External link'
                                className={inputClass}
                                // {...register('external_link', { required: true })}
                            />
                            {/* {errors.external_link && <Error title='Product Name is Required*' />} */}
                        </div>


                          // <div>
                          //   <label htmlFor="input">Input:</label>
                          //   <input
                          //     type="text"
                          //     id="input"
                          //     value={inputValue}
                          //     onChange={handleInputChange}
                          //   />
                          // </div>
                        )}

                  

                       

                        {/* {openGallery && (
                          <div className="w-1/2 mt-3 mb-2">
                            <span className={`cursor-pointer w-full ${formBtn1}`} onClick={openMediaModal}>
                              Open Sample Images
                            </span>
                            <input
                              type="text" 
                              className="hidden"
                            />
                            {childData == undefined || childData == '' && (
                              <Error title="Main Image is required*" />
                            )}
                          </div>
                        )} */}

                        {/* {childData && <span>{childData.split("/").pop()}</span>} */}
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
                    {/* {openGalleryModal && <div className="hidden">
                          <MediaGallaryModal
                              ref={mediaGalleryModalRef}
                              id="mediaGalleryModal"
                              className="hidden"
                              title="Upload Image"
                              imageDetails={imageDetails}
                              setopenGalleryModal={openMediaModal}
                              sendDataToParent={receiveDataFromChild}
                          />
                        </div> } */}
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
