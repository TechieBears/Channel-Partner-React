import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add, ArrowLeft, Eye } from 'iconsax-react';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import moment from 'moment';
import ProfilePic from '../../../assets/user.jpg'
import SimpleGallery from '../../Gallary/SimpleGallery';

function ViewProduct(props) {
    const [isOpen, setOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cancelButtonRef = useRef(null)
    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
    const toggle = () => setOpen(!isOpen)
    const closeBtn = () => {
        toggle();
        reset()
    }
    const onSubmit = (data) => {
        console.log('data', data)
    }

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
            <div className='p-4 bg-white rounded-xl grid grid-cols-3'>
                <div className='col-span-2 mt-4 space-y-4 '>
                    <p className='font-semibold text-2xl'>Amul Taza Toned Butter Milk</p>
                    <div className='flex gap-5 items-center border-b p-2'>
                        <img src='https://www.thisday.app/uploads/Amul_bc2a81aa60.png' className='w-24 border p-2 rounded-xl' />
                        <p className='font-semibold'>Amul</p>
                    </div>
                    <p className='text-sm border-b p-2'>Buttermilk is a refreshing dairy beverage made from the liquid left behind after churning butter. It has a tangy flavor and a slightly creamy texture, often enjoyed on its own or used in cooking and baking for added moisture and acidity.</p>
                    <div className='text-sm items-center border-b p-2'>
                        <p>175 ml</p>
                        <p className='text-lg font-semibold'>₹ 15</p>
                    </div>
                </div>
                <div className='w-96'>
                    <SimpleGallery
                        galleryID="my-test-gallery"
                        images={images}
                    />
                </div>
            </div>
            <div className='p-4 bg-white rounded-xl space-y-2'>
                <p className='font-semibold text-2xl'>Product Details</p>
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
                    <p className='text-sm text-gray-600'>"The description provided for buttermilk is for informational purposes only. While efforts have been made to ensure accuracy, variations may occur due to factors such as regional recipes or manufacturing processes. Always consult product labels or trusted sources for precise information."</p>
                </div>
                <div>
                    <p className='text-lg font-semibold'>Self Life</p>
                    <p className='text-sm text-gray-600'>2-3 weeks</p>
                </div>
                <div>
                    <p className='text-lg font-semibold'>Country of Origin</p>
                    <p className='text-sm text-gray-600'>India</p>
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
    )
}

export default ViewProduct