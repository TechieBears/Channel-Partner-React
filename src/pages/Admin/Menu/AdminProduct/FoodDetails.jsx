import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SimpleGallery from '../../../../components/Gallary/SimpleGallery';
import { ArrowLeft } from 'iconsax-react';

export default function FoodDetails() {
    const location = useLocation();
    const food = location.state;
    const navigate = useNavigate();
    const images = [
        {
            URL: food?.food_image_1,
            width: 1500,
            height: 900,
        },
        {
            URL: food?.food_image_2,
            width: 1500,
            height: 900,
        },
        {
            URL: food?.food_image_3,
            width: 1500,
            height: 900,
        },
        {
            URL: food?.food_image_4,
            width: 1500,
            height: 900,
        },
        {
            URL: food?.food_image_5,
            width: 1500,
            height: 900,
        },
    ].filter(image => image.URL !== '');
    return (
        <div className='m-4'>
            <button className='flex gap-2 mb-2' onClick={() => navigate(-1)}>
                <ArrowLeft /> Back
            </button>
            <div className='grid  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-4'>
                <div className='lg:col-span-4 bg-white rounded-xl'>
                    <div className='p-4 '>
                        <div className='mt-2'>
                            <p className='text-2xl font-semibold'>{food?.food_name}</p>
                            <div className='grid grid-cols-3'>
                                <div className='items-center p-2 text-sm '>
                                    <p className='text-lg font-semibold'>MSBS Code</p>
                                    <p className='text-sm text-gray-600'>{food?.food_msbcode ? food?.food_msbcode : '------'}</p>
                                </div>
                                <div className='items-center p-2 text-sm '>
                                    <p className='text-lg font-semibold'>Restaurant Name</p>
                                    <p className='text-sm text-gray-600'>{food?.vendor?.shop_name ? food?.vendor?.shop_name : '-------'}</p>
                                </div>
                                <div className='items-center p-2 text-sm '>
                                    <p className='text-lg font-semibold'>Price</p>
                                    <p className='text-sm text-gray-600'>₹ {food?.food_actual_price ? food?.food_actual_price : '------'}</p>
                                </div>
                                <div className='items-center p-2 text-sm '>
                                    <p className='text-lg font-semibold'>Final Price</p>
                                    <p className='text-sm text-gray-600'>₹ {food?.final_price ? food?.final_price : '------'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-4 space-y-2 '>
                        <p className='text-2xl font-semibold'>Product Details</p>
                        <div className='grid grid-cols-4 gap-5'>
                            <div>
                                <p className='text-lg font-semibold'>Category</p>
                                <p className='text-sm text-gray-600'>{food?.food_category?.category_name ? food?.food_category?.category_name : '------'}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Sub-Category</p>
                                <p className='text-sm text-gray-600'>{food?.food_subcategory?.subcat_name ? food?.food_subcategory?.subcat_name : '------'}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Details</p>
                                <p className='text-sm text-gray-600'>{food?.food_details ? food?.food_details : '------'}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Veg/Non-Veg</p>
                                <p className='text-sm text-gray-600'>{food?.food_veg_nonveg ? food?.food_veg_nonveg : '------'}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Offers</p>
                                <p className='text-sm text-gray-600'>{food?.offers ? food?.offers : '-----'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-4 space-y-2 '>
                        <p className='text-2xl font-semibold'>Verification Details</p>
                        <div className='grid grid-cols-4 gap-5'>
                            <div>
                                <p className='text-lg font-semibold'>Admin </p>
                                <p className='text-sm text-gray-600'>{food?.food_isverified_byadmin == true ? 'Verified' : 'Verification Pending'}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Franchisee</p>
                                <p className='text-sm text-gray-600'>{food?.food_isverified_byfranchise == true ? 'Verified' : 'Verification Pending'}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Sub-Category</p>
                                <p className='text-sm text-gray-600'>{food?.food_subcategory?.subcat_name}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Details</p>
                                <p className='text-sm text-gray-600'>{food?.food_details}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Veg/Non-Veg</p>
                                <p className='text-sm text-gray-600'>{food?.food_veg_nonveg}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-2 bg-white rounded-xl'>
                    <SimpleGallery
                        galleryID="my-test-gallery"
                        images={images}
                    />
                </div>
            </div>
        </div>
    )
}
