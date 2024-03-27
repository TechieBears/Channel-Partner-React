import {
    ArrowSwapVertical,
    ClipboardTick,
    ShoppingCart,
    UserRemove
} from "iconsax-react";
import React, { useEffect, useState } from "react";
// import { deleteStorage, getPartnerStorage, getStorages } from "../../../api";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import Orders from "../../../components/Cards/Orders/Orders";
import OrdersCard from "../../../components/Cards/Orders/OrdersCard";
import DashboardForm from "../../../components/Modals/DashboardModals/DashboardForm";
import DeleteModal from "../../../components/Modals/DeleteModal/DeleteModal";
import { formBtn1, formBtn2, inputClass } from "../../../utils/CustomClass";




const Dashboard = () => {
    const [modelOpen, setAddCouponOpen] = useState(true);
    const user = useSelector((state) => state.user.loggedUserDetails);
    const [open, setOpen] = React.useState(false);
    const [delId, setDelId] = React.useState(0);
    const orders = useSelector(state => state?.orders?.newOrders);
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
    useEffect(() => { }, [orders])
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
                                <select
                                    className={`${inputClass} !bg-slate-100`}
                                    {...register('order_id')}
                                >
                                    <option value=''>Select Status</option>
                                    <option value='pending'>Pending</option>
                                    <option value='accepted'>Accepted</option>
                                    <option value='rejected'>Rejected</option>
                                    <option value='prepering'>Prepering</option>
                                </select>
                            </div>
                            <div className="">
                                <input className={`${inputClass} !bg-slate-100`}
                                    {...register('order_id')}
                                    placeholder="Search By Order ID"
                                />
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
                <div className="p-4 space-y-2 bg-white m-4">
                    <div className="flex items-center justify-between pb-1">
                        <p className="text-lg font-semibold">Current Orders</p>
                        <form className="flex gap-4">
                            <input
                                className={`${inputClass} !bg-slate-100 w-fit`}
                                placeholder="Enter OTP"
                            />
                            <button
                                type="button"
                                className={`${formBtn1} w-fit text-center`}
                            >Submit</button>
                            <button
                                className={`${formBtn2} w-fit text-center`}
                                type="button"
                            >Clear</button>
                        </form>
                    </div>
                    {
                        orders?.length != 0 ? orders?.map(data => (
                            <OrdersCard data={data} />
                        )) : 'No Orders For Today'
                    }
                </div>
            </section>
        </>
    );
};

export default Dashboard;
