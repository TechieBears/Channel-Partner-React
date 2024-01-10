import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowLeft2, ArrowRight2, DirectLeft, DirectRight, Trade } from 'iconsax-react'
import SidebarApi from './SidebarApi';
import SidebarLink from './SidebarLink';
import Navbar from './Navbar';

const Sidebar = ({ children }) => {
    const [isActiveLink, setIsActiveLink] = useState(false);
    const [indexActive, setIndexActive] = useState(0);
    const [mobileSidebar, setMobileSidebar] = useState(false)
    return (
        <>
            <div className="w-full h-screen  flex ">
                {mobileSidebar && <div className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 bg-gray-600/20 z-50" onClick={() => setMobileSidebar(!mobileSidebar)} />}
                {/* ======================sidebar start===================== */}
                <aside>
                    <div className={`${isActiveLink ? "w-[6rem]" : "w-[17rem]"}  bg-white h-full  duration-700 xl:block  transition-all ease-in-out top-0 left-0 fixed ${mobileSidebar ? "block z-[90]" : "hidden"}`}>

                        {!mobileSidebar && <div className="absolute top-14 -right-3 z-10">
                            <button onClick={() => setIsActiveLink(!isActiveLink)} className='bg-[#f3f3f3] hover:bg-blue-500 group p-2 rounded-full shadow-md transition-all duration-300'>
                                <DirectLeft className={`text-blue-600 group-hover:text-white transition-all duration-500 ${isActiveLink && "rotate-180"}`} size={22} />
                            </button>
                        </div>}
                        <div className="flex justify-center items-center py-4 px-5">
                            <NavLink className="flex space-x-2 items-center " to="/">
                                <Trade size={isActiveLink ? "36" : "30"} className="text-blue-600 " variant='Bulk' />
                                <h2 className={isActiveLink ? 'hidden ' : 'font-tb font-extrabold text-3xl text-slate-600 transition-all duration-700 delay-200'}>Refeer<span className='text-blue-600'>ON</span></h2>
                            </NavLink>
                        </div>
                        <ul className='flex  items-center flex-col space-y-3 mt-4'>
                            {
                                SidebarApi.map((item, i) => <SidebarLink i={i} key={i} item={item} isActiveLink={isActiveLink} setIndexActive={setIndexActive} indexActive={indexActive} />
                                )
                            }
                        </ul>
                    </div>
                </aside>
                {/* ======================sidebar end===================== */}
                <div className={isActiveLink ? "navbar-section-active transition-all duration-700 " : "navbar-section transition-all duration-700   "} >
                    {/* ======================Navbar start===================== */}
                    <Navbar setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
                    {/* ======================sidebar end===================== */}
                    <main className="pb-5" >
                        {/* ======================Routes start===================== */}
                        {children}
                        {/* ======================Routes start===================== */}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Sidebar