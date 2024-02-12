import React, { useEffect, useState } from 'react'
import { getPolicy } from '../../../api';
import AddTerm from '../AddPolicy/AddTerm';

function Custom() {
    const [polices, setPolicy] = useState([])
    const [selectedTab, setSelectedTab] = useState(1);
    useEffect(() => {
        getPolicy().then((res) => {
            setPolicy(res)
        })
    }, [])
    return (
        <div
            className='p-4 bg-white m-4 rounded-lg'
        >
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <div className="">
                    <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Term & Condition's</h1>
                </div>
                {/* <AddPolicyForm title='Add Privacy Policy' /> */}
                <AddTerm />
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

export default Custom