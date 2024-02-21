import { ArrowLeft } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../../../api';

function ViewAdminProduct() {
    const { id } = useParams();
    const location = useLocation();
    const product = location.state;
    console.log('product', product)
    const navigate = useNavigate();

    const images = [
        {
            URL: product?.product_image_1,
            width: 15,
            height: 9,
        },
        {
            URL: product?.product_image_2,
            width: 15,
            height: 9,
        },
        {
            URL: product?.product_image_3,
            width: 15,
            height: 9,
        },
    ].filter(image => image.URL !== '');

    // useEffect(() => {
    //     getProductById(id).then(res => {
    //         setProduct(res);
    //     })
    // }, [])
    return (
        <div className='m-4 space-y-2'>
            <button onClick={() => navigate(-1)}>
                <ArrowLeft />
            </button>
            <div className='grid grid-cols-3 p-4 bg-white rounded-xl'>
                <div>
                    <div className='mt-4 space-y-4 col-span-full '>
                        <p className='text-2xl font-semibold'>{product?.product_name}</p>
                        <div className='flex items-center gap-5 p-2 '>
                            <img src='https://www.thisday.app/uploads/Amul_bc2a81aa60.png' className='w-24 p-2 border rounded-xl' />
                            <p className='font-semibold'>{ }</p>
                        </div>
                        <p className='p-2 text-sm'>{product?.product_description}</p>
                        <div className='items-center p-2 text-sm '>
                            <p>175 ml</p>
                            <p className='text-lg font-semibold'>₹ {product?.product_actual_price}</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                {/* <div className='w-96'>
                    <SimpleGallery
                        galleryID="my-test-gallery"
                        images={images}
                    />
                </div> */}
            </div>
            <div className='flex gap-2 py-10 bg-white'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU" alt="" />

                {/* <img src={product?.product_image_1} alt="" />
                <img src={product?.product_image_2} alt="" />
                <img src={product?.product_image_3} alt="" />
                <img src={product?.product_image_4} alt="" />
                <img src={product?.product_image_5} alt="" /> */}
            </div>
            <div className='p-4 space-y-2 bg-white rounded-xl'>
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
                        <p className='text-lg font-semibold'>Disclaimer</p>
                        <p className='text-sm text-gray-600'>{product?.product_description}</p>
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
        </div>
    )
}

export default ViewAdminProduct