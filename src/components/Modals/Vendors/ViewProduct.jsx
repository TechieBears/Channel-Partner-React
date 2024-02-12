import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadBox from '../../Loader/LoadBox';
import { useForm } from 'react-hook-form';
import Error from '../../Errors/Error';
import { MultiSelect } from 'primereact/multiselect';
import { Add, Eye } from 'iconsax-react';
import { formBtn1, formBtn2, inputClass, labelClass } from '../../../utils/CustomClass';
import moment from 'moment';
import ProfilePic from '../../../assets/user.jpg'

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
    return (
        <>
            <button className={`bg-sky-100 rounded-xl p-1`} onClick={() => setOpen(true)}>
                <Eye className="text-sky-400" />
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={() => toggle}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-scroll ">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg text-white w-full bg-sky-400 font-tb leading-6 font-semibold py-4 px-3"
                                    >
                                        {props?.title}
                                    </Dialog.Title>
                                    <div className=" bg-gray-200/70 ">
                                        {/* React Hook Form */}
                                        <>
                                            <div className="p-4 overflow-y-scroll scrollbars " >
                                                <div className="py-4 mx-4 grid md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3 customBox">
                                                    <div className='flex space-x-2 items-center'>
                                                        <h2 className='font-semibold text-lg'>Order ID :</h2>
                                                        <p>#O23453</p>
                                                    </div>
                                                    <div className='flex space-x-2 items-center'>
                                                        <h2 className='font-semibold text-lg'>Order Date :</h2>
                                                        <p>{moment().format('DD-MM-YYYY')}</p>
                                                    </div>
                                                    <div className='flex space-x-2 items-center'>
                                                        <img src={ProfilePic} alt='product_img' width={100} height={100} />
                                                        <div>
                                                            <div className='flex items-center'>
                                                                <h2 className='font-semibold text-lg'>Product Name :</h2>
                                                                <p>Ness Coffee</p>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <h2 className='font-semibold text-lg'>Description :</h2>
                                                                <p>Coffee</p>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <h2 className='font-semibold text-lg'>Location :</h2>
                                                                <p>Thane</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='flex items-center'>
                                                            <h2 className='font-semibold text-lg'>Qnt :</h2>
                                                            <p>10</p>
                                                        </div>
                                                        <div className='p-2 bg-sky-200 text-sky-400 w-1/2 text-center rounded-xl text-xl'>Approved</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <footer className="py-2 flex bg-white justify-between items-center  px-4 space-x-3">
                                                <div>Payment Method : Cash</div>
                                                <button type='button' className={formBtn2} onClick={closeBtn}>close</button>
                                            </footer>
                                        </>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}

export default ViewProduct