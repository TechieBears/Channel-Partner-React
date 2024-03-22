import { Handshake, PersonSimpleBike } from "@phosphor-icons/react";
import { ArrowSwapVertical, Box, Category, Eye, NotificationBing, ShoppingCart, Timer, Trash, UserRemove, UserTick } from "iconsax-react";
import React, { useState } from "react";
// import { Bike, Handshake } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../../../components/Modals/DeleteModal/DeleteModal";
import DashboardForm from "../../../components/modals/DashboardModals/DashboardForm";


const Dashboard = () => {
  const categoryCount = useSelector((state) => state?.master?.CategoryCount);
  const subCategoryCount = useSelector((state) => state?.master?.SubCategoryCount);
  const productCount = useSelector((state) => state?.master?.ProductCount);
  const user = useSelector((state) => state.user.loggedUserDetails);
  const storages = useSelector((state) => state?.storage?.list);
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
        StorageList();
        toast.success(form?.message);
        setOpen(!open);
      }
    });
  };
  // ======================== table action =========================
  const actionBodyTemplate = (row) => (
    <div className="flex items-center gap-2">
      <NavLink
        to={`/storage/${row.id}`}
        className="bg-green-100 px-1.5 py-2 rounded-sm"
      >
        <Eye size="20" className="text-green-500" />
      </NavLink>
      <DashboardForm
        button="edit"
        title="Edit Stroage"
        data={row}
        StorageList={StorageList}
      />
      <button
        onClick={() => toggleModalBtn(row.id)}
        id={row.ID}
        className="bg-red-100  px-1.5 py-2 rounded-sm"
      >
        <Trash size="20" className="text-red-500" />
      </button>
    </div>
  );

  // ====================== table columns ======================
  const columns = [
    { field: "name", header: "Name" },
    { field: "location", header: "City" },
    { field: "rating", header: "Rating" },
    { field: "spoc_name", header: "SPOC Name" },
    { field: "spoc_contact", header: "SPOC Contact" },
    { field: "spoc_email", header: "SPOC Email" },
    { field: "id", header: "Action", body: actionBodyTemplate, sortable: true },
  ];


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
        <div className="grid grid-cols-1 p-4 sm:m-5 rounded-xl sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-y-4 ">
          <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70 ">
            <div className="p-3.5 rounded-xl bg-sky-50">
              <ShoppingCart size={26} className="text-sky-400" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-gray-500 font-tb">
                Delivered Orders
              </h6>
              <h6 className="text-base font-semibold text-sky-400 font-tb">
                980
              </h6>
            </div>
          </div>
          <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70">
            <div className="p-3.5 rounded-xl bg-orange-50">
              <Timer size={26} className="text-orange-400" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-gray-500 font-tb">Pending Orders</h6>
              <h6 className="text-base font-semibold text-orange-400 font-tb">
                15
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
            <div className="p-3.5 rounded-xl bg-orange-50">
              <UserRemove size={26} className="text-red-500" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-gray-500 font-tb">
                Customer Cancelled Orders
              </h6>
              <h6 className="text-base font-semibold text-red-500 font-tb">
                70
              </h6>
            </div>
          </div>
          <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70 ">
            <div className="p-3.5 rounded-xl bg-purple-50">
              <PersonSimpleBike size={26} className="text-purple-600" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-purple-600 font-tb">
                Drivers
              </h6>
              <h6 className="text-base font-semibold text-purple-600 font-tb">
                {/* {deliveryBoysCount?.length} */}
                20
              </h6>
            </div>
          </div>
          <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70">
            <div className="p-3.5 rounded-xl bg-orange-50">
              <Category size={26} className="text-orange-400" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-gray-500 font-tb">Categories</h6>
              <h6 className="text-base font-semibold text-orange-400 font-tb">
                {categoryCount}
              </h6>
            </div>
          </div>
          <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl md:border-r border-gray-200/70">
            <div className="p-3.5 rounded-xl bg-sky-50">
              <Box size={26} className="text-purple-600" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-gray-500 font-tb">Products</h6>
              <h6 className="text-base font-semibold text-purple-600 font-tb">
                {productCount}
              </h6>
            </div>
          </div>
          <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl md:border-r border-gray-200/70">
            <div className="p-3.5 rounded-xl bg-red-50">
              <NotificationBing size={26} className="text-red-500" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-gray-500 font-tb">Promotions</h6>
              <h6 className="text-base font-semibold text-red-500 font-tb">
                19
              </h6>
            </div>
          </div>
          <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70 ">
            <div className="p-3.5 rounded-xl bg-sky-50">
              <Handshake size={26} className="text-sky-400" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-gray-500 font-tb">
                Franchisee
              </h6>
              <h6 className="text-base font-semibold text-sky-400 font-tb">
                980
              </h6>
            </div>
          </div>

          <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70">
            <div className="p-3.5 rounded-xl bg-sky-50">
              <UserTick size={26} className="text-sky-600" />
            </div>
            <div className="space-y-1">
              <h6 className="text-sm text-gray-500 font-tb">Vendors</h6>
              <h6 className="text-base font-semibold text-sky-400 font-tb">
                55
              </h6>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Dashboard;
