import React, { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy'
import Basic from './PrivacyPolicy/Basic';
import Custom from './PrivacyPolicy/Custom';

export default function Settings() {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <div>
            <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                <TabList className='flex space-x-4 mx-4'>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >Basic</Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >Privacy Policy</Tab>
                    <Tab
                        className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 2 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                            }`}
                    >Custom</Tab>
                </TabList>
                <TabPanel><Basic /></TabPanel>
                <TabPanel><PrivacyPolicy /></TabPanel>
                <TabPanel><Custom /></TabPanel>
            </Tabs>
        </div>
    )
}
