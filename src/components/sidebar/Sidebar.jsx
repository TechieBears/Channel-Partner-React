import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DirectLeft } from 'iconsax-react';
import SidebarLink from './SidebarLink';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Admin, Seller, Franchise } from './SidebarApi';
import logoImg from '../../assets/logo.jpeg';

const Sidebar = ({ children }) => {
    const user = useSelector(state => state?.user?.loggedUserDetails)
    // console.log('user = ', user)

    const [isActiveLink, setIsActiveLink] = useState(false);
    const [mobileSidebar, setMobileSidebar] = useState(false);
    const dispatch = useDispatch()

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
                        <div className="flex items-center justify-center px-5 py-4">
                            <NavLink className="flex items-center space-x-2" to="/">
                                {/* <Trade size={isActiveLink ? "36" : "30"} className="text-sky-400 " variant='Bulk' /> */}
                                <img src={logoImg} className='object-contain w-16 h-16' />
                                {/* <h2 className={isActiveLink ? 'hidden ' : 'font-tb font-extrabold text-3xl text-black transition-all duration-700 delay-200'}>Refeer<span className='text-sky-400'>ON</span></h2> */}
                                <h2 className={isActiveLink ? 'hidden ' : 'font-tb font-extrabold text-3xl text-black transition-all duration-700 delay-200'}>Channel <span className='text-sky-400'>Partner</span></h2>
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