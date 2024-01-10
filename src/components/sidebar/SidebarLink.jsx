import React from 'react'
import { NavLink } from 'react-router-dom'


const SidebarLink = ({ item, isActiveLink, i, indexActive, setIndexActive }) => {
    const activeLink = indexActive == i
    const { icon, link, title } = item
    return <NavLink to={link} onClick={() => setIndexActive(i)} i={i} className={`${!isActiveLink ? "px-10" : "justify-center"} flex items-center  space-x-2  group py-2.5 my-1 w-full origin-left relative transition-all duration-500`}>
        {!isActiveLink && <div className={`${activeLink ? "bg-blue-600" : "opacity-0"} absolute top-0 left-0 transition-all duration-300 origin-left w-1.5 h-full rounded-r-md`}></div>
        }
        <span className={`${activeLink ? "!text-blue-600" : "text-slate-600"} 'text-slate-600 group-hover:text-blue-600 duration-500 transition-all origin-left`}>{icon}</span>
        {!isActiveLink && <h4 className={`text-xl font-tb font-bold origin-left text-slate-600 group-hover:text-blue-600 duration-500 whitespace-nowrap transition-all  delay-200  ${activeLink ? "!text-blue-600" : "text-slate-600"} `}>{title}</h4>}
    </NavLink >
}

export default SidebarLink