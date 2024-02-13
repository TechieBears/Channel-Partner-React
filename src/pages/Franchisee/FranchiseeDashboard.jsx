import { ArrowSwapVertical, ClipboardTick, ShoppingCart, UserRemove } from 'iconsax-react'
import { Line } from 'rc-progress'
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

function FranchiseeDashboard() {
    const barData = [
        {
            "year": "24",
            "hot dog": 44,
        },
        {
            "year": "23",
            "hot dog": 170,
        },
        {
            "year": "22",
            "hot dog": 41,
        },
        {
            "year": "21",
            "hot dog": 113,
        },
        {
            "year": "20",
            "hot dog": 144,
        },
        {
            "year": "19",
            "hot dog": 157,
        },
        {
            "year": "18",
            "hot dog": 102,
        }
    ]
    return (
        <>
            <div className='bg-white m-4 rounded-xl'>
                {/* ======================= Headers =========================== */}
                <div className="grid grid-cols-1 p-4 sm:m-5 rounded-xl sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-4 ">
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70 ">
                        <div className="p-3.5 rounded-xl bg-sky-50">
                            <ShoppingCart size={26} className="text-sky-400" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">
                                Total Orders
                            </h6>
                            <h6 className="text-base font-semibold text-sky-400 font-tb">
                                980
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl lg:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-purple-50">
                            <ArrowSwapVertical size={26} className="text-purple-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">Active Orders</h6>
                            <h6 className="text-base font-semibold text-purple-600 font-tb">
                                120
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-green-50">
                            <ClipboardTick size={26} className="text-green-500" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">
                                Approved Orders
                            </h6>
                            <h6 className="text-base font-semibold text-green-500 font-tb">
                                70
                            </h6>
                        </div>
                    </div>
                    <div className="flex items-center p-4 mr-4 space-x-3 bg-white border-r-0 rounded-xl sm:border-r border-gray-200/70">
                        <div className="p-3.5 rounded-xl bg-red-50">
                            <UserRemove size={26} className="text-red-600" />
                        </div>
                        <div className="space-y-1">
                            <h6 className="text-sm text-gray-500 font-tb">Cancelled Vendors</h6>
                            <h6 className="text-base font-semibold text-red-400 font-tb">
                                5
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white m-4 rounded-xl items-center p-4 grid grid-cols-3 gap-2'>
                <div className='col-span-2 grid grid-cols-3 gap-2'>
                    <p className='col-span-3 text-xl font-semibold'>Sales Report</p>
                    <div className='space-y-1 border-2 border-slate-200 p-4 rounded-xl'>
                        <h4 className='text-sm font-medium'>Today</h4>
                        <h3 className='text-xl font-semibold'>$ 2,000</h3>
                        <Line percent={10} strokeWidth={4} trailWidth={4} trailColor='#D3D3D3' strokeColor='rgb(239 68 68)' />
                    </div>
                    <div className='space-y-1 border-2 border-slate-200 p-4 rounded-xl'>
                        <h4 className='text-sm font-medium'>This Week</h4>
                        <h3 className='text-xl font-semibold'>$ 10,000</h3>
                        <Line percent={40} strokeWidth={4} trailWidth={4} trailColor='#D3D3D3' strokeColor='rgb(56 189 248)' />
                    </div>
                    <div className='space-y-1 border-2 border-slate-200 p-4 rounded-xl'>
                        <h4 className='text-sm font-medium'>This Month</h4>
                        <h3 className='text-xl font-semibold'>$ 12,0000</h3>
                        <Line percent={60} strokeWidth={4} trailWidth={4} trailColor='#D3D3D3' strokeColor='rgb(74 222 128)' />
                    </div>
                </div>
            </div>
            <div className=''>
                <p className='col-span-3 text-xl font-semibold'>Sales Statistics</p>
                <div className='w-96 border-2'>
                    <ResponsiveBar
                        data={barData}
                        keys={[
                            'hot dog',
                            'burger',
                            'sandwich',
                            'kebab',
                            'fries',
                            'donut'
                        ]}
                        indexBy="year"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        valueFormat=">-"
                        colors={{ scheme: 'nivo' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'fries'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'sandwich'
                                },
                                id: 'lines'
                            }
                        ]}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'year',
                            legendPosition: 'middle',
                            legendOffset: 32,
                            truncateTickAt: 0
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'revenue',
                            legendPosition: 'middle',
                            legendOffset: -40,
                            truncateTickAt: 0
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    1.6
                                ]
                            ]
                        }}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
                    />
                </div>
            </div>
        </>
    )
}

export default FranchiseeDashboard