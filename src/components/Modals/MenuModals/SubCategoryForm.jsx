import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Edit } from "iconsax-react";
import { toast } from "react-toastify";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn } from "../../../utils/CustomClass";
import { getCategory, getSubCategory, editSubCategory, createSubCategory, createRestaurantSubCategory, editRestaurantSubCategory, getRestaurantCategory } from "../../../api";
import { setCategory, setSubCategory } from "../../../redux/Slices/masterSlice";
import LoadBox from "../../Loader/LoadBox";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../Errors/Error";
import { ImageUpload, subcategoryLink , restaurantsubcatLink} from "../../../env";

export default function SubCategoryForm(props) {
  // console.log('props = ', props)
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  // const categories = useSelector((state) => state?.master?.Category);
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const toggle = async () => {
    setIsOpen(!isOpen);
  };

  // // ========================= fetch data from api ==============================
  const fetchData2 = () => {
    try {
      getCategory().then((res) => {
        setCategories(res)
        // dispatch(setCategory(res));
      });
    } catch (error) {
      console.log(error);
    }
  };
  const restaurantCategories = () => {
    try {
      getRestaurantCategory().then((res) => {
        setCategories(res)
        // dispatch(setCategory(res));
      });
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (!props?.isrestaurant){
      fetchData2();
    }
    if (props?.isrestaurant){
      restaurantCategories();
    }
  }, [props.isrestaurant]);


  // ============================ submit data  =====================================
  const onSubmit = async (data) => {
    if (props?.button !== "edit") {
      try {
        if (data.subcat_image.length != 0) {
          await ImageUpload(
            data.subcat_image[0],
            "subcategory",
            "subcategory",
            data.subcat_name
          );
          data.subcat_image = `${subcategoryLink}${data.subcat_name}_subcategory_${data.subcat_image[0].name}`;
        } else {
          data.subcat_image = "";
        }
        setLoader(true);
        createSubCategory(data)
          .then((res) => {
            if (res?.message == "subcategory added successfully") {
              setTimeout(() => {
                // dispatch(setCategory(res));
                reset();
                toggle(), 
                setLoader(false), 
                props?.isrestaurant ? props?.restaurantSubCategories() : props?.fetchData();
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
        if (data.subcat_image.length != 0) {
          await ImageUpload(data.subcat_image[0], "subcategory", "subcategory", data.subcat_name);
          data.subcat_image = `${subcategoryLink}${data.subcat_name}_subcategory_${data.subcat_image[0].name}`;
        } else {
          data.subcat_image = props.data.subcat_image;
        }
        setLoader(true);
        editSubCategory(props?.data?.subcat_id, data).then((res) => {
          if (res?.status == "success") {
            setTimeout(() => {
              // dispatch(setSubCategory(res));
              reset();
              toggle(),
              setLoader(false), 
              props?.isrestaurant ? props?.restaurantSubCategories() : props?.fetchData();
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

  const onRestaurantSubmit = async (data) => {
    if (props?.button !== "edit") {
      try {
        if (data.subcat_image.length != 0) {
          await ImageUpload( data.subcat_image[0], "restaurantsubcategory", "restaurantsubcategory", data.subcat_name);
          data.subcat_image = `${restaurantsubcatLink}${data.subcat_name}_restaurantsubcategory_${data.subcat_image[0].name}`;
        } else {
          data.subcat_image = "";
        }
        setLoader(true);
        createRestaurantSubCategory(data)
          .then((res) => {
            if (res?.status === "success") {
              setTimeout(() => {
                // dispatch(setCategory(res));
                reset();
                toggle(), setLoader(false), 
                props?.isrestaurant ? props?.restaurantSubCategories() : props?.fetchData();
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
        if (data.subcat_image.length != 0) {
          await ImageUpload(data.subcat_image[0], "restaurantsubcategory", "restaurantsubcategory", data.subcat_name);
          data.subcat_image = `${restaurantsubcatLink}${data.subcat_name}_restaurantsubcategory_${data.subcat_image[0].name}`;
        } else {
          data.subcat_image = props.data.subcat_image;
        }
        setLoader(true);
        editRestaurantSubCategory(props?.data?.subcat_id, data).then((res) => {
          if (res?.message === "subcategory edited successfully") {
            setTimeout(() => {
              // dispatch(setSubCategory(res));
              reset();
              toggle(), setLoader(false), 
              props?.isrestaurant ? props?.restaurantSubCategories() : props?.fetchData();
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

  // ======================= close modals ===============================
  const closeBtn = () => {
    toggle();
    setLoader(false);
  };

  // ======================== Reset data into the form  =======================
  useMemo(() => {
    reset({
      subcat_name: props?.data?.subcat_name,
    });
  }, [props.data]);

  return (
    <>
      {props.button !== "edit" ? (
        <button onClick={toggle} className={tableBtn}>
          Add SubCategory
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
                    {/* React Hook Form */}
                    <form  onSubmit={props?.isrestaurant ? handleSubmit(onRestaurantSubmit) : handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-2 py-4 mx-4 gap-x-3 gap-y-3 customBox">
                        <div className="">
                          <label className={labelClass}>
                            SubCategory Name*
                          </label>
                          <input
                            type="text"
                            placeholder="Name"
                            autoComplete="off"
                            className={inputClass}
                            {...register("subcat_name", { required: true })}
                          />
                          {errors.subcat_name && (
                            <Error title="Subcategory Name is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass} htmlFor="main_input">
                            SubCategory Image*
                          </label>
                          <input
                            className={fileinput}
                            id="main_input"
                            type="file"
                            multiple
                            accept="image/jpeg,image/jpg,image/png"
                            placeholder="Upload Images..."
                            {...register("subcat_image", {
                              required: props.button == "edit" ? false : true,
                            })}
                          />
                          {props?.button == "edit" &&
                            props?.data.subcat_image != "" &&
                            props?.data.subcat_image != undefined && (
                              <label className="block mb-1 font-medium text-blue-800 text-md font-tb">
                                {props?.data?.subcat_image?.split("/").pop()}
                              </label>
                            )}
                          {errors.subcat_image && (
                            <Error title="SubCategory Image is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>Category Type*</label>
                          <select
                            name="category Type"
                            className={inputClass}
                            {...register("category", { required: true })}
                          >
                            <option value="" selected>Select Type</option>
                            {categories?.length > 0 && categories.map(category => (
                              <option key={category.id} value={category.id} selected={props?.data?.category === category.id}>
                                {category.category_name}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <Error title="Category Type is required*" />
                          )}
                        </div>
                      </div>

                      <footer className="flex justify-end px-4 py-2 space-x-3 bg-white">
                        {loader ? (
                          <LoadBox className="relative block w-auto px-5 transition-colors font-tb tracking-wide duration-200 py-2.5 overflow-hidden text-base font-semibold text-center text-white rounded-lg bg-sky-400 hover:bg-sky-400 capitalize" />
                        ) : (
                          <button type="submit" className={formBtn1}>
                            submit
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
