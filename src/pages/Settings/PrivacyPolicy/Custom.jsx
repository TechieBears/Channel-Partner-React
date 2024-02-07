import React from 'react'

function Custom() {
    return (
        <div
            className='p-4 bg-white m-4 rounded-lg'
        >
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <div className="">
                    <h1 className='font-tbPop text-xl font-semibold text-gray-900 '>Custom Polices</h1>
                </div>
                {/* <AddPolicyForm title='Add Privacy Policy' /> */}
            </div>
        </div>
    )
}

export default Custom