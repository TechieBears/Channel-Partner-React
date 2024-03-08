import { ArrowLeft, Link } from 'iconsax-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleGallery from '../../../components/Gallary/SimpleGallery';
import PathName from '../../../components/PathName/PathName';

const DashboardView = () => {
    const [data, setData] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    const images = [
        {
            URL: data?.image,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.outside_img,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.loading_img,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.staging_img,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.storage_img,
            width: 1500,
            height: 900,
        },
        {
            URL: data?.other_img,
            width: 1500,
            height: 900,
        },
    ].filter(image => image.URL !== '');

    const video = {
        URL: data?.video_url,
        width: 500,
        height: 500,
    }

    return (
        <>
            <div className="flex items-center justify-between px-6">
                <button className="flex items-center space-x-1 bg-transparent " onClick={() => window.history.back()}>
                    <ArrowLeft size={25} className='text-black' />
                    <span className='fs-3 base-font-600'>Back</span> </button>
                <div className="">
                    <PathName />
                </div>
            </div>
            <div className='grid xl:grid-cols-3 gap-2'>
                <div className={`bg-white px-5 py-4 sm:m-5 rounded-xl space-y-3  ${images.length === 0 ? 'w-full' : 'col-span-2 '}`}>
                    <h3 className=' text-sky-400 font-medium text-2xl '>Storage</h3>
                    <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-3 mt-2'>
                        <div>
                            <h5 className='text-sm font-semibold font-tb '>Name</h5>
                            <p className='text-gray-500'>{data?.name}</p>
                        </div>
                        <div>
                            <h5 className='  text-sm font-semibold font-tb '>Operational Year</h5>
                            <p className='text-gray-500'>{data?.operational_year}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>City Name</h5>
                            <p className='text-gray-500'>{data?.location}</p>
                        </div>

                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Warehouse Management Software</h5>
                            <p className='text-gray-500'>{data?.manage_software}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Operating Hours</h5>
                            <p className='text-gray-500'>{data?.operating_hrs}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Rating</h5>
                            <p className='text-gray-500'>{data?.rating}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Door Sensor</h5>
                            <p className='text-gray-500'>{data?.door_sensor === true ? 'Available' : 'Not-Available'}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Temperature Display System</h5>
                            <p className='text-gray-500'>{data?.temp_system === true ? 'Available' : 'Not-Available'}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Remote Temperature Monitoring System</h5>
                            <p className='text-gray-500'>{data?.remote_temp_sys === true ? 'Available' : 'Not-Available'}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Electricity Back Up</h5>
                            <p className='text-gray-500'>{data?.electricity_bckup === true ? 'Available' : 'Not-Available'}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Surveillance CCTV</h5>
                            <p className='text-gray-500'>{data?.cctv === true ? 'Avaiable' : 'Not-Avaiable'}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Blast Frezzing</h5>
                            <p className='text-gray-500'>{data?.blast_frezzing === true ? 'Avaiable' : 'Not-Avaiable'}</p>
                        </div>
                    </div>
                    <div className=''>
                        <h5 className='text-sm font-semibold font-tb'>Address</h5>
                        <p className='text-gray-500'>{data?.address}</p>
                    </div>
                    <div className=''>
                        <h5 className='text-sm font-semibold font-tb'>Description</h5>
                        <p className='text-gray-500'>{data?.description}</p>
                    </div>
                </div>
                <div className=' bg-white rounded-md p-2 mt-5'>
                    <SimpleGallery
                        galleryID="my-test-gallery"
                        images={images}
                    />
                </div>
                <div className="bg-white p-8 mx-4 my-1 sm:m-5 rounded-xl col-span-3 space-y-4">
                    <h3 className=' text-sky-400 font-medium text-2xl '>E-Demo</h3>
                    {
                        video.URL != '' ?
                            <video
                                src={video.URL}
                                width={video.width}
                                height={video.height}
                                muted
                                controls
                            /> :
                            <img
                                src='https://quickfixr-media.s3.ap-south-1.amazonaws.com/image_placeholder.png'
                                width={video.width}
                                height={video.height}
                            />
                    }

                </div>
                <div className="bg-white p-8 mx-4 my-1 sm:m-5 rounded-xl col-span-3">
                    <h3 className=' text-sky-400 font-medium text-2xl '>SPOC</h3>
                    <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 mt-2'>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Contact Person Name</h5>
                            <p className='text-gray-500'>{data?.spoc_name}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Designation</h5>
                            <p className='text-gray-500'>{data?.spoc_desgination}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Contact No.</h5>
                            <p className='text-gray-500'>{data?.spoc_contact}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Email ID</h5>
                            <p className='text-gray-500'>{data?.spoc_email}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 mx-4 my-1 sm:m-5 rounded-xl col-span-3">
                    <h3 className=' text-sky-400 font-medium text-2xl '>Decision Maker</h3>
                    <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 mt-2'>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Contact Person Name</h5>
                            <p className='text-gray-500'>{data?.dm_name}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Designation</h5>
                            <p className='text-gray-500'>{data?.dm_desgination}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Contact No.</h5>
                            <p className='text-gray-500'>{data?.dm_contact}</p>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Email ID</h5>
                            <p className='text-gray-500'>{data?.dm_email}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 mx-4 my-1 sm:m-5 rounded-xl col-span-3">
                    <h3 className=' text-sky-400 font-medium text-2xl '>Compilances</h3>
                    <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 mt-2'>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Fassai License</h5>
                            <div className='flex gap-2 items-center'>
                                <p className='text-gray-500'>{data?.fassai_license}</p>
                                {data?.fassai_doc != '' && <a href={data?.fassai_doc}><Link
                                    size="20"
                                    color="#38bdf8"
                                /></a>}
                            </div>

                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>GST No.</h5>
                            <div className='flex gap-2 items-center'>
                                <p className='text-gray-500'>{data?.gst_no}</p>
                                {data?.gst_doc != '' && <a href={data?.gst_doc}><Link
                                    size="20"
                                    color="#38bdf8"
                                /></a>}
                            </div>
                        </div>
                        <div>
                            <h5 className='text-sm font-semibold font-tb'>Any Other Licenses</h5>
                            <div className='flex gap-2 items-center'>
                                <p className='text-gray-500'>{data?.other_license}</p>
                                {data?.other_lic_doc != '' && <a href={data?.other_lic_doc}><Link
                                    size="20"
                                    color="#38bdf8"
                                /></a>}
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-2 items-center'>
                                <h5 className='text-sm font-semibold font-tb'>Electricity Doc</h5>
                                {data?.electricity_url != '' && <a href={data?.electricity_url} target='_blank'><Link
                                    size="20"
                                    color="#38bdf8"
                                /></a>}
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-2 items-center'>
                                <h5 className='text-sm font-semibold font-tb'>NOC Doc</h5>
                                {data?.noc_url != '' && <a href={data?.noc_url} target='_blank'><Link
                                    size="20"
                                    color="#38bdf8"
                                /></a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default DashboardView