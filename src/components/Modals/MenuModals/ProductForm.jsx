import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Edit } from "iconsax-react";
import { toast } from "react-toastify";
import { fileinput, formBtn1, formBtn2, inputClass, labelClass, tableBtn} from "../../../utils/CustomClass";
import { getCategory, createProduct, editProduct, getProducts} from "../../../api";
import { setProduct } from "../../../redux/Slices/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadBox from "../../Loader/LoadBox";
import Error from "../../Errors/Error";
import { productLink } from "../../../env";
// import { ImageUpload, movableCatLink } from "../../../env";

export default function ProductForm(props) {
  // console.log('props = ', props);
  const Category = useSelector((state) => state?.master?.Category);
  const SubCategory = useSelector((state) => state?.master?.SubCategory);

  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, control, watch, reset, formState: { errors },} = useForm();
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);


  // ========================= fetch data from api ==============================
  const productList = () => {
    getProducts()
      .then((res) => {
        dispatch(setProduct(res));
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  // ============================ submit data  =====================================
  const onSubmit = async (data) => {
    // console.log("data", data);
    if (props?.button !== 'edit') {
        try {
            if (data.main_image.length != 0) {
                await ImageUpload(data.main_image[0], "products", "products", data.name)
                data.main_image = `${productLink}${data.name}_product_${data.main_image[0].name}`
            } else {
                data.main_image = ''
            }
            setLoader(true)
            createProduct(data).then((res) => {
                if (res?.message === "Data added successfully") {
                    setTimeout(() => {
                      setProduct(res)
                        dispatch(setProduct(res));
                        reset();
                        productList();
                        toggle(),
                        setLoader(false),
                        toast.success(res.message);
                    }, 1000)
                }
            }).catch(err => {
                setLoader(false)
                console.error('Error', err);
            })
        } catch (error) {
            setLoader(false);
            console.log('error', error);
        }
    } else {
        try {
            if (data.main_image.length != 0) {
                await ImageUpload(data.main_image[0], "product", "product", data.name)
                data.main_image = `${productLink}${data.name}_product_${data.main_image[0].name}`
            } else {
                data.main_image = props.data.main_image
            }
            setLoader(true);
            editProduct(props?.data?.id, data).then((res) => {
                if (res?.message === "product edited successfully") {
                    setTimeout(() => {
                        dispatch(setProduct(res));
                        reset();
                        productList();
                        toggle(),
                            setLoader(false),
                        toast.success(res.message);
                    }, 1000)

                }
            })
        } catch (error) {
            setLoader(false);
            console.log('error', error);
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
      product_name: props?.data?.product_name,
      actual_price: props?.data?.actual_price,
      avilable_qty: props?.data?.avilable_qty,
      brand: props?.data?.brand,
      description: props?.data?.description,
      discounted_price: props?.data?.discounted_price,
      unit_of_measurement: props?.data?.unit_of_measurement,
      margin: props?.data?.margin,
      rating: props?.data?.rating,
      offers: props?.data?.offers,
    });
  }, [props.data]);

  return (
    <>
      {props.button !== "edit" ? (
        <button onClick={toggle} className={tableBtn}>
          Add Products
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
                <Dialog.Panel className="w-full max-w-5xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                  <Dialog.Title
                    as="h2"
                    className="w-full px-3 py-4 text-lg font-semibold leading-6 text-white bg-sky-400 font-tb"
                  >
                  {props?.title}
                  </Dialog.Title>
                  <div className=" bg-gray-200/70">
                    {/* React Hook Form */}

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 py-4 mx-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-3 gap-y-3 ">
                        <div className="">
                          <label className={labelClass}>Product Name*</label>
                          <input
                            type="text"
                            placeholder="Name"
                            autoComplete="off"
                            className={inputClass}
                            {...register("product_name", { required: true })}
                          />
                          {errors.product_name && (
                            <Error title="Product Name is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass} htmlFor="main_input">
                            Product Image*
                          </label>
                          <input
                            className={fileinput}
                            id="main_input"
                            type="file"
                            multiple
                            accept="image/jpeg,image/jpg,image/png"
                            placeholder="Upload Images..."
                            {...register("main_image", {
                              required: props.button == "edit" ? false : true,
                            })}
                          />
                          {props?.button == "edit" &&
                            props?.data.main_image != "" &&
                            props?.data.main_image != undefined && (
                              <label className="block mb-1 font-medium text-blue-800 text-md font-tb">
                                {props?.data?.main_image?.split("/").pop()}
                              </label>
                            )}
                          {errors.main_image && (
                            <Error title="Product Image is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>Category Type*</label>
                          <select
                            name="category Type"
                            className={inputClass}
                            {...register("category", { required: true })}
                          >
                            <option value="" disabled>Select Type</option>
                            {Category.map((category) => (
                              <option key={category.id} value={category.id}  selected={props?.data?.category === category.id}>
                                {category.category_name}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <Error title="Category Type is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>SubCategory Type*</label>
                          <select
                            name="Subcategory Type"
                            className={inputClass}
                            {...register("subcategory", { required: true })}
                          >
                            <option value="" disabled>Select Type</option>
                            {Category.map((category) => (
                              <option key={category.id} value={category.id}  selected={props?.data?.category === category.id}>
                                {category.category_name}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <Error title="Category Type is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>Actual Price*</label>
                          <input
                            type="number"
                            placeholder="229"
                            className={inputClass}
                            {...register('actual_price', { required: true})}
                          />
                          {errors.actual_price && (
                            <Error title="Actual Price is required*" />
                          )}

                          {/* {errors.phone_no && <Error title={errors?.phone_no?.message} />} */}
                        </div>
                        <div className="">
                          <label className={labelClass}>
                            Discounted Price*
                          </label>
                          <input
                            type="number"
                            placeholder="200"
                            className={inputClass}
                            // {...register('phone_no', { required: true, validate: validatePhoneNumber })}
                            {...register('discounted_price', { required: true })}
                          />
                          {errors.discounted_price && (
                            <Error title="Discounted Price is required*" />
                          )}

                          {/* {errors.phone_no && <Error title={errors?.phone_no?.message} />} */}
                        </div>

                        <div className="">
                          <label className={labelClass}>Offer (%)*</label>
                          <input
                            type="number"
                            placeholder="Enter offer"
                            className={inputClass}
                            {...register('offers', { required: true })}
                          />
                          {errors.offers && (
                            <Error title="Offer is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>Margin*</label>
                          <input
                            type="number"
                            placeholder="Enter Margin"
                            className={inputClass}
                            {...register('margin', { required: true})}
                          />
                          {errors.margin && (
                            <Error title="Margin is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>
                            Available Quantity*
                          </label>
                          <input
                            type="number"
                            placeholder="10"
                            className={inputClass}
                            {...register('avilable_qty', { required: true })}
                          />
                          {errors.avilable_qty && (
                            <Error title="Available Quantity is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>
                            Unit of Measurement*
                          </label>
                          <input
                            type="text"
                            placeholder="100 Grams"
                            className={inputClass}
                            {...register('unit_of_measurement', { required: true })}
                          />
                          {errors.unit_of_measurement && (
                            <Error title="Unit of Measurement is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>
                            Brand*
                          </label>
                          <input
                            type="text"
                            placeholder="Aditya Sun Pharma"
                            className={inputClass}
                            {...register('brand', { required: true })}
                          />
                          {errors.unit_of_measurement && (
                            <Error title="Unit of Measurement is required*" />
                          )}
                        </div>
                        <div className="">
                          <label className={labelClass}>Description*</label>
                          <textarea
                            className={inputClass}
                            name=""
                            id=""
                            cols="30"
                            rows="4"
                            placeholder="Enter Description"
                             {...register('description', { required: true})}
                          ></textarea>
                          {errors.description && (
                            <Error title="Description is required*" />
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
