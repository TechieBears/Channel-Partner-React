import React, { useEffect, useState } from 'react'
import { getPolicy, deletePrivacyPolicy } from '../../../api';
import AddPolicyForm from '../AddPolicy/AddPolicyForm';
import { Trash } from 'iconsax-react';


function PrivacyPolicy() {
    const [polices, setPolicy] = useState([])
    const [selectedTab, setSelectedTab] = useState(1);

    const getAllPrivacyPolicy = () => {
        try {
            getPolicy().then((res) => {
                setPolicy(res)
            })
        } catch (err) {
            console.log(err);
        }       
    }

    useEffect(() => {
        getAllPrivacyPolicy();
    }, [])

    const handleDeleteImage = (id) => {
        try{
            deletePrivacyPolicy(id).then(res => {
              if (res?.status == 'success') {
                  toast.success('Privacy policy Deleted successfully')
                  getAllPrivacyPolicy();
              }else{
                  toast.error('Error while deleting privacy policy')
            }});
        }catch(e){
            toast.error('Error while deleting privacy policy')
        }
      };

    return (
        <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5  " >
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <div className="">
                    <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Privacy Policy</h1>
                </div>
                <AddPolicyForm title='Add Privacy Policy' getAllPrivacyPolicy={getAllPrivacyPolicy}/>
            </div>
            <>
                <div className=''>
                    {
                        polices.map(({ id, title, description }) => (
                            <div key={id} className='p-4 space-y-2'>
                                <div className='space-y-1' onClick={() => setSelectedTab(id)}>
                                    <div className='flex'>
                                        <p className={` font-semibold text-lg underline cursor-pointer mx-3`}>{title}</p>
                                        <button>
                                            <Trash  onClick={() => handleDeleteImage(id)}  size={22} className='text-red-400 cursor-pointer' />
                                        </button>
                                    </div>
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