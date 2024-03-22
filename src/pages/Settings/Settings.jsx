import React, { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Tax from './PrivacyPolicy/Tax';
import CustomFileUpload from './MediaGallery/CustomFileUpload';
import SupportPanel from './SupportPanel/SupportPanel';

export default function Settings() {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <div>
            <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                <TabList className='flex mx-4 space-x-4'>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >Tax / Commission</Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >Media gallery Images</Tab>
                      <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 2 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >Support Panel</Tab>
                    {/* <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 3 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >Basic</Tab> */}
                </TabList>
                
                <TabPanel><Tax /></TabPanel>
                <TabPanel><CustomFileUpload /></TabPanel>
                <TabPanel><SupportPanel/></TabPanel>
                {/* <TabPanel><Basic /></TabPanel> */}
            </Tabs>
        </div>
    )
}
