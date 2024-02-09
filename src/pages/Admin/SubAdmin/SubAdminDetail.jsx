import React, { useEffect, useState } from 'react'
import Profile from '../../../assets/user.jpg'
import { getSubAdmin } from '../../../api';
import { useParams } from 'react-router-dom';
import { inputClass, labelClass } from '../../../utils/CustomClass';
import Switch from 'react-js-switch';

function SubAdminDetail() {
    const { id } = useParams();
    const [tab, setTab] = useState(0);
    const [subAdmin, setSubAdmin] = useState([]);
    const [vendor, setVendor] = useState(false)
    const [restaurant, setRestaurant] = useState(false)
    const [promotion, setPromotion] = useState(false)
    const filteredAdmin = subAdmin.length > 0 ? subAdmin.find((admin) => admin?.id == id) : undefined;
    console.log('filteredAdmin', filteredAdmin);
    useEffect(() => {
        getSubAdmin().then(res => {
            setSubAdmin(res)
        })
    }, [])
    return (
        <>
            <div className='p-4 bg-white m-4 rounded-lg'>
                <div className='grid grid-cols-4'>
                    <img src={Profile} alt='profilePic' width={120} className='rounded-full border-2 border-sky-400 ' />
                    <div className='grid grid-cols-2 col-span-3 gap-4'>
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
                <div className='grid grid-cols-5 gap-5 mt-10'>
                    <div onClick={() => setTab(0)} className={`${tab == 0 ? 'bg-sky-400 text-white' : 'border-sky-400 border-2 text-sky-400'} p-2 text-center cursor-pointer`}>
                        Detail's
                    </div>
                    <div onClick={() => setTab(1)} className={`${tab == 1 ? 'bg-sky-400 text-white' : 'border-sky-400 border-2 text-sky-400'} p-2 text-center cursor-pointer`}>
                        Permission's
                    </div>
                </div>
            </div>
            <div className='p-4 bg-white rounded-lg m-4'>
                {
                    tab == 0 && <>
                        <form className='grid grid-cols-2 gap-4' >

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
                    </>
                }
                {
                    tab == 1 && <>
                        <div className='p-2 bg-white rounded-lg m-4'>
                            <h2 className='font-semibold text-xl'>Permission's</h2>
                            <div className='flex justify-between my-4 items-center w-1/2'>
                                <p className=' text-lg'>Vedor</p>
                                <Switch
                                    value={vendor}
                                    onChange={() => setVendor(!vendor)}
                                    size={50}
                                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                                    borderColor={{ on: '#86d993', off: '#c6c6c6' }}
                                />
                            </div>
                            <div className='flex justify-between my-4 items-center w-1/2'>
                                <p className=' text-lg'>Restaurant</p>
                                <Switch
                                    value={restaurant}
                                    onChange={() => setRestaurant(!restaurant)}
                                    size={50}
                                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                                    borderColor={{ on: '#86d993', off: '#c6c6c6' }}
                                />
                            </div>
                            <div className='flex justify-between my-4 items-center w-1/2'>
                                <p className=' text-lg'>Promotion</p>
                                <Switch
                                    value={promotion}
                                    onChange={() => setPromotion(!promotion)}
                                    size={50}
                                    backgroundColor={{ on: '#86d993', off: '#c6c6c6' }}
                                    borderColor={{ on: '#86d993', off: '#c6c6c6' }}
                                />
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default SubAdminDetail