import React, {useState} from 'react'
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs'
import Category from './MenuList/Category';
import SubCategory from './MenuList/SubCategory';
import Product from './MenuList/Product';


const Menu = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
      <div className="mx-5 mt-2" >
          <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)} >
              <TabList className="flex mx-6 space-x-4 border-b">
                  <Tab
                      className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 0 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                          }`}
                  >
                      Category
                  </Tab>
                  <Tab
                      className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 1 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                          }`}
                  >
                      SubCategory
                  </Tab>
                  <Tab
                      className={`p-3 cursor-pointer font-tbPop font-medium   ${selectedTab === 2 ? 'text-sky-500  border-b-2 border-sky-400 outline-0' : 'text-gray-500 border-b'
                          }`}
                  >
                      Products
                  </Tab>
              </TabList>
              {/* ================= Category component ============== */}
              <TabPanel >
                <Category />
              </TabPanel>
              {/* ================= SubCategory component ============== */}
              <TabPanel >
                <SubCategory />
              </TabPanel>
              {/* ================= Product component ============== */}
              <TabPanel>
                <Product/>
              </TabPanel>
          </Tabs>
      </div>
  )
}

export default Menu