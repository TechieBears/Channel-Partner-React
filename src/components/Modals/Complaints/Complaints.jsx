import moment from 'moment';
import React, { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Table from '../../table/Table';
import { inputClass } from '../../../utils/CustomClass';

export default function Complaints() {
    const [selectedTab, setSelectedTab] = useState(0);

    // ============ Table =======================

    const userData = [
        {
            "complaint_id": "123456789",
            "user_id": "987654321",
            "timestamp": "2024-02-16T15:30:00Z",
            "category": "Technical Issue",
            "description": "I am unable to access my account. Whenever I try to log in, I get an error message saying 'Invalid credentials'. I have tried resetting my password multiple times, but the issue persists.",
            "status": "Pending",
            "priority": "High"
        },
        {
            "complaint_id": "987654321",
            "user_id": "123456789",
            "timestamp": "2024-02-15T10:45:00Z",
            "category": "Billing Issue",
            "description": "I have been charged twice for the same subscription this month. Please refund the extra amount and ensure this doesn't happen again.",
            "status": "In Progress",
            "priority": "Medium"
        },
        {
            "complaint_id": "456789123",
            "user_id": "543216789",
            "timestamp": "2024-02-14T09:15:00Z",
            "category": "Service Outage",
            "description": "There seems to be an outage in my area. I have no internet connection since yesterday evening. Please resolve this issue as soon as possible.",
            "status": "Pending",
            "priority": "High"
        }
    ]

    const status = (row) => (
        <select className={inputClass}>
            <option value='Pending' >Pending</option>
            <option value='In Progress' >In Progress</option>
            <option value='Completed' >Completed</option>
        </select>
    )

    const userColumns = [
        { field: "complaint_id", header: "ID", sortable: false },
        { field: "user_id", header: "User ID", sortable: true },
        { field: "timestamp", header: "Time Stamp", body: (row) => <h6>{moment(row?.timestamp).format('DD-MM-YYYY')}</h6>, sortable: false },
        { field: "category", header: "Category", sortable: true },
        { field: "description", header: "Description", sortable: true },
        { field: "status", header: "Status", body: (row) => status, sortable: true },
    ]

    return (
        <div className='m-4'>
            <Tabs
                selectedIndex={selectedTab}
                onSelect={(index) => setSelectedTab(index)}
            >
                <TabList className="flex mx-6 space-x-4 border-b">
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0
                            ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                            : "text-gray-500 border-b"
                            }`}
                    >
                        User
                    </Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1
                            ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                            : "text-gray-500 border-b"
                            }`}
                    >
                        Vendor
                    </Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 2
                            ? "text-sky-500  border-b-2 border-sky-400 outline-0"
                            : "text-gray-500 border-b"
                            }`}
                    >
                        Delivery Partner
                    </Tab>
                </TabList>
                {/* ================= NewPending Orders component ============== */}
                <TabPanel className='mt-5 bg-white'>
                    <Table data={userData} columns={userColumns} />
                </TabPanel>
                <TabPanel className='mt-5 bg-white'>
                    {/* <Table data={AcceptedOrderData} columns={AcceptedOrderColumn} /> */}
                </TabPanel>
                <TabPanel className='mt-5 bg-white'>
                    {/* <Table data={AcceptedOrderData} columns={AcceptedOrderColumn} /> */}
                </TabPanel>
            </Tabs>
        </div>
    )
}
