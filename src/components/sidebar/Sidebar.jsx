import { DirectLeft } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFranchRestaurant, getRestarant, getSingleShop, startSession } from '../../api';
import logoImg from '../../assets/logo_white.png';
import { environment } from '../../env';
import { setSessionStarted } from '../../redux/Slices/SessionSlice';
import { setOrders } from '../../redux/Slices/orderSlice';
import { setAllRestaurant } from '../../redux/Slices/restauantSlice';
import Navbar from './Navbar';
import { Admin, Franchise, Seller } from './SidebarApi';
import SidebarLink from './SidebarLink';

const Sidebar = ({ children }) => {
    const user = useSelector(state => state?.user?.loggedUserDetails)
    const WebSocketUrl = `${environment.webSocketUrl}user_to_seller/${user?.msb_code}`;
    const ws = new WebSocket(WebSocketUrl)
    const [isActiveLink, setIsActiveLink] = useState(false);
    const [mobileSidebar, setMobileSidebar] = useState(false);
    const dispatch = useDispatch()
    const sessionStatus = useSelector(state => state.session.isSessionStarted)
    const timeoutId = useRef(null);
    const logoutTimeoutId = useRef(null);
    useEffect(() => {
        if (user?.role == 'seller' || user?.role == 'shop') {
            ws.open = () => {
                console.log('WebSocket Client Connected');
            };
            ws.onerror = (e) => {
                console.log(e.message);
            };
            ws.onmessage = (e) => {
                const data = JSON.parse(e.data);
                window.alert(data?.orderId)
                dispatch(setOrders(data))
            };
        }
        else {
            ws.close();
        }

    }, [ws])

    useEffect(() => {
        if (user?.role == 'seller') {
            const handleMouseMove = () => {
                // Clear the previous timeouts if they exist
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current);
                }
                if (logoutTimeoutId.current) {
                    clearTimeout(logoutTimeoutId.current);
                }

                // Set a new timeout
                if (sessionStatus == true) {
                    timeoutId.current = setTimeout(() => {
                        const data = {
                            'vendorID': user?.sellerId,
                            'isshopopen': false,
                        }
                        try {
                            startSession(data).then(res => {
                                if (res?.status == 'success') {
                                    dispatch(setSessionStarted(false))
                                }
                            })
                        } catch (error) {
                            console.log('error', error);
                        }
                        alert('Your session has expired dues to 30 sec inactivity please start your session to get orders.')
                    }, 30 * 1000);
                } // 30 seconds
            };

            // Add the event listener
            window.addEventListener('mousemove', handleMouseMove);

            // Cleanup function
            return () => {
                // Remove the event listener
                window.removeEventListener('mousemove', handleMouseMove);

                // Clear the timeouts
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current);
                }
                if (logoutTimeoutId.current) {
                    clearTimeout(logoutTimeoutId.current);
                }
            };
        }
    }, []);

    // ================== Restaurants API =================

    const getAllRestaurant = () => {
        try {
            getRestarant().then((res) => {
                if (Array.isArray(res)) {
                    const restaurantVendors = res.filter(
                        (item) => item?.vendor_type == "restaurant"
                    );
                    dispatch(setAllRestaurant(restaurantVendors))
                    // setData(restaurantVendors);
                }
            });
        } catch (error) {
            console.log('error', error);
        }
    };

    const getFranchiseRestaurants = () => {
        try {
            getFranchRestaurant(user?.userid).then((res) => {
                dispatch(setAllRestaurant(res))
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user?.role == 'admin') {
            getAllRestaurant();
        } else if (user?.role == 'franchise') {
            getFranchiseRestaurants();
        }
    }, [])

    return (
        <>
            <div className="flex w-full h-screen ">
                {mobileSidebar && <div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-screen bg-gray-600/20" onClick={() => setMobileSidebar(!mobileSidebar)} />}
                {/* ====================== sidebar start ===================== */}
                <aside>
                    <div className={`${isActiveLink ? "w-[5rem]" : "w-[15rem]"}  bg-white h-full  duration-700 xl:block  transition-all ease-in-out top-0 left-0 fixed ${mobileSidebar ? "block z-[90]" : "hidden"}`}>

                        {!mobileSidebar && <div className="absolute z-10 top-14 -right-4">
                            <button onClick={() => setIsActiveLink(!isActiveLink)} className='bg-[#f3f3f3] hover:bg-sky-400 group p-2 rounded-full shadow-md transition-all duration-300'>
                                <DirectLeft className={`text-sky-400 group-hover:text-white transition-all duration-500 ${isActiveLink && "rotate-180"}`} size={22} />
                            </button>
                        </div>}
                        <div className={isActiveLink ? "flex px-3  pt-3 transition-all duration-700" : "flex px-5  pt-3 transition-all duration-700"}>
                            <NavLink className="flex items-center space-x-2" >
                                <img src={logoImg} className={isActiveLink ? " object-contain w-16 h-16 transition-all duration-700" : 'object-contain w-16 h-16 transition-all duration-700'} />
                                <NavLink className={"border-none decoration-0"} >
                                    <h1 className={isActiveLink ? ' transition-all duration-700 delay-200 hidden' : "font-tb font-black text-2xl tracking-wide  transition-all duration-700 delay-200 text-orange-500"}>MAX</h1>
                                    <h6 className={isActiveLink ? ' transition-all duration-700 delay-200 hidden' : "font-tb font-extrabold text-lg text-black transition-all duration-700 whitespace-nowrap delay-200 capitalize tracking-wide leading-4"}>Smart Bazaar</h6>
                                </NavLink>
                            </NavLink>
                        </div>
                        {user?.role == 'admin' ?
                            <ul className='flex flex-col items-center h-full my-4 mb-20 space-y-1 overflow-y-scroll scroll-hide'>
                                {Admin?.map((item, i) =>
                                    <SidebarLink
                                        i={i}
                                        key={i}
                                        item={item}
                                        isActiveLink={isActiveLink}
                                    />
                                )}
                            </ul> : user?.role == 'franchise' ?
                                <ul className='flex flex-col items-center h-full mt-4 space-y-1 overflow-y-scroll scroll-hide'>
                                    {Franchise?.map((item, i) =>
                                        <SidebarLink
                                            i={i}
                                            key={i}
                                            item={item}
                                            isActiveLink={isActiveLink} />
                                    )}
                                </ul> : user?.role == 'seller' &&
                                <ul className='flex flex-col items-center h-full mt-4 space-y-1 overflow-y-scroll scroll-hide'>
                                    {Seller?.map((item, i) =>
                                        <SidebarLink
                                            i={i}
                                            key={i}
                                            item={item}
                                            isActiveLink={isActiveLink} />
                                    )}
                                </ul>
                        }
                    </div>
                </aside>
                {/* ====================== sidebar end ===================== */}
                <div className={isActiveLink ? "navbar-section-active transition-all duration-700 " : "navbar-section transition-all duration-700   "} >
                    {/* ====================== Navbar start ===================== */}
                    <Navbar setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
                    {/* ====================== sidebar end ===================== */}
                    <main className="pb-5" >
                        {/* ====================== Routes start ===================== */}
                        {children}
                        {/* ======================Routes start ===================== */}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Sidebar