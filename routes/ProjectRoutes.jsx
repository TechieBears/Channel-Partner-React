import { useEffect, useLayoutEffect, useState } from 'react';
import Aos from "aos";
import { Route, Routes } from "react-router-dom";
import Sidebar from '../src/components/Sidebar/Sidebar';
import Preloader from '../src/components/Loader/PreLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardAssets from '../src/pages/Admin/Master/DashboardAssets/DashboardAssets';
import Dashboard from '../src/pages/Admin/Dashboard/Dashboard';
import DashboardView from '../src/pages/Admin/Dashboard/DashboardView';
import User from '../src/pages/Admin/User/User';
import UserView from '../src/pages/Admin/User/UserView';
import UserProfile from '../src/pages/Admin/UserProfile/UserProfile';
import Login from '../src/pages/Auth/Login';
import { useSelector } from 'react-redux';
import VendorDashbaord from '../src/pages/Vendor/VendorDashbaord/VendorDashbaord';
import VendorProduct from '../src/pages/Vendor/VendorProduct/VendorProduct';
import VendorOrders from '../src/pages/Vendor/VendorOrders/VendorOrders';
import Menu from '../src/pages/Admin/Menu/Menu';
import Vendors from '../src/pages/Admin/Vendors/Vendors';
import RestaurantDetail from '../src/pages/Restaurants/RestaurantDetail/RestaurantDetail';
import Drivers from '../src/pages/Admin/Drivers/Drivers';
import Order from '../src/pages/Admin/Order/Order';
import Banner from '../src/pages/Admin/Banner/Banner';
import Promotions from '../src/pages/Admin/Promotions/Promotions';
import DriversView from '../src/pages/Admin/Drivers/DriversView';



const ProjectRoutes = () => {
    const [loading, setLoading] = useState(true);
    const login = useSelector(state => state.user.isLogged)

    // ================ loading ================
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    // ================ Animation initialize ================
    useLayoutEffect(() => {
        Aos.init();
    }, []);

    return (
        <>
            {login ?
                <>
                    {loading ?
                        <Preloader /> :
                        <Sidebar>
                            <Routes>
                                {/* ============ Admin Routes ============ */}
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/vendors" element={<Vendors />} />
                                <Route path="/vendors/restaurant-detail/:id" element={<RestaurantDetail />} />
                                <Route path="/dashboard/:id" element={<DashboardView />} />
                                <Route path="/DashboardAssets" element={<DashboardAssets />} />
                                <Route path="/drivers" element={<Drivers />} />
                                <Route path="/drivers/driversview/:id" element={<DriversView />} />
                                <Route path="/orders" element={<Order />} />
                                <Route path="/banners" element={<Banner />} />
                                <Route path="/promotions" element={<Promotions />} />
                                <Route path="/user" element={<User />} />
                                <Route path="/user/:id" element={<UserView />} />
                                <Route path="/profile" element={<UserProfile />} />

                                {/* ============================================================================== Partner Flexi store Routes =========================================== */}
                                <Route path="/vendorDashbaord" element={<VendorDashbaord />} />
                                <Route path="/vendorProduct" element={<VendorProduct />} />
                                <Route path="/vendorOrders" element={<VendorOrders />} />
                            </Routes>
                        </Sidebar>
                    }
                </>
                :
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            }
            <ToastContainer position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={true}
                theme="light" />
        </>

    )
}

export default ProjectRoutes