import { ArrowLeft } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../../../api';
import SimpleGallery from '../../../../components/Gallary/SimpleGallery';

function ViewAdminProduct() {
    const { id } = useParams();
    const location = useLocation();
    const product = location.state;
    const navigate = useNavigate();
    console.log('product', product)

    const images = [
        {
            URL: product?.product_image_1,
            width: 250,
            height: 100,
        },
        {
            URL: product?.product_image_2,
            width: 250,
            height: 100,
        },
        {
            URL: product?.product_image_3,
            width: 250,
            height: 100,
        },
    ].filter(image => image.URL !== '');

    return (
        <div className='m-4'>
            <button className='flex gap-2 mb-2' onClick={() => navigate(-1)}>
                <ArrowLeft /> Back
            </button>
            <div className='grid grid-cols-6 gap-4'>
                <div className='col-span-4 bg-white rounded-xl'>
                    <div className='p-4 '>
                        <div className='mt-4 space-y-4'>
                            <p className='text-2xl font-semibold'>{product?.product_name}</p>
                            <div>
                                <p className='text-lg font-semibold'>Description</p>
                                <p className='text-sm text-gray-600'>{product?.product_description}</p>
                            </div>
                            <div className='items-center p-2 text-sm '>
                                <p className='text-lg font-semibold'>Price</p>
                                <p className='text-sm text-gray-600'>₹ {product?.product_actual_price}</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-4 space-y-2 '>
                        <p className='text-2xl font-semibold'>Product Details</p>
                        <div className='grid grid-cols-4 gap-5'>
                            <div>
                                <p className='text-lg font-semibold'>Key Feature</p>
                                <p className='text-sm text-gray-600'>Wholesome taste</p>
                                <p className='text-sm text-gray-600'>Healthy and nutritious milk</p>
                                <p className='text-sm text-gray-600'>Rich in calcium</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Unit</p>
                                <p className='text-sm text-gray-600'>175 ml</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Self Life</p>
                                <p className='text-sm text-gray-600'>{product?.product_shelflife}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Country of Origin</p>
                                <p className='text-sm text-gray-600'>{product?.product_country_of_origin}</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>FSSAI License</p>
                                <p className='text-sm text-gray-600'>100234957362</p>
                            </div>
                            <div>
                                <p className='text-lg font-semibold'>Packaging Type</p>
                                <p className='text-sm text-gray-600'>Tetra Pack</p>
                            </div>
                        </div>
                    </div>
                   {product?.product_video_url != '' && <div className='p-4 space-y-2 '>
                        <p className='text-2xl font-semibold'>Product Video</p>
                        <div className='grid grid-cols-1 gap-5'>
                            <video width={500} height={300} controls>
                                <source src={product?.product_video_url} type="video/mp4" />
                                <source src={product?.product_video_url} type="video/x-m4v" />
                                <source src={product?.product_video_url} type="video/*" />
                            </video>
                        </div>
                    </div>}
                </div>

                <div className='bg-white w-96 rounded-xl'>
                    <SimpleGallery
                        galleryID="my-test-gallery"
                        images={images}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewAdminProduct