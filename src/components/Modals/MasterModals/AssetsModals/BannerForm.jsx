import { Dialog, Transition } from "@headlessui/react";
import { Edit } from "iconsax-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addHomeBanners, editHomeBanners } from "../../../../api";
import { ImageUpload, bannerLink } from "../../../../env";
import { setBanner } from "../../../../redux/Slices/masterSlice";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from "../../../../utils/CustomClass";
import Error from "../../../Errors/Error";
import LoadBox from "../../../Loader/LoadBox";
import { ImageCropDialog } from "../../ImageCropperModal/ImageCropper";
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 100;
export default function BannerForm(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [childData, setChildData] = useState('');
  const [selectedOption, setSelectedOption] = useState('dropdown');
  const [imgSrc, setImgSrc] = useState("");
  const [imageError, setImageError] = useState('');
  const [urlName, setUrlName] = useState("");

  const avatarUrl = useRef(imgSrc);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const handleRadioChange = (option) => {
    setSelectedOption(option);
    setShowDropdown(option === 'dropdown');
    setInputValue('');
  };

  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors }, setError } = useForm({ criteriaMode: 'all' });


  const getImageInfo = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          resolution: `${img.naturalWidth}×${img.naturalHeight}`,
          mimeType: 'image/png', // You may need to determine this dynamically
          extension: 'png', // You may need to determine this dynamically
          size: `${Math.round(img.src.length / 1024 * 100) / 100} KB`,
          download: 'image.png', // You may need to determine this dynamically
          bitDepth: 8 // You may need to determine this dynamically
        });
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = imageUrl;
    });
  };

  const receiveDataFromChild = (data) => {
    setChildData(data);

    if (data) {
      setValue('slide_url', data)
    }
  };

  // ===================== close modals ===============================
  const closeBtn = () => {
    toggle();
    setLoader(false);
    reset();
  };

  useEffect(() => {
    reset({
      'vendor_type': props?.data?.vendor_type,
      'screen_name': props?.data?.screen_name,
      'redirection_type': props?.data?.redirection_type,
      'redirect_link': props?.data?.redirect_link
    })
    if (props?.data?.redirect_link) {
      setSelectedOption('input')
    } else {
      setSelectedOption('dropdown')
    }
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
    console.log("🚀 ~ file: BannerForm.jsx:82 ~ data:", data)
    if (props?.button != "edit") {
      try {
        if (data?.slide_url?.length !== 0) {
          await ImageUpload(
            data.slide_url[0],
            "banner",
            "banner",
            data.slide_url[0].name
          );
          data.slide_url = `${bannerLink}${data.slide_url[0].name}_banner_${data.slide_url[0].name}`;
        } else {
          data.slide_url = "";
        }
        setLoader(true);
        addHomeBanners(data).then((res) => {
          if (res?.message === "slide added successfully") {
            setTimeout(() => {
              dispatch(setBanner(res));
              reset();
              toggle(),
                setLoader(false),
                props?.getAllBannerList();
              toast.success(res?.message);
            }, 1000);
          }
        });
      } catch (error) {
        setLoader(false);
        console.log("error", error);
      }
    } else {
      if (props?.button == 'edit') {
        try {
          if (data?.slide_url?.length > 0 && props?.data?.slide_url) {
            await ImageUpload(
              data.slide_url[0],
              "banner",
              "banner",
              data.slide_url[0]?.name
            );
            data.slide_url = `${bannerLink}${data.slide_url[0]?.name}_banner_${data.slide_url[0]?.name}`;
          } else {
            data.slide_url = props?.data?.slide_url;
          }
          setLoader(true);
          editHomeBanners(props?.data?.slide_id, data).then((res) => {
            if (res?.message === "slide edited successfully") {
              setTimeout(() => {
                dispatch(setBanner(res));
                reset();
                toggle(),
                  setLoader(false),
                  props?.getAllBannerList();
                toast.success(res?.message);
              }, 1000);
            }
          });
        } catch (error) {
          setLoader(false);
          console.log("error", error);
        }
      }
    }
  };


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
          className="bg-yellow-100 px-1.5 py-2 rounded-sm"
        >
          <Edit size="20" className="text-yellow-500" />
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
                        <div className="">
                          <label className={labelClass} htmlFor="main_input">
                            Vendor Type*
                          </label>
                          <select
                            name=""
                            {...register('vendor_type', { required: true })}
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
                        <div className="flex items-center gap-3">
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
                              placeholder='External link'
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
                            <button type="submit" className={formBtn1}  >
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

                    {imgSrc != '' &&
                      <ImageCropDialog
                        updateAvatar={updateAvatar}
                        sendDataToParent={receiveDataFromChild}
                        // className="hidden"
                        imgSrc={imgSrc} />}
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