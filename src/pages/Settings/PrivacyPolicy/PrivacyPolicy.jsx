import React, { useEffect, useState } from 'react'
import { getPolicy } from '../../../api';
import AddPolicyForm from '../AddPolicy/AddPolicyForm';

function PrivacyPolicy() {
    const [polices, setPolicy] = useState([])
    const [selectedTab, setSelectedTab] = useState(1);
    useEffect(() => {
        getPolicy().then((res) => {
            setPolicy(res)
        })
    }, [])
    return (
        <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5  " >
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <div className="">
                    <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Privacy Policy</h1>
                </div>
                <AddPolicyForm title='Add Privacy Policy' />
            </div>
            <>
                <div className=''>
                    {
                        polices.map(({ id, title, description }) => (
                            <div key={id} className='p-4 space-y-2'>
                                <div className='space-y-1' onClick={() => setSelectedTab(id)}>
                                    <p className={` font-semibold text-lg underline cursor-pointer`}>{title}</p>
                                    <div className='p-4 rounded-lg border-2 border-gray-200' key={id}>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
        </div>
    )
}

export default PrivacyPolicy