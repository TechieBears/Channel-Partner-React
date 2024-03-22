import React, { useEffect, useState } from 'react'
import { getHelpCenter } from '../../../api';
import AddTerm from '../AddPolicy/AddTerm';

const HelpCenter = () => {
    const [Data, setData] = useState([])
    const [selectedTab, setSelectedTab] = useState(1);

    const getAllHelpCenter = () => {
        try {
            getHelpCenter().then((res) => {
                setData(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllHelpCenter();
    }, [])



    return (
        <div
            className='p-4 m-4 bg-white rounded-lg'
        >
            <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                <div className="">
                    <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Help Center</h1>
                </div>
          
                <AddTerm title="Add Help Center" getAllHelpCenter={getAllHelpCenter}/>
            </div>
            <>
                <div className=''>
                    {
                        Data.map(({ support_id, support_name, support_contact }) => (
                            <div key={support_id} className='p-4 space-y-2'>
                                <div className='space-y-1' onClick={() => setSelectedTab(id)}>
                                    <p className={` font-semibold text-lg underline cursor-pointer`}>{support_name}</p>
                                    <div className='p-4 border-2 border-gray-200 rounded-lg' key={support_id}>
                                        <p>{support_contact}</p>
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

export default HelpCenter