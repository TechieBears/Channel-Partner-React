import React, { useEffect, useState } from 'react'
import Profile from '../../../assets/user.jpg'
import { getSubAdmin } from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { inputClass, labelClass } from '../../../utils/CustomClass';
import Switch from 'react-js-switch';
import { ArrowLeft } from 'iconsax-react';

function SubAdminDetail() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [tab, setTab] = useState(0);
    const [subAdmin, setSubAdmin] = useState([]);
    const filteredAdmin = subAdmin.length > 0 ? subAdmin.find((admin) => admin?.id == id) : undefined;
    console.log('filteredAdmin', filteredAdmin);
    useEffect(() => {
        getSubAdmin().then(res => {
            setSubAdmin(res)
        })
    }, [])
    return (
        <>
            <div className='p-4 flex gap-2 cursor-pointer' onClick={() => navigate(-1)}>
                <ArrowLeft className='' />
                <p>Back</p>
            </div>
            <div className='p-4 bg-white m-4 rounded-lg'>
                <div className='grid grid-cols-4'>
                    <img src={Profile} alt='profilePic' width={120} className='rounded-full border-2 border-sky-400 ' />
                    <div className='grid grid-cols-2 col-span-3 gap-4'>
                        <h2 className='col-span-2 text-lg font-semibold'>Personal Detail's</h2>
                        <div>
                            <label className={labelClass}>Name</label>
                            <input
                                className={inputClass}
                                value={`${filteredAdmin?.first_name} ${filteredAdmin?.last_name}`}
                                disabled
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Role</label>
                            <input
                                className={inputClass}
                                value={filteredAdmin?.role}
                                disabled
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Email</label>
                            <input
                                className={inputClass}
                                value={filteredAdmin?.email}
                                disabled
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Phone Number</label>
                            <input
                                className={inputClass}
                                value={filteredAdmin?.phone_no}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                { /* ========= Tabs =========== */}
                {/* <div className='grid grid-cols-5 gap-5 mt-10'>
                    <div onClick={() => setTab(0)} className={`${tab == 0 ? 'bg-sky-400 text-white' : 'border-sky-400 border-2 text-sky-400'} p-2 text-center cursor-pointer`}>
                        Detail's
                    </div>
                </div> */}
            </div>
            <div className='p-4 bg-white rounded-lg m-4'>
                <form className='grid grid-cols-2 gap-4' >
                    <h2 className='col-span-2 text-lg font-semibold'>Contact Information</h2>
                    <div>
                        <label className={labelClass}>Address</label>
                        <input
                            className={inputClass}
                            value={filteredAdmin?.address}
                            disabled
                        />
                    </div>
                    <div>
                        <label className={labelClass}>City</label>
                        <input
                            className={inputClass}
                            value={filteredAdmin?.city}
                            disabled
                        />
                    </div>
                    <div>
                        <label className={labelClass}>State</label>
                        <input
                            className={inputClass}
                            value={filteredAdmin?.state}
                            disabled
                        />
                    </div>
                    <div>
                        <label className={labelClass}>PINCODE</label>
                        <input
                            className={inputClass}
                            value={filteredAdmin?.pincode}
                            disabled
                        />
                    </div>

                </form>
            </div>
            <div className='p-4 bg-white rounded-lg m-4'>
                <form className='grid grid-cols-2 gap-4' >
                    <h2 className='col-span-2 text-lg font-semibold'>Permission's</h2>
                    <div className='col-span-2'>
                        <label className={labelClass}>Department Name</label>
                        <input
                            className={inputClass}
                            value={`Back Office`}
                            disabled
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className={labelClass}>Permission's</label>
                        <input
                            className={inputClass}
                            value={`Application Process`}
                            disabled
                        />
                        <input
                            className={inputClass}
                            value={`Registration Process`}
                            disabled
                        />
                        <input
                            className={inputClass}
                            value={`Approval Process`}
                            disabled
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default SubAdminDetail