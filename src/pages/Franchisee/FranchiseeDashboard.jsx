import React, { useEffect, useState } from "react";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import Table from "../../components/table/Table";
import {
    ArrowSwapVertical,
    Eye,
    ShoppingCart,
    Trash,
    UserRemove,
    ClipboardTick,
    Edit,
} from "iconsax-react";
// import { deleteStorage, getPartnerStorage, getStorages } from "../../../api";
import { formBtn2, inputClass } from "../../utils/CustomClass";
import { formBtn1 } from "../../utils/CustomClass";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { environment } from "../../env";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal";
import ActiveOrders from "../Admin/Dashboard/OrderList/ActiveOrders";
import PendingOrders from "../Admin/Dashboard/OrderList/PendingOrders";
import moment from "moment";
import ViewProduct from "../../components/Modals/Vendors/ViewProduct";





const FranchiseeDashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const user = useSelector((state) => state.user.loggedUserDetails);
    const cityNames = useSelector((state) => state?.master?.city);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [delId, setDelId] = React.useState(0);

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

    // ====================== fetch data api ==================================

    // const StorageList = () => {
    //     if (user.role == "admin") {
    //         getStorages()
    //             .then((res) => {
    //                 console.log(res);
    //             })
    //             .catch((err) => {
    //                 console.error("Error", err);
    //             });
    //     } else {
    //         getPartnerStorage(user?.userid)
    //             .then((res) => {
    //             })
    //             .catch((err) => {
    //                 console.error("Error", err);
    //             });
    //     }
    // };

    // ================================ Dropdown List =========================

    const filterOptions = (options, inputValue) => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    // const loadOptions = (_, callback) => {
    //     const uniqueNames = new Set();
    //     const uniqueProducts = storages
    //         ?.filter(
    //             (res) =>
    //                 res.name && !uniqueNames.has(res.name) && uniqueNames.add(res.name)
    //         )
    //         .map((res) => ({ label: res.name, value: res.name }));
    //     callback(uniqueProducts || []);
    // };

    // ================================ filter reset ============================
    const filterReset = () => {
        reset({
            name: null,
            location: "",
        });
        // StorageList();
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
    // ======================== table action =========================

    // ====================== table columns ======================

    const data = [
        {
            "orderId": 753,
            "orderDate": "Jan 1, 2024 , 05:56 PM",
            "items": [
                {
                    "name": "Butter Milk",
                    "quantity": 7,
                    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU",
                    "description": "Lorem ipsum dolor, sit amet"
                }
            ],
            "paymentMethod": "Cash",
            "orderPrice": 1000
        },
        {
            "orderId": 754,
            "orderDate": "Jan 2, 2024 , 10:12 AM",
            "items": [
                {
                    "name": "Chocolate Cake",
                    "quantity": 2,
                    "image": "https://example.com/cake.jpg",
                    "description": "Delicious chocolate cake"
                },
                {
                    "name": "Vanilla Ice Cream",
                    "quantity": 3,
                    "image": "https://example.com/icecream.jpg",
                    "description": "Creamy vanilla goodness"
                }
            ],
            "paymentMethod": "Credit Card",
            "orderPrice": 350
        },
        {
            "orderId": 755,
            "orderDate": "Jan 3, 2024 , 03:45 PM",
            "items": [
                {
                    "name": "Cheese Pizza",
                    "quantity": 1,
                    "image": "https://example.com/pizza.jpg",
                    "description": "Delicious cheesy pizza"
                },
                {
                    "name": "Garlic Bread",
                    "quantity": 2,
                    "image": "https://example.com/garlicbread.jpg",
                    "description": "Garlicky goodness"
                }
            ],
            "paymentMethod": "PayPal",
            "orderPrice": 25
        }
    ]

    return (
        <>
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
                {/* <div className="p-4 m-4 bg-white sm:m-5 rounded-xl">
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
                </div> */}
                {/* <div className="mx-auto mt-8 sm:m-5">
                    <Tabs
                        selectedIndex={selectedTab}
                        onSelect={(index) => setSelectedTab(index)}
                    >
                        <TabList className="flex mx-6 space-x-4 border-b">
                            <Tab
                                className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0
                                    ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                                    : "text-gray-500 border-b"
                                    }`}
                            >
                                New Order's
                            </Tab>
                        </TabList>
                        <TabPanel className='mt-5'>
                            <Table data={data} columns={columns} />
                        </TabPanel>
                    </Tabs>
                </div> */}
                {/* ===================== New Order Section ===================== */}
                {/* <div className="grid gap-6 p-4 m-4 bg-white rounded-xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
                    {data.map(product => (
                        <NavLink
                            to={`/vendor-orders/order-detail/:${product?.id}`}
                            className="transition-colors duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-xl"
                            previewlistener="true" key={product?.id}
                        >
                            <div className="items-center gap-x-3">
                                <div className="flex flex-wrap justify-between p-4">
                                    <p className="text-sm">
                                        Order Id - <span className="text-sky-400">{product?.orderId}</span>
                                    </p>
                                    <p className="text-sm">
                                        Order Date -{" "}
                                        <span className="text-base font-semibold text-center text-gray-800">
                                            {product?.orderDate}
                                        </span>{" "}
                                    </p>
                                </div>
                                <div className="flex-1 p-4 my-2">
                                    <div className="grid items-center grid-cols-2">
                                        <div className="grid grid-cols-2">
                                            {product?.items?.map(item => (
                                                <div key={item?.name} className="">
                                                    <img
                                                        className="w-16 p-1 border-2 rounded-xl"
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU"
                                                        alt=""
                                                    />
                                                    <div>
                                                        <h2 className="text-sm font-semibold tracking-wide text-gray-800 ">
                                                            Butter Milk x {item?.quantity} more
                                                        </h2>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="col-span-1 mt-1 text-sm font-semibold tracking-wide text-center text-gray-800 ">
                                            Payment - {product?.paymentMethod}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center justify-between p-4 py-3 border-t border-gray-400">
                                    <p className="text-base font-medium">Order Price - $ {product?.orderPrice}</p>
                                    <div className="flex items-center gap-x-2">
                                        <button
                                            type="button"
                                            className={formBtn2}
                                        >
                                            Reject
                                        </button>
                                        <button
                                            type="submit"
                                            className={formBtn1}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}

                </div> */}
            </section>
        </>
    );
};

export default FranchiseeDashboard;
