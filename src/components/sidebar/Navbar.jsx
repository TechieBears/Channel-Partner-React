import moment from 'moment/moment'
import React from 'react'
import "./Navbar.css"
import greetingTime from 'greeting-time'

import { ArrowDown, ArrowDown2, Calendar, Calendar2, HambergerMenu, NotificationBing } from 'iconsax-react'

const Navbar = ({ mobileSidebar, setMobileSidebar }) => {
    return (
        <div className=" flex justify-between items-center py-5  px-5 sm:px-6 pt-24 sm:pt-4 pb-0 sm:pb-5">
            <div className="min-w-0 flex-1">
                <h2 className="font-tb font-bold text-2xl  md:text-2xl lg:text-2xl whitespace-nowrap ">
                    {greetingTime(new Date())},<span className="capitalize">Kamlesh</span>
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 ">
                    <div className="mt-2 flex items-center text-base text-gray-500 ">
                        <Calendar className="mr-1.5 text-gray-400" size={24} />
                        {moment().format('dddd , DD MMMM YYYY')}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between sm:justify-start bg-white fixed top-0   right-0 py-5 px-4 sm:rounded-bl-[2rem] z-20 md:px-3 w-full md:w-[22.5rem] lg:w-[23rem] xl:w-[21rem] " data-aos="fade-down" data-aos-duration="1000">
                <button className='relative xl:hidden shadow-none ' onClick={() => setMobileSidebar(!mobileSidebar)}>
                    {mobileSidebar ? <NotificationBing size="30" /> : <HambergerMenu size={30} />}
                </button>
                <div className="flex item-center">
                    <button className='px-7  relative'>
                        <span class="absolute flex top-0 right-6 h-3.5 w-3.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <NotificationBing size="30" />
                    </button>
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </div>
                    <div className="ml-3 space-y-1">
                        <h4 className="text-base font-tb font-semibold leading-none text-slate-800">Kamlesh Gupta</h4>
                        <h4 className="text-base font-medium leading-none text-gray-400">Admin</h4>
                    </div>
                    <button className='px-3'>
                        <ArrowDown2 size={22} className="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar