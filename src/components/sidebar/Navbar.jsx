import { XMarkIcon } from "@heroicons/react/24/outline";
import greetingTime from "greeting-time";
import {
  ArrowDown2,
  HambergerMenu,
  LogoutCurve,
  NotificationBing,
  Setting2,
  User,
} from "iconsax-react";
import { CalendarDays } from "lucide-react";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import Switch from "react-js-switch";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSingleRestaurant, getSingleShop } from "../../api";
import userImg from "../../assets/user.jpg";
import "../../css/Navbar.css";
import LoginModal from "../Modals/NavbarModals/LoginModal";
import LogoutModal from "../Modals/NavbarModals/LogoutModal";
import SessionModal from "../Modals/NavbarModals/SessionModal";

const Navbar = ({ mobileSidebar, setMobileSidebar }) => {
  const user = useSelector((state) => state?.user?.loggedUserDetails);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [card, setCard] = useState(true);
  const sessionStarted = useSelector(state => state.session.isSessionStarted)
  const [sessionModal, setSessionModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  // ============================= logout user dashbaord ================================
  const logOut = () => {
    setOpen(!open);
    setCard(!card);
  };

  const loginFunc = () => {
    setLoginModal(!loginModal)
  }

  const getRestaurantDetails = () => {
    try {
      getSingleRestaurant(user?.sellerId).then((res) => {
        setData(res);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getShopDetails = () => {
    try {
      getSingleShop(user?.userid).then(res => {
        setData(res[0]);
      })
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    if (user?.role == 'seller' && sessionStarted == false) {
      setSessionModal(true);
    }
    if (user?.role == 'seller' && user?.vendor_type == 'restaurant') {
      getRestaurantDetails();
    } else if (user?.role == 'seller' && user?.vendor_type == 'shop') {
      getShopDetails();
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-5 py-5 pt-24 pb-0 sm:px-6 sm:pt-4 sm:pb-5">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold font-tb md:text-2xl lg:text-2xl whitespace-nowrap ">
          {greetingTime(new Date())},{" "}
          {user?.role == "admin" ? (
            <span className="capitalize text-sky-400">{user?.first_name}</span>
          ) : (
            <span className="capitalize text-sky-400">
              {user?.vendor_type == "restaurant" ? data?.vendor?.shop_name
                : user?.vendor_type == "shop" ? data?.shop_name : null}
            </span>
          )}
        </h2>
        <div className="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 ">
          <div className="flex items-center mt-2 text-base font-semibold text-gray-500 font-tbPop">
            <CalendarDays className="mr-1.5 text-slate-400" size={22} />
            {moment().format("dddd , DD MMMM YYYY")}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-center lg:justify-start bg-white fixed top-0 right-0 py-4 px-4 sm:rounded-bl-[2rem] z-50 md:px-3 w-full md:w-[14rem] lg:w-[24rem] xl:w-[22rem] ">
        {user?.role == 'seller' && user?.is_registered == true ? <Switch
          value={sessionStarted}
          // disabled={true}
          size={50}
          onChange={loginFunc}
          backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
          borderColor={{ on: '#86d993', off: '#c6c6c6' }}
        /> : null}
        <button
          className="relative shadow-none xl:hidden "
          onClick={() => setMobileSidebar(!mobileSidebar)}
        >
          {mobileSidebar ? (
            <XMarkIcon className="w-8 h-8 text-gray-500" />
          ) : (
            <HambergerMenu size={30} className="text-gray-500" />
          )}
        </button>
        <div className="flex item-center">
          <button className="relative px-7">
            <span className="absolute flex top-0 right-6 h-3.5 w-3.5">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
            </span>
            <NotificationBing size="30" />
          </button>
          <div className="flex items-center" onClick={() => setCard(!card)}>
            <div className="flex-shrink-0">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={user?.profile_pic != "" ? user?.profile_pic : userImg}
                alt="user"
              />
            </div>
            <div className="hidden w-full ml-3 space-y-1 lg:block">
              <h4 className="text-base font-semibold leading-none font-tb whitespace-nowrap text-slate-800">
                {user?.first_name +
                  " " +
                  (user?.last_name?.length > 5
                    ? user?.last_name?.slice(0, 5) + "..."
                    : user?.last_name)}
              </h4>
              <h4 className="text-[12px] font-medium leading-none capitalize text-gray-500 pt-0.5 ">
                {user?.role == "admin"
                  ? "Admin"
                  : user?.role == "seller"
                    ? user?.vendor_type
                    : user?.role == "franchise"
                      ? "Franchise"
                      : ""}
              </h4>
            </div>

            <button className="hidden px-3 lg:block ">
              <ArrowDown2
                size={22}
                className={`text-slate-400 duration-700 ease-in-out transition-all ${!card ? "-rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${card ? "-top-96 opacity-0" : "top-20 opacity-100"
          } bg-white  transition-all ease-in-out duration-700 fixed shadow-sm border right-6 py-2 rounded-lg z-20 px-4 lg:px-6 lg:py-1`}
      >
        <div className="flex items-center pb-3 border-b border-slate-200 lg:hidden">
          <div className="flex-shrink-0">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={user?.profile_pic != "" ? user?.profile_pic : userImg}
              alt="user"
            />
          </div>
          <div className="ml-3 space-y-1">
            <h4 className="text-sm font-semibold leading-none md:text-base font-tb text-slate-800">
              {user?.first_name + " " + user?.last_name}
            </h4>
            <h4 className="text-sm font-medium leading-none text-gray-400 capitalize md:text-base">
              {user?.role}
            </h4>
          </div>
        </div>
        <div className="p-2 pb-0">
          <NavLink
            to={"/profile"}
            onClick={() => setCard(!card)}
            className="flex items-center pb-2 space-x-2 transition-all duration-700 group"
          >
            <User
              size={22}
              className="text-gray-700 group-hover:text-sky-400"
            />
            <h4 className="text-sm font-semibold capitalize font-tbPop lg:text-lg md:text-base group-hover:text-sky-400 text-slate-700">
              Profile
            </h4>
          </NavLink>
          <NavLink className="flex items-center pb-2 space-x-2 transition-all duration-700 group">
            <Setting2
              size={22}
              onClick={() => setCard(!card)}
              className="text-gray-700 group-hover:text-sky-400"
            />
            <h4 className="text-sm font-semibold capitalize font-tbPop lg:text-lg md:text-base group-hover:text-sky-400 text-slate-700">
              Setting
            </h4>
          </NavLink>
          <button
            onClick={logOut}
            className="flex items-center pb-2 space-x-2 group"
          >
            <LogoutCurve
              size={20}
              className="text-gray-700 group-hover:text-red-500"
            />
            <h4 className="text-sm font-semibold capitalize font-tb lg:text-lg md:text-base group-hover:text-red-500 text-slate-700">
              logout
            </h4>
          </button>
        </div>
      </div>
      <LogoutModal setOpen={setOpen} open={open} />
      <LoginModal setOpen={setLoginModal} open={loginModal} id={user?.sellerId} />
      <SessionModal setOpen={setSessionModal} open={sessionModal} />
    </div>
  );
};

export default Navbar;
