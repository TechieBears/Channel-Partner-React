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
    // const [openGallery, setopenGallery] = useState(false);
    // const [openGalleryModal, setopenGalleryModal] = useState(false);
    // const [imageDetails, setImageDetails] = useState([]);
    // const [childData, setChildData] = useState('');
    // const mediaGalleryModalRef = useRef(null);
    // console.log('childData == ', childData)
    const dispatch = useDispatch()
    const toggle = () => setIsOpen(!isOpen);
    const { register, handleSubmit, setValue, watch, reset, formState: { errors }} = useForm();


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
                if(props?.title == 'Edit Promotions'){
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
                    {/* <form onSubmit={childData == '' ? handleSubmit(onSubmit) : handleSubmit(GallerySubmit)}> */}
                    <form onSubmit={handleSubmit(onSubmit)}>

                      <div className="py-4 mx-4 customBox">
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

                        <div className="my-2">
                         <label className={labelClass} htmlFor="main_input">
                            Vendor *
                          </label>
                        <select
                            name=""
                            {...register('vendor_type', {required: true})}
                            className={`${inputClass} !bg-slate-100`}
                            >
                            <option value="">select</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Seller">Seller</option>
                          </select>
                          {errors.vendor_type && <Error title='Vendor type is Required*' />}
                        </div>

                       {/* {!openGallery && <div className=""> */}
                      <div className="">
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
                              // required: !childData && (props.button === "edit" ? false : true),
                              required: (props.button === "edit" ? false : true),
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
                            <Error title="Main Image is required*" />
                          )}
                        </div>

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
