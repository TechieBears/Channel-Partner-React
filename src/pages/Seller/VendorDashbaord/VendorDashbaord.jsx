import React, { useEffect, useState } from "react";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import Table from "../../../components/Table/Table";
import {
    ArrowSwapVertical,
    Eye,
    ShoppingCart,
    Trash,
    UserRemove,
    ClipboardTick,
    Edit,
} from "iconsax-react";
import { deleteStorage, getPartnerStorage, getStorages } from "../../../api";
import { formBtn2, inputClass } from "../../../utils/CustomClass";
import { formBtn1 } from "../../../utils/CustomClass";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { environment } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import { setStorageList } from "../../../redux/slices/storageSlice";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import DashboardForm from "../../../components/modals/DashboardModals/DashboardForm";
import DeleteModal from "../../../components/Modals/DeleteModal/DeleteModal";
import ActiveOrders from "../../Admin/Dashboard/OrderList/ActiveOrders";
import PendingOrders from "../../Admin/Dashboard/OrderList/PendingOrders";
import moment from "moment";
import ViewProduct from "../../../components/Modals/Vendors/ViewProduct";




const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const user = useSelector((state) => state.user.loggedUserDetails);
    const storages = useSelector((state) => state?.storage?.list);
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

    const StorageList = () => {
        if (user.role == "admin") {
            getStorages()
                .then((res) => {
                    console.log(res);
                    dispatch(setStorageList(res));
                })
                .catch((err) => {
                    console.error("Error", err);
                });
        } else {
            getPartnerStorage(user?.userid)
                .then((res) => {
                    dispatch(setStorageList(res));
                })
                .catch((err) => {
                    console.error("Error", err);
                });
        }
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
        StorageList();
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
                StorageList();
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
                    "itemName": "Butter Milk",
                    "itemDescription": "Lorem ipsum dolor, sit amet",
                    "imageSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU",
                    "quantity": 2,
                    'price': 50,
                    'category': 'dairy'
                }
            ],
            "orderPrice": "$1,000",
            "paymentMethod": "Cash",
            "location": 'Parel',

        },
        {
            "orderId": 754,
            "orderDate": "Jan 2, 2024 , 10:30 AM",
            "items": [
                {
                    "itemName": "Coffee",
                    "itemDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "imageSrc": "https://example.com/coffee.jpg",
                    "quantity": 2,
                    'price': 20,
                    'category': 'grocery'
                },
                {
                    "itemName": "Croissant",
                    "itemDescription": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                    "imageSrc": "https://example.com/croissant.jpg",
                    "quantity": 2,
                    'price': 200,
                    'category': 'food'
                }
            ],
            "orderPrice": "$25",
            "paymentMethod": "UPI",
            "location": 'Thane',
        }
    ]

    const name = (row) => row?.items?.map(item => <h6 key={item?.itemName}>{item?.itemName}</h6>);
    const quantity = (row) => row?.items?.map(item => <h6 key={item?.itemQuantity}>{item?.quantity}</h6>)
    const description = (row) => row?.items?.map(item => <h6 className="w-52" key={item?.itemDescription}>{item?.itemDescription}</h6>)
    const itemPrice = (row) => row?.items?.map(item => <h6 key={item?.price}>{item?.price}</h6>)
    const category = (row) => row?.items?.map(item => <h6 key={item?.category}>{item?.category}</h6>)
    const action = (row) => <div className="flex space-x-1 items-center">
        <ViewProduct product={row} title='Order Details' />
        <div className="bg-green-50 p-1 rounded-xl cursor-pointer">
            <ClipboardTick size={20} color="green" />
        </div>
        <div className="bg-red-50 p-1 rounded-xl cursor-pointer">
            <Trash size={20} color="red" />
        </div>
    </div>


    const columns = [
        { field: "orderId", header: "Order ID" },
        { field: "OrderDate", header: "Order Date", body: (row) => <h6>{moment(row?.orderDate).format('MMM Do YY')}</h6>, sortable: true },
        { field: "name", header: "Name", body: name, sortable: true },
        { field: "quantity", header: "Quantity", body: quantity, sortable: true },
        { field: "description", header: "Description", body: description, sortable: true },
        { field: "paymentMethod", header: "Payment Method", sortable: true },
        { field: "price", header: "Price", body: itemPrice, sortable: true },
        { field: "category", header: "Category", body: category, sortable: true },
        { field: "location", header: "Location", sortable: true },
        { field: "orderPrice", header: "Total Price", sortable: true },
        { field: "action", header: "Action", body: action, sortable: true },
    ];

    useEffect(() => {
        StorageList();
    }, []);

    const [activeTab, setActiveTab] = useState(1);

    const changeTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };

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
                <div className="mx-auto mt-8 sm:m-5">
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
                        {/* ================= NewPending Orders component ============== */}
                        <TabPanel className='mt-5'>
                            <Table data={data} columns={columns} />
                        </TabPanel>
                    </Tabs>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
