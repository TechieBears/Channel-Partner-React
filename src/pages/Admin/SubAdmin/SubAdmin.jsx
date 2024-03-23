import React, { useEffect, useState } from 'react'
import AddSubadminForm from '../../../components/Modals/SubAdmin/AddSubadminForm'
import Table from '../../../components/table/Table'
import Switch from 'react-switch'
import { NavLink } from 'react-router-dom'
import { getSubAdmin } from '../../../api'

export default function SubAdmin() {
    const [subAdmin, setSubAdmin] = useState();
    const columns = [
        { field: 'id', header: 'ID', body: (row) => <h6>{row?.subadmin_id}</h6>, sortable: false },
        { field: 'name', header: 'Name', body: (row) => <NavLink to={`/subadmin/subadmin-detail/${row?.id}`}><h6 className='text-sky-400 underline'>{row?.first_name} {row?.last_name}</h6> </NavLink>, sortable: false },
        { field: 'email', header: 'Email', body: (row) => <h6>{row?.email}</h6>, sortable: false },
        { field: 'phNumber', header: 'Ph. Number', body: (row) => <h6>{row?.phone_no}</h6>, sortable: true },
        { field: 'role', header: 'Role Type', body: (row) => <h6 >{row?.role}</h6>, sortable: false },
        { field: 'address', header: 'Address', body: (row) => <h6 >{row?.address}</h6>, sortable: false },
        { field: 'city', header: 'City', body: (row) => <h6 >{row?.city}</h6>, sortable: false },
        { field: 'state', header: 'State', body: (row) => <h6 >{row?.state}</h6>, sortable: false },
        { field: 'pincode', header: 'Pincode', body: (row) => <h6 >{row?.pincode}</h6>, sortable: false },
        { field: 'subAdmin', header: 'Sub Admin', body: (row) => <Switch checked={row?.isactive} />, sortable: false },
    ]

    const getSubAdminFunc = () => {
        getSubAdmin().then(res => {
            setSubAdmin(res)
        })
    }

    useEffect(() => {
        getSubAdminFunc()
    }, [])

    return (
        <>
            <div className="p-5 m-4 bg-white shadow-sm rounded-xl sm:m-5 " >
                <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                    <div className="">
                        <h1 className='text-xl font-semibold text-gray-900 font-tbPop '>Sub-Admin List</h1>
                    </div>
                    <AddSubadminForm getSubAdminFunc={getSubAdminFunc} title='Add Sub-Admin' />
                </div>
                {subAdmin?.length > 0 && <Table data={subAdmin} columns={columns} />}
            </div>
        </>
    )
}
