import Aos from "aos";
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../components/Loader/PreLoader';
import VendorDetails from '../components/Modals/Vendors/VendorDetails';
import Sidebar from '../components/sidebar/Sidebar';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import DashboardView from '../pages/Admin/Dashboard/DashboardView';
import Drivers from '../pages/Admin/Drivers/Drivers';
import Franchisee from '../pages/Admin/Franchisees/Franchisees';
import DashboardAssets from '../pages/Admin/Master/DashboardAssets/DashboardAssets';
import CategoryDetail from '../pages/Admin/Menu/CategoryDetail/CategoryDetail';
import Menu from '../pages/Admin/Menu/Menu';
import Order from '../pages/Admin/Order/Order';
import Reports from '../pages/Admin/Reports/Reports';
import Restaurant from '../pages/Admin/Resturants/Resturant';
import SubAdmin from '../pages/Admin/SubAdmin/SubAdmin';
import SubAdminDetail from '../pages/Admin/SubAdmin/SubAdminDetail';
import User from '../pages/Admin/User/User';
import UserView from '../pages/Admin/User/UserView';
import UserProfile from '../pages/Admin/UserProfile/UserProfile';
import Vendors from '../pages/Admin/Vendors/Vendors';
import Login from '../pages/Auth/Login';
import RestaurantDetail from '../pages/Restaurants/RestaurantDetail/RestaurantDetail';
import VendorDashbaord from '../pages/Seller/VendorDashbaord/VendorDashbaord';
import VendorOrders from '../pages/Seller/VendorOrders/VendorOrders';
import VendorProduct from '../pages/Seller/VendorProduct/VendorProduct';
import Settings from '../pages/Settings/Settings';
// ==================== Franchisee Imports ====================
import Complaints from '../components/Modals/Complaints/Complaints';
import ViewOrder from '../components/Modals/Vendors/ViewOrder';
import DriverDetail from '../pages/Admin/Drivers/DriverDetail';
import FranchiseDetail from '../pages/Admin/Franchisees/FranchiseDetail';
import DashboardBannerPanel from '../pages/Admin/Master/DashboardAssets/DashAssetsPanel/DashboardBannerPanel';
import DashboardPromotions from '../pages/Admin/Master/DashboardPromotions';
import ViewAdminProduct from '../pages/Admin/Menu/AdminProduct/ViewAdminProduct';
import SellerLogin from '../pages/Auth/SellerLogin';
import DeliveryBoy from '../pages/Franchisee/DeliveryBoy';
import FranchiseeDashboard from '../pages/Franchisee/FranchiseeDashboard';
import FranchiseeVendors from '../pages/Franchisee/Vendors/FranchiseeVendors';
// import DashboardForm from '../src/components/modals/DashboardModals/DashboardForm';
import Coupon from '../pages/Admin/Coupon/Coupon';
import FoodDetails from '../pages/Admin/Menu/AdminProduct/FoodDetails';
import RestaurantRegister from '../pages/Restaurants/ViewRestaurant/RestaurantRegister';



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
                                        <Route path="/restaurants" element={<Restaurant />} />
                                        <Route path="/restaurants/restaurant-detail/:id" element={<RestaurantDetail />} />
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
                                            <Route path="/menu" element={<Menu isrestaurant={false} />} />
                                            <Route path="/restaurantmenu" element={<Menu isrestaurant={true} />} />
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