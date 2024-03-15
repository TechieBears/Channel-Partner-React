import {
    ArrowSwapVertical,
    ClipboardTick,
    ShoppingCart,
    UserRemove
} from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
// import { deleteStorage, getPartnerStorage, getStorages } from "../../../api";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import Orders from "../../../components/Cards/Orders/Orders";
import DashboardForm from "../../../components/Modals/DashboardModals/DashboardForm";
import DeleteModal from "../../../components/Modals/DeleteModal/DeleteModal";
import { formBtn1, formBtn2, inputClass } from "../../../utils/CustomClass";




const Dashboard = () => {
    const [modelOpen, setAddCouponOpen] = useState(true);
    const user = useSelector((state) => state.user.loggedUserDetails);
    const storages = useSelector((state) => state?.storage?.list);
    const cityNames = useSelector((state) => state?.master?.city);
    const [open, setOpen] = React.useState(false);
    const [delId, setDelId] = React.useState(0);
    const orders = useSelector((state) => { state?.orders?.orders })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    // ======================== Data submit ===================================
    const onSubmit = async (data) => {
        console.log('data', data);
    };


    // ================================ Dropdown List =========================

    const filterOptions = (options, inputValue) => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (_, callback) => {
        const uniqueNames = new Set();
        const uniqueProducts = storages
            ?.filter(
                (res) =>
                    res.name && !uniqueNames.has(res.name) && uniqueNames.add(res.name)
            )
            .map((res) => ({ label: res.name, value: res.name }));
        callback(uniqueProducts || []);
    };

    // ================================ filter reset ============================
    const filterReset = () => {
        reset({
            name: null,
            location: "",
        });
        toast.success("Filters clear");
    };

    // ================= delete storage data ===============
    const toggleModalBtn = (id) => {
        setOpen(!open);
        setDelId(id);
    };
    const deleteData = () => {
        deleteStorage(delId).then((form) => {
            if (form?.message === "Data deleted successfully") {
                // StorageList();
                toast.success(form?.message);
                setOpen(!open);
            }
        });
    };

    // ====================== table columns ======================

    const data = [
        {
            "type": "order_message_echo",
            "orderId": 142,
            "orderfor": "vendor",
            "order_details": {
                "order_delivery_status": "placed",
                "order_created_at": "2024-03-14T15:18:39.976467+05:30",
                "order_instruction": null
            },
            "orderedItems": [
                {
                    "orderitem_id": 173,
                    "user": {
                        "first_name": "shubham",
                        "last_name": "Shubbb",
                        "phone_no": "7796500494",
                        "email": "shubham786@gmail.com",
                        "profile_pic": "https://s3-ap-south-1.amazonaws.com/channel-partner-media/profile%2Fshubham1708667013030.jpg",
                        "city": "",
                        "state": "",
                        "pincode": "",
                        "date_of_birth": "2024-02-23",
                        "gender": "Female"
                    },
                    "product_qty": 2,
                    "product_price": 120,
                    "product": {
                        "product_id": 7,
                        "product_name": "Faith Cole",
                        "product_description": "jhdsjadhajkd",
                        "product_brand": "Non eos sequi aut re",
                        "product_country_of_origin": "Facilis tenetur null",
                        "product_shelflife": "Ex sint quae aliquid",
                        "product_Manufacturer_Name": "Ursa Michael",
                        "product_Manufacturer_Address": null,
                        "product_nutritional_info": "Consequatur Ullam b",
                        "product_additional_details": null,
                        "product_available_qty": 762,
                        "product_msbcode": null,
                        "product_image_1": "https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/Faith Cole_MainImage_egg.png",
                        "product_image_2": "",
                        "product_image_3": "",
                        "product_image_4": "",
                        "product_image_5": "",
                        "product_video_url": "",
                        "product_isactive": true,
                        "product_actual_price": 100,
                        "product_unit_type": null,
                        "product_unit": null,
                        "product_rating": 3,
                        "product_isverified_byadmin": true,
                        "product_isverified_byfranchise": false,
                        "insta_commison_percentage": 10,
                        "markup_percentage": 10,
                        "offers": 10,
                        "featured": true,
                        "final_price": 120,
                        "vendor": 14,
                        "product_category": 15,
                        "product_subcategory": 3
                    }
                },
                {
                    "orderitem_id": 173,
                    "user": {
                        "first_name": "shubham",
                        "last_name": "Shubbb",
                        "phone_no": "7796500494",
                        "email": "shubham786@gmail.com",
                        "profile_pic": "https://s3-ap-south-1.amazonaws.com/channel-partner-media/profile%2Fshubham1708667013030.jpg",
                        "city": "",
                        "state": "",
                        "pincode": "",
                        "date_of_birth": "2024-02-23",
                        "gender": "Female"
                    },
                    "product_qty": 1,
                    "product_price": 120,
                    "product": {
                        "product_id": 7,
                        "product_name": "Faith Cole",
                        "product_description": "jhdsjadhajkd",
                        "product_brand": "Non eos sequi aut re",
                        "product_country_of_origin": "Facilis tenetur null",
                        "product_shelflife": "Ex sint quae aliquid",
                        "product_Manufacturer_Name": "Ursa Michael",
                        "product_Manufacturer_Address": null,
                        "product_nutritional_info": "Consequatur Ullam b",
                        "product_additional_details": null,
                        "product_available_qty": 762,
                        "product_msbcode": null,
                        "product_image_1": "https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/Faith Cole_MainImage_egg.png",
                        "product_image_2": "",
                        "product_image_3": "",
                        "product_image_4": "",
                        "product_image_5": "",
                        "product_video_url": "",
                        "product_isactive": true,
                        "product_actual_price": 100,
                        "product_unit_type": null,
                        "product_unit": null,
                        "product_rating": 3,
                        "product_isverified_byadmin": true,
                        "product_isverified_byfranchise": false,
                        "insta_commison_percentage": 10,
                        "markup_percentage": 10,
                        "offers": 10,
                        "featured": true,
                        "final_price": 120,
                        "vendor": 14,
                        "product_category": 15,
                        "product_subcategory": 3
                    }
                },
                {
                    "orderitem_id": 173,
                    "user": {
                        "first_name": "shubham",
                        "last_name": "Shubbb",
                        "phone_no": "7796500494",
                        "email": "shubham786@gmail.com",
                        "profile_pic": "https://s3-ap-south-1.amazonaws.com/channel-partner-media/profile%2Fshubham1708667013030.jpg",
                        "city": "",
                        "state": "",
                        "pincode": "",
                        "date_of_birth": "2024-02-23",
                        "gender": "Female"
                    },
                    "product_qty": 1,
                    "product_price": 120,
                    "product": {
                        "product_id": 7,
                        "product_name": "Faith Cole",
                        "product_description": "jhdsjadhajkd",
                        "product_brand": "Non eos sequi aut re",
                        "product_country_of_origin": "Facilis tenetur null",
                        "product_shelflife": "Ex sint quae aliquid",
                        "product_Manufacturer_Name": "Ursa Michael",
                        "product_Manufacturer_Address": null,
                        "product_nutritional_info": "Consequatur Ullam b",
                        "product_additional_details": null,
                        "product_available_qty": 762,
                        "product_msbcode": null,
                        "product_image_1": "https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/Faith Cole_MainImage_egg.png",
                        "product_image_2": "",
                        "product_image_3": "",
                        "product_image_4": "",
                        "product_image_5": "",
                        "product_video_url": "",
                        "product_isactive": true,
                        "product_actual_price": 100,
                        "product_unit_type": null,
                        "product_unit": null,
                        "product_rating": 3,
                        "product_isverified_byadmin": true,
                        "product_isverified_byfranchise": false,
                        "insta_commison_percentage": 10,
                        "markup_percentage": 10,
                        "offers": 10,
                        "featured": true,
                        "final_price": 120,
                        "vendor": 14,
                        "product_category": 15,
                        "product_subcategory": 3
                    }
                },
                {
                    "orderitem_id": 173,
                    "user": {
                        "first_name": "shubham",
                        "last_name": "Shubbb",
                        "phone_no": "7796500494",
                        "email": "shubham786@gmail.com",
                        "profile_pic": "https://s3-ap-south-1.amazonaws.com/channel-partner-media/profile%2Fshubham1708667013030.jpg",
                        "city": "",
                        "state": "",
                        "pincode": "",
                        "date_of_birth": "2024-02-23",
                        "gender": "Female"
                    },
                    "product_qty": 1,
                    "product_price": 120,
                    "product": {
                        "product_id": 7,
                        "product_name": "Faith Cole",
                        "product_description": "jhdsjadhajkd",
                        "product_brand": "Non eos sequi aut re",
                        "product_country_of_origin": "Facilis tenetur null",
                        "product_shelflife": "Ex sint quae aliquid",
                        "product_Manufacturer_Name": "Ursa Michael",
                        "product_Manufacturer_Address": null,
                        "product_nutritional_info": "Consequatur Ullam b",
                        "product_additional_details": null,
                        "product_available_qty": 762,
                        "product_msbcode": null,
                        "product_image_1": "https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/Faith Cole_MainImage_egg.png",
                        "product_image_2": "",
                        "product_image_3": "",
                        "product_image_4": "",
                        "product_image_5": "",
                        "product_video_url": "",
                        "product_isactive": true,
                        "product_actual_price": 100,
                        "product_unit_type": null,
                        "product_unit": null,
                        "product_rating": 3,
                        "product_isverified_byadmin": true,
                        "product_isverified_byfranchise": false,
                        "insta_commison_percentage": 10,
                        "markup_percentage": 10,
                        "offers": 10,
                        "featured": true,
                        "final_price": 120,
                        "vendor": 14,
                        "product_category": 15,
                        "product_subcategory": 3
                    }
                },
            ]
        }
    ]
    return (
        <>
            {user?.is_registered == false && user?.vendor_type == 'restaurant' ? <DashboardForm dashBoard={false} isOpen={modelOpen} /> : ''}
            <DeleteModal
                title="Delete Stroage"
                deleteBtn={deleteData}
                toggleModalBtn={toggleModalBtn}
                description={"Are you sure you want to delete this Stroage"}
                open={open}
            />
            <section className="w-full h-full">
                {/* =====================Dashboard header===================== */}
                <div className="grid grid-cols-1 p-4 sm:m-5 rounded-xl sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-4 ">
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70 ">
                        <div className="p-3.5 rounded-xl bg-sky-50">
                            <ShoppingCart size={26} className="text-sky-400" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">
                                Total Orders
                            </h6>
                            <h6 className="text-base font-semibold text-sky-400 font-tb">
                                980
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl lg:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-purple-50">
                            <ArrowSwapVertical size={26} className="text-purple-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">Active Orders</h6>
                            <h6 className="text-base font-semibold text-purple-600 font-tb">
                                120
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-green-50">
                            <ClipboardTick size={26} className="text-green-500" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">
                                Approved Orders
                            </h6>
                            <h6 className="text-base font-semibold text-green-500 font-tb">
                                70
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-red-50">
                            <UserRemove size={26} className="text-red-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">Cancelled Vendors</h6>
                            <h6 className="text-base font-semibold text-red-400 font-tb">
                                5
                            </h6>
                        </div>
                    </div>
                </div>
                {/* =====================Dashboard filters===================== */}
                <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-2 md:items-center lg:flex-row"
                    >
                        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-y-3 gap-x-2 ">
                            <div className="">
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <AsyncSelect
                                            placeholder="Search By Name"
                                            cacheOptions
                                            defaultOptions
                                            value={field.value}
                                            defaultValue={
                                                field.value
                                                    ? { label: field.value, value: field.value }
                                                    : null
                                            }
                                            loadOptions={loadOptions}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                            <div className="">
                                <select
                                    name="City"
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register("location")}
                                >
                                    <option value="">City</option>
                                    {cityNames?.map((city) => (
                                        <option value={city?.name} key={city?.name}>
                                            {city?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <button
                                type="submit"
                                className={`${formBtn1} w-full text-center`}
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                className={`${formBtn2} w-full text-center`}
                                onClick={filterReset}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
                {/* ===================== New Order Section ===================== */}
                <div className="space-y-2 p-4">
                    <p className="font-semibold text-lg">Current Orders</p>
                    <Orders data={data} />
                </div>
            </section>
        </>
    );
};

export default Dashboard;
