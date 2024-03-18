import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from "../../../../utils/CustomClass";
import { Edit } from "iconsax-react";
import { addHomeBanners, editHomeBanners } from "../../../../api";
import { useDispatch } from "react-redux";
import { setBanner } from "../../../../redux/Slices/masterSlice";
import { toast } from "react-toastify";
import LoadBox from "../../../Loader/LoadBox";
import Error from "../../../Errors/Error";
import { ImageUpload, bannerLink } from "../../../../env";
import { DatePicker, Space } from "antd";
import moment from "moment";

export default function BannerForm(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageError, setImageError] = useState('');
  const [promoDuration, setPromoDuration] = useState({});
  const { register, handleSubmit, setValue, watch, reset, formState: { errors }, setError } = useForm({ criteriaMode: 'all' });
  const today = moment().startOf('day');
  const promoDurationField = watch('promo_duration');
  const { RangePicker } = DatePicker

  const disabledDate = current => {
    return current && current < moment(today);
  };
  const rangeHandler = (e) => {
    console.log('e', e)
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
  }
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  // ===================== close modals ===============================
  const closeBtn = () => {
    toggle();
    setLoader(false);
    reset();
  };


  useEffect(() => {
    reset({
      'vendor_type': props?.data?.vendor_type
    })
  }, []);


  // ============================ submit data  =====================================
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      'slideDuration': promoDuration
    }
    if (imageError) {
      setError("slide_url", {
        type: "manual",
        message: imageError
      });
      return;
    }
    console.log("🚀 ~ file: BannerForm.jsx:82 ~ data:", updatedData)
    if (props?.button != "edit") {
      try {
        if (updatedData?.slide_url?.length !== 0) {
          await ImageUpload(
            updatedData.slide_url[0],
            "banner",
            "banner",
            updatedData.slide_url[0].name
          );
          updatedData.slide_url = `${bannerLink}${updatedData.slide_url[0].name}_banner_${updatedData.slide_url[0].name}`;
        } else {
          updatedData.slide_url = "";
        }
        setLoader(true);
        addHomeBanners(updatedData).then((res) => {
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
          if (updatedData?.slide_url?.length > 0 && props?.updatedData?.slide_url) {
            await ImageUpload(
              updatedData.slide_url[0],
              "banner",
              "banner",
              updatedData.slide_url[0]?.name
            );
            updatedData.slide_url = `${bannerLink}${updatedData.slide_url[0]?.name}_banner_${updatedData.slide_url[0]?.name}`;
          } else {
            updatedData.slide_url = props?.updatedData?.slide_url;
          }
          // }
          setLoader(true);
          editHomeBanners(props?.updatedData?.slide_id, updatedData).then((res) => {
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
                <Dialog.Panel className="w-full max-w-xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                  <Dialog.Title
                    as="h2"
                    className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                  >
                    {props?.title}
                  </Dialog.Title>
                  <div className=" bg-gray-200/70">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="py-4 mx-4 customBox">
                        <div>
                          <label className={labelClass}>Select Duration</label>
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
                          {promoDurationField === 'single_day' ? (
                            <Space>
                              <DatePicker disabledDate={disabledDate} onChange={rangeHandler} />
                            </Space>
                          ) : promoDurationField === 'aboveDay' ? (
                            <Space>
                              <RangePicker disabledDate={disabledDate} onChange={rangeHandler} />
                            </Space>
                          ) : null}
                          {Object.keys(promoDuration).length == 0 && <Error title='Date or Duration is required' />}
                        </div>
                        <div className="my-2">
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
