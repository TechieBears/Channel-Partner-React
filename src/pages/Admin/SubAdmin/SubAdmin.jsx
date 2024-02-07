import React from 'react'
import AddSubadminForm from '../../../components/Modals/SubAdmin/AddSubadminForm'
import Table from '../../../components/Table/Table'
import Switch from 'react-switch'
import { NavLink } from 'react-router-dom'

export default function SubAdmin() {
    const data = [
        {
            "id": 1,
            "firstName": "Naveen",
            "lastName": "Gone",
            "role": "AC",
            "email": "Naveen@gmail.com",
            "phNumber": "52648512335",
            "department": "Frontend",
            "subAdmin": true,
            "address": 'Mumbai',
            "projects": "Project 1",
        },
        {
            "id": 2,
            "firstName": "Vishal",
            "lastName": "Gaikwad",
            "role": "MIS",
            "email": "Vishal@gmail.com",
            "phNumber": "52648512335",
            "department": "Backend",
            "subAdmin": true,
            "address": 'Thane',
            "projects": "Project 1",
        },
        {
            "id": 3,
            "firstName": "Shubham",
            "lastName": "Handergule",
            "role": "Back Office",
            "email": "AShubham@gmail.com",
            "phNumber": "52648512335",
            "department": "Backend",
            "subAdmin": false,
            "address": 'Bhiwandi',
            "projects": "Project 1",
        },
    ]

    const columns = [
        { field: 'id', header: 'ID', body: (row) => <h6>{row?.id}</h6>, sortable: false },
        { field: 'name', header: 'Name', body: (row) => <NavLink to={`/vendors/restaurant-detail/${row?.id}`}><h6 className='text-sky-400 underline'>{row?.firstName} {row?.lastName}</h6> </NavLink>, sortable: false },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.email}</h6>, sortable: false },
        { field: 'phNumber', header: 'Ph. Number', body: (row) => <h6>{row?.phNumber}</h6>, sortable: true },
        { field: 'role', header: 'Role Type', body: (row) => <h6 >{row?.role}</h6>, sortable: false },
        { field: 'department', header: 'department', body: (row) => <h6 >{row?.department}</h6>, sortable: false },
        { field: 'address', header: 'Address', body: (row) => <h6 >{row?.address}</h6>, sortable: false },
        { field: 'project', header: 'Projects', body: (row) => <h6 >{row?.projects}</h6>, sortable: false },
        { field: 'subAdmin', header: 'Sub Admin', body: (row) => <Switch checked={row?.subAdmin} />, sortable: false },
    ]

    return (
        <>
            <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 " >
                <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Sub-Admin List</h1>
                    </div>
                    <AddSubadminForm title='Add Sub-Admin' />
                </div>
                {data?.length > 0 && <Table data={data} columns={columns} />}
            </div>
        </>
    )
}
