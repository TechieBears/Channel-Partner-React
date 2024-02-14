import { Refresh, SearchNormal } from 'iconsax-react'
import React from 'react'
import { formBtn1, inputClass } from '../../utils/CustomClass'
import Table from '../../components/Table/Table'
import ReactSwitch from 'react-switch'

function DeliveryBoy() {
    const data = [
        {
            "emp_id": "IN001",
            "first_name": "Rahul",
            "email": "rahul@example.com",
            "mobile_number": "+91 9876543210",
            "DOB": "1985-07-15",
            "gender": "Male",
            "pincode": "560001",
            "address": "123, ABC Street, Bangalore",
            "active_status": true
        },
        {
            "emp_id": "IN002",
            "first_name": "Priya",
            "email": "priya@example.com",
            "mobile_number": "+91 8765432109",
            "DOB": "1990-03-25",
            "gender": "Female",
            "pincode": "110001",
            "address": "456, XYZ Road, New Delhi",
            "active_status": false
        },
        {
            "emp_id": "IN003",
            "first_name": "Amit",
            "email": "amit@example.com",
            "mobile_number": "+91 7654321098",
            "DOB": "1988-11-02",
            "gender": "Male",
            "pincode": "400001",
            "address": "789, PQR Lane, Mumbai",
            "active_status": true
        }
    ]

    const columns = [
        { field: 'emp_id', header: 'ID', sortable: false },
        { field: 'first_name', header: 'Name', sortable: false },
        { field: 'email', header: 'Email', sortable: false },
        { field: 'mobile_number', header: 'Mobile No', sortable: false },
        { field: 'DOB', header: 'DOB', sortable: false },
        { field: 'gender', header: 'Gender', sortable: false },
        { field: 'address', header: 'Address', sortable: false },
        { field: 'active_status', header: 'status', sortable: false, body: (row) => (<ReactSwitch checked={row?.active_status} onChange={() => { console.log('changed') }} />) },
    ]

    return (
        <>
            <div className='grid grid-cols-4 gap-10 m-4'>
                <div className='flex gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg '>
                    <SearchNormal className='text-gray-400' />
                    <input placeholder='Search..' className='w-full h-full' />
                </div>
                <input className={inputClass} placeholder='Filter By Pincode' />
                <select
                    className={inputClass}
                    onChange={(e) => console.log('e.target.value', e.target.value)}
                >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select>
                <div className='items-center gap-2'>
                    <button className='flex gap-2 p-3 bg-white border-2 rounded-lg '>
                        <Refresh className='text-gray-400' />
                        <p>Refresh</p>
                    </button>
                </div>
            </div>
            <div className='m-4'>
                <div className='flex justify-between p-2'>
                    <p className='text-xl font-semibold'>Delivery Partner List</p>
                    <button className={formBtn1}>Add Delivery Partner</button>
                </div>
                <div className='p-2 bg-white rounded-xl'>
                    <Table data={data} columns={columns} />
                </div>
            </div>
        </>
    )
}

export default DeliveryBoy