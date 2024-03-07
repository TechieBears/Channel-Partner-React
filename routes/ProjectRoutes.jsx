import { useEffect, useLayoutEffect, useState } from 'react';
import Aos from "aos";
import { Route, Routes } from "react-router-dom";
import Sidebar from '../src/components/sidebar/Sidebar';
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
import VendorDashbaord from '../src/pages/Seller/VendorDashbaord/VendorDashbaord';
import VendorProduct from '../src/pages/Seller/VendorProduct/VendorProduct';
import VendorOrders from '../src/pages/Seller/VendorOrders/VendorOrders';
import Menu from '../src/pages/Admin/Menu/Menu';
import RestaurantDetail from '../src/pages/Restaurants/RestaurantDetail/RestaurantDetail';
import Drivers from '../src/pages/Admin/Drivers/Drivers';
import Order from '../src/pages/Admin/Order/Order';
import Reports from '../src/pages/Admin/Reports/Reports';
import CategoryDetail from '../src/pages/Admin/Menu/CategoryDetail/CategoryDetail';
import SubAdmin from '../src/pages/Admin/SubAdmin/SubAdmin';
import Restaurant from '../src/pages/Admin/Resturants/Resturant';
import Vendors from '../src/pages/Admin/Vendors/Vendors';
import VendorDetails from '../src/components/Modals/Vendors/VendorDetails';
import Promotions from '../src/pages/Admin/Promotion/Promotions';
import Settings from '../src/pages/Settings/Settings';
import SubAdminDetail from '../src/pages/Admin/SubAdmin/SubAdminDetail';
import Franchisee from '../src/pages/Admin/Franchisees/Franchisees'
// ==================== Franchisee Imports ====================
import FranchiseeDashboard from '../src/pages/Franchisee/FranchiseeDashboard';
import FranchiseeOrder from '../src/pages/Franchisee/FranchiseeOrder';
import FranchiseeVendors from '../src/pages/Franchisee/Vendors/FranchiseeVendors';
import DeliveryBoy from '../src/pages/Franchisee/DeliveryBoy';
import SellerLogin from '../src/pages/Auth/SellerLogin';
import ViewOrder from '../src/components/Modals/Vendors/ViewOrder';
import ViewProduct from '../src/components/Modals/Vendors/ViewProduct';
import Complaints from '../src/components/Modals/Complaints/Complaints';
import FranchiseDetail from '../src/pages/Admin/Franchisees/FranchiseDetail';
import DriverDetail from '../src/pages/Admin/Drivers/DriverDetail';
import ViewAdminProduct from '../src/pages/Admin/Menu/AdminProduct/ViewAdminProduct';
import DashboardBannerPanel from '../src/pages/Admin/Master/DashboardAssets/DashAssetsPanel/DashboardBannerPanel';
import DashboardPromotions from '../src/pages/Admin/Master/DashboardPromotions';
// import DashboardForm from '../src/components/modals/DashboardModals/DashboardForm';
import Coupon from '../src/pages/Admin/Coupon/Coupon';
import RestaurantRegister from '../src/pages/Restaurants/ViewRestaurant/RestaurantRegister';
import FoodDetails from '../src/pages/Admin/Menu/AdminProduct/FoodDetails';



const ProjectRoutes = () => {
    const [loading, setLoading] = useState(true);
    const login = useSelector(state => state.user.isLogged)
    const user = useSelector(state => state?.user?.loggedUserDetails);

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
                                {user?.role == 'admin' ?
                                    <>
                                        <Route path="/admin" element={<Dashboard />} />
                                        <Route path="/menu" element={<Menu isrestaurant={false} />} />
                                        <Route path="/restaurantmenu" element={<Menu isrestaurant={true} />} />
                                        <Route path='/product-list/product-details/:id' element={<ViewAdminProduct />} />
                                        <Route path='/food-list/food-details/:id' element={<FoodDetails />} />
                                        <Route path="/resturants" element={<Restaurant />} />
                                        <Route path="/resturants/restaurant-detail/:id" element={<RestaurantDetail />} />
                                        <Route path="/franchisee" element={<Franchisee />} />
                                        <Route path="/franchise/franchise-detail/:id" element={<FranchiseDetail />} />
                                        <Route path="/vendors" element={<Vendors />} />
                                        <Route path="/vendors/vendors-detail/:id" element={<VendorDetails />} />
                                        <Route path="/menu/category-detail/:id" element={<CategoryDetail />} />
                                        <Route path="/dashboard/:id" element={<DashboardView />} />
                                        <Route path="/coupon" element={<Coupon />} />
                                        <Route path="/DashboardAssets" element={<DashboardAssets />} />
                                        <Route path="/promotions" element={<DashboardPromotions />} />
                                        <Route path="/drivers" element={<Drivers />} />
                                        <Route path="/drivers/driver-detail/:id" element={<DriverDetail />} />
                                        <Route path="/orders" element={<Order />} />
                                        <Route path="/banners" element={<DashboardBannerPanel />} />
                                        <Route path="/user" element={<User />} />
                                        <Route path="/user/:id" element={<UserView />} />
                                        <Route path="/profile" element={<UserProfile />} />
                                        <Route path="/reports" element={<Reports />} />
                                        <Route path="/subadmin" element={<SubAdmin />} />
                                        <Route path="/subadmin/subadmin-detail/:id" element={<SubAdminDetail />} />
                                        <Route path="/settings" element={<Settings />} />
                                    </> :
                                    user?.role == 'seller' ?
                                        <>
                                            <Route path='/' element={<VendorDashbaord />} />
                                            <Route path='/register' element={<RestaurantRegister />} />
                                            <Route path="/profile" element={<UserProfile />} />
                                            <Route path='/menu' element={<Menu />} />
                                            <Route path='/vendor-orders' element={<VendorOrders />} />
                                            <Route path='/vendor-orders/order-detail/:id' element={<ViewOrder />} />
                                            <Route path='/product-list' element={<VendorProduct />} />
                                            <Route path='/food-list/food-details/:id' element={<FoodDetails />} />
                                            <Route path='/complaints' element={<Complaints />} />
                                        </> :
                                        user?.role == 'franchise' ? <>
                                            <Route path='/admin' element={<FranchiseeDashboard />} />
                                            <Route path="/profile" element={<UserProfile />} />
                                            <Route path='/analytics' element={<FranchiseeDashboard />} />
                                            <Route path='/menu' element={<Menu />} />
                                            <Route path='/orders' element={<Order />} />
                                            <Route path='/vendors' element={<FranchiseeVendors />} />
                                            <Route path="/vendors/vendors-detail/:id" element={<VendorDetails />} />
                                            <Route path='/resturants' element={<Restaurant />} />
                                            <Route path='/resturants/restaurant-detail/:id' element={<RestaurantDetail />} />
                                            <Route path='/delivery' element={<DeliveryBoy />} />
                                            <Route path="/drivers/driver-detail/:id" element={<DriverDetail />} />
                                        </> :
                                            user?.role == 'restaurant' ?
                                                <>
                                                    <Route path='/' element={<VendorDashbaord />} />
                                                </> : ''}
                            </Routes>
                        </Sidebar>
                    }
                </>
                :
                <Routes>
                    <Route path="/admin" element={<Login />} />
                    <Route path="/" element={<SellerLogin />} />
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