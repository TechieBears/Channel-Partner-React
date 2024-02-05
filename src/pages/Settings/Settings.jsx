import React, { useEffect, useState } from 'react'
import AddPolicyForm from './AddPolicy/AddPolicyForm'
import { getPolicy } from '../../api'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

export default function Settings() {
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
                <div className='grid grid-cols-6 gap-2'>
                    {
                        polices.map((policy) => (
                            <div key={policy?.id}>
                                <div onClick={() => setSelectedTab(policy?.id)}>
                                    <p className={`${selectedTab == policy?.id ? 'text-sky-400' : 'text-gray-400'} underline cursor-pointer`}>{policy?.title}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='my-4'>
                    {
                        polices?.map((policy) => (
                            selectedTab == policy?.id &&
                            <div className='p-4 rounded-lg border-2 border-gray-200' key={policy?.id}>
                                <p>{policy?.description}</p>
                            </div>
                        ))
                    }
                </div>
            </>

        </div>
    )
}
