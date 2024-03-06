import { Add, Eye, Refresh, SearchNormal } from "iconsax-react";
import React, { useEffect, useState } from "react";
import Table from "../../../components/Table/Table";
import AddRestaurant from "../../../components/Modals/Resturant/AddRestaurant";
import { NavLink } from "react-router-dom";
import Switch from "react-js-switch";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useSelector } from "react-redux";
import { getRestarant, verifyVendors, getFranchRestaurant } from "../../../api";
import { useForm } from "react-hook-form";
import userImg from "../../../assets/user.jpg";
import {
  formBtn1,
  formBtn2,
  inputClass,
  tableBtn,
} from "../../../utils/CustomClass";
import axios from "axios";
import AddItem from "../../../components/Modals/Resturant/AddItem";
import { toast } from "react-toastify";

export default function Restaurant() {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state?.user?.loggedUserDetails);
  console.log('user', user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  // ============== Fetch All Admin Restaurants  ================
  const getAllRestaurant = () => {
    getRestarant().then((res) => {
      const restaurantVendors = res.filter(
        (item) => item?.vendor_type == "restaurant"
      );
      setData(restaurantVendors);
    });
  };

  // ============== Fetch Franchisee Restaurant  ================
  const getFranchiseRestaurants = () => {
    try {
       getFranchRestaurant(user?.userid).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.role == "admin") {
      getAllRestaurant();
    }
    if (user?.role == "franchise") {
      getFranchiseRestaurants();
    }
  }, []);

  // =================== filter data ========================
  const onSubmit = async (data) => {
    if (
      data?.name != "" ||
      data?.email != "" ||
      data?.city != "" ||
      data?.role != ""
    ) {
      let url = `${environment.baseUrl}user-filter/?first_name=${data?.name}&email=${data?.email}&city=${data?.city}&role=${data?.role}`;
      await axios.get(url).then((res) => {
        dispatch(setUserList(res.data));
        toast.success("Filters applied successfully");
      });
    } else {
      toast.warn("No Selected Value !");
    }
  };

  const verifyActions = (row) => {
    const payload = {
      userId: row?.user?.id,
      isverifiedbyadmin: !row?.user?.isverified_byadmin,
      isverifiedbyfranchise: row?.isverifiedbyfranchise,
    };
    try {
      verifyVendors(payload).then((form) => {
        console.log(payload);
        if (form.message == "seller verified Successfully") {
          toast.success("Restaurant Verification Changed !");
          getAllRestaurant();
        } else {
          console.log("err");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // =============================== active user switch =============================
  const switchActive = (row) => {
    return (
      <div className="flex items-center justify-center gap-2">
        <Switch
          value={row?.isverifiedbyfranchise}
          disabled={true}
          // onChange={() => activeActions(row)}
          size={50}
          backgroundColor={{ on: "#86d993", off: "#c6c6c6" }}
          borderColor={{ on: "#86d993", off: "#c6c6c6" }}
        />
      </div>
    );
  };

  // =============================== verify user switch =============================
  const switchVerify = (row) => {
    return (
      <div className="flex items-center justify-center gap-2 ">
        <Switch
          value={row?.user?.isverified_byadmin}
          onChange={() => verifyActions(row)}
          size={50}
          backgroundColor={{ on: "#86d993", off: "#c6c6c6" }}
          borderColor={{ on: "#86d993", off: "#c6c6c6" }}
        />
      </div>
    );
  };

  // =================== table action ========================
  const actionBodyTemplate = (row) => (
    <div className="flex items-center gap-2">
      <NavLink
        to={`/resturants/restaurant-detail/${row?.vendor_id}`}
        state={row}
        className="bg-green-100 px-1.5 py-1 rounded-lg"
      >
        <Eye size="20" className="text-green-500" />
      </NavLink>
      <AddRestaurant
        button="edit"
        title="Edit User"
        id={row?.user?.id}
        data={row}
        getAllRestaurant={getAllRestaurant}
      />
    </div>
  );

  // =================== table user verify column  ========================
  const activeActionsRole = (rowData) => (
    <h6
      className={`${
        rowData?.isactive !== "false"
          ? "bg-green-100 text-green-500"
          : "bg-red-100 text-red-500"
      } py-2 px-5 text-center capitalize rounded-full`}
    >
      {rowData?.isactive !== "false" ? "Active" : "Inactive"}
    </h6>
  );

  /*================================     column    ========================= */

  const action = (row) => (
    <div className="flex items-center gap-2">
      <NavLink
        to={`/resturants/restaurant-detail/${row?.vendor_id}`}
        state={row}
        className="bg-green-100 px-1.5 py-1 rounded-lg"
      >
        <Eye size="20" className="text-green-500" />
      </NavLink>
      <AddRestaurant
        button="edit"
        title="Edit User"
        id={row?.user?.id}
        data={row}
        getAllRestaurant={getAllRestaurant}
      />
    </div>
  );

  const columns = [
    {
      field: "id",
      header: "ID",
      body: (row) => <h6>{row?.user?.id}</h6>,
      sortable: false,
    },
    { field: "msb_code", header: "MSB", sortable: false },
    {
      field: "shop_name",
      header: "Restaurant Name",
      body: (row) => (
        <h6>
          {row?.shop_name == null ? "Registration Pending" : row?.shop_name}
        </h6>
      ),
    },
    {
      field: "shop_contact_number",
      header: "Restaurant Contact",
      body: (row) => (
        <h6>
          {row?.shop_contact_number == null
            ? "Registration Pending"
            : row?.shop_contact_number}
        </h6>
      ),
    },
    {
      field: "first_name",
      header: "Owner Name",
      body: (row) => (
        <div className="capitalize">
          {row?.user?.first_name + " " + row?.user?.last_name}
        </div>
      ),
    },
    {
      field: "phone_no",
      header: "Owner Phone No",
      body: (row) => <h6>{row?.user?.phone_no}</h6>,
      sortable: false,
    },
    {
      field: "email",
      header: "Email",
      body: (row) => <h6>{row?.user?.email}</h6>,
      sortable: false,
    },
    {
      field: "insta_commison_percentage",
      header: "Comission(%)",
      body: (row) => <h6>{row?.insta_commison_percentage}%</h6>,
      sortable: false,
    },
    {
      field: "pincode",
      header: "Pincode",
      body: (row) => <h6>{row?.user?.pincode}</h6>,
      sortable: false,
    },
    {
      field: "state",
      header: "state",
      body: (row) => <h6>{row?.user?.state}</h6>,
      sortable: false,
    },
    {
      field: "city",
      header: "city",
      body: (row) => <h6>{row?.user?.city}</h6>,
      sortable: false,
    },
    {
      field: "registration_date",
      header: "Registration Date",
      body: (row) => <h6>{row?.user?.registration_date}</h6>,
      sortable: false,
    },
    {
      field: "status",
      header: "Status",
      body: activeActionsRole,
      sortable: false,
    },
    { field: "id", header: "Action", body: actionBodyTemplate, sortable: true },
    {
      field: "isactive",
      header: "Franchise Verify",
      body: switchActive,
      sortable: true,
    },
    {
      field: "isverify",
      header: "Admin Verify",
      body: switchVerify,
      sortable: true,
    },
  ];

  return (
    <>
      {/* ========================= user filter ======================= */}
      <div className="p-4 bg-white sm:m-5 rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:items-center lg:flex-row"
        >
          <div className="grid w-full grid-cols-1 sm:grid-cols-4 gap-y-3 gap-x-2">
            <div className="">
              <input
                type="text"
                placeholder="Search by name"
                autoComplete="off"
                className={`${inputClass} !bg-slate-100`}
                {...register("name")}
              />
            </div>
            <div className="">
              <input
                type="text"
                placeholder="Search by email"
                autoComplete="off"
                className={`${inputClass} !bg-slate-100`}
                {...register("email")}
              />
            </div>
            <div className="">
              <select
                name="City"
                className={`${inputClass} !bg-slate-100`}
                {...register("role")}
              >
                <option value="">Select by Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="provider">Provider</option>
              </select>
            </div>
            <div className="">
              <select
                name="City"
                className={`${inputClass} !bg-slate-100`}
                {...register("city")}
              >
                <option value="">Select by city name</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button type="submit" className={`${formBtn1} w-full text-center`}>
              Filter
            </button>
            <button
              type="button"
              className={`${formBtn2} w-full text-center`}
              onClick={() => {
                reset(),
                  toast.success("Filters clear successfully"),
                  fetchData();
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      {/* ========================= user filter ======================= */}

      {/*====================== User Table ================================*/}
      <div className="p-4 bg-white sm:m-5 rounded-xl">
        <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:space-y-0">
          <div className="">
            <h1 className="text-xl font-semibold text-gray-900 font-tbPop">
              {" "}
              Restaurant Details
            </h1>
          </div>
          <AddRestaurant
            title="Add Restaurant"
            getAllRestaurant={getAllRestaurant}
            id={user?.userid}
          />

          {/* <AddItem title='Add Item' /> */}
        </div>
        {<Table columns={columns} data={data} />}
      </div>
      {/*====================== User Table ================================*/}
    </>
  );
}
