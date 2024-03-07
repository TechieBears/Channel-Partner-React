import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'iconsax-react';
import { getProductById } from '../../../api';
import { setProduct } from '../../../redux/Slices/masterSlice';

function ViewProduct() {
    const location = useLocation();
    const product = location.state;
    console.log('product', product)
    const navigate = useNavigate();

    const images = [
        {
            URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU',
            width: 15,
            height: 9,
        },
        {
            URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU',
            width: 15,
            height: 9,
        },
        {
            URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP19bmDT6AGEOIWdxk1uilG1SHoeuh8m-sIQ&usqp=CAU',
            width: 15,
            height: 9,
        },
    ].filter(image => image.URL !== '');

    return (
        <div className='m-4 space-y-2'>
            <button onClick={() => navigate(-1)}>
                <ArrowLeft />
            </button>
            <div className='grid grid-cols-3 p-4 bg-white rounded-xl'>
                <div>
                    <div className=' space-y-2 '>
                        <div>
                            <p className='text-sm text-gray-600 font-semibold'>Product Name</p>
                            <p className='text-2xl font-semibold'>{product?.product_name}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-sm text-gray-600 font-semibold'>Brand Logo</p>
                            <img src='https://www.thisday.app/uploads/Amul_bc2a81aa60.png' className='w-24 p-2 border rounded-xl' />
                        </div>
                        <div className=''>
                            <p className='text-sm text-gray-600 font-semibold'>Product Name</p>
                            <p className='text-sm'>{product?.product_description}</p>
                            <div className='items-center text-sm'>
                                <p>175 ml</p>
                                <p className='text-lg font-semibold'>₹ {product?.product_actual_price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='space-y-4'>
                    <div>
                        <p className='text-lg font-semibold'>Featured</p>
                        <p className='text-sm text-gray-600'>{product?.featured == true ? 'Featured on App' : 'Not yet Featured'}</p>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Category</p>
                        <p className='text-sm text-gray-600'>{product?.product_category?.category_name ? product?.product_category?.category_name : '----------'}</p>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Sub-Category</p>
                        <p className='text-sm text-gray-600'>{product?.product_subcategory?.subcat_name ? product?.product_subcategory?.subcat_name : '------------'}</p>
                    </div>
                </div>
                <div className='space-y-4'>
                    <div>
                        <p className='text-lg font-semibold'>MSB</p>
                        <p className='text-sm text-gray-600'>{product?.vendor?.msb_code ? product?.vendor?.msb_code : '------------'}</p>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Shop Name</p>
                        <p className='text-sm text-gray-600'>{product?.vendor?.shop_name ? product?.vendor?.shop_name : '-----------'}</p>
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

export default ViewProduct